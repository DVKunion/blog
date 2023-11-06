---
title: Docker
date: 2019-06-10 20:57:11
tags:
    - 云原生
    - 容器
    - 环境搭建
categories: Tools
thumbnail: /img/1484628405614.jpg

---

# Docker

---

<center><small>2018-12-26</small></center>
(ﾟ∀。) 最近莫名的开了好几个新的文章，操作系统还没整理完密码学的编码也没继续记录完，然后我又开了一个docker......我可能是个傻子吧。

(((ﾟДﾟ;))) 人生好难

<center><small>2019-5-24</small></center>
经过一段时间以及换了mac pro的契机，各种环境的转换巴拉巴拉，还有最近想学习各种 vulurn hub 和复线大佬们的赛题环境，重新整理一下对docker的笔记以及自己的理解。

<center><small>2019-6-10</small></center>
搞来了一张图，用于考察自己的学习结果以及复习时候可以使用的思维导图
<img src='/img/Docker27.png'>

<center><small>华丽的分割线</small></center>

---

### <b>0x01\- \- docker简介</b>
首先是日行例常简介。  
讲道理很讨厌简介这个东西，总觉得概念性的东西说起来好麻烦啊......

当时用过一阵docker之后，我个人觉得docker其实就是将所有的软件运行环境进行一个打包处理，进行一个模块化。当我们想要使用的时候，就可以像拼接积木一样，把所有我们想要的功能直接组合在一起即可，方便而快捷，同时各个容器内部之间又不会产生环境版本或冲突等问题。

然后还是放一些官方的介绍吧

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从Apache2.0协议开源。Docker为开发人员和IT部门提供了构建，管理和保护业务关键型应用程序的自由，而无需担心技术或基础架构锁定，从而释放了组织的潜力。

什么是容器？容器技术是一种虚拟化的方案，它类似虚拟机技术，但又与虚拟机技术完全不同。它只能运行相同或相似内核的操作系统，依赖于Linux内核特性：Namespace和Control Groups。容器取消了虚拟机中操作系统、Hypervisor 并整合成了一个叫做docker engine 的东西。使得磁盘的占用空间大大减少、占用资源大大减少。对于一个应用不再需要几十个G的操作系统，只需要应用以及其依赖环境即可。

有一个很形象的比喻：在很久以前，运输业在一趟列车上只能运输同一种货物，例如，如果把香蕉和各种化工药物一起运输，最后药物可能被污染，香蕉也会被压烂；这时候人们做出了一个伟大的发明：集装箱，把一种货物装进一个集装箱，直接对集装箱进行运输即可，安全又方便。这个集装箱就可以看做是---容器。

Docker就是为容器提供了一个轻量级的简单建模方式，能够将应用程序部署到容器当中。为实现高内聚、低耦合做进一步的推进。使用Docker，可以轻松的隔离各个应用的运行环境，解决了在一台服务器上部署多个应用导致的冲突问题。

### <b>0x02\- \- docker基本组成</b>

Docker一般分为三个主要部分：Image 镜像，Container 容器，Registry 仓库。

都是一些概念性的东西，说一些比较好理解的吧。这三个东西可以认为是：win下的iso文件，一个虚拟机，iso文件仓库。  
当我们去安装一个虚拟机的时候，我们都要选择操作系统，然后倒入对应操作系统的iso镜像文件进行安装。这就类似于docker的Image 镜像；当我们安装好了之后，我们将会获得一个虚拟机，这个虚拟机运行着我们安装的操作系统，整个虚拟机就类似于docker的容器。最后仓库就很好理解了，是一个整体存放镜像文件的库，可以在里面找到你想要的各个版本的系统/环境。

#### <font color = "blue">Image 镜像</font><br>

镜像是容器的基石，当我们运行一个docker容器时，会生成一个docker栈，
他的最底层是一个bootfs的引导类文件系统，类似于Linux的引导文件系统；上一层就是操作系统层rootfs，他可以是一种或者多种的操作系统：Ubuntu、CentOS，这一部分在最开始的时候以只读的方式加载，在加载完成后才会开方读写模式。再上层是docker的联合加载模式（union mount），加载多个文件系统和应用。

#### <font color = "blue">Container 容器</font><br>
容器是镜像的执行者，所有的镜像都需要使用容器来进行执行。容器中可以运行用户的一个或者多个进程，在容器启动镜像时候，会在docker栈的最顶层生成一个读写层来给用户进行操作，所有对于镜像的读写操作都会储存在这里。这也是docker的一个特点：写时复制。


#### <font color = "blue">Registry 仓库</font><br>
相比于前两部分，这一个可能更好理解一些。所谓仓库就是存储docker镜像文件的仓库。就像GitHub是存放代码的仓库一样。docker公司提供了一个免费的仓库docker hub，用户也可以构建属于自己的仓库。


#### <font color = "blue">容器技术</font><br>

在简介里提到了两个比较陌生的部分：Namespaces 命名空间、Control groups 控制组。

命名空间是一种封装的概念。在操作系统中，命名空间是系统资源的隔离，如：进程、网络、文件系统等等。这也是Linux系统实现虚拟化的基础。

在docker中有五种命名空间：PID 进程隔离，NET 网络隔离， IPC 通信进程隔离，MNT 挂载点隔离，UTS 隔离内核和版本号。

控制组是用来控制分配资源的一种机制，它提供一个资源限制、优先级限定、资源计量、资源控制的服务。

通过这两中容器技术，docker就可以实现：

+ 文件系统隔离：所有容器都有root文件系统
+ 进程隔离：所有应用都在自己的容器内运行互不干扰
+ 网络隔离：容器之间的虚拟网络和IP是分割的
+ 资源隔离：对宿主主机CPU和内存等资源进行合理分配

### <b>0x03\- \- docker基本操作</b>

学习docker操作，第一个一定是从一个搭建一个web服务开始。

首先我们要安装好docker。安装步骤很简单，只需要内核版本足够即可。
对于Ubuntu，只需要内核版本高于3.10 即可。之后获取安装脚本运行就OK。
对于CentOS，要求系统要在7以上。

安装完成后，我们可以启动docker服务：

`# service docker start`

启动一个容器：
`# docker run IMAGENAME`

启动交互式容器：
`# docker run -i -t IMAGENAME /bin/bash`
-i --interactive=true 默认是FALSE 标准输入进程
-t --tty=true 默认是FALSE 分配终端

`# docker run --name=USERNAME -i -t IMAGENAME /bin/bash`  自定义容器名



查看建立的容器：
`# docker ps -a/-l`  查看所有/运行中的容器

`# docker inspect ContainerID`  查看特定容器详细信息

重启容器：

`# docker start -i ContainerID/ContainerNAME`

删除容器：

`# docker rm ContainerID/ContainerNAME`

设置容器的端口映射：

`# docker run -p containerPort`
`# docker run -p hostPort:containerPort`
`# docker run -p  ip:containerPort`
`# docker run -p ip:hostPort:containerPort`

镜像操作：

`# docker images` 查看本地镜像
`# docker search IMAGENAME:tag` 搜索镜像
`# docker pull IMAGENAME:tag` 下载镜像
`# docker push IMAGENAME:tag` 推送上传镜像
`# docker rmi IMAGENAME:tag` 删除镜像
`# docker commit ContainerID/ContainerNAME NEWIMAGENAME` 生成镜像
`# docker built DOCKERFILE` 根据dockerfile生成镜像


### <b>0x04\- \- docker守护式容器</b> 
指在命令结束后不会自行停止的容器。

进入一个正在运行的容器：
`# docker attach ContainerID/ContainerNAME`

启动守护式容器：
`# docker run -d`  后台执行容器

查看容器日志：
`# docker logs -f -t --tail ContainerID/ContainerNAME`
-f --follows=true 
-t --timestamps=true 时间戳
-tail 显示数量

查看运行进程：
`# docker top ContainerID/ContainerNAME`

在运行的容器中启动进程：
`# docker exec -d -i -t ContainerID/ContainerNAME`

停止守护式容器
`# docker stop ContainerID/ContainerNAME` 
`# docker kill ContainerID/ContainerNAME`

### <b>0x05\- \- docker Remote API远程通信</b> 
Docker是一个 C/S 架构，提供了一个Remote API 将服务进程与服务器通过Socket 进行连接。docker的client端可以远程启动和连接docker服务器。
`# nc -U /var/run/docker.sock` 通过ncat 与建立与docker的sock连接。

`# vim /etc/docker/daemon.json` 修改启动选项

`# -h tcp://host:port`	建立远程连接参数(server端)
`# -h unix://path/to/socket`
`# -h fd://`  
 
`# -H tcp://host:port`	建立远程参数连接(client端)
`# export DOCKER_HOST="tcp://host:port"` 通过修改环境变量进行远程连接

### <b>0x06\- \- DOCKERFILE 详解</b> 
越到后面的时候，越觉得dockerfile这个模式有点爽。相当于写了一个sh的脚本，运行脚本后能直接构造出我需要的镜像。不再需要创建后自己手动apt-get update 或是映射端口等操作。一条命令即可复线出一个环境。

<b>构建过程</b>：  
从基础镜像中运行一个容器。
执行命令，修改容器。
执行commit类操作，提交一个新的镜像层，
运行新的镜像层，删除刚才的容器，继续执行命令并重复此流程直至dockerfile内的命令结束。

<b>语法格式</b>：  
\#：注释  
UPPER lower：/命令/参数

<b>常见命令</b>：
FROM \<image>\<tag> 制定已经存在的镜像，必须是第一条非注释语句
MAINTAINER \<name> 作者信息、联系方式
RUN \<command> docker内运行的命令
EXPOSE \<port> docker启用的端口
CMD \<command param1 param2> 容器启动后在前台运行命令，在运行时会被覆盖
ENTRYPOINT\<command param1 param2> 容器启动后在前台运行命令，在运行时不会被覆盖
ADD \<src>...\<dest> 提供tar功能的文件映射
COPY \<src>...\<dest> 文件映射
VOLUME \<data> 向运行中的容器添加卷
WORKDIR /path/to/workdir 在容器工作时设置容器的工作路径
USER daemon 设置容器运行的身份，默认是Root用户
ONBUILD 设置触发器。当一个镜像被其他镜像作为基础镜像时执行。

`# docker built --no-cache`不使用缓存进行构建。
`# docker history IMAGENAME` 查看镜像构建过程

### <b>0x07\- \- docker-compose 详解</b>
一开始的时候很不明白docker-compose和dockerfile的关系(其实就是自己根本没写一下这两样东西的原因)。看了几个大佬们github上的复线题目，大概明白了一点这之间的关系。

首先，docker-compose是一个命令工具。可以通过pip进行安装。docker-compose会根据当前目录下的docker-compose.yml配置文件进行一系列的操作，而你所要做的只是输入一条命令： 

`# docker-compose up`  

之后所有的一切都会自动运行。

这里和dockerfile的区别在于，一个dockerfile只能使用一个容器，而docker-compose则没有这个限制。除此之外，docker-compose还支持使用dockerfile进行创建镜像。

所以只要我们了解了docker-compose。yml的语法格式，就能写出一个一键式创建的docker环境。

#### <font color = "blue">语法</font><br>

<b>vserion</b>

所有的docker-conpsoe.yml文件都是以版本号为开头的，一般写为2或3，表示使用的是 Docker-compose 2 或是 Docker-compose 3。

```yml
version:"3"
```

<b>service</b>

service是docker的第二大部分，其中包含了创建容器所用的镜像，端口，网络设置等等。

```yml
service: #详细信息开始标签
	continer1: #第一个容器标签，编写者可自定义
		image:ubuntu:14.04 #使用的镜像
	
	continer2:
		built: #也可以通过built来进行镜像创建
			context: ../ #表示dockerfile文件的目录，也可以是git的url
			dockerfile: path/to/dockerfile #表示dockerfile
			args: #环境变量
				password=1 #环境变量值也可以是空
		image: webapp:tag #当使用built创建镜像时还存在image标签，则创建的镜像名以image内容命名。
		labels: #标签
			-"com.example.description=Accounting webapp"
```
		










### <b>0x08\- \- docker 网络</b>

网桥:docker0 
地址划分：172.17.42.1 
子网掩码：255.255.0.0
MAC:02:42:ac:11:00:00-02:42:ac:11:ff:ff 共65534个地址
使用网桥管理工具可以查看:bridge-utils
`# brctl show` 查看网桥连结

同时也可以通过ifconfig对docker网段进行修改，来获得自定义的网段资源和IP资源。
也可以通过网桥管理工具新建一个网桥代替docker0，达到不修改docker0的条件下实现自定义。

`# vim /etc/defualt/docker/ `添加：DOCKER_OPS -b=br0

对于访问的限制，docker同样可以通过iptables防火墙的规则进行配置。

### <b>0x09\- \- docker 数据管理</b>

这里其实是一个很大的坑，最开始使用docker的时候不理解容器和镜像的区别，对容器进行的修改和一些文件的存储都直接进行了操作，然后删除容器之前没有commit成新的镜像，导致数据全部丢失。。。  
所以通常使用映射的方式对docker的存储：数据卷进行操作。

由于对于数据要求永久化，而容器的生命周期往往不能够满足，所以docker使用数据卷----经过特殊设计的目录，绕过联合文件系统(UFS)，为一个或者多个容器进行访问。

简单的来讲，数据卷更像是类似端口的一种映射，将宿主主机的文件或者文件目录映射到使用的容器当中，这样即使容器删除或者停止，数据目录依然是存储在宿主主机当中，形成了数据独立分离于容器的生存周期。

`# docker run -v ~/datavalume:/data IMAGENAME ` 运行一个映射了数据卷的容器

`# docker run -v ~/datavalume:/data:ro IMAGENAME`
设置权限:只读

当我们将数据卷的挂在写在dockerfile中时，是无法创建不存在的目录和共享到其他容器的。













