---
title: Metasploit渗透测试魔鬼训练营笔记
date: 2019-01-30 22:30
tags:
- WEB
- 笔记
- 渗透测试
categories: Reading
thumbnail: https://blog.dvkunion.cn/img/1484628385603.png
---

# Metasploit渗透测试魔鬼训练营渗透笔记

<i>2019-1-30</i>

[Metasploit渗透测试魔鬼训练营渗透.pdf](https://github.com/Urinx/Books/raw/master/metasploit/Metasploit%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95%E9%AD%94%E9%AC%BC%E8%AE%AD%E7%BB%83%E8%90%A5.pdf)
<!-- split -->
日常写点什么
寒假开始一周多，想把这本搞了快半年的书彻底的读完。
写一个小总结似的笔记，把书里的课后习题和镜像练习实验都一遍。
也附带的写一下遇到的坑点和心得吧。
调整了一下结构，把每一章的小结都放到了开始部分，希望以后复习时候可以一口气回答出这些问题。
<!-- more -->
<i>2019-2-13</i>

读到中间部分感觉这本书还是有点年代感了，有些工具已经不再支持甚至不能够使用了，然而强迫症又想把所有的都做完...很难受。
后面部分可能会过的快一点...

---

## <b>第一章</b>

在这一章主要是介绍 Metasploit 以及渗透测试的基本流程和名词定义。

<b>第一章小结：</b>
>1.什么是渗透测试?
>2.渗透测试标准?
>3.渗透测试流程?
>4.渗透测试核心?
>5.Metasploit是什么?
>6.Metasploit发展史?
>7.Metasploit主要6模块?
>8.Metasploit安装和启动?

<b>什么是渗透测试?</b>
<b>渗透测试(Penetration Testing)</b>是一种模拟恶意攻击者的技术方法，对安全系统进行测试攻击，取得访问控制权，并发现安全隐患的一种安全测试与评估方法。这些渗透测试者一般称为渗透工程师。

渗透测试一般分为两种，即<b>黑盒测试</b>和<b>白盒测试</b>
黑盒测试：设计一个对客户一无所知的渗透攻击
白盒测试：拥有客户组织所有知识情况下的渗透测试
灰盒测试：将以上两种测试方法结合的渗透测试

<b>安全业界的开源测试手段：</b>

| 名称 | 简写 | 简述                                                  |
| ------ | ------ |-----------------------------------------------------|
| 安全测试方法开源手册| OSSTMM | 提供物理安全、人类心理学、数据网络、无线通信、电讯通信五类渠道的测试用例                |
| 网络安全测试指南 | NIST SP 800-42  | 美国国家标准与研究院(NIST)所讨论                                 |
| 十大web应用安全项目 | OWASP TOP 10| 针对高风险的web领域                                         |
| 渗透测试执行标准 | PTES | 广泛应用的一个执行标准：[PTES](http://www.pentest-standard.org) |

<b>渗透测试过程环节：</b>	

| id | 阶段名称 | 英文名称 | 执行动作 |
| ------ | ------ | ------ | ------ |
| 1 | 前期交互阶段 | Pre-engagement Interactions |定制渗透测试的范围、目标、限制条件、服务合扩谱图同等 |
| 2 | 情报搜集阶段 | Intelligence Gathering |通过信息搜集获取更大关于目标组织网络拓扑、系统配置等信息 |
| 3 | 威胁建模阶段 | Threat Modeling | 通过信息搜集的信息进行讨论分析最可行的攻击手段 |
| 4 | 漏洞分析阶段 | Vulnerability Analysis | 寻找漏洞攻击点，进行漏洞的挖掘|
| 5 | 渗透攻击阶段 | Exploitation | 实施渗透攻击获取目标控制权 |
| 6 | 后渗透攻击阶段 | Post Exploitation | 总结攻击途径 |
| 7 | 报告阶段 | Reporting | 撰写报告，将完整的渗透过程进行总结，并提出补救方案 |

>渗透阶段一般包含7个阶段，由主要核心的5部渗透和开头的服务交互再加上最后的报告。


<b>安全漏洞生命周期：</b>
>A BUG's Life

渗透测试的目的：找出系统中存在的安全漏洞，并实施渗透攻击。
安全系统漏洞(Vulnerability)：指信息系统中存在的缺陷或不适当的配置。
渗透代码(Exploit)：利用安全漏洞来造成入侵或是破坏效果的程序。
安全漏洞的生命周期：
1> 安全漏洞研究与挖掘:包括代码审计，逆向工程，Fuzz测试。
2> 渗透代码开发与测试:开发验证概念性的代码(POC)，来进行漏洞的验证
3> 安全漏洞和渗透代码在封闭团队中流传
4> 安全漏洞和渗透代码开始扩散
5> 恶意程序出现并传播
6> 渗透代码/恶意程序大规模传播并危害互联网
7> 渗透攻击代码/攻击工具/恶意程序消亡

在上述2-5的流程中出现的漏洞一般被称为“0day”
恶意程序传播后称作“1day”

>要记得什么是0day等...不然根本同不懂大佬门在说什么


<b>漏洞披露方式：</b>	
1> 完全公开披露
2> 负责人的公开披露
3> 进入底下经济产业链
4> 小范围利用直至被动披露

<b>漏洞资源库：</b>

| 名称 | 地址 |
| ------ | ------ |
| cnnvd | www.cnnvd.org.cn |
| 乌云漏洞库 | www.wooyun.org |
|metasploit|www.metasploit.com/modules |
|Exploit-db	| www.exploit-db.com|
|PacketStorm	| packetstormsecurity.org |
|SecurityFocus	| www.securityfocus.com/bi |
|SecurityReason	| securityreson.com/exploit_alert/|
|SecurityVulns	| securityvylns.com/exploits/|
|1337days	| 1337day.com|

<b>Metasploit 历史简介：</b>

初级阶段：HD Moore 在 2003 年成立
2003年10月，发布了第一个基于Perl的Metaslpoit版本V1.0，仅有11个渗透攻击模块。
2004年4月，发布了MetaslpoitV2.0，此时已经包含18个渗透攻击模块和27个攻击载荷模块。
2004年8月，在BlackHat大会上发布了MetaslpoitV2.2，进入了飞速发展的时代。
2007年5月，进行了长达18个月的代码移植，发布了MetaslpoitV3.0版本，支持177个渗透模块，104个攻击模块以及30个辅助模块。
2009年，MetaslpoitV3.3已经发展到796个模块，41.9万行代码。
2009年，Metaslpoit被Rapid7收购，之后推出express以及pro版本。
2011年8月,MetaslpoitV4.0发布，引入了后渗透模块。

<b>Metasploit框架：</b>
Metasploit主要由五部分组成。

1> 基础文件库:位于源码根目录下libraries目录下，有三个部分：rex、framework-core、framework-base。
rex：框架的基础组件，如：网络包装套接字、日志系统、PostgreSQL支持等
framework-core：负责与上层的模块插件的交互接口
framework-base：扩展framework-core，用于调用自身模块和集成模块

>我做测试时候使用的是kali自带的metasploit，并没有发现这三个部分的文件，其主目录位于/usr/share/metasploit-frame下。

2> 模块：由Metasploit框架所搭载实行渗透测试功能的部分。主要有6个部分：辅助模块Aux、攻击模块Exploits、后渗透攻击模块Post、攻击载荷模块Payloads、空指令模块Nops、编码器模块Encoders。

>模块部分是Metasploit的核心，这六部分模块不在这里做介绍，在后面每部分的使用的时候进行详细的表述。

3> 插件：Metasploit支持外部插件来扩展功能，如Nessus、OpenVas漏洞扫描器插件。
4> 接口：Metasploit提供多种外部用户接口，如控制台：msfconsole、命令行：msfcli、图形化界面：msfgui等。
> 做本章作业的时候发现，msfcli不能使用。bash不存在这个命令。查了一下结果发现msfcli早就已经废弃了...用msfconsole取代。有点坑...
> [原文链接](https://blog.rapid7.com/2015/07/10/msfcli-is-no-longer-available-in-metasploit/)

5> 功能程序：除了上述的四部分，Metasploit还提供一系列可执行程序，可以封装攻击荷载、多种类型的解码等。

<b>第一章作业</b>
1> <font color = "Brown">通过搜索引擎、安全信息漏洞库搜索Samba服务usermap_script安全漏洞的相关信息。绘出生命周期图，标注重要时间点。</font>
>度娘一下，这个漏洞应该是一个非常老旧的漏洞了...我jio着。
>结果，哇，全是大佬们整理好的...orz...
>揣摩一遍，还是进到CNNVD来自己看一遍吧...不然这个作业抄上了一点意义都没有了...

>漏洞名称：Samba用户名映射脚本命令执行
>漏洞编号：CVE-2007-2447(居然是07年的，这么近...啊也不近了，都2019了...)
>存在版本：Samba 3.0.0 - Samba 3.0.25rc3
>简单描述：MS-RPC功能允许远程攻击者在启用“用户名映射脚本”smb.conf选项时，通过涉及SamrChangePassword函数的shell元字符执行任意命令，并允许远程认证用户通过shell元字符执行命令
>[![k1uVpD.md.png](https://blog.dvkunion.cn/img/k1uVpD.md.png)](https://blog.dvkunion.cn/img/k1uVpD.md.png)

2> <font color = "Brown">更新Metasploit，找出攻击模块具体位置，查看一下针对不同系统的攻击模块数量。</font>
>我所使用的Metaspoit版本为：metasploit v5.0.1-dev
>总模块数量：aux：1046；exp:1851；post:321；payloads:541:encoders：44；nops:10
>渗透攻击模块的位置位于：/usr/share/metasploit-framework/modules/
>进入到exploits，可以发现几个明显的由操作系统命名的文件夹，Shell统计一下：

`# ls -lR | grep "^d" | wc -l`

>关于windows的攻击模块一共有47个。


3> <font color = "Brown">分别在Win和Linux下安装Metaspoit，运行并获取Linux靶机usermap_script漏洞渗透攻击，尝试植入VNC图形化远程控制工具的攻击荷载，成功获得Linux靶机上的远程控制桌面。</font>
>我的win下一直都没有装Metasploit...因为...懒癌...
>就使用kali下的做一下简单的尝试吧。kali-ip:10.10.10.128
>靶机为Metasploitable2-ip:10.10.10.254
>虚拟机内的连接为NAT模式。
>首先进入msfconsole，使用samba_script模块

>`msf5 > use multi/samba/usermap_script`

>使用show payloads查看攻击载荷，选定bind_netcat

>`msf5 exploit(multi/samba/usermap_script) > set payload cmd/unix/bind_netcat`

>使用show options 查看需要设置的参数
>将IP设置为靶机

>`msf5 exploit(multi/samba/usermap_script) > set RHOSTS 10.10.10.254`

>exploit!

>可以看到msf反馈已经成功，等待输出bash命令
>[![k1KjsJ.md.png](https://blog.dvkunion.cn/img/k1KjsJ.md.png)](https://blog.dvkunion.cn/img/k1KjsJ)

4> <font color = "Brown">使用msfcli命令行接口写一个SHELL脚本，实现用户只需要输入目标Linux靶机IP就可以使用usermap_script漏洞渗透攻击模块获取远程靶机的shell访问。</font>
>上面说了msfcli已经被弃用，尝试用上文博客的方法写一个脚本
>shell的写法还不是很熟练...代码只是简单粗暴的实现了所需功能...运行下过如下
>[![k1M8yQ.md.png](https://blog.dvkunion.cn/img/k1M8yQ.md.png)](https://blog.dvkunion.cn/img/k1M8yQ)
>贴上代码
>[![k1MGLj.md.png](https://blog.dvkunion.cn/img/k1MGLj.md.png)](https://blog.dvkunion.cn/img/k1MGLj.md.png)


## <b>第二章</b>

这一章主要搭建后面实现所需要的的网络拓扑环境

<b>第二章小结：</b>
>1.虚拟机内NAT和网桥的区别?
>2.怎么配置IP?

这本书需要的镜像总共为5个，统一安装在vm内。

| 名称 | 类型 | 模拟功能 | 基础操作系统 | 域名 | IP |
| ------ | ------ | ----- | ----- |  ----- | ------|
| Kali(原书使用BackTrack 5) | Linux攻击机 | 初始攻击点主机 | Ubuntu | attacker.dvssc.com | 10.10.10.128 |
| OWASP BWA v0.94 | Web服务靶机 | 门户网站服务器 | Ubuntu | www.dvssc.com | 10.10.10.129 | 
| Win2K3 Metasploitable | Windows靶机 | 后台服务器 | Win2K3 En | service.dvssc.com | 10.10.10.130 |
| Linux Metasploitable	| Linux 靶机 | 网关服务器 | Ubuntu 8.04 | gate.dvssc.com| 10.10.10.254(外)/192.168.10.254(内) |
|WinXP Metasploitable | Windows 靶机 | 内网客户端主机 | WinXP En | intranet1.dvssc.com| 192.168.10.128 |

各个镜像的配置和虚拟机的设置书上已经写得非常详细了，设置好VMnet1和VMnet8两张网卡的网段，再修改每一台主机的IP地址、Host模拟:修改靶机Host将域名和IP相对应。最终检测每一台虚拟机的互相连通性即可。

网关机192.168.10.254要打开路由转发功能net.ipv4.ip_forward,同时防火墙iptables的设置要正确。

<b>第二章作业</b>
1> <font color = "Brown"> 搭建本章环境，测试连通性</font>
>这个环境的搭建算是对基础的一个考验，如果网络基础非常好的话修改配置应该会应心得手，很快完成第二章的内容；其次也是对排错能力的一个考验，在实验过程中，由于我的攻击主机使用的kali，在配置网络时候没有注意到CIRD子网掩码二进制的不相同导致网络一直不相同等等问题。
>总而言之，在这一章主要为后面的实验搭建好良好的环境：工欲善其事，必先利其器。

2> <font color = "Brown"> Vmware虚拟机的构建 </font>
>这个目前还没有办法做到，等遇到了合适的渗透镜像时候会不断的加进来

## <b>第三章</b>

在第三章主要讲了渗透测试的第一个步骤：信息搜集。

<b>第三章小结：</b>
>1.什么是外围信息收集?
>2.什么是网络扫描?
>3.常见的网络扫描有哪些?
>4.Metasploit有哪些模块适用于信息侦查中?
>5.Metasploit如何共享信息侦查的数据/成果?

侦查：
目标：渗透测试目标的范围，发现渗透目标的安全漏洞与脆弱点，为后续的渗透攻击提供基础。
侦查包含：外围信息搜集/公开渠道信息搜集、网络扫描等。

### <font color = "LightSkyBlue">3.1 外围信息收集</font><br>

<b>通过DNS和IP的侦查挖掘</b>

1> whois域名注册查询
      msf内置：whois命令
      [站长之家](http://whois.chinaz.com)
2> nslookup/dig 域名查询
   nslookup:set type=A[MX(Mail Exchange)]
	 		ls -d xxxxx.com
   dig @<dns服务器> <域名>
3> [IP2Location地址查询](https://www.maxmind.com)
4> [netcraft信息查询](http://searchdns.netcraft.com)
   http:toolbar.netcraft.com/site_report?url=http://www.testfire.net
5> [IP2反查域名](http://site.ip138.com/)
6> [站长工具](http://www.7c.com/)

>由于这本书出版的年代已经有些久远，所提供的一些工具网址不能够很好地进行运作。能达到同一目的的工具有很多，所以主要是需要了解每一个查询所能获取到哪些有用的信息。
>whois查询：通过43端口建立tcp连接向服务器进行传送查询请求。这个功能可以查到域名下的DNS服务器、域名备案联系人、联系人邮箱、注册商地址、域名有效时间、注册时间、域名状态等等。同样通过whois反查，可以通过这一个域名所查处的邮箱、联系人、电话等等查到注册该域名的所有者所拥有的其他域名。
>nslookup&dig：这两个工具在使用的时候没有感觉出多么强大...因为我只看到了对于域名的IP解析...那直接ping一下不就好了么...orz....仔细查了一下，这两个工具更多的适用于dns服务器的查询与测试的...
>IP2Location：这个就很显而易见了，拿到了域名IP通过IP定位一下服务器所在位置。
>netcraft：用于子域名查询，在当前的二级域名上可以查询到多少个子域名。
>IP2Domain：用于查询一台服务器上有多少个虚拟主机，即一个IP上绑定了多少个域名的解析。

<b>通过搜索引擎的信息搜集</b>

1> GoogleHacking技术 
自动化工具：SiteDigger/Search Diggity
[SiteDigger](http://www.mcafee.com/us/downloads/free-tools/sitedigger.aspx)
[Search Diggity](http://www.stachliu.com)
>这两个自动化的工具原书的网址全凉了...去搜集一下这两个东西。
>SiteDigger：安装完了...英文...应该是输入域名然后选择数据库？之后就进行搜索...
>Search Diggity：原网址变更[Search Diggity New](http://www.bishopfox.com/resources/tools/google-hacking-diggity/attack-tools/) 。 帮助手册都是英文...瞬间就不想看了。
>还是放上GHDB吧:[GHDB](https://www.exploit-db.com/google-hacking-database)

2> 测试网站目录结构
google:parent directory site:
搜索inc配置文件/bak备份文件/txt或sql数据文件
Metasploit:brute_dirs/dir_listing/dir_scanner暴力

`use auxiliary/scanner/http/dir_scanner`
`set THREAD 50`
`set RHOST xxxxxxxx.com`
`exploit`

>对于google黑语法我在百度稍微的试了一下，总感觉度娘还是拦截掉了一些东西。没有Google用起来的感觉舒服。
>对于Metasploit,简单的测试一下：应改和御剑这类工具是一样的，用字典来不断发送请求并对返回的状态码进行统计。只是不知道这个字典和御剑比起来那个更强一点。

3> 检索特定类型文件
google:site:xxxx.com file type:xls

4> 搜索网站中的email地址:

Metasploit:search_email_collector模块

`use auxiliary/gather/search_email_collector`
`set DOMAIN xxxxxxxx.com`
`run`

5> 搜索sql注入的页面
google:site:xxxx.com inurl:login


[纯真数据库](http://www.cz88.net/)
traceroute

### <font color = "LightSkyBlue">3.2 主机探测、端口扫描</font><br>

<b>主机探测：</b>

对网段活跃主机的探测:
1.ping 

2.Metasploit 模块
modules/auaxiliary/scanner/discovery:arp_sweep、ipv6_multicast、ipv6_neighbor、ipv6_neighbor_route_advertisement、udp_probe、udp_sweep
arp_sweep:arp确认网段中活跃主机
udp_sweep:udp确认网段中活跃主机并发现服务

3.Nmap
metasploit集成了nmap模块,使用方法不再赘述。

<b>端口扫描：</b>

在Metasploit中：serach postscan可以发现端口扫描工具
auxiliary/scanner/portscan/sys、ack、ftpbounce、tcp、xmas

<b>服务扫描：</b>

metasploit：\_version/\_login
e.g. ：http_version查找网络中web服务器。

也存在着例外：mssql_ping 检测 SQL-server服务(1433)

常见检测：telnet_version、ssh_version、tnslsnr_version(1521，oracle数据库)、open_proxy(开放代理检测)

### <font color = "LightSkyBlue">3.3 口令猜测、嗅探</font><br>

<b>常用嗅探模块：</b>

ssh_login、psnuffle

ssh_login：auxiliary/scanner/ssh/ssh_login

psnuffle：auxiliary/sniffer/psnuffle

### <font color = "LightSkyBlue">3.4 漏洞扫描</font><br>

自动化扫描器：nessus、OpenVAS
针对性扫描器：nmap
这一小结的三个工具放到专门的工具博文下详细记录

<b>OpenVAS</b>

1).配置：
1>生成运行所需要的证书文件
`# openvas-mkcert -q`
`# openvas-mkcert-client -q`
2> 升级NVT库
`# openvas-nvt-sync`
3>初始化
`# openvassd`
`# openvasmd --migrate`
`# openvasmd --rebuild`

<b>Nessus</b>

<b>nmap</b>

nmap集成了很多的漏洞扫描脚本，在Kali内的目录为：


### <font color = "LightSkyBlue">3.5 信息整理与共享</font><br>

作为这一章结尾，信息整理与共享的确值得这个重量。良好的习惯和方法能够做到事半功倍的效果。

Metasploit支持使用数据库的形式导出与导入信息搜集的内容。db_nmap可以直接将nmap的扫描结果存储到数据库中；db_import支持数种格式的扫描结果的导入。

Metasploit数据库功能需要PostgreSQL的支持，Kali已经内置。

首先需要启动数据库

`# service postgresql start`

第一次使用数据库时候，需要初始化：

`# msfdb init`

在postgresql中会生成msf和msf_test两表

进入到msfconsole，输入下列命令查看数据库连接状态：

`msf -> db_status`

如果初始化数据库这一步正常的话，这里可以直接看到数据库已经连接，连接的是默认的本地msf数据库。

想要连接其他数据库时，可以使用db_connect进行连接，语法为：

db_connect 用户名:密码@服务器地址:端口 / 数据库名

`msf -> db_connect postgres:password@localhost:7337 / msf`

同理可知，db_disconnect 断开连接。

连接到数据库后，可以使用hosts命令查看数据库是否和已正常使用。

`msf ->hosts`

一切正常后，我们就可以使用 db_nmap 等封装命令直接将扫描结果储存在数据库中。

同样也可以将nmap扫描输出的文件使用 db_import 进行查看

>笔记：db_import 还可以识别 Acunetix、Amap、Appscan、Burp Session、Microsoft Baseline Security Analyzer 、 Nessus 、 NetSparker、NeXpose 、OpenVAS report、Retina等。
>基本不认识几个。。。等这个结束以后慢慢补上然后进行测试。

小组共享数据有两种方式，一是通过连接同一个数据库，二是使用MSF RPC数据库。
第一种方法需要配置 postgresql 的配置，使其允许远程的数据库连接请求。
第二种需要小组其中的一台机器使用 mfsrpcd 命令进行创建，其他小组成员通过GUI进行连接。

>此处在未来工作后再进行详细补充

<b>第三章作业</b>
1> <font color = "Brown"> 对一个你感兴趣的个人网站进行DNS、IP与位置的信息查询，找出网络运营者的联系方式，宿主服务器与所在位置等信息。撰写一份简单的调查报告</font>

2> <font color = "Brown"> 利用搜索引擎或相关工具对 testfire.net www.dvssc.com 网站进行更加细致的搜索与侦查，发现更多敏感信息泄露与web安全漏洞 </font>

3> <font color = "Brown"> 端口扫描练习：补全表3-1 </font>

4> <font color = "Brown"> 漏洞扫描练习：补全表3-3 </font>

5> <font color = "Brown"> 数据共享练习：将3、4的扫描结果存储在数据库内 </font>


## <b>第四章</b>

从第四章开始，进入到渗透步骤的攻击阶段，

第四章主要讲解web方面的攻击。
个人感觉第四章是看的最云里雾里的一章...一是所讲工具有些已经不能使用，并且工具的使用讲的较为粗略；二是结构上有点不太适应...感觉没有前几章读起来逻辑性更好一些，实战部分只挑了DVWA的四个样例；webshell代码解析倒是很详细，但是看不懂啊orz...

<b>第四章小结：</b>
>1.web安全引起重视的原因?
>2.OWASP 是什么组织?其每年发布的top 10 都有哪些?
>3.提升:web开源工具了解?
>4.提升:kali内web安全工具了解?
>5.通过dvwa/owasp top10 ，对各种web漏洞的原理了解，尝试编写自己的攻击模块?


<b>DMZ区：</b>
DMZ（Demilitarized Zone）即俗称的隔离区或非军事区，与军事区和信任区相对应，作用是把WEB，e-mail，等允许外部访问的服务器单独接在该区端口，使整个需要保护的内部网络接在信任区端口后，不允许任何访问，实现内外网分离，达到用户需求。

<b>web攻击迅速发展的7大理由：</b>
1.广泛性：web应用存在于广大网络中。
2.技术门槛低：Lamp、IIS+ASP、.NET等。
3.防火墙策略可绕
4.安全机制不够成熟：HTTP发展处于滞后阶段。
5.隐蔽性：难以取证。
6.变化性：由于业务和服务增加或修改，可能会因为调用不当导致出现验证漏洞。
7.利益性：web攻击的利益丰厚

<b>OWASP TOP10:</b>
1.SQL注入：手注、盲注
2.跨站脚本：XSS(Cross-Site Scripting) 分为存储型XSS、反射型XSS、DOM型XSS。
3.跨站伪造请求：CSRF(Cross-Site Request Forgery) 是XSS的一种衍生。
4.会话认证管理缺陷：BASM(Broken Authenitication and Session Managament) Cookie缺陷。
5.安全配置错误：常用服务设置错误。
6.不安全的密码存储：例如明文密码，算法key未处理或保护不当。
7.不安全的参考对象：读取任意文件或资料。
8.限制URL失败：如描述，限制失败。
9.缺乏传输层保护：网络传输过程中被监听。缺乏SSL/TLS等保护机制。
10.未验证的重定向和跳转

<b>web扫描工具：</b>

Metasploit:辅助模块：auxiliary；渗透模块：exploit。
第三方：W3AF、SQLmap、wXf、XSSF、BeEF
开源扫描器：W3AF、Arachni、Grabber、Wapiti(sql)、Zed Attack Proxy、Skipfish、Sandcat Free Edithin(xss)、Paros、burpsuite、WATOBO(FUZZ)。

<b>W3AF：</b>
W3AF(Web Application Attack and Audit Framework)是一个综合性的扫描器。其主要分为核心模块和插件模块。
核心模块用于进程调度和插件使用；插件分为八类：发现、审计、搜索、攻击、输出、修改、入侵、破解。
W3AF也包含两种工作模式：命令行、GUI
同样这里不对工具进行过多赘述。详见W3AF工具讲解。
>这个工具的安装搞了我一天的时间...为了这玩意还重装了一下虚拟机...这本书对这个工具的使用不是很多，希望在后面学习使用时物有所值吧...

<b>SQLmap：</b>
SQLmap是一款基于Python2的命令行自动注入工具。Kali自带，这里提一下在Metasploit内使用SQLmap

> 2022-02-23修正：当年读这本书的时候sqlmap还不支持py3。现在早就已经支持了.....

`msf -> use auxiliary/scanner/http/sqlmap`
`msf (sqlmap) -> show options`

<b>其他：</b>
对于书中所讲解的其他几个工具：如wXf(费了好大的力气找到的资源...)、xssf(这个更坑，据说已经停止更新和维护了，对metasploit兼容性越来越差)...由于略微的有一点年代感，在本章练习dvwa和owasp top10 中会学习近些时间比较新的或者更加实用的工具来进行代替。


<b>第四章作业</b>
1> <font color = "Brown">查找www.testfire.net 中存在的sql注入,应用sqlmap等工具或是手动注入</font>

2> <font color = "Brown">添加xssf模块，完成一次存储型跨站"钓鱼"</font>

3> <font color = "Brown">通过wXf扫描wordpress和joomla两个模块进行RFI攻击</font>

4> <font color = "Brown">从exploit-db上找一个wordpress漏洞搭建一个漏洞环境，通过metasploit进行攻击</font>

5> <font color = "Brown">在DVWA中实践并理解安全配置及漏洞原理</font>

6> <font color = "Brown">尝试使用sqlmap进行shell注入</font>

7> <font color = "Brown">尝试向metasploit中加入网上的web渗透模块并搭建测试环境进行测试</font>


## <b>第五章</b>

第五章讲述网络服务的渗透攻击，重点在于对所给实例的漏洞的分析过程的学习，这里和第六章先放一下，涉及了很多的汇编和二进制问题。
其主要介绍漏洞有：MS08-067、CVE-2009-1979、OSVDB-59110、

开始依旧是扫盲。

<b>内存攻击：</b>
攻击者利用软件安全漏洞构造恶意输入导致软件处理数据产生非预期错误，将数据写入特定的敏感位置从而劫持软件控制流量，执行外部代码。

<b>缓冲区溢出漏洞：</b>
缓冲区溢出（buffer overflow），是针对程序设计缺陷，向程序输入缓冲区写入使之溢出的内容（通常是超过缓冲区能保存的最大数据量的数据），从而破坏程序运行、趁著中断之际并获取程序乃至系统的控制权。
根据溢出内存位置不同，缓冲区溢出分为栈溢出和堆溢出。

<b>栈溢出：</b>
栈溢出指当写入数据超过内存分配给栈的缓冲区空间。会导致覆盖缓冲区附近的变量从而改变程序流程和结果；或是覆盖保存的函数地址修改为指定的地址；还有可能覆盖掉某个指针或者程序异常处理结构。
覆盖返回地址的利用方式是在函数进行调用时覆盖掉函数返回指针所指向的地址，从而达到调用shellcode的目的；
覆盖异常处理的利用方式

## <b>第六章</b>

第六章讲述的是客户端的渗透攻击。包含了常用的客户端软件如：浏览器、office、Adobe等。
主要的漏洞有：MS11-050、MS10-087。

同第五章，这一部分在开始学习逆向之后补齐。

## <b>第七章</b>

第七章讲社工，这一部分还是蛮有意思的。
说到社工，就不得不提凯文.米特尼克...和《欺骗的艺术》(虽然到现在我还没有看过，近期补上)。还有一本人性的弱点。

讲道理社工是一门博大精深的学问，个人觉得可以通过一些逻辑小游戏或者海龟汤故事之类的锻炼叙述一个故事或情景模拟。

从原理上来说，社会工程学（Social Engineering），是一种通过人际交流的方式获得信息的非技术渗透手段。他利用对象的心理弱点、人类的本能反应和好奇心等心理特征，进行欺骗、冒充、引诱等多种手段达成目的。

社工最重要的还是在进行之前的信息搜集。你能取得越多的信息，对于你获取信任的可能性就越大。

书中描述了一个社会工程学的环节框架：

1.信息搜集
2.诱导
3.托词
4.心理影响

在PC端对社工能够起到帮助的有：网络电话、木马、钓鱼网站的伪造、U盘攻击等等。

<b>网络电话</b>

<b>木马</b>
msfpayload

<b>钓鱼</b>
set工具

<b>U盘攻击</b>
autorun.inf
UItraISO
Hacksaw
Switchblade
