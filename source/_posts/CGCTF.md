---
title: CGCTF - 部分WP
date: 2019-01-21 14:51:53
tags:
	- CTF
	- WP
categories: CTF
thumbnail: https://blog.dvkunion.cn/img/1484628258199.jpg

---

# CGCTF

### <b>0x00\- \- 前言</b>
寒假也开始刷题了...从简单的南邮大佬开始刷起吧...

### <b>0x01\- \- WEB</b>

<b> 001 签到题</b>

页面询问 key在哪里 打开F12 html注释里得到flag

<b> 002 md5 collision </b>

明显的弱等于和md5 0e科学计数法漏洞
放一个payload :s1885207154a

<b> 003 签到2</b>

要求输入一个口令，却发现输入框限制比要求的少了一位，F12改maxlength即可

<b> 004 这题不是WEB</b>

找了一圈啥也没找到，最后下载那个动图扔HEX，图片最后即得Flag

<b> 005 层层递进 </b>

最喜欢的就是这道题
Bp爬一下这个题目，会发现四个页面，flag就隐藏在404页面的大段注释的js代码（藏头）

<b> 006 AAencode</b>

题目名字直接告诉你了，扔AAdecode解码即可
https://tool.zcmzcm.org/aadecode
有个问题是浏览器打开好像乱码了，需要直接下载txt打开。
顺带一提chrome控制台可以直接解码...

<b> 007 单身20年</b>

Bp抓包查看302页面即可

<b> 010 php decode</b>

放出了源码，本地跑一下就行。
eval函数好像不起作用，换成echo就好了

<b> 011 文件包含 </b>

本地文件上传漏洞,点击之后明显的看到url：?file=show.php
构造payload直接查看index.php源码即得flag
payload:file=php://filter/read=convert.base64-encode/resource=./index.php
读出源码base64解密

<b>012 单身一百年也没用(感受出题人的恶意..)</b>

依旧抓包
key藏在了302页面响应头中

<b> 013 Download~ \!</b>

题目打不开了。。。。

<b> 014 Cookie </b>

hint给的很足，抓包直接将cookie改为1即可

<b> 015 MYSQL  </b>

现根据提示进入robots.txt看到源码

可以明显的看到用意：flag存在id=1024内但是输入的id不能是1024

看到intval函数

小数绕过即可

<b> 016 GBK Injection </b>

宽字节注入，这题还没搞懂。

<b> 017 /x00 </b>

明显的%00截断...数组也可以绕过
数组绕过的是strops函数，而%00是绕过了ereg函数
正常payload:nctf=1%00%23biubiubiu

<b> 020 bypass again </b>

弱类型 == 

<b> 021 变量覆盖 </b>

这题也没有做出来，思考的方向错了。
看了别人的题解，post提交后覆盖掉$thepassword_123即可。

<b> 022 PHP是世界上最好的语言  </b>

也挂掉了...

<b> 023 伪装者</b>

以为是改X-forwarded-for，结果没用

<b> 024 Header </b>

F12查看head...

<b> 025 上传绕过</b>

要求上传php但是只能上传图片格式文件
BP抓包改hex 使用00截断

<b> 026 SQL注入1</b>

直接查看了源码，sql查询语句：
$sql="select user from ctf where (user='".$user."') and (pw='".$pass."')";
这里犯了一个错误...没有使用)将语句封闭，导致一直报错。
还有个奇怪的地方

<b> 027 pass check </b>

源码给出，要求过掉strcmp函数
数组直接过掉

<b> 030 起名字真难 </b>

同样给出源码
要求一个key，key的每一个数字的值的acsii不能大于等于1小于等于9，并且要求key = '54975581388'

依旧是弱类型，==会把两个变量转换为相同的类型再进行比较

<b> 031 密码重置</b>

一开始以为是get和post的覆盖。。。直接把用户名改为admin 的base64重发就OK了

<b> 032 php 反序列化(暂时无法做) </b>

无题目。


<b> 033 SQL Injection </b>

打开只有Invalid password!

F12查看页面源码找到提示：使用admin登录

<b> 034 综合题</b>

打开一堆fuckjs，扔console给出了一个页面
页面提示tips在脑子里，脑子=head
查看head,tips：history of bash
Linux下history命令会生成.bash_history文件，
查看发现存在一个flagbak的Zip，访问下载，解压得到flag





