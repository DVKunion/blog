---
title: python3--learning--③
date: 2018-10-20 08:48:03
tags:
	- 脚本
	- Python3
categories: Language
thumbnail: https://blog.dvkunion.cn/img/e9e727f431adcbeffa3f3c09a1af2edda3cc9f7f.jpg
---
<div id="head"></div>

# Python 3 
---
#### <b><i><font color = "LightSkyBlue">目录</font><i><b>
<a href="/2018/10/17/python3-learning①/">①
<a href="/2018/10/19/python3-learning②/">②
<a href="/2018/10/20/python3-learning③/">③
1. [0x07\-\-输入输出&文件操作](#0x07)
	1. [输入输出](#0x07-1)
	2. [文件操作](#0x07-2)
2. [0x08\-\-CSV数据](#0x08)
3. [0x09\-\-系统监测](#0x09)
	1. [工具使用](#0x04-1) 
	<!--vmstat,iostat,top,sar,dstat,ifstat-->
	2. [类\-\-class](#0x04-2)
4. [0x0A\-\-系统监测](#0x0A)
	1. [](#0x05-1)
	2. [](#0x05-2)
5. [0X0B\-\-插件和依赖支持安装](#0x0B)

---
<div id="0x07"></div>

### <b>0x07\- \- 输入输出&文件操作<b>

<div id="0x07-1"></div>

#### <font color = "blue">输入输出</font><br>
输入：input()
输出：print()
输出字符串：str()/repr()
Python的输出自带换行，当我们想要进行不换行的输出时，应使用 end 参数。

`print("不换行输出",end="")`

当我们想要控制输出格式时候，可以使用占位符或format参数。
占位符要紧跟在其后：

`print("int %d " % 1+"float %.3f "% 2.3)`

而format函数则需要位置映射/关键字映射/元素映射。
位置映射就是指默认的一一对应，一个萝卜一个坑：

`print("{},{}".format('第一个萝卜','第二个萝卜'))`

关键字映射就是指key，类似占位一样,没人占的位置就遵循位置映射规则：

`print("{Lisi},{Zhangsan},{}".format('noname',Lisi="Lisi's",Zhangsan="Zhangsan's"))`

关键字映射无视format函数内的参数位置。
最后的元素映射就是将format当作一个元组用下表访问：

`print("{0[0]},{0[1]}".format(('first','second')))`

format还可以进行居中(^),左对齐(<),右对齐(>)操作
格式为：

`{索引:(填充符)(对齐符)(字符宽度)}`

例如

`print("{0},{1}={2:*>3".format(3,2,2*3))`

对于输入，有一个一行输入多个数据的方法：

`a, b, c = map(int, input().split())`

<div id="0x07-2"></div>

#### <font color = "blue">文件操作</font><br>

open可以返回一个file对象

`f = open("/tmp/test.txt,"w")`

第一个参数为路径&文件名，第二个参数为mode模式，分为'r'只读、'w'只写、'a'读写。

对于file对象，存在以下的方法:


| 函数名称 | 函数功能|
| ------  | ------  |
| f.read()    | 读取文件内容，返回str|
| f.readline() | 读取文件的单独一行，遇到'\n'结束，返回str |
| f.readlines() | 返回该文件中包含的所有行。如果设置可选参数 sizehint, 则读取指定长度的字节, 并且将这些字节按行分割。 |
| f.write(str) | 将一个str写入到文件内，然后返回写入字符数|
| f.tell() | 返回文件对象当前所处的位置, 它是从文件开头开始算起的字节数。|
| f.seek() | seek(x,0) ： 从起始位置即文件首行首字符开始移动 x 个字符，seek(x,1) ： 表示从当前位置往后移动x个字符，seek(-x,2)：表示从文件的结尾往前移动x个字符|

<div id="0x08"></div>

### <b>0x08\- \- CSV数据<b>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;逗号分隔值(Comma-Separated Values，CSV，有时也称为字符分隔值，因为分隔字符也可以不是逗号)。其文件以纯文本形式存储表格数据（数字和文本）。纯文本意味着该文件是一个字符序列，不含必须像二进制数字那样被解读的数据。CSV文件由任意数目的记录组成，记录间以某种换行符分隔；每条记录由字段组成，字段间的分隔符是其它字符或字符串，最常见的是逗号或制表符。通常，所有记录都有完全相同的字段序列。通常都是纯文本文件。
存在以下特征的即可称为CSV格式：
1. 1.纯文本，使用某个字符集，比如ASCII、Unicode、EBCDIC或GB2312；
2. 2.由记录组成（典型的是每行一条记录）；
3. 3.每条记录被分隔符分隔为字段（典型分隔符有逗号、分号或制表符；有时分隔符可以包括可选的空格）；
4. 4.每条记录都有同样的字段序列。

Python中有内置的CSV库，可以方便的帮助处理CSV数据。






[<center><font color = "Crimson">back --返回</font></center>
](#head)