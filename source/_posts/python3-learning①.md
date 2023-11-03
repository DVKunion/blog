---
title: python3--learning--①
date: 2018-10-17 21:34:20
tags:
    - 脚本
    - Python3
categories: Language
thumbnail: /img/e9e727f431adcbeffa3f3c09a1af2edda3cc9f7f.jpg

---
<div id="head"></div>

# Python 3
---

#### <b><i><font color = "LightSkyBlue">目录</font><i><b>

<a href="/2018/10/17/python3-learning①/">①

1. [0x00\-\-序](#0x00)
2. [0x01\-\-环境搭建](#0x01)
    1. [环境安装](#0x01-1)
    2. [Python3安装](#0x01-2)
3. [0x02\-\-基本语法](#0x02)
    1. [基本规则](#0x02-1)
    2. [基本数据结构](#0x02-2)
    3. [基本运算符](#0x02-3)

<a href="/2018/10/19/python3-learning②/">②
<a href="/2018/10/19/python3-learning③/">③

---
<div id="0x00"></div>

### <b>0x00\- \- 序<b>

<center><small>2018-10-17</small></center>  

运维安全的学习开始，这一部分开始学习早就有所耳闻但从未真正动手开始实际使用的一种语言\- \- Python
在这里所记录的主要是在 Centos-7 环境下 Python-3.7.0 的学习
> "人生苦短，我用Pyhton"

<center><small>2018/11/29</small></center>  

Python3 的系统性学习暂时告一段落，重新把课件和博客进行一遍整理，作为Python3
的基础笔记吧。
总的来说Python是一门很便捷的语言，他可以为你节省大量的时间和精力，为你省去复杂繁琐的实现过程，而给予你更多的时间去思考设计的逻辑，以及你想做的事。
虽然说 Python 十分便捷，但总觉得对于底层的概念Python有些过于省略，对于一个内置函数还是希望在未来多多了解一下他的实现过程、复杂度；对一个库能过一遍他的源码之类的操作。
(。・ω・。)总之还是撒花，庆祝第一门课程形式上的完结(。・ω・。)


<center><small>华丽的分割线</small></center>

---

<div id="0x01"></div>

<div id="0x01-1"></div>

### <b>0x01\- \- 环境搭建<b>

#### <font color = "blue">环境安装</font><br>

首先在虚拟机安装 Centos-7 的操作系统环境，记得勾选安装图形化界面的选项方便之后的一些操作。在安装的过程中会有一个GUI图形界面的选项，勾选之后安装就可以了。<br>
安装好系统之后我们需要将虚拟机的网络接通，这里我们主要目的在于学习与测试python3，所以直接使用了NAT模式，将Centos的网卡配置文件内的 ONBOOT = yes。
<div id="0x01-2"></div>

#### <font color = "blue">Python3安装</font><br>

进入终端，首先要在官网下载python3的安装文件。
创建一个文件夹来安置python3，并在该文件夹下:
`$ wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz`<br>
下载结束后解压文件
`$ tar -xzvf Python-3.7.0.tgz`<br>
解压后进入到解压好的python目录下
`$ cd Python-3.7.0/`<br>
安装Python
`$ ./configure #编辑`
`$ make`
`$ make install`<br>
安装完成，终端输入python3 即可进入刚安装好的python3环境内。

![](/img/4c06e311gy1fwblvc6lk0j20in02vmx4.jpg)

> P.S.
>* 1\. 编译的过程是需要GCC\G++的C语言环境支持，如果是一台新配置 Centos 需要先配置GCC环境。( ゜- ゜)つロ
>* 2\. 下载安装解压使用root账户进行会省去很多麻烦。( ゜- ゜)つロ
>* 3\.按照上面步骤安装一般在make install时候会报一个错误，是因为其中一部分的依赖支持环境没有提前安装。部分功能会无法使用。支持环境在0x06\- \- Matplotlib安装与使用 中的安装部分有详细步骤。 ( ゜-
   ゜)つロ
>* 4\.干杯🍻( ゜- ゜)つロ

<div id="0x02"></div>

### <b>0x02\- \- 基本语法<b>

<div id="0x02-1"></div>

#### <font color = "blue">基本规则</font><br>

###### <b>1.编码<b>

* \-\-Python 3 源码文件以 UTF-8 编码,字符串都是 unicode 字符串,

###### <b>2.标识符<b>

* \-\-第一个字符必须是字母表中字母或下划线 _ 。
* \-\-标识符的其他的部分由字母、数字和下划线组成。
* \-\-标识符对大小写敏感。

###### <b>3.保留字<b>

Python 的标准库提供了一个 keyword 模块，可以输出当前版本的所有关键字：

```python
import keyword
print(keyword_list)
```

###### <b>4.注释<b>

Python 的注释一般有三种

```python
# 可以用'#'来表示一行的注释
(```)
也可以用三个单引号来注释注释块
(```)
"""
或是用三个双引号来注释注释块
"""
```

###### <b>5.缩进<b>

python内的缩进十分严格。缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数。

###### <b>6.多行语句<b>

Python 通常是一行写完一条语句，但如果语句很长，我们可以使用反斜杠\来实现多行语句。
<div id="0x02-2"></div>

#### <font color = "blue">基本数据结构</font><br>

###### <b>1.数字\-\-Num <b>

\-\-声明

`a = 5 #Python的数据不需要标注数据类型`

\-\-特性

> Num一共有四种不同的数值类型: int\-\-整型，bool\-\-布尔型，float\-\-浮点型，complex\-\-复数。

\-\-方法函数

| 函数名称 | 函数功能 |
| ------  | ------   |
| abs(x)  | 返回数字的绝对值 |
| ceil(x) | 返回数字的上入整数 |
| exp(x)  | 返回e的x次幂(e^x) |
| fabs(x) | 返回数字的绝对值(浮点型) |
| floor(x) | 返回数字的下舍整数 |
| modf(x) | 返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示|
| pow(x,y) | x**y 运算后的值 |
| sqrt(x) | 返回数字 x 的平方根 |

###### <b>2.字符串\-\-String <b>

\-\-声明

`str1 = 'hello'`
或
`str2 = "life is too short"`
也可以
`str3 = '''so I use python'''`

\-\-特性
> String 不能被改变(Immutable)
> String 中使用特殊字符时需要使用转义字符
> String 前面加一个r/R(Raw String)使转义字符无效，即原始字符串
> String 切片操作和所以可以双向 如：从左往右时，下标从0开始；从右往左时，下标从-1开始。
> String 在python中代替了char的位置。即python中不存在char 类型


\-\-方法函数

| 函数名称 | 函数功能|
| ------  | ------  |
| str.title() | 返回首字母大写的str |
| count(str, beg= 0,end=len(string)) | 返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数 |
| find(str, beg=0 end=len(string)) | 检测 str 是否包含在字符串中，如果指定范围 beg 和 end ，则检查是否包含在指定范围内，如果包含返回开始的索引值，否则返回-1 |
|    max(str)/min(str) | 返回字符串 str 中最大/最小的字母。 |
| str.lstrip()/str.rstrip()  | 删除字符串字符串串首/末尾的空格 |
| replace(old, new [, max]) | 把 将字符串中的 str1 替换成 str2,如果 max 指定，则替换不超过 max 次。 |
| startswith(str,beg=0,end=len(string))|检查字符串是否是以 obj 开头，是则返回 True，否则返回 False。如果beg 和 end 指定值，则在指定范围内检查。 |
| str.swapcase() | 将字符串中大写转换为小写，小写转换为大写|
| str.upper()/str.lower() | 转换字符串中的小写字母为大写/转换字符串中的大写字母为小写 |
| str.isdecimal() | 检查字符串是否只包含十进制字符，如果是返回 true，否则返回 false。 |

###### 3.列表--List

\-\-声明
` list = [] `

\-\-特性
> List 元素可变(Mutable)
> List 切片/截取同String相同，左必右开

\-\-方法函数

| 函数名称 | 函数功能|
| ------ | ------   |
| len(list) | 列表元素个数 |
| max(list)/min(list) | 返回列表元素最大值/最小值 |
| list(seq) | 将元组转换为列表 |
| list.append(obj) | 在列表末尾添加新的对象 |
| list.count(obj)  | 统计某个元素在列表中出现的次数 |
| list.index(obj) | 从列表中找出某个值第一个匹配项的索引位置 |
| list.insert(index, obj) | 将对象插入列表 |
| list.pop([index=-1]) | 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值 |
| list.reverse() | 反向列表中元素 |
| list.sort(cmp=None, key=None, reverse=False) | 对原列表进行排序 |
| list.clear() | 清空列表 |
| list.copy() | 复制列表 |

###### 4.元组--Tuple

\-\-声明
` tup = () `

\-\-特性
> Tuple 元素不可变(Immutable)
> Tuple 切片/截取同String相同，左必右开
> Tuple 在声明时候注意:没有元素时的声明为：tup = ()；只存在一个元素时：tup = (6,)
> Tuple 因为不可变，所以sort等函数无法使用。将Tuple转化为List即可

\-\-方法函数

| 函数名称 | 函数功能|
| ------  | ------  |
| len(tuple) | 元组元素个数 |
| max(tuple)/min(tuple) | 返回元组元素最大值/最小值 |
| tuple(seq) | 将列表转换为元组 |

###### 5.集合--Set

\-\-声明
` set = () `
或者
` set = {var1,var2,var3....}`

\-\-特性
> Set 是一个无序的不重复元素序列
> Set 元素可变(Mutable)
> Set 为空集合时必须用()来声明

\-\-方法函数

| 函数名称 | 函数功能|
| ------  | ------  |
| set.add( x ) | 将元素 x 添加到集合 s 中，如果元素已存在，则不进行任何操作。 |
| set.remove( x ) | 将元素 x 从集合 s 中移除，如果元素不存在，则会发生错误。 |
| set.discard( x ) | 移除集合中的元素，且如果元素不存在，不会发生错误 |
| union() | 返回两个集合的并集 |

###### 6.字典--Dictionary

\-\-声明
` dict = {} `

\-\-特性
> Dict 元素可变(Mutable)
> Dict 键值必须是唯一的，值不必
> Dict 值可以取任数据类型，但键必须是不可变的，如字符串，数字或元组
> Dict 也可以看做是通过键：值对映射的集合


\-\-方法函数

| 函数名称 | 函数功能|
| ------  | ------  |
| len(dict) | 字典元素个数 |
| str(dict) | 打印字典 |
| type(var) | 返回输入的变量类型，如果变量是字典就返回字典类型。 |
| key in dict | 如果键在字典dict里返回true，否则返回false |

###### EOF.数据结构小结

String、List、Tuple 统称为序列。
Python内可变的数据结构有:List、Dictionary、Set
Python内不可变的数据结构有:String、Tuple、Number
除type()之外，还有一个isinstance(element,type)函数可以显示数据的类型。
其区别在于:type()不会认为子类是一种父类类型。
isinstance()会认为子类是一种父类类型。
<div id="0x02-3"></div>

#### <font color = "blue">基本运算符</font><br>

| 运算符 | 描述 | 实例|
| ------    | ------   | ------  |
| +    |加 - 两个对象相加|a + b 输出结果 31|
|-    |减 - 得到负数或是一个数减去另一个数|a - b 输出结果 -11|
|*    |乘 - 两个数相乘或是返回一个被重复若干次的字符串|a * b 输出结果 210|
|/    |除 - x 除以 y    | b / a 输出结果 2.1 |
|%    |取模 - 返回除法的余数 | b % a 输出结果 1 |
|**    |幂 - 返回x的y次幂 | a**b 为10的21次方 |
|//    |取整除 - 返回商的整数部分|9//2 输出结果 4 , 9.0//2.0 输出结果 4.0|

<br>

[<center><font color = "Crimson">back --返回</font></center>
](#head)









