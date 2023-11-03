---
title: Linux--KaLi
date: 2018-12-04 14:56:10
tags:
    - 操作系统
    - Linux
categories: Operation
thumbnail: /img/1484628195382.png

---

# Linux\-\-KaLi

### <b>0x00\- \- 前言<b>
咳咳,一直想要把KaLi里面的东西好好的整理一下，毕竟能省去很多复杂的操作时间。（其实就是图书馆借的书马上得换了赶紧翻两页写个笔记好了Orz...）
相比普通的Linux，KaLi集成了大量的渗透工具。是一个相当于什么都给你准备好的大型工具箱，能简化我们大量的安装时间。

>"工欲善其事，必先利其器"

### <b>0x01\- \- KaLi简介&安装<b>
还是从这个东西的历史开始了解。

Kali Linux是基于Debian的Linux发行版， 设计用于数字取证操作系统。由Offensive Security Ltd维护和资助。最先由Offensive Security的Mati Aharoni和Devon Kearns通过重写BackTrack来完成，BackTrack是他们之前写的用于取证的Linux发行版 。
Kali 也是一个简便的安全解决方案。Kali 并不要求你自己去维护一个 Linux 系统，或者你自己去收集软件和依赖项。你只需要专注于要审计的真实工作上，而不需要去考虑准备测试系统。

至于安装，我这里选择在虚拟机内搭建一个kali环境作为测试。

安装方法与普通的Linux系统并无区别，这里不再赘述。在[官网](http://www.kali.org/)下载镜像扔进虚拟机即可。
还是加一个注释吧：-i386 是 32位系统的镜像包，amd64 是 64位系统的安装包

KaLi 也可以安装到U盘/SD卡，甚至是ARM设备中。

### <b>0x02\- \- KaLi前期准备<b>
#### <font color = "blue">软件包的安装</font><br>
安装完成后，总需要微微的配置一下个人设置，让这台终端有一些你的记号，才会有一种归属感。
Kali是基于Debian开发的系统，所以在软件源和安装上，Kali使用的是和Debian一样的APT软件包管理工具和dpkg软件包管理器。
apt 命令也不过多赘述，参考Linux--CentOS 或是 Linux--Ubuntu。这里列出几个常用的命令仅供参考：
`# apt-get install /package name/ ` 安装
`# apt-get update ` 更新软件源和软件库
`# apt-get upgrade` 升级kali软件
`# apt-get dist-upgrade` kali版本升级
`# apt-get remove /package name/` 卸载
`# apt-get autoremove` 自动移除不需要的软件包。
`# apt-get purge /package name/`完全移除（包括依赖软件包）
`# apt-get clean [all]` 清理下载的软件包
![](/img/006IjVYfgy1fxurhy1rahj30kk0dwwjb.jpg)
dpkg 使用方法同 rpm 一样，只不过dpkg 是针对.deb的软件包。在Kali内，是不支持rpm(red hat package)的。
dpgk的部分常用参数也列在此处供参考：
`dpkg -i `安装
`dpkg -r `卸载
`dpkg -P `完全移除
`dpkg -l `显示软件状态
`dpkg -p ` 详细信息
还有一种使用 tar 安装的方式，和其他系统下 tar 的安装无差异。

有时系统提供的官方库没有我们需要的软件，与要自己手动更换软件源：
`vim /etc/apt/sources.list`
将源添加在文件的尾部:
`deb http://http.us.debian.org/debianstable main contrib non-free`

保存后apt-get update 更新即可。

#### <font color = "blue">KaLi网络&基本服务</font><br>
##### <b>网络</b>
Kali的网络配置也和Debian基本相同，配置文件位于 /etc/network/interfaces。其DNS文件位于 /etc/resolv.conf
虚拟机内我们为了方便基本操作使用DHCP分配一个IP即可。（后续还是使用静态较好...这东西的动静太大了）

学习一个大佬的小习惯：插网线前断掉网卡,避免多余的通信。
在GUI界面直接配置Network Connections可以起到同样的作用。

##### <b>服务</b>
kali自带一个简易的apache web服务。
同样我们可以通过GUI界面和命令行界面启动。
GUI的启动方法...自己在开始菜单里面找一找吧...因该有的...（书上是这么的写的...ಠ_ಠ）
命令行操作:
`# /etc/init.d/apache2 start` 启动
`# /ect/init.d/apache2 stop` 停止
`# /ect/init.d/apache2 restart` 重启
配置文件位置：
`# /etc/apache2/apache2.conf`
出现错误时查日志修改配置文件。
成功启动后访问kali的ip可以看到熟悉的页面
![](/img/006IjVYfgy1fxusyf6ebej30zq0haq4p.jpg)

同时kali提供SSH服务。
命令行操作:
`# /etc/init.d/ssh start` 启动
`# /ect/init.d/ssh stop` 停止
`# /ect/init.d/ssh restart` 重启

一般为了方便我们还要搭建以下FTP服务。
可以安装的FTP服务很多，例如VSFTP、Pure-FTPd等

### <b>0x03\- \- 靶机环境搭建<b>
武器准备的差不多了，我们需要找两个“受害者”了。
心中铭记社会主义核心价值观的我，怎么可能会攻击别人的主机呢？（网络安全法了解一下）就自己造两个“稻草人”来作为“受害者”。Σ(*ﾟдﾟﾉ)ﾉ


win下当然就是VM跑起来挂着就好了。
Linux下可以使用docker模拟多台靶机。

安装的系统可以使用Rapid7 / Metasploitable2
/SamuraiWTF/BWA

[Metasploitable2 官网](http://sourceforge.net)

下载完成后直接扔虚拟机。
登录:用户、密码都是msfadmin。
访问其IP如下图：
![](/img/006IjVYfgy1fxuzee0cakj30if0dlglj.jpg)
Metasploitable 还包含：
1. 1.phpMyAdmin：一个基于php的数据库图形化管理界面
2. 2.Mutillidate：Metasploitable内置的可能已经过期，可以访问[最新参考资源](http://sourceforge.net/projects/mutillidate)
[参考视频](http://www.youtube.com/user/webpwnized)
3. 3.WebDAV：这是一个HTTP协议栈的扩展。[更多信息](http://www.webdav.com)
4. 4.DVWA：这个就不多说了，参见另一篇通关文章：
5. 5.Twiki：一款企业及的web2.0应用程序的Wiki和Web前端协作。

训练库MCIR(Maglcal Code Injection Rainbow)
MCIR包含以下几个模块：
1. 1.SQLol
2. 2.XMlmao
3. 3.shelol
4. 4.XSSmh
5. 5.CryptOMG

[More](http://github.com/SpiderLabs/MCIR)

可以在 matoploitable2 下安装MCIR
下载MCIR源码:

`wget https://codeload.github.com/SpiderLabs/MCIR/zip/master`

我没有成功，由于什么ssl错误...直接去他的github上把源码包撸下来扔到虚拟机里，效果一样的。
扔进去之后解压：

`unzip master`

把解压后的文件夹拷贝到apache目录下

`sudo mv MCIR-master /var/www/mcir`
之后还要修改一下mcir的主界面，创建一个入口

`cd /var/www`
`sudo vim index.php`

将mcir的连接写入web列表中

![](/img/006IjVYfgy1fxv1cijp5wj30mt0dpdfq.jpg)

之后访问IP如下:

![](/img/006IjVYfgy1fxv16m9vn8j30po0e4mx4.jpg)

点击我们创建的入口连接：

![](/img/006IjVYfgy1fxv1bsy9m6j30pe0dw74j.jpg)

到此，靶机的安装先告一段落。

### <b>0x04\- \- 渗透测试流程<b>

在这一部分，想规范化一下渗透测试的五个标准流程。
该框架为渗透测试人员提供了一个较为完备的渗透体系，同时也用于为渗透测试活动形成更高等级的计划。
一个比较通用的定义为：一个渗透测试的生命周期分为五个阶段：
1. <b>1.侦查</b>
2. <b>2.扫描</b>
3. <b>3.渗透</b>
4. <b>4.维持访问</b>
5. <b>5.报告</b>

因为这篇博客主角为KaLi,所以在此仅记录KaLi下的这五部分的工具。

#### <font color = "blue">1.侦查</font><br>
>知己知彼，百战不殆

什么是侦查？所有有关渗透学习的资料的第一章必定都是侦查。个人认为，就是利用一切可以搜集到与目标有关或者间接有关的信息的方法，进行信息搜集。例如我们所熟悉的：Google、百度。
本阶段的目标是找出关于组织机构尽可能多的信息。

- · 组织架构，组织结构图，部门架构图等
- · 组织基础设施：IP地址和网络拓扑
- · 使用技术：硬件平台和服务软件包
- · 联系方式：员工邮箱地址、手机号码
- · 地理位置：组织设施的地理位置

首先从目标网站开始：自身的门户网站往往包含了大量的高价值信息；其次招聘信息的页面也往往能够透露出目标所使用的技术；每一个站点都要进行webmail的连接，并进行评估。

##### wget 工具
我们可以通过wget工具对网站进行下载离线镜像。
wget只能获取所有的html页面，而不能获取PHP教本页面。
具体参数参考手册。

##### Google &Google Hacking
[Google 的高级搜索页](http://www.google.com/advanced_search)
[Google Hacking 数据库(GHDB)](http://www.hackerforcharity.org/ghdb)
[阅读《Google Hacking for Penetration Testers》](http://www.offensive-security.com/community-projects/google-hacking-database/)

P.S:有时间关注一下LinkedIn

##### DNS/DNS攻击
##### 查询域名服务器/-/-nslookup
nslookup 工具可以用于域名服务器查询。
在kali终端直接输入nslookup，即可进入该工具命令模式。
输入一个域名，即可向本地域名服务器查询这个域名的权威应答和非权威应答服务器。
nslookup 通过分配给本机的域名服务器进行查询。可用server参数进行查看：

`nslookup `
`> server`

nslookup还可以限定查询服务器类型：
`> set type = MX` 特定查询邮件服务器
`> google.com`  查询的域名
本地域名服务器配置文件即DNS解析文件。

/etc/resovle.conf

nslook常见主要记录类型：

| Record Type | Default Port | Server Type|
| :-   | :-  | :- |
|mx | 25 | Mail|
|txt| n/a| Text message used for notes|
|ns | 53 | Name Server|
|cname| n/a| Alias for another server|
|aaaa | n/a| IPversion 6|
|a| n/a| Domain or Sub-Domain record|

##### 区域传输
区域传输可以在短时间内获取更多的信息。
区域传输是完全镜像一台服务器的所有信息，在配置不当的服务器上不但授权更新客户端的区域传输，还准许传输请求。
我们使用 Domain Internet Gopher (DIG) 程序进行区域传输：
`dig @ [nameserver][domain] axfr`
一般域名服务器会拒绝这个请求，当域名服务器配置不当时，完整的域名服务器记录将会被传输到本地Kali，域名应该是最小域名。axfr参数表示dig应请求一个区域传输操作。

#### <font color = "blue">2.扫描</font><br>

我们再打个形象的比喻：这个比喻是在《黑客秘籍--渗透测试指南》一书中，全书将渗透测试比喻做一场足球赛：如果说侦查是在赛前对对手的球队有哪些球员等信息进行搜集，那么扫描就是正式比赛开始的哨声。

扫描的主要目的是确定连接组织网络中的计算机和其他设备的指定信息。在本阶段中，目标就是找到所有的主机终端、确认操作系统以及开启的服务、甚至发现较为明显的漏洞。

常见的扫描工具：Nmap、Hping、Nessus。

进行这一部分之前，需要对网络的几个基础知识有一定的了解：网络流量、端口、防火墙、IP协议、TCP协议、UDP协议，ICMP等。
参考CSDN上的部分博文吧。

<font color = "red">新增加一个命令：tracert(for Win)/traceroute(for Linux)。</font>
关于这个东西的理解还不是很深刻，后续在计网里补一下。

##### Nmap
简单的使用过这个工具，现在详细的学习一下这个工具的功能。

最初接触 Nmap 是用于端口扫描。真正仔细的学习时候发现Nmap好强大啊。
Nmap不仅可以确认目标网络上的计算机存活状态，大多数情况还能拿到主机的操作系统、监听的端口、服务、甚至用户证书。
Nmap的命令非常灵活。用一个普通的命令为例：
`# nmap -sS-T2 192.168.1.1 -oN`
> -sS 表示以隐蔽的方式扫描
> -T2 是计时选项，他告诉引擎需要产生多大的流量，以及产生的时间。直接的影响了扫描速度
> ip 这个就不用说了，目标地址
> -oN 是输出选项，他告诉程序把扫描结果输出到哪里

简单的，我们在kali下用nmap试探一下搭建好的靶机--Metaploitable

`# nmap 192.168.230.137`

在不设置参数的时候，Nmap会对目标进行一次隐蔽扫描，T3模版，并输出到控制台。

![](/img/006IjVYfgy1fxy8utnyblj30uu0k9wob.jpg)

下面分别介绍三个参数的更多命令：

<b>-sS</b>
发起一次隐蔽扫描，这也是nmap的默认扫描方式。为什么能做到隐秘扫描呢？隐秘扫描时nmap会向目标服务器发送一次TCP的SYN请求，之后服务器对应的回复SYN/ACK后，扫描引擎不会再去确认它。这样就无法构成三次的过程，也就是无法形成TCP通道，大多数系统都会在这之后的一段时间内自动关闭该链接,从而达到隐秘扫描的目的。

<b>-sT</b>
发起一次TCP连接扫描。这会建立起一个完整的TCP连接，同时也会获取到更多的信息。

![](/img/006IjVYfgy1fxy8vuooanj30pz0g0gsd.jpg)

<b>-sU</b>
发起一次UDP扫描。UDP扫描会期望收到已经关闭端口的系统应答，而发送到开放的UDP端口的数据包不会被响应。
这个扫描方式的速度非常缓慢。

![](/img/006IjVYfgy1fxy9ucsye8j30jn07j40z.jpg)

<b>-sA</b>
发起一次ACK扫描，可以用于TCP端口是否被过滤的检测。这种扫描会对会主机发起一个标记为ACK的通信。这种扫描有时候可以绕过防火墙（伪装成内网的TCP请求）。

![](/img/006IjVYfgy1fxy9v4kcgzj30gd040gmu.jpg)

<b>-sP</b>
通过ICMP ping来获取网络中存活主机。

<b>-Pn/-PU</b>
不采取ICMP,对开放的Udp端口进行存活确认。

<b>-sn</b>
仅探测存活主机

<b>-p</b>
选定要扫描的端口号范围。


<b>-O/-A</b>
识别操系统
<b>timing模版</b>
nmap的模版一共有5级：T0-T5,从低到高隐秘性与准确性降低，速度加快。
nmap有三个时间参数：scan_delay、max_scan_delay、max_parallelism。

scan_delay设置了两次探测之间的最小时间差，max_scan_delay根据目标和网络设置调整扫描器允许的扫描器延时的最大值，max_parallelism设置告诉扫描器是串行探测还是并行探测。

<b>-T0 Paranoid</b>
这个模版被用于慢速的网络连接。或者必须最小化发现风险的环境。
扫描类型为串行，扫描时间间隔最少是五分钟，max_scan_delay会被忽略。
这个选项智慧早急需隐蔽或是时间充裕下选择。

<b>-T1 Sneaky</b>
这个模版是基于T0的一些优化。他的速度会比T0块，同时保持了慢速扫描固有的隐蔽性。
扫描类型依旧为串行，scan_delay值为15s。

<b>-T2 Polite</b>
扫描速度继续加快，依旧使用串行方式，scan_delay值为400ms,max_scan_delay为1分钟。

<b>-T3 Normal</b>
这个模版是nmap默认扫描方式的模版，当我们不设置timing参数时会默认使用这个模版的设置。
从T3开始扫描方式切换为并行，scan_delay为0s，max_scan_delay为1s。

<b>-T4 Aggressive</b>
速度继续增加，scan_delay为0s，max_scan_delay为10ms。在一些响应探针的时间间隔最小为1s的操作系统上很容易出错。

<b>-T5 Insane</b>
最快的内置模版，并行扫描 + scan_delay为0秒 + max_scan_delay = 5ms。
最快可达22s扫描完成，但对于某些主机的操作系统和设置，这个参数可能会导致错误。

<b>IP参数</b>
对于nmap，IP参数可以是一个固定的地址，或是地址段。
地址段支持CIDR寻址方式。
同样也可以用一个文件来导入目标地址。

`# nmap -iL targets.txt`

<b>-oN 普通输出</b>
普通输出，创建一个文本文档并写入。

<b>-oX XML输出</b>
输出格式为XML的文档。

<b>-oG GREPable输出</b>
适用于GREP工具的文档形式输出。

<b>-oS 脚本式输出</b>


<b> --script 脚本引擎</b>
nmap同时也支持使用脚本引擎进行扫描。
[更多信息](http://nmap.org/nsedoc/)

##### Hping3
这是一个可以手动制作数据包并发送到网络的应用程序。
更多参数在 -h 选项中可以看到

##### Nessus
这是一个漏洞扫描的应用程序,Kali内未内置，需要自行安装一下。
从 [Nessus](http://www.nessus.org/download) 下载
完成后dpkg安装即可。

启动Nessus：
`# /etc/init.d/nessusd start`
启动成功后，打开本地浏览器：`http://localhost:8834/` 进入设置页面。

可以去官网注册一个免费版的帐号，好像需要科学上网。

验证完成会开始下载。之后进行初始化的设置。

设置好登录帐号和密码，即可进入控制台。

关于Nessus的使用，可以列为一篇新的文章了。这里不再过多的描述了。

#### <font color = "blue">3.渗透</font><br>
首先要对几个名词性概念进行了解：
漏洞：存在于信息系统、系统安全规程、内部控制和实现中，并可能被外部威胁源所利用的弱点。
漏洞是由错误产生的，这个错误可以存在于多个地方。
渗透就是要利用各种漏洞进行越权访问信息或者造成拒绝服务（DOS）。
攻击向量：我的理解是攻击的主要思路，也就是攻击的大方向。
攻击类型：每种不同的大方向下会存在各种各样的小类型,也就是具体的攻击手段。
<table>
    <tr>
        <td>攻击向量</td> 
        <td>攻击类型</td> 
   </tr>
    <tr>
        <td rowspan="4">Code Injection</td>    
        <td >缓冲区溢出</td>  
    </tr>
    <tr>
        <td >缓冲区欠载（buffer underrun)</td>  
    </tr>
    <tr>
        <td >病毒</td>  
    </tr>
    <tr>
        <td >恶意软件</td>  
    </tr>
    <tr>
        <td rowspan="4">Web Based</td>    
        <td >篡改</td>  
    </tr>
    <tr>
        <td >跨站脚本公积（XSS）</td>  
    </tr>
    <tr>
        <td >跨站请求伪造（XSRF）</td>  
    </tr>
    <tr>
        <td >SQL注入</td>  
    </tr>
     <tr>
        <td rowspan="4">Network Based</td>    
        <td >拒绝服务攻击（DoS）</td>  
    </tr>
    <tr>
        <td >分布式拒绝服务攻击（DDoS）</td>  
    </tr>
    <tr>
        <td >密码和敏感数据拦截</td>  
    </tr>
    <tr>
        <td >证书盗窃和伪造</td>  
    </tr>
    <tr>
        <td rowspan="4">Social Engineering</td>    
        <td >身份伪造</td>  
    </tr>
    <tr>
        <td >网络钓鱼</td>  
    </tr>
    <tr>
        <td >鱼叉式网络钓鱼</td>  
    </tr>
    <tr>
        <td >情报搜索</td>  
    </tr>
</table>

Kali在渗透这一步主要使用 Metasploit ，单独在另一个文章内陈述。
这里只介绍部分Web渗透的工具。


