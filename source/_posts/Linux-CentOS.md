---
title: Linux--CentOS
date: 2018-10-20 15：49
tags:
    - 
    - Linux
categories: Operation
thumbnail: /img/942bf6c451da81cb7e4194c25f66d016082431da.jpg

---

# Linux\-\-CentOS7.0

<i>2018-12-20</i>
趁着这一阶段系统性的把 Linux 的操作记录一下。
结合着 《鸟哥私房菜》 以及学习的知识进行一个系统性的总结。
关于 Linux，我目前的感受是----

+ 在没碰过Linux系统时，用Ubuntu桌面化都觉得：这是个什么鬼玩意？
+ 用了一阵之后，记不住杂多命令的我：为什么会有人觉得这种东西会比图形化的win好？
+ 习惯了以后：Linux 真香，来一口老弟，来一口。
总的来说Linux的管理和操作还是较清晰化和便捷的，至少对于我这种强迫症感觉文件的存放和分类都好清爽啊orz...

<i>2018-12-20</i>

贴一个有趣的讲解：  
[有趣的命令](http://mp.weixin.qq.com/s?__biz=MzA4ODIwMDUyNw==&mid=2652994636&idx=2&sn=1f3b66c94de485c35b717c2295a196d5&chksm=8bf8186cbc8f917a241b0724dffb618547326cda89199d7a4b8cd14326f987b5189ba9335139&mpshare=1&scene=24&srcid=#rd)  
[漫画讲解Linux内核](http://mp.weixin.qq.com/s?__biz=MzA4ODIwMDUyNw==&mid=2652994485&idx=1&sn=7999fb43eca8f3c1eadb1a02475aa4b5&chksm=8bf81f95bc8f96831c00e6d780c06c104b8316fd8696d7134222850dc5ba1d2380d558e33774&mpshare=1&scene=24&srcid=#rd")  

目录:
+ 0x01 Linux简介
+ 0x02 Linux简单命令
+ 0x03 用户和权限管理
+ 0x04 vim使用
+ 0x05 网络配置

## <b>0x01\- \- Linux简介<b>
首先简单的介绍一下Linux的发展历史，简单的...

Linux的前身是Unix老大哥。

在当时的年代，计算机是稀有的巨型资源，为了解决多用户，MIT在20世纪90年代开发了分时操作系统（CTSS），可以让大型主机通过提供多个终端（terminal）连入主机。这个系统在未来逐渐演化成了Multics。

在此之后，开发上述系统的人员中的Ken Thompson 在1969年开发出了Unix的原型，实现了Linux中最著名的一句话：万物皆文件。

1973: Unix正式诞生。这是基于C语言的第一个正式版本。

1993: Debian诞生

1994年3月，Linux1.0发布，代码量17万行，当时是按照完全自由免费的协议发布，随后正式采用GPL协议。

1996年6月，Linux 2.0内核发布，此内核有大约40万行代码，并可以支持多个处理器。此时的Linux 已经进入了实用阶段，全球大约有350万人使用。

2004：Ubuntu诞生--版本号采用年份+月份的格式（如04.10，即Ubuntu2004.10版本），每半年就发行一个版本，其中只有2006.04因为发行LTS（long term support）版本而进行了跳票。

Linux是开源的Unix系统，可免费使用和传播。

一般学习 Linux，都要多多少少的夹杂一些硬件和内核的知识。对于硬件知识总觉得有些无聊...这里记一下老师推荐的一本关于内核的书 《深入理解Linux内核》。希望自己在对于基本操作熟练了以后能够继续去深读与研究。

那么到底什么是Linux--我也说不出来，靠着万能的搜索引擎给出一组定义：Linux是一套免费使用和自由传播的类Unix操作系统，是一个基于POSIX和UNIX的多用户、多任务、支持多线程和多CPU的操作系统。Linux继承了Unix以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。

对于操作系统有一定了解的话，大致的将Linux可以看做是内核与系统调用的两层。对于不同架构的CPU，其功能函数也不相同。

因此，对于不同CPU内核架构，Linux可以分为：x86系列，i386系列,arm系列等等......

说到分类，在Linux中还存在着两个派系：Redhat的红帽系列和Ubuntu系列。对于这两者的区别：Ubuntu更适合新手，其桌面化的GUI模式对新手比较友好；而Redhat更多的应用于企业级服务器。
更多的来说，这二者的内核差距并不是很大，最大的区别也就是安装包的管理上，Ubuntu使用的是基于Debian的deb包，而Redhat使用的是自己研发的yum管理。

<b>总结一下：</b>
1. 1.Linux根据内核分类：i386,x86,arm;
     根据distrabution分类：Redhat,Debian。
2. 2.Linux的优点：开源免费，消耗资源少，安全性高等等。

## <b>0x02\- \- Linux 的简单操作<b>
打开一台Linux的机器，我们都需要做什么？或者是能够做什么呢？

贴一个关于Linux命令的网址：[man](http://man.linuxde.net/)
同时也可以使用自带的手册：man+[your commoand]查看命令帮助。

<b>几个快捷键</b>：

| 快捷键组合 | 功能 | 
| :-   | :-  |
|ctrl + shift + c | 鼠标选中后复制 |
|ctrl + shift + v  |  鼠标选中后粘贴 |
|ctrl + shift + t | 打开另一个命令行窗口 |
|ctrl + c| 强制终止 |
|ctrl + d|离开当前界面(EOF)|
|alt + 窗口号| 在窗口之间切换 |
|ctrl + a | 光标跳转到命令行的行首 |
|ctrl + e| 光标跳转到命令行的行尾|
|上下方向键|历史命令|

熟悉了几个操作之后，我们打开终端：
![](/img/006IjVYfgy1fydbmxztwnj30kg0bhwgb.jpg)
(1)最外围的方括号是固定的
(2)dvk表示当前登录操作系统的用户名
(3)@符号，固定格式
(4)localhost表示当前系统的FQDN名称的主机名部分
(5)\~表示当前用户所在目录层级的位置
(6)$号，代表的是其他普通用户，如果是root，会变成#符号

<b>清屏</b>：clear

<b>查看自己当前所处位置</b>：pwd
pwd命令显示的是绝对路径：
(1)绝对路径：就是按照目录树的层次结构，从根目录依次往下写路径的方式
(2)相对路径：就是相对于当前位置的路径表达方式

<b>获取主机名</b>：hostname
如何设置主机名
(1)临时设置主机名
hostname [yourname]
这样设置的主机名在重启后会被重置掉
(2)永久设置主机名
hostnamectl set-hostname [yourname]
或是修改文件 /etc/sysconfig/network
以及 /etc/hosts 两个文件可以实现。

<b>路径目录切换</b>：cd

cd + 目标路径（绝对路径/相对路径写法）
cd - 返回上次所在路径
cd ~ 跳转到当前登录用户的家目录
cd .. 返回上一层

<b>创建文件、文件夹</b>：
(1)创建一个目录（文件夹）
mkdir + 创建对象的路径（绝对路径/相对路径写法）
(2)创建一个普通文件
touch + 创建对象的路径（绝对路径/相对路径）
(3)删除一个目录（文件夹）
rmdir + 删除对象的路径（绝对路径/相对路径），弃之不用
rm -r + 删除对象的路径（绝对路径/相对路径）
rm -rf + 删除对象的路径（绝对路径/相对路径），表示强制递归删除
(4)删除一个普通文件
rm + 删除对象的路径（绝对路径/相对路径），可选用-rf参数

<b>拷贝、粘贴、重命名</b>：
cp /root/anaconda-ks.cfg /root/Desktop/		拷贝
cp /root/anaconda-ks.cfg /root/Desktop/xxx.txt	拷贝的同时重命名
mv /root/Desktop/anaconda-ks.cfg /root/Desktop/yyy.txt	重命名
/root/anaconda-ks.cfg /root/Desktop/		剪切
mv /root/anaconda-ks.cfg /root/Desktop/xxx.txt	剪切的同时重命名

<b>查看目录下的文件</b>：
ls + [查看对象路径]  类似windows中的大图标方式查看，只看到文件名
ls -l [查看对象路径] 类似windows中详细信息方式查看，看到文件名，创建者等
ls -al [查看对象路径] 可看到对象路径下的所有文件
.	表示当前路径
..	表示上层路径

<b>查看文件</b>：
cat /root/anaconda-ks.cfg	一次性将对象内容读出
more /root/anaconda-ks.cfg	查看对象的路径	将对象内容读出，并逐屏展示，只能向下不能向上
less /root/anaconda-ks.cfg	查看对象的路径	将对象内容如初，并逐屏展示，可向上向下，q退出
tail /root/anaconda-ks.cfg
tail -n 5 /root/anaconda-ks.cfg
head /root/anaconda-ks.cfg   查看文件的头部，默认前十行
head -n 5 /root/anaconda-ks.cfg

<b>显示时间</b>：date

<b>日历</b>：cal

<b>简要查询</b>：wahtis+[your command]

<b>切换工作空间</b>：ctrl+F1-F6

## <b>0x03\- \- 用户和权限管理<b>
Linux 支持多用户、多任务环境。

### <font color = "LightSkyBlue">用户</font><br>
<b>创建用户</b>
useradd + username
普通用户默认的家目录在/home/username
useradd -u 5000 username创建用户时指定用户的uid
useradd -g groupname username	创建用户时同时指定用户的所属组
useradd -G groupname1,groupname2 username 创建用户时同时执行用户所属哪几个组

<b>增加密码</b>
passwd username

<b>删除用户</b>
userdel + username	删除用户的登录信息（用户/密码）
这样会发现在home目录下依旧存留着删除用户的文件夹
userdel -r username	彻底删除用户信息

<b>创建用户组</b>
groupadd + CCIE
groupadd -g 10000 LINUX 创建组的同时指定组ID

<b>删除用户组</b>
groupdel CCIE

<b>查看用户信息</b>
id + username

<b>用户信息文件</b>
/etc/passwd 和 /etc/shadow

![](/img/006IjVYfgy1fydczrvejfj30hg092td5.jpg)

其格式：$id$salt$encrypted

1	MD5

2a	Blowfish(not in mainline glibc;added in some Linux distribution)

5	SHA-256(since glibc 2.7)

6	SHA-512(since glibc 2.7)

修改日期：这个是表明上一次修改密码的日期与1970-1-1相距的天数密码不可改的天数：假如这个数字是8，则8天内不可改密码，如果是0，则随时可以改。
密码需要修改的期限：如果是99999则永远不用改。如果是其其他数字比如12345，那么必须在距离1970-1-1的12345天内修改密码，否则密码失效。
修改期限前N天发出警告：比如你在第五条规定今年6月20号规定密码必须被修改，系统会从距离6-20号的N天前向对应的用户发出警告。
密码过期的宽限：假设这个数字被设定为M，那么帐号过期的M天内修改密码是可以修改的，改了之后账户可以继续使用。
帐号失效日期：假设这个日期为X，与第三条一样，X表示的日期依然是1970-1-1相距的天数，过了X之后，帐号失效。
保留：被保留项，暂时还没有被用上。

<b>用户组信息文件</b>
/etc/group

<b>切换用户</b>

su -username
退出用户/注销：exit

### <font color = "LightSkyBlue">权限</font><br>
<b>文件权限</b>
ls -l (等于ll)

![](/img/006IjVYfgy1fydd7un284j30tk0fgwkj.jpg)
前部分显示的即为文件权限：

![](/img/006IjVYfgy1fydd964r0rj30l40caju3.jpg)

d:目录类型的文件
-:普通文件
l:连接文件
b:块文件

r:读，数学值为4
w:写，数学值为2
x:执行，数学值为1，针对目录，x是表示是否可进入

rwx 	rwx 	rwx
user	group	other

<b>修改文件权限</b>

`# chmod u-w /root/Desktop/file-1`
`# chmod u+w /root/Desktop/file-1`
`# chmod g-x /root/Desktop/file-1`
`# chmod o-x /root/Desktop/file-1`

`# chmod 577 /root/Desktop/file-1`
`# chmod 767 /root/Desktop/file-1`
`# cmmod 776 /root/Desktop/file-1`

<b>修改文件所有者/所属组</b>

`# chown student file-1 `		将文件的所有者修改为student
`# chgrp harry file-1	`	将文件的所属组修改为harry
`# chown student:harry file-1	`一次性同时修改文件所有者和所属组

<b>umask值</b>
创建一个文件时，文件的默认权限是由创建它们的进程设置。如，root用户通过touch创建的文件的权限为644，普通用户通过touch创建的文件的权限为664，root用户和普通用户创建的目录的权限为755。这些默认权限是由umask值控制。

获取当前环境用户的umask值：
`# umask`
所有普通用户umask值的设置
`# vim /etc/profile`
`# vim /etc/bashrc`

<b>特殊权限</b>
1.suid(set uid)
(1)含义
只对文件有效，对目录无效。文件设置了suid后，其他用户执行该文件时，是以文件owner的身份来执行该文件。

(2)示例
Linux系统中一切皆文件，调用touch命令执行创建文件操作时，是调用touch这个可执行文件来创建文件。
`# which touch`
/usr/bin/touch
`# ll /usr/bin/touch `
-rwxr-xr-x. 1 root root 62432 Nov 20  2015 /usr/bin/touch

针对/usr/bin/touch这个可执行文件，所有者所属组和其他用户均有执行权限，即任何可登录系统的用户均可调用touch命令创建文件，且默认情况下“谁创建谁拥有”
`# su - harry`
`$ touch file-1`
`$ ll`
-rw-rw-r--. 1 harry harry  0 Nov 26 10:01 file-1

设置/usr/bin/touch这个可执行文件的suid位
`# chmod u+s /usr/bin/touch `
`# ll /usr/bin/touch `
-rwsr-xr-x. 1 root root 62432 Nov 20  2015 /usr/bin/touch

/usr/bin/touch被设置了suid位后，harry用户再次调用touch创建文件
`# su - harry`
`$ touch file-2`
`$ ll`
-rw-rw-r--. 1 harry harry 0 Nov 26 10:01 file-1
-rw-rw-r--. 1 root  harry 0 Nov 26 10:05 file-2

(3)设置suid位
`# chmod u+s filename`
`# chmod 4755 filename`

(4)应用场景
系统中任何用户都允许调用passwd命令修改自己的密码，修改密码时需要修改/etc/passwd /etc/shadow两个文件，但这两个文件的权限不允许普通用户修改，因此针对passwd这个可执行文件设置了suid
`# ll /etc/passwd /etc/shadow`
-rw-r--r--. 1 root root 2538 Nov 25 11:35 /etc/passwd
----------. 1 root root 1716 Nov 25 13:45 /etc/shadow
`# which passwd`
/usr/bin/passwd
`# ll /usr/bin/passwd `
-rwsr-xr-x. 1 root root 27832 Jun 10  2014 /usr/bin/passwd

(5)总结
从系统安全角度出发，对于有些文件只允许管理员进行修改，但普通用于又需要通过某些进程命令访问修改，此时可以设置这些文件针对普通用户没有w和x权限，同时设置访问文件的进程命令的suid

2.sgid(set gid)
(1)含义
针对文件：文件设置了sgid后，其他用户执行该文件时，是以文件group的身份来执行该文件。
针对目录：目录设置了sgid后，用户在目录中新建的文件所属组将被自动设置为该目录的组。

(2)示例一，针对文件，以/usr/bin/touch这个可执行文件为例
未设置sgid之前，/usr/bin/touch这个可执行文件的权限状态
`# ll /usr/bin/touch `
-rwxr-xr-x. 1 root root 62432 Nov 20  2015 /usr/bin/touch

切换到harry用户创建file-1，其所有者为harry，所属组为harry
`# su - harry`
`$ touch file-1`
`$ ll`
-rw-rw-r--. 1 harry harry 0 Nov 26 11:02 file-1

以root用户设置/usr/bin/touch的sgid位
`# chmod g+s /usr/bin/touch `
`# ll /usr/bin/touch `
-rwxr-sr-x. 1 root root 62432 Nov 20  2015 /usr/bin/touch

以harry用户再创建一个文件file-2，file-2文件被创建时是以root组身份创建，因此file-2的所属组为root
`# su - harry`
`$ touch file-2`
`$ ll`
-rw-rw-r--. 1 harry harry 0 Nov 26 11:02 file-1
-rw-rw-r--. 1 harry root  0 Nov 26 11:02 file-2


(3)示例二，针对目录
root用户创建一个共享目录，并修改权限使得普通用户具有写权限
`# mkdir /public`
`# ll -d /public`
drwxr-xr-x. 2 root root 6 Nov 26 11:11 /public
`# chmod 777 /public`
`# ll -d /public`
drwxrwxrwx. 2 root root 6 Nov 26 11:11 /public

未设置sgid情况下，harry用户创建的目录，其所有者和所属组均为harry
`# su - harry`
`$ mkdir /public/dir-harry-1`
`$ ll -d /public/dir-harry-1/`
drwxrwxr-x. 2 harry harry 6 Nov 26 11:13 /public/dir-harry-1/

使用root用户设置/public的sgid位
`# chmod g+s /public`
`# ll -d /public`
drwxrwsrwx. 4 root root 42 Nov 26 11:15 /public

设置了sgid后，再使用harry用户创建目录，其所有者依然为harry，但所属组与/public所属组一致
`# su - harry`
`$ mkdir /public/dir-harry-2`
`$ ll /public`
drwxrwxr-x. 2 harry harry 6 Nov 26 11:13 dir-harry-1
drwxrwsr-x. 2 harry root  6 Nov 26 11:15 dir-harry-2

(4)设置sgid位
`# chmod g+s filename`
`# chmod 2755 filename`

3.sticky
(1)含义
只对目录有效，对文件无效。目录设置了sticky后，对目录有写权限的用户只能删除其所拥有的文件，无法删除其他用户所拥有的文件，root用户除外。

(2)示例
未设置sticky时，权限足够的情况下，harry用户可删除root用户的文件
`# ll -d /public`
drwxrwxrwx. 2 root root 6 Nov 26 11:43 /public
`# touch /public/file-root`

`# su - harry`
`$ rm -rf /public/file-root `

设置sticky时，权限足够的情况下，harry用户无法删除root用户的文件
`# chmod o+t /public/`
`# ll -d /public/`
drwxrwxrwt. 2 root root 6 Nov 26 11:44 /public/
`# touch /public/file-root`

`# su - harry`
`$ rm -rf /public/file-root `
rm: cannot remove ‘/public/file-root’: Operation not permitted


4.设置suid sgid sticky后，代表文件权限的9位字符的变化
suid：显示在文件user的x位，若文件user有x权限，则显示s；若没有x权限，则显示S
sgid：显示在文件group的x位，若文件group有x权限，则显示s；若没有x权限，则显示S
sticky：显示在文件other的x位，若文件other有x权限，则显示t；若没有x权限，则显示T

<b>ACL权限</b>
1.获取文件或目录的ACL信息
`# ll /public/file-root `
-rw-r--r--. 1 root root 0 Nov 26 11:44 /public/file-root
`# getfacl /public/file-root `
getfacl: Removing leading '/' from absolute path names
\# file: public/file-root
\# owner: root
\# group: root
user::rw-
group::r--
other::r--

2.设置ACL
针对file-root文件，other用户没有写权限，设置harry这个other类的用户可读可写可执行
`# setfacl -m u:harry:rwx /public/file-root` 
`# ll /public/file-root `
-rw-rwxr--+ 1 root root 0 Nov 26 12:21 /public/file-root
`# getfacl /public/file-root `
getfacl: Removing leading '/' from absolute path names
\# file: public/file-root
\# owner: root
\# group: root
user::rw-
user:harry:rwx
group::r--
mask::rwx
other::r--

3.ACL中的mask值
(1)mask值限制了ACL中的用户或组的最大权限
(2)默认情况下，mask值跟随ACL条目中最大的权限，确保相应的权限设置能被顺利实现（重新计算mask）
(3)每次设置一个新ACL条目时，如果当前mask所表示的权限小于新条目的设置权限，则mask跟随新条目的权限，反之则保持不变
(4)在设置ACL条目时，可加上-n参数让mask值不随新条目的权限增长变化

4.默认ACL，目录可这只默认ACL，这些ACL将由所有子文件自动继承
`# setfacl -m d:u:harry:rwx dir-1`

5.删除ACL
-x, --remove=acl        remove entries from the ACL(s) of file(s)
-b, --remove-all        remove all extended ACL entries
-k, --remove-default    remove the default ACL

## <b>0x04\- \- Vim 使用<b>
`# vim /root/Desktop/file-1`
(1)阅读模式:只能阅读
(2)阅读模式进入编辑模式:
   i(当前光标所在处插入) 
   a(当前光标所在处后一个字符插入) 
   o(当前光标所在行的下一行插入) 
   O(当前光标所在行的上一行插入)
(3)从编辑模式退出到阅读模式:Esc键
(4)撤销:在阅读模式下按u键
(5)复制粘贴:阅读模式下，光标移动到需要复制的行，yy复制，p粘贴。复制光标所在行往下2行（包含光标所在行），2y，p
(6)删除单个字符:阅读模式下，x键往后删一个字符，X键往前删一个字符
(7)删除光标位置到行尾内容，D键
(8)剪切整行，dd剪切光标所在行，p粘贴
(9)删除整行，dd剪切完了不粘贴
(10)删除可知的数行，数字加dd，如：2dd，删除光标所在行及其下一行
(11)删除未知的数行，通常加一个超大的数字如，10000dd
(12)临时为文件加上行号，阅读模式下，:set nu，取消行号:set nonu
(13)可以为vim编辑器设置永久行号，vim ~/.vimrc 写入set nu
(14)设置tab，vim ~/.vimrc 写入set ts=2
(15)跳转到行首行尾，阅读模式下，直接到行尾，G键，直接到行首，gg键
(16)具体跳转到某行，阅读模式下，行号加G，或者，:行号
(17)行选中，阅读模式下，v键，配合方向键调整
(18)矩形选中，阅读模式下，Ctrl + v,配合方向键调整选中
(19)替换某个字符，阅读模式下，调整光标到需要替换的位置，按r键，然后输入需要替换的字符
(20)查找,阅读模式下，/被查找的内容,所有符合查找内容的均被高亮显示，n键将光标转移至下一个匹配项，N键将光标转移至上一个匹配项
(21)查找替换,阅读模式下，:%s/被替换的内容/替换为的内容，注意默认只替换每一行第一个被匹配的内容，如需全文替换则%s/被替换的内容/替换为的内容/g
(22)保存，退出
:q,不保存修改而退出
:q!,不保存修改而强制退出
:w,保存不退出
:wq,保存退出
:wq!，保存强制退出
:x,执行，在vim中就是保存退出

## <b>0x05\- \- 网络配置<b>
(1)ifconfig或者ifconfig -a命令用来查看硬件接口信息

(2)每一个网络接口的配置信息是以单独文件形式存在，存放在/etc/sysconfig/network-scripts/

(3)`#vim ifcfg-eno16777736`
>TYPE=Ethernet	网络类型
>BOOTPROTO=dhcp	获取IP的方式 dhcp/none/static
>NAME=eno16777736	设备别名
>DEVICE=eno16777736	设备名称
>UUID=2cb9c49c-e534-49a5-ab2b-3d9fb2d36a77	系统中该设备的唯一编号
>ONBOOT=no	开机启动/随服务启动

(4)手工配置网络
`# systemctl stop NetworkManager	`  关闭NM工具
`# systemctl disable NetworkManager  `让NM工具重启不启动
`#systemctl status network`	  检查一下提供网络服务的进程是否running
`# vim /etc/sysconfig/network-scripts/ifcfg-eno16777736`

>TYPE=Ethernet
>BOOTPROTO=static
>NAME=eno16777736
>UUID=2cb9c49c-e534-49a5-ab2b-3d9fb2d36a77
>DEVICE=eno16777736
>ONBOOT=yes
>IPADDR=192.168.1.100
>NETMASK=255.255.255.0
>PREFIX=24
>GATEWAY=192.168.1.1

`# vim /etc/resolv.conf`		配置DNS
`# nameserver 192.168.1.1`

`# systemctl restart network	`重新启动网络服务
`# ifdown eno16777736	`关闭接口
`# ifup eno16777736	`开启接口


(5)通过NetworkManager工具来管理网络
`# systemctl enable NetworkManager`
`# systemctl start NetworkManager`
`# nmcli connection show `查看当前网络连接
`# nmcli connection add con-name port0 ifname eno16777736 autoconnect yes type ethernet save yes`
`# nmcli connection modify port0 ipv4.method auto	`配置IP地址的获取方式为dhcp
`# nmcli connection up port0`
`# nmcli connection modify port0 ipv4.addresses 192.168.1.200/24 ipv4.gateway 192.168.1.1 ipv4.dns 192.168.1.1 ipv4.method manual` 配置IP地址的获取方式为静态IP
`# nmcli connection up port0`

(6)更改网卡名称:
`$ vim /etc/sysconfig/network-scripts/ifcfg-****`
将 NAME 值设置为 eth0
将 DEVICE 值设置为 eth0
保存退出，并重命名该文件为ifcfg-eth0
`# mv /etc/sysconfig/network-scripts/ifcfg-**** ifcfg-eth0`
修改可预测命名规则:
`# vim /etc/default/grub`
在GRUB_CMDLINE_LINUX 内添加内核参数"net.ifnames=0 biosdevname=0"
重新生成GRUB配置并更新内核参数
`# grub2-mkconfig -o /boot/grub2/grub.cfg`
重启即可
`# reboot `

## <b>0x06\- \- 环境变量<b>
1.定义
一般是指在操作系统中用来指定操作系统运行环境的一些参数，如系统使用哪种shell，显示色彩，使用的语言和字符集等。

2.环境变量分类
(1).当前用户的环境变量（人的身高、体重、血压）
(2).当前用户使用的shell的变量（锻炼使用的跑步机可调节的速度范围和坡度范围）
(3).导出成用户变量的shell变量（一定时间内人跑步会使用固定的坡度和速度）

3.输出所有环境变量
env：显示当前用户的环境变量
set：显示当前shell的变量，包括当前用户的变量
export：显示当前导出成用户变量的shell变量。
每个shell有自己特有的变量（set）显示的变量，和用户变量是不同的，当前用户变量和使用什么shell无关，无论使用什么shell都在，比如HOME,SHELL等这些变量，但shell自己的变量不同shell是不同的，比如BASH_VERSION，这些变量只有set才会显示，是bash特有的，export不加参数的时候，显示哪些变量被导出成了用户变量，因为一个shell自己的变量可以通过export “导出”变成一个用户变量。

4.常用环境变量
PATH：命令查找路径		echo $PATH
USER：当前登录用户		echo $USER
HOSTNAME：系统hostname		echo $HOSTNAME
HISTSIZE：历史命令保留数值	echo $HISTSIZE

5.存放环境变量的文件
(1)/etc/profile：用户登录Linux系统或使用su -命令切换到另一个用户时，该文件为用户设置环境信息,该文件被执行，并从/etc/profile.d目录的配置文件中搜集shell的设置
(2)/etc/profile.d：目录中存放的是一些脚本，其中包括了颜色、语言、less、vim及which等命令的一些附加设置。这些脚本文件之所以能够被自动执行，是因为在/etc/profile 中使用一个for循环语句来调用这些脚本。而这些脚本文件是用来设置一些变量和运行一些初始化过程的。
(3)/etc/bashrc：为每一个运行bash shell的用户执行此文件，当bash shell被打开时,该文件被读取
验证：
vim /etc/bashrc
echo "hello" >> /tmp/file.txt
每打开一个shell窗口，就会执行一次/etc/bashrc文件

(4)~/.bash_profile：每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次，默认情况下,他设置一些环境变量,执行用户的.bashrc文件。

(5)~/.bashrc：该文件存储的是专属于个人bash shell的信息，当登录时以及每次打开一个新的shell时，执行这个文件。在这个文件里可以自定义用户专属的个人信息。

## <b>0x07\- \- 软件包的安装<b>
因使用的是centos，这里软件包管理软件使用rpm以及yum

一、rpm包
1.安装rpm -ivh vsftpd-3.0.2-10.el7.x86_64.rpm
2.查询系统中所有已安装的rpm包rpm -qa
3.查询某个rpm包有没有安装rpm -qa |grep vsftpd
4.查询某个已安装软件包包含哪些文件rpm -ql vsftpd
5.删除某个软件包rpm -e vsftpd
6.软件包升级rpm -Uvh vsftpd-3.2.2-10.el7.x86_64.rpm
注意点：在升级内核的时候
补充：内核版本查看uname -r。不同版本的内核在系统中可以共存，并且正常情况下，都可以用来启动，在做 内核升级的时候，基本上是采用rpm -ivh kernel-3.20.0-327.el7.x86_64.rpm，其原因主要是rpm -Uvh相当于安装新内核删除旧内核，而rpm -ivh是纯粹安装新内核，如此如果新内核有问题，还能够从旧内核启动

二、源码包
1.压缩型源码包，xxx.tar.gz，xxx.tar.bz2，xxx.tar.xz
（1）解压: tar -x[alpha]vf xxx.tar.[alpha]z
gz: [alpha] = z
bz2：[alpha] = j
xz：[alpha] = J
压缩/解压缩考验的是CPU和硬盘的性能

（2）配置安装环境
tar -x[alpha]vf xxx.tar.[alpha]z	解压之后在压缩包所在的目录下生成一个同名的文件夹，需要进入到该文件夹中进行配置安装环境，一般情况下该文件夹下有一个configure的脚本，执行该脚本 ./configure，常用默认安装路径（/usr/bin，/usr/sbin，/usr/local/bin，/usr/local/sbin）配置也有参数，常用的参数--prefix=/opt，表示未来将/opt目录作为安装路径，其他参数参见configure文件

（3）编译（源码编译生成可执行文件）
make，可选参数为-j，-j表示采用多核进编译，例如make -j 8，采用8个核同时进行编译，加快速度。编译考量的是CPU性能

（4）安装（将软件所需的各种文件及权限放入该放入的地方）
make install，考量的是磁盘性能

2.rpm型源码包，命令xxx.src.rpm
1.有没有依赖性？大部分情况不具有依赖性
2.安装 rpm -ivh xxx.src.rpm，其实这里的rpm -ivh 与真正的rpm包的rpm -ivh含义可能不同，这里rpm -ivh更接近“解压”的含义
3.安装完成后一定会生成2个文件，一个是xxx.tar.[alpha]z，另一个是xxx.spec
4.利用rpmbuild工具根据xxx.spec文件对xxx.tar.[alpha]z进行编译，最终会生成xxx.rpm极其依赖包
5.利用rpm -ivh命令对最终生成的rpm包进行安装

针对1、2这两种类型的源码包，删除是比较麻烦的

三、yum
yum全称是Yellow Package Manager，是针对rpm包的依赖缺点，用来解决包依赖关系的工具，要使用yum需做如下事情：
1.要提供软件包来源。（本地（ISO镜像文件），来自于局域网/互联网上的yum源）
2.告知yum包管理器，软件包来源的位置。这点主要是通过配置文件编写的形式实现

如下选择来自互联网的源，则：
1.必须能联网
2.上述第二点就无需设置，其原因主要是系统安装完成后，已经生成相应的配置文件，路径是/etc/yum.repos.d，该目录下有诸多以.repo结尾的文件，就是指向互联网yum源的配置文件

（1）列出yum源的可用软件包：yum list available
（2）清除yum包管理器的缓存：yum clean all
（3）查询现有的yum源上是否有某款软件：yum search gcc
（4）安装gcc：yum install gcc [-y]，-y参数表示自动应答yum的提问，yum的方式安装软件时会自动解析软件所依赖的包，并一并装上这些依赖包
（5）删除：yum remove gcc [-y]，yum也会解析被卸载的包的依赖关系，在正确处理依赖关系后，yum只会删除需要卸载的软件包，而不会删除曾经安装它时那些因依赖而装上的软件包
（6）下载docker软件及其依赖软件：yumdownloader docker --resolve --destdir=/root/Desktop/packages
     制作“索引”的过程 createrepo /root/Desktop/packages
     编辑配置文件告知yum包管理器软件仓库的位置 vim /etc/yum.repos.d/docker.repo
     [docker]
     name=docker for Centos7
     baseurl=file:///root/Desktop/packages
     enabled=1
     gpgcheck=1
     gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
（7）将ISO镜像文件作为本地yum源







