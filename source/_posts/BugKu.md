---
title: BugKu
date: 2019-02-26 22:20:40
tags:
	- CTF
	- WP
categories: CTF
thumbnail: https://blog.dvkunion.cn/img/1484628381608.jpg

---

# BugKu

### <b>0x00\- \- 前言</b>  

久仰BugKu大名，这里记一下Bugku的题目。

### <b>0x01\- \- Web</b>

<b>01-web2</b>

打开是加速的滑稽js....
F12得到key,一样的签到题套路

<b>02-计算器</b>

打开是一个验证码一样的计算图片，但是一般的结果都是两位数以上而输入框只能输入1位。
右键审查元素直接修改html属性即可。

<b>03-web基础$\_GET</b>

打开是一段源码。
要求GET方法获得一个what变量的值为flag。
url添加?what=flag即可。

<b>04-web基础$\_POST</b>

同上题目，方法变为了POST。
上hackbar直接可以拿到flag。

<b>05-矛盾</b>

又是一段php。
GET得到num,要求num是非数字(!is_numeric)但是只有num==1才能够输出flag。
这里num==1是弱类型，所以我们只要输入一个带有字母且开头为1的字符串即可。

<b>06-web3</b>

打开疯狂js弹窗。
两种方式:第一禁用浏览器js,F12即可看到flag的注释。
第二直接view-source，看到注释掉的html编码的flag。

<b>07-域名解析</b>

按照题目提示修改host文件(Linux:/etc/hosts Win:C:\windows\system32\drivers\etc)即可。
大佬说BP改一下host也可以实现。

<b>08-你必须让他停下</b>

打开题目1s一次自动刷新。
同样禁用js手动刷出flag即可。
BP抓包后手动GO几次也能获得。

<b>09-本地包含</b>

打开只有一个123,按照题目提示是一个LIF。
直接盲猜flag.php即可。。。

>p.s:看了一下别人的wp发现原题好像不是这样的，，，给了一个源码...
include "flag.php"; 
$a = @$\_REQUEST['hello']; 
eval( "var\_dump($a);"); 
show\_source(\_\_FILE\_\_); 


<b>10-变量1</b>

这题没做出来，缺少了对php 可变变量的知识。
题目是一段源码，提示flag在一个变量中，要求GET一个arg值，arg是一个可变变量。
让arg=GLOBALS输出全局变量即可。

<b>11-web5</b>

打开有一个输入框，提示JSfuck，F12查看源码发现隐藏的jsfuck。
这里有一个坑点，F12看到的是省略后的代码，无法运行。
使用view-source查看源码，得到源码扔console台即可。

<b>12-头等舱</b>

。。。看到带有头、head的东西，直接F12条件反射network。
看请求包即可得到flag。

<b>13-网站被黑</b>

这题也搞了很久。。。题目提示是一个很没水平的东西???
做的时候因为打开后就没啥提示，没有啥思路。
扔扫描器扫去把，直接扫到了一个后台。
要输入密码。
没提示我上哪弄密码去。。。
继续扔工具爆破去吧。
得到密码拿到flag...

>的确很坑。


<b>14-管理员系统</b>

打开发现是一个登录窗口，F12发现一个base64注释。解出来是test123。
尝试admin登陆，结果有IP限制。
改xff即可得到flag。

<b>15-web4</b>

打开提示看看源码，F12启动。
看到一串js，都是%扔url解一下。
得到的是一个js函数。
有一个坑点，注意p1和p2的拼接部分插入了一段，所以密码应该是p1的结尾+插入部分+p2开头。

<b>16-flag在index里</b>

打开是一个触发连接。由题目提示flag在index里面，应该是让我们去查看index.php的内容。
点击click之后发现跳转的url是明显的符合LFI漏洞的形式。我们尝试去查看index.php但是没有显示出来。
尝试使用php://filter封装成base64进行查看。

`?file=php://filter/read=convert.base64-encode/resource=index.php`

直接base64解码得到flag。
这里一开始用的是php://input。查看到源码之后发现被过滤掉了input和../以及tp、data等关键词。

<b>17-输入密码查看flag</b>

打开提示是一个5位数字的密码。直接bp爆破。

<b>18-点击100万次</b>

这题做了一次又忘了...
有关js的题目也是没有条件反射。
点开是一个饼干...要你点击100万次就会得出flag。
F12 可以看到饼干计数的js代码。
js在计数的时候如果计数到了100万就会发出post请求。我们直接伪造这个请求即可。
得到flag。


<b>19-备份是个好习惯</b>

提示有备份。扫描扫出index.php.bak。
查看源码，要求得到key1和key2不相同但md5相同。md5判断处为弱类型，0e绕过。
有一个坑点，这里他使用str_replace把key替换成了空字符串。因此需要使用url编码进行绕过。

<b>20-成绩单</b>

打开发现一个输入框，输入id查询成绩。
fuzz发现存在sql注入漏洞。
走流程注入：
`1' order by 4 #`检测表单长度
`-1' union select 1,2,3,4 #`查看元素位置
`-1' union select 1,database(),user(),version() #`获取主要信息
`-1' union select 1,(select group_concat(table_name) from information_schema.tables where table_schema=database()),user(),version() #`得到表名
`-1' union select 1,(select * from fl4g),user(),version() #`直接查询表名得到flag。

>回数据库继续熟悉那张特殊的表

<b>21-秋名山老司机</b>

打开提示要求在2s内计算一个长串的表达式。
python写个eval脚本即可。
动手写一下吧...不然一直眼高手低。
。。。这么个东西也写了15多分钟。。。

```python
import requests

url='http://123.206.87.240:8002/qiumingshan/index.php'

s = requests.Session()
r = s.get(url)
express=r.text
express=express[159:]
rexp=''
for i in express:
	if i == '=':
		break
	else:
		rexp=rexp+i
print(rexp)
ans=eval(rexp)
r=s.post(url,data={'value':ans})
print(r.text)
```

<b>22-速度要快</b>

打开页面，抓包发现回复内容内包含flag字段，并且源码带有注释掉的提示:要求post一个margin的值。
对flag解码两次base64可以得到后面的几个数字，应该就是margin。
但是算出来了之后???要求我快点?
行吧...这个页面刷新一次就会更新一次那个flag的值...
正好趁着热乎...把上面的py代码在熟练一次吧。
注意requests必须使用session请求保持会话连接。

```python
import requests
import base64
url='http://123.206.87.240:8002/web6/index.php'

s = requests.Session()
r = s.get(url)
exp=r.headers['flag']
exp=exp[44:]
exp=base64.b64decode(exp)
exp=base64.b64decode(exp)
exp=exp.decode('utf-8')
r=s.post(url,data={'margin':exp})
print(r.text)
```
>ok,我的字符串操作是真的烂...

<b>23-cookies欺骗</b>

打开发现url参数filename存在一个base64的加密。解码为key.txt。是一串不

<b>24-never give up</b>

打开看到url参数以为是注入题目...结果没有反馈sql又不会了...
日常F12，得到提示。1p.html转向Bugku的论坛。
抓包看一下，发现是一个304 modified。
删去转304的请求语句If-Modified得到页面的源码，是一段js的代码。
里面有一个很长的变量word。并且在 outword()函数中进行了url解码。
手动url解码，得到另一段代码，是实现跳转的js以及注释掉的base64。
手动base64解码，又得到了一段php代码....
做到这里就想起来怎么做的了。。。这里很坑。
看到了一个flag的txt文档，试着访问一下就直接能够得到flag...
如果按照实际来做php审计的话，需要绕过下面几个函数：
stripos(字符串a，字符串b) 函数查找字符串b在字符串a中第一次出现的位置（不区分大小写）。

file_get_contents 将整个文件读入一个字符串

strlen() 函数返回字符串的长度

!$\_GET[‘id’]并且id==0：令id=%00或者令id=.字符串都可以绕过

substr() 函数返回字符串的一部分。 substr(string,start,length) ，length参数可选。如  substr($b,0,1)  就是在参数b里面 ，从0开始返回1个长度的字符串

eregi("111".substr($b,0,1),"1114")    就是判断"1114"这个字符串里面是否有符合"111".substr($b,0,1)这个规则的

这里被坑住了。一直在考虑如何寻找一个编码方式能让substr不识别但是eregi识别出来...
这里绕过eregi的方式是用%00截断，使得判断eregi("111","1114")成立。

payload:hello.php?id=0e123&a=php://input&b=%0023456 

<b>25-welcome to bugku</b>

一个经典的题目
打开提示我不是bugku的会员....
F12得到注释部分的源码提示。
按照源码要求一步一步的走吧...
第一个变量txt:考察php://input封装。
第二个变量file：考察php://filter封装，根据提示查看hint.php源码。
hint内存在一个flag的Class。
我们再查看index.php的源码...发现file直接被过滤了...所以我们不能直接读到flag.php
但是在后面有一个对password的序列化，结合hint内的class的内容，我们可以构造php反序列化payload。
`O:4:"Flag":1:{s:4:"file",s:8:"flag.php";}`
作为hint.php的参数进行传输。即可得到Flag

最后放一个payload:
`index.php?txt=php://input&file=hint.php&password=O:4:"Flag":1:{s:4:"file",s:8:"flag.php";}`

<b>26-过狗一句话</b>

这题已经被日掉了。。。不能做了
靠着广大网友的wp大概看一下题目。应该是给的一句话木马。传入参数s即可进行命令执行，寻找flag文件即可。

<b>27-字符?正则?</b>

<b>28-前女友</b>

...我不知道为什么这题我做了很久...还是后台更新过了...
就很不明白为什么一开始眼瞎的看不到F12源码中的一个提示txt连接。。。
查看txt得到提示代码...一个弱类型md5比较，加一个数组绕过strcmp函数。。。
...为什么第一次做的时候啥都没看到?

<b>29-login1</b>
提示sql约束攻击...
终于在寒假之后对常见的一些sql攻击有了一定的了解...回过来把这题做掉了。
按照提示我们使用Sq约束攻击，首先注册一个用户名为 amdin'# 的用户，设置密码后返回登录，在登陆时候使用admin的用户名和注册时候使用的密码。
登陆成功即可拿到flag。

<b>30-你从哪里来</b>

打开链接得到提示：我们是从Google来的吗？
修改referer得到Flag。
坑点：google用的是https协议...

<b>31-md5 collision</b>

这题bugku的意思应该是直接连接到南邮的题目。。。所以少了题目描述。。。
去查南邮的题目会发现给了你源码...只要输入等于他给的md5的值的a即可。。。
行吧...

<b>32-程序员本地网站</b>
要求从本地访问，修改x-forwarded-for即可。

<b>33-各种绕过</b>
php审计。
1.首先url编码id=margin
2.数组绕过uname和passwd的sha1加密


<b>34-web8</b>
依旧是php审计。
只要get的ac值和fn-php://input封装传输的值相同即可。

<b>35-细心</b>

题目提示变成admin。
但是打开看到的是一个404页面...
一开始以为是服务器炸了。
抓包看一下，没啥收获。
没办法，扫去吧。
扫到了一个robots.txt，得到提示：resusl.php
然后发现了下一步的提示：x参数要和password相同。。。
以为是什么骚操作绕过。。。结果直接盲猜x=admin即可。。。

<b>36-求getshell</b>
按照要求，需要上传一张image的php。
一开始以为是上传一句话菜刀...结果回显会默认把上传的文件转变成随机编码的jpg文件...
跟着大佬做...bp抓包之后将Content-Type: Multipart/form-data;像这样改成大写...这样可以过waf。
然后使用如下的后缀名php2, php3, php4, php5, phps, pht, phtm, phtml（php的别名）...并且将文件的Content-Type修改为image/jpg的格式。
即可得到flag。

<b>37-INSERT INTO注入</b>

题目给了源码。源码可以看到两个地方。  
1:ip的传入值和函数getip()有关，这个函数会将数据包中的HTTP_X_FORWARDED_FOR赋值给ip  
2:sql执行语句：insert into client_ip (ip) values ('$ip')

<b>38-这是一个神奇的登陆框</b>

熟悉了Sqlmap以后直接这题就跑出来了...工具真香。
Post提交的参数中admin_name参数存在注入。
直接爆表爆库跑出flag即可...

<b>39-多次</b>

<b>40-PHP_encrypt_1</b>




### <b>0x02\- \- Misc</b>

<b>01-签到题</b>

关注公众号即可

<b>02-这是一张单纯的图片</b>

给了张图片。隐写流程走一遍
hex打开发现结尾的html编码的Flag

<b>03-隐写</b>

CRC校验出现错误，调节高度位，得到flag

<b>04-telnet</b>

流量分析题，再根据题目提示，联想到Telnet是明文传输。
寻找telnet的登录密码。
懒得仔细看了...流量也很干净，直接追踪流看到了明文传输的密码得到flag。

<b>05-眼见非实(ISCCCTF)</b>

一个没有后缀名的文件,file查看文件类型也是zip
添加后缀名之后发现该压缩文件内有一个无法打开的docx文件
hex查文件头发现其实还是一个zip文件(office文档皆压缩)，再次修改文件后缀名...结果什么都没发现。
整理思路(查看wp)...
思路是对的，，，眼神不好使。。。flag在document里。。。

<b> 06-啊哒</b>

(终于遇到一个走流程的题了...)
压缩文件，解压出一个jpg。
binwalk 发现压缩包
foremost 提取压缩包
zip 打开压缩包发现flag.txt有密码
zip伪加密 尝试失败
crc爆破 22位爆破难度过高
整理思路(继续查看wp)...
行吧，还得去看图片的详细信息...得到一串奇怪的字符串
bp转一下ascii hex 得到解密密码。
拿到flag...

<b>07-又一张图片，还单纯吗</b>

(这次的确是一个走流程的题目了...)
jpg图片，直接formost即可得到flag...


<b>08-猜</b>

图片是一个缺了半张脸的女人，要求的flag是这个女人的名字的全拼写。
社工题，搜吧。
很容易搜到了相关连接。

<b>09-宽带信息泄露</b>

这个根据上一次安恒赛的一道题学习到的一个可以查看宽带备份文件密码的工具。
上工具读出来文件，找用户名即可。
文件仔细读一读救出来了。

<b>10-隐写2</b>

这次我记住了，这么嚣张的图片先从最简单的地方开始查起
文件属性直接看到hint:网络安全工作室在哪?
不知道，继续走流程
binwalk :发现zip
foremost :得到zip
然后得到 ：flag.rar和又一个提示文件。
提示文件说了三个人物和hint:斗地主。
...没猜出来(看了大佬的想法...键盘上的kqj分别对应键盘上的871...)
得到第三章图片,hex找到了flag。
提交出现问题，发下内部是base64加密，扔bp编码一下，得到真正的flag。

<b>11-多种方法解决</b>

提示我们去找二维码。
HEX发现提示：图片格式的base64加密的二维码
保存扫描一下得到flag。

<b>12-闪的好快</b>

一个闪烁的gif二维码，使用gif切割工具，
18张图片...一个图一个字母...
慢慢扫吧。

<b>13-come_game</b>


<b>14-白哥的鸽子</b>

一个jpg文件，先看一下图片是啥
是一只鸽子。。。


<b>15-Linux</b>

提示都是Linux了，先扔file看一下。
linux etx3文件，./无法执行。
尝试cat 一下直接拿到了flag。

<b>16-隐写3</b>

<b>就五层你能解开嘛</b>
提示很到位，一共五关。
第一关:crc32碰撞。.py脚本跑一下。得到解压密码:进入到了第二层。
第二关：维吉尼亚密码。



### <b>0x03\- \- Misc</b>