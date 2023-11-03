---
title: zabbix
date: 2018-11-03 19:35:48
tags:
	- 运维
	- 管理工具
categories: Tools
thumbnail: /img/161233-1528618353a6ad.jpg

---
<div id="head"></div>

# Zabbix

---
<div id="0x00"></div>

### <b>0x00\- \- Zabbix 简介<b>

#### <font color = "blue">Zabbix 起源</font><br>
Zabbix 是一个由Alexei Vladishev创建，目前由Zabbix SIA在持续开发和支持的<b><i>企业级、分布式、开源且高度集成</i></b>的监控套件。
Zabbix 是一个通过 C/S 模式采集数据,通过 B/S 模式在WEB界面展示，所有的Zabbix报告都可以通过配置参数在WEB前端进行访问。基于Web的前端页面可以确保您从任何方面评估您的网络状态和服务器的健康性。
Zabbix使用灵活的通知机制，允许用户为几乎任何事件配置基于邮件的告警。这样可以快速反馈服务器的问题。适当的配置后，Zabbix可以在IT基础架构监控方面扮演重要的角色。
#### <font color = "blue">Zabbix 特性</font><br>
通过 Zabbix 可以实现：
* 数据收集
* 高级警告
* 实时绘图
* 存储历史数据

Zabbix 的优点：

+
+
+
Zabbix 的缺点：

-
-
-
	
### <b>0x01\- \- Zabbix 结构概述<b>
![](/img/4c06e311gy1fwztd037h7j20hm0daq48.jpg)

Zabbix由几个主要的软件组件构成，这些组件的功能如下：

<b>Server</b>——Zabbix server 是agent程序报告系统可用性、系统完整性和统计数据的核心组件，是所有配置信息、统计信息和操作数据的核心存储器。

<b>数据库存储</b>——所有配置信息和Zabbix收集到的数据都被存储在数据库中。

<b>Web界面</b>——基于Web的Zabbix界面。该界面是Zabbix Server的一部分，通常(但不一定)跟Zabbix Server运行在同一台物理机器上。

<b>Proxy代理服务器</b>——Zabbix proxy 可以替Zabbix Server收集性能和可用性数据。Proxy代理服务器是Zabbix软件可选择部署的一部分；当然，Proxy代理服务器可以帮助单台Zabbix Server分担负载压力。

<b>Agent监控代理</b>——Zabbix agents监控代理 部署在监控目标上，能够主动监控本地资源和应用程序，并将收集到的数据报告给Zabbix Server。

<b>数据流</b>——实现监控告警等功能时，控制数据流动的模块。

![](/img/4c06e311gy1fwztrh5d6dj20ux0j6n3t.jpg)

### <b>0x02\- \- Zabbix 环境搭建<b>
#### <font color = "blue">Zabbix 需求</font><br>
##### 硬件需求
最低配置：128MB内存、256MB硬盘
##### 软件支持
Web端：
基本Lamp环境：Apache(1.3.12及以上)、Php(5.3.0及以上)、Php扩展(gd & bcmath & ctype & libXML & xmlreader & xmlwriter & session & sockets & mbstring & gettext...)
数据库:
MySQL：5.0.3及以上
Oracle：10g及以上
PostgreSQL：8.1及以上
#### <font color = "blue">Zabbix 安装</font><br>
##### Server端:
1. <b>1.更新软件源</b>
`$ rpm -ivh http://repo.zabbix.com/zabbix/3.4/rhel/7/x86_64/zabbix-release-3.4-1.el7.centos.noarch.rpm`
2. <b>2.或者下载后本地解压</b>
`$  rpm -ivh zabbix-release-3.4-1.el7.centos.noarch.rpm `
查看/etc/yum.repos.d中有没有zabbix.repo
3. <b>3.安装Zabbix-Server、mariadb数据库支持</b>
`$ yum install -y zabbix-server zabbix-get mariadb-server `
4. <b>4.检测是否安装成功</b>
`$ rpm -ql zabbix-server-mysql`
`$ rpm -ql | grep zabbix`
5. <b>5.导出数据库 </b>
`$ cp /usr/share/doc/zabbix-server-mysql-3.4.14/create.sql.gz /root/Desktop/`
解压
`gunzip /root/Desktop/create.sql.gz`
6. <b>6.开启数据库服务</b>
将数据库服务设置为开机启动
`$ systemctl enable mariadb.service `
启动数据库服务
`$ systemctl start mariadb.service `
7. <b>7.配置数据库</b>
启动数据库
`$ mysql -uroot -p`
建表
`mariadb-> create database zabbix charset 'utf8';`
创建用户
`mariadb-> grant all on zabbix.* to zabbix@'localhost' identified by 'redhat';`
刷新
`mariadb-> flush privileges;`
导入数据表
`$ mysql -uroot -p zabbix < /root/Desktop/create.sql`
8. <b>8.配置config文件</b>
`$  vim /etc/zabbix/zabbix_server.conf`

+ (1)修改内容：
> 12行  ListenPort=10051 #监听端口
> 19行  SourceIP=192.168.142.130  #设为服务器ip地址
> 38行  LogFile=/var/log/zabbix/zabbix_server.log
> 49行  LogFileSize=10
> 72行  PidFile=/var/run/zabbix/zabbix_server.pid
> 82行  SocketDir=/var/run/zabbix
> 91行  DBHost=localhost #因为此次实验数据库就装在服务器端，否则应设为数据库服务器的ip地址
> 117行 DBUser=zabbix
> 101行 DBName=zabbix
> 125行 DBPassword=redhat
> 132行 DBSocket=/var/lib/mysql/mysql.sock
> 140行 DBPort=3306 
+ (2)重启服务：
 `$ systemctl restart zabbix-server.service`

9. <b>9.安装Web端</b>
`$ yum install -y zabbix-web zabbix-web-mysql httpd php php-mysql php-mbstring php-gd php-bcmath php-ldap php-xml`
修改/etc/php.ini配置文件
`$ vim /etc/php.ini` 
+ (1)修改内容--更改时区
> 878行 date.timezone =Asia/Shanghai #设置时区
+ (2)开启服务
`$ systemctl status httpd`
`$ systemctl start httpd`
+ (3)访问:
IP/zabbix
![](/img/4c06e311gy1fwzv5h8lvpj20qg0fqab7.jpg)
web界面初始化配置保存在/etc/zabbix/web/zabbix.conf.php
web登录界面 admin/zabbix

10. <b>10.注意</b>
+ (1)关闭selinux
`$ getenforce`
`$ vim /etc/sysconfig/selinux` 
将其改为disabled
+ (2)关闭防火墙
`$ systemctl status firewalld.service`
`$ systemctl stop firewalld.service`
`$ systemctl disable firewalld.service`


##### Client端:
1. <b>1.安装Zabbix-Agent</b>
`$ rpm -ivh http://repo.zabbix.com/zabbix/3.4/rhel/7/x86_64/zabbix-release-3.4-1.el7.centos.noarch.rpm`
`$ yum install -y zabbix-agent zabbix-sender`
2. <b>2.配置文件</b>
`$ vim /etc/zabbix/zabbix_agentd.conf`
> 97行， Server=192.168.1.250
> 105行，ListenPort=10050
> 113行，ListenIP=192.168.1.131
> 138行，ServerActive=192.168.1.250
> 149行，Hostname=192.168.1.131
> 187行，RefreshActiveChecks=60
3. <b>3.启动服务</b>
`$ systemctl enable zabbix-agent.service`
`$ systemctl start zabbix-agent.service `
4. <b>中文界面乱码</b>
+ (1)将“控制面板”——“字体”——“微软雅黑”——“微软雅黑 常规” copy 到/usr/share/zabbix/fonts,后缀改成ttf
+ (2)`$ vim /usr/share/zabbix/include/defines.inc.php`
line54 define('ZBX_GRAPH_FONT_NAME', 'MSYH');
line103 define('ZBX_FONT_NAME', 'MSYH');
+ (3)刷新web界面


### <b>0x03\- \- Zabbix 使用<b>
	