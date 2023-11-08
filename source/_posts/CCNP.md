---
title: CCNP 学习笔记
date: 2019-03-02 08:52:29
tags:
    - 计算机网络
    - 思科认证
categories: Reading
thumbnail: https://blog.dvkunion.cn/img/33109819ebc4b745546cf419c2fc1e178b82158d.jpg

---

# CCNP


---


<center><small>2019-3-2</small></center>

GNS
Cisco-packet-tracer 
<br>

<center><small>华丽的分割线</small></center>

---

### <b>0x00\- \- 简介和基础</b>

CCNP实际上是一个认证类的考试。CCNP全称是：Cisco Certified Network Professional——思科认证网络高级工程师。

工作方向：路由交换，安全，ISP服务商，数据中心DC，无线，语音。


<b>网络连通性的两种测试：</b>
ping:(ICMP)
原理：发送Echo request、接收Echo reply

traceroute:(UDP 33434/33435/33436)
原理：TTL值+ICMP错误消息。

<b>网络线缆：</b>
1.交叉线  568A 568B 
2.直通线  568B 568B
>568B 橙白 橙 绿白 蓝 蓝白 绿 棕白 棕
>568A 绿白 绿 橙白 蓝 蓝白 橙 棕白 棕
不同类型设备之间使用交叉线。
相同类型设备之间使用直通线。
普通网线只能在100m内通信。

3.console线(反转线，全反线) 连接路由和交换机等设备

4.串口线：早期广域网链路


### <b>0x01\- \- OSI七层模型</b>

<b>ISO：</b>
国际标准化组织（International Organization for Standardization，ISO）简称ISO，是一个全球性的非政府组织。
<b>目的：</b>
1.简化通信网络的复杂性，便于网络的学习。
2.为每一个层次定义响应的功能。下层需要为上层提供标准化服务。
3.标准化所有厂商的接头和协议。   

<b>OSI：</b>
OSI是Open System Interconnection的缩写，意为开放式系统互联。国际标准化组织（ISO）制定了OSI模型。

由高到低分别为：
+ <b>1.应用层(Applacation)： </b>为应用程序提供网络的接口。
+ <b>2.表示层(Presentation)： </b>进行数据的编码转换、压缩，翻译数据格式。
+ <b>3.会话层(Session)： </b>区分和控制不同的会话连接。
> 上三层一般由软件工程师进行考虑与建设。
+ <b>4.传输层(Transport)：</b>提供可靠的连接(TCP)，同时进行数据校验(CRC校验)
+ <b>5.网络层(Network)：</b> 定义逻辑地址(IP、ISIS)；提供路由的选择并进行维护；以及进行路由<font color='red'>数据包</font>的转发等操作。(路由器、三层交换机)
+ <b>6.数据链路层(Data Link)：</b>定义物理地址(MAC：media access control)，通过媒介访问控制将<font color='red'>数据帧</font>发送到目的主机。(以太网交换机)
+ <b>7.物理层(Physical)：</b>为网络提供可靠的传输环境，负责<font color='red'>比特流</font>的发送与接收。(集线器 hub)

观察上述红色部分可以发现，OSI为每一层定义了数据的单位\-\-\-<b>PDU</b>

- <b>上三层：</b>data 数据
- <b>传输层：</b>segement 数据段封装
- <b>网络层：</b>packet 数据包
- <b>数据链路层：</b>frame 数据帧
- <b>物理层：</b>bit 比特流：由0、1构成的一长串二进制。

<b>集线器被替代的原因：</b>
>冲突域：如果在一个网络的两台计算机在通信时会发生冲突，则这个网络就是一个冲突域。会导致数据帧的破损。

>广播域：广播的范围。
>集线器所有接口在一个冲突域。
>交换机的一个接口就是一个冲突域。
>交换机所有的接口都在一个广播域。
>路由器一个接口就是一个广播域。

### <b>0x02\- \- TCP/IP协议簇</b>

<b>协议：</b>
网络协议的简称，网络协议是通信计算机双方必须共同遵从的一组约定。
<b>TCP/IP协议：</b>
互联网协议（Internet Protocol Suite）是一个网络通信模型，以及一整个网络传输协议家族，为互联网的基础通信架构。它常被通称为TCP/IP协议族（英语：TCP/IP Protocol Suite，或TCP/IP Protocols），简称TCP/IP。
一般分为五层或四层：
+ <b>1.应用层：</b>FTP(21)、Telnet(23)、Http(80)、Smtp(25)、DNS(53)、RIP(路由信息协议 520)、Snmp(简单网络管理协议 161)、Tftp(简单文件传输协议 69)。
+ <b>2.传输层：</b>TCP(transmission control protocol)、UDP(user datagram protocol)
>TCP是面向连接(发送数据之前建立连接，发送数据时维护连接，发送数据结束拆除连接)、可靠的用户传输协议。
>TCP通过 "三次握手" 建立连接; "四次握手"拆除连接。
>UDP是非面向连接，不可靠的传输协议。
+ <b>3.网络层：</b>IP(internet protocol):、ICMP：(Internet control management protocol);ARP/RARP ()地址解析协议/地址反向解析协议。
+ <b>4.数据链路层：</b>以太网协议；HDLC协议；PPP协议。
+ <b>5.物理层(4、5整合可以称为网络接口层)</b>    

<b>TCP包头：(20 bytes)</b>
Source port(16 b);
Destination port (16 b);
>这两部分用于区分上层应用层协议。
>1-1023：知名端口。保留给知名的应用层协议
>1024-65535：随机高端口。 发送方随机高端口向目的主机的特定端口发起TCP连接。

Sequence number 序列号 (16 b);
Acknowledgement number 确认号 (16 b);
Data;

<b>UDP包头：(8 bytes)</b>
Source port(16 b);
Destination port (16 b);
check num(16 b);
         (16 b);
Data;

<b>IP包头：(unkown Bytes)</b>
version(4 b);
>版本：ipv4 0100; ipv6 0110;

header length(4 b);
>头部长度： 范围20byte-60byte之间

Priority & type of service(8 b);
>用于区分不同网络流量，实现QOS

Total length(16 b);
>总长度：说明四层以后负载的大小。

iDentification(16 b)/Flags(3 b)/flagment offset (13 b)；
>标识/标记/偏移量：用来对数据包进行分片。
>MTU值(最大传输单元) 最大只能传输1500 byte,所以在传输中经常对数据包进行分片。
>标识：标记同一个数据包。
>标记：第几个包。
>偏移量：开始位置。

Time To live(8 b);
>限制数据包存活时间(存活范围)，防止数据包环路
>每经过一台三层设备该值减一
>常见TTL：255、192、128、64。

Protocl(8 b);
>协议号：标记上层(传输层)使用的协议。
>6：TCP
>17：UDP
>1：ICMP
>2：IGMP internet管理协议

Header checksun(16 b);
>头部校验：校验IP数据包头部的完整性。

Source IP Address(32 b);
Destination IP Address(32 b);
>源IP/目的IP

Options;
Data;

<b>ARP协议：</b>
Win : arp -a
Route : show arp
arp存放时间是4个小时。

<b>RARP协议：</b>

已经被DHCP取代：software:169.254.0.0/16




### <b>0x03\- \- IP与子网掩码</b>

IP(Internet Protocol):网络之间的协议
<b>概念:</b>
为计算机网络相互连接进行通信而设计的协议。个人把IP理解为在这个网络中每台主机的地址：如，xx省xx市xx街xx小区xxx
<b>组成：</b>
网络号+主机位
主机位全为0代表网络号：如127.0.0.0
主机位全为1代表广播地址：如127.255.255.255
<b>分类：</b>
对IP的数据进行分类，有如下：
+ A:1.0.0.1-127.255.255.254 适用于超大型网络，可容纳 2^24-2 台主机
+ B:128.0.0.1-191.255.255.254 适用于大型网络，可容纳 2^16-2 台主机
+ C:192.0.0.1-223.255.255.254 适用于小型网络，可容纳 2^8-2 台主机
> A、B、C三种被称作单播IP地址。两台主机想要网络互通必须IP地址为这三类
+ D:224.0.0.1-239.255.255.254 此类地址没有网络号和主机位的概念，用于组播标识组号。
+ E:240.0.0.1-255.255.255.254 保留地址，多用于科研。

对IP的使用进行分列，有如下：

公网IP：
除私网地址以外的IP地址

私网地址：
10.0.0.0-10.255.255.255
172.16.0.0-172.31.255.255
192.168.0.0-192.168.255.255

私网地址优点：
提高网络安全性，节约IPv4网络空间

<b>子网掩码：</b>
子网掩码是用来判断任意两台主机是否属于同一个子网络。
子网掩码与IP一一对应，为32bit。
子网掩码
VLSM 可变长子网掩码：
例--将10.1.1.0/24划分为两个子网，可以通过这样的方式--向主机位借位作为网络位:
10.1.1.0/25
10.1.1.128/25

### <b>0x04\- \- 路由设备与基本路由协议</b>


路由器作用：可以实现不同网段之间的互联和互通。
路由：路由器收到IP数据包，去查找路由信息进行转发的过程。
路由信息：去往目的网络的一条信息，指明了去往目的网络的方向。
路由表：存放路由信息的表。
路由表存放的信息：目的地址网络号，子网掩码，下一跳地址，出接口，路由的类型，AD 管理距离，Metric 开销。

路由器依据路由表转发IP数据包，当路由表内不存在匹配的路由时，路由器就会丢弃该数据包。


路由分类：
直连路由和非直连路由

直连路由：指物理上直接连接的路由。会随着接口状态的改变而消失。

非直连路由：指物理上没有直接连接的路由。非直连路由又分为 静态路由 和 动态路由两种。

静态路由：人为手工在路由上进行配置路由信息的路由。

动态路由：主要有两个协议：距离矢量路由协议、链路状态路由协议。

距离矢量路由协议：RIP EIGRP BGP 基于流言的协议

链路状态路由协议：OSPF ISIS 地图协议

从协议的工作范围，路由器可以分为IGP路由、EGP路由。

IGP：RIP EIGRP ISIS内部网关工作协议  一个区域内内部运行的路由协议

EGP：BGP OSPF外部网关工作协议  在区域系统之间运行的路由协议

早期分类：
有类路由协议：RIP　IGRP (主类路由 A:X.0.0.0/8 B:Y.Y.0.0/16)

无类路由协议：EOGRP OSPF ISIS BGP(无类别路由,携带子网掩码)


查表原则：
1.最长掩码匹配原则。 
2.递归查询原则。

AD管理距离

C\-\-\-\-\-0
S\-\-\-\-\-1
RIP\-\-\-120
EIGRP\-90/170/5
OSPF\-\-110
ISIS\-\-115
BGP\-\-\-20/200
255\-\-\-过滤

作用：从不同的路由协议学习到的相同的路由条目，比较进行管理。



Metric开销：
比较同一种协议去往目的网络的开销

<b>静态路由</b>

由管理员手工配置的路由条目

配置语法：

`ip route 网络号 子网掩码 出接口/下一跳地址`

既要配置转发echo request的路由表，也要配置echo reply的路由表。

如果是以太网形式，静态路由尽可能跟下一跳地址。(代理ARP):no ip proxy-arp
如果是串行链路，既可以跟下一跳，也可以跟出接口。

静态路由全网联通：每一台路由都要配置与自己非直连路由的静态路由。

静态路由特例：
默认路由：ip route 0.0.0.0 0.0.0.0 出接口/下一跳地址。
一般用作网络的出口。

浮动静态路由：通过修改静态路由的管理实现备份。
若存在两条静态路由容易构成负载均衡。浮动静态路由可以做到另一条路由作为另一条的备份。
当其中一条路径出现问题，备份路径则生效。

总结：
优点：配置简单、CPU不需要计算路由条目、稳定。
缺点：不适用于大型网络、不能适应网络拓扑的变化、消耗网络资源。


<b>动态路由
路由器自动形成路由表，自动适应网络拓扑变化。


RIP:(Routing Information Protocol)
特点：
1.属于IGP，典型的DV协议(没有拓扑概念)
2.基于UDP协议，端口是520 RIP|UDP 502|IP 17
3.周期性以广播/组播的方式发送路由更新。
4.完整更新，路由表里面的路由条目。
5.算法-贝尔曼福特算法：使用跳数坐座位rip的度量值。
6.支持等价的负载均衡(去往目的由多个路径，路由metric相同)。
7.Rip有两个版本：RIPv1,RIPv2。

RIPv1:
1.有类别的路由协议(不携带子网掩码)
2.广播的方式发送路由更新 广播地址:255.255.255.255
3.在主类边界自动汇总
4.不能支持VLSM(可变长子网掩码)
5.不能支持路由认证和打标
6.不能支持第三方下一跳次优路径(重分布)
7.不支持不连续子网,




RIPv2:


router rip 进入到rip进程
version 1 选择版本
Network 宣告原则：按主类的方式进行宣告。
例：network 192.168.1.0 172.16.0.0
含义：被network包含的路由器上所有被激活的接口启RIP进程。

`show ip protocols`

接口所属的网段放进rip的数据库。

`show ip rip database`


利用辅助地址构建连续子网。
一个接口下可以配多个辅助地址。

`ip address 地址 掩码 secondary`

`show ip int brief`



































1，路由器模式详解：
Router> 用户模式，通常用来查看统计信息，但不能修改路由器的设置。
Router# 特权模式，可以查看并修改路由器的配置，通常在这里运行show命令。
Router(config)# 全局模式，在这里修改当前运行配置中的内容。
Router(config-if)# 接口模式，用来配置路由器的物理接口和环回接口。
Router(config-line)# 控制台接口模式
Router(config-subif)#  子接口模式，用来配置在路由器中创建的逻辑接口.
Router(config-router)#  路由协议接口模式，在这里配置路由协议，如RIP、OSPF、IGRP等。

2，登录cisco设备必要的配置：
Router>enable  //进入特权模式
Router#configure terminal   //进入全局模式
Router(config)#hostname R1    //配置路由器的主机名
R1(config)#no ip domain-lookup  //关闭动态的域名解析,作用是当我们输入错误命令的时候，路由器会认为这条命令没有错误，它只是一个域名的形式，路由器会进行解析，从而浪费宝贵的时间。
R1(config)#line console 0    //进入控制台
R1(config-line)#exec-timeout 0 0  //关闭控制台的会话超时，也可用命令no exec-timeout，当长时间不去操作路由器的时候，路由器会自动的终止与我们的对话连接，跳转到非连接状态，此时需要输入enable重新进入特权模式，对我们的操作十分的不方便。
R1(config-line)#logging synchronous //关闭日志同步，抑制控制台的提示信息，使得路由器发送的控制台屏幕的消息不会附加到命令行中。

3，cisco设备的基本配置
Router(config)#hostname NGR1  //修改路由器主机名
Router#clock set 13:01:01 10 july 2007配置路由器时间：
Router#show clock   //查看路由器当前时间 
Router(config)#enable password cisco //  特权模式的明文密码
Router(config)#enable secret cisco  // 特权模式的密文密码
Router(config)#service password-encryption
//将路由器中所有明文密码变为加密的形式
Router#copy running-config startup-config  保存路由器当前配置

VTY口的配置
Router(config)#line vty 0 4  
Router(config-line)#password [password]
Router(config-line)#login
Router(config-line)#exit

配置以太网接口地址
Router#conf  t
Router(config)#interface E0/0  进入接口
Router(config-if)#ip address 192.168.1.1 255.255.255.0  //配置IP地址
Router(config-if)#no shutdown  //激活该接口

配置串行接口（需要配置时钟频率）
Router#conf  t
Router(config)#interface S0
Router(config-if)#clock rate 64000 //DCE 设备配置时钟，DTE设备不用配置。
Router(config-if)#ip address 192.168.1.1 255.255.255.0   //配置IP地址
Router(config-if)#no shutdown

4常用的show命令：
Router#show running-config     查看路由器运行配置文件
Router#show ip interface s0/0    查看接口协议相关信息
Router#show ip route     查看路由信息。
Router#show version      查看路由器版本
Router#show flash:        查看路由器flash
Router#show history           查看历史命令记录 
Router#show arp     查看路由器ARP表 
Router#show clock    查看路由器的时间设置
Router#show ip interface brief     查看接口简要信息
Router#show interfaces s0/0     查看接口物理相关信息
Router#show users     查看当前所有连接到路由器的用户
Router#show session     查看会话记录，经常在终端上使用
Router#show controllers s0/0    查看特定接口的硬件信息
Router#show ip protocols     查看全局和接口的第三层协议的特定状态
Router#show startup-config    查看下次路由器重新加载时将要使用的配置
Router#show cdp neighbors    CDP思科发现协议，查看直连的相邻设备及其详细信息。

