---
title: python3-learning--②
date: 2018-10-19 16:07:18
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
<a href="/2018/10/19/python3-learning②/">②
1. [0x03\-\-控制结构](#0x03)
	1. [if](#0x03-1)
	2. [for](#0x03-2)
	3. [while](#0x03-3)
	4. [it(迭代器)](#0x03-4)
2. [0x04\-\-函数&类](#0x04)
	1. [函数\-\-def](#0x04-1)
	2. [类\-\-class](#0x04-2)
3. [0x05\-\-错误&异常](#0x05)
	1. [错误](#0x05-1)
	2. [异常](#0x05-2)
4. [0X06\-\-Python模块的安装(以Matplotlib为例)](#0x06)
	
<a href="/2018/10/20/python3-learning③/">③

---
<div id="0x03"></div>

### <b>0x03\- \- 控制结构<b>

<div id="0x03-1"></div>

#### <font color = "blue">if</font><br>
Python 中同样使用 if 来控制条件顺序结构。<br>
<b>\-\-格式<b>

Python 中一般if的写法如下:
```python
if judge1 :
	execution 1
elif judge2 :
	execution 2
else judge3 :
	execution 3
```
<br>

<b>\-\-常用运算符<b>

| 符号 | 描述 |
| :-   | :-  |
| <    | 小于 |
| <=   | 小于等于|
| >    | 大于 |
| >=   | 大于等于 |
| ==   | 等于 |
| !=   | 不等于 |
| x and y| 逻辑与 |
| x or y | 逻辑或 |
| not x  | 逻辑非 | 

<b>\-\-注意<b>
>P.S.
>Python 中用 elif 代替了 else if，所以if语句的关键字为：if – elif – else
>每个条件后面要使用冒号 :
>使用缩进来划分语句块，相同缩进数的语句在一起组成一个语句块
>在Python中没有switch – case语句

<div id="0x03-2"></div>

#### <font color = "blue">for</font><br>
Python for循环可以遍历任何序列的项目，如一个列表或者一个字符串。
<b>\-\-格式<b>

```python
for var in sequence :
	execution
```
其中 var 是变量 ，sequence 是序列，如列表、字符串
一般情况下使用 range 函数来生成一个数列方便使用。

```python
for i in range(1,5):
	print(i) #打印结果为1 2 3 4 
for i in range(5)
	print(i) #打印结果为0 1 2 3 4
for i in range(0,10,3) #3代表步长
	print(i) #打印结果为0 3 6 9
```
有了range()这个函数，我们可以配合len()轻松的遍历一个序列，如：
```python
a = ['a','b','c','d']
for i in range(len(a))
	print(i,a[i])
#打印结果为：
#0 a
#1 b
#2 c
#3 d
```
<b>\-\-注意<b>
>P.S.
>循环结构中可以用 pass / continue 来跳过不需要的剩余语句
>循环结构中可以用 break 来提前结束循环

<div id="0x03-3"></div>

#### <font color = "blue">while</font><br>
<b>\-\-格式<b>
Python中while语句的一般如下：
```python
while True/False :
	execution 
```
<b>\-\-注意<b>
>P.S.
>Python中没有do...while循环
>while 之后仍可以接else 语句

<div id="0x03-4"></div>

#### <font color = "blue">it</font><br>
it \-\- 迭代器
迭代器是访问集合元素的一种方式
迭代器是一个可以记住遍历的位置的对象。

迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。

迭代器有两个基本的方法：iter() 和 next()。
\-\-格式
```python
list = [1,2,3,4]
it = iter(list) #创建迭代器对象
print (next()) #输出迭代器下一个元素
```
可以使用it来进行遍历
```python
list = [1,2,3,4]
it = iter(list)
#使用for来进行遍历
for i in it:
	print(i) 
#或是用while来进行遍历
while(True):
	try:
		print(next(it))
	except StopIteration :
		sys.exit() #结束程序
```
<!--此处还有生成迭代器和初始化迭代器-->
<!--记得补上-->
<div id="0x04"></div>

### <b>0x04\- \- 函数&类<b>

<div id="0x04-1"></div>

#### <font color = "blue">函数</font><br>

###### <b>1.格式<b><br>
函数是一段组织好的，可重复使用的，来实现单一或相关联功能的代码段。
函数能够提高代码的模块性。
我们可以将一些方法封装成用户自定义函数，方便在之后进行多次调用。
在Python中该函数的格式为:
```python
def name(val1 , val2):
	your code
	return val3
```
其中 def 是函数声明，告诉 python 要定义一个函数
name 是函数标识符名称，命名规则同Python标识符的命名
val1,val2被称作函数的参数
缩进后的内容为函数体
return 选择性的返回一个值给调用方法，没有return 相当于返回None

例如，将a+b写成函数操作的形式。
```python
def plus(a,b):
	print(a+b)

c = 1
d = 3
plus(c,d)
```
输出结果为4
###### <b>2.参数<b><br>
形参：函数定义时预设的参数
实参：实际使用时传递给函数的参数

在Python中，形参有4中表现形式:
1. 必须参数：如上例的a,b。即在引用时必须传入的参数。
2. 关键词参数：在引用plus函数时还可以这样赋值:
`plus(a=4,b=6)`
或者
`plus(b=6,a=4)`
关键词参数使用时不需要指定顺序
3. 默认参数：修改plus函数的形参格式如：
`def plus(a,b=6)`
这样plus函数中b参数已经有了默认值6
如果没有传入b的值时，b参数将使用默认值6
4. 不定长参数：当不确定参数的长度时可以使用不定长参数。修改函数：
```python
def plus( *val ):
	sum = 0
	for i in val:
		sum+=i
	print(sum)
plus(1,2,3,4,5)
```
输出结果为15
加了\*的参数会以元组的形式导入函数，存放所有未命名的变量参数。
加了\*\*的参数以字典的形式导入。
单独出现\*后的参数必须用关键词参数的方式传入。

###### <b>3.参数传递<b><br>
在Python中，类型属于对象，变量没有类型。
上面的plus函数中，1,3属于Num类,而变量c，d则没有类型，他仅是一个Num对象的引用（类似于指针）。
在之前的总结中，Python有种可变类型，3种不可变类型。当函数传递的参数类型为不可变类型时，传递方式累死c++的值传递。传递的只是变量的值，不影响变量本身。
举个例子说明值传递：
```python
def pass_coin(a):
	a = 10
	print("函数内的a的值为"+str(a))

a = 5
pass_coin(a)
print("外部实际的a的值为"+str(a))
```
输出结果为:
```
函数内的a的值为10
外部实际的a的值为5
```
当函数传递的参数时可变类型时，则类似c++的引用传递（指针），如果参数被修改，那么外部实际值也会发生变化。
同样例如:
```python
def pass_coin(a):
	a[1] = 10
	print("函数内列表a的值为",end='')
	print(a)

a = [1,2,3,4,5]
pass_coin(a)
print("外部实际列表a的值为",end='')
print(a)
```
输出结果为：
```
函数内列表a的值为[1, 10, 3, 4, 5]
外部实际列表a的值为[1, 10, 3, 4, 5]
```
在这个例子中我们定义了一个可变的数据类型：列表a，在调用函数时把列表下标为 1 的值改变为10，发现不仅仅是函数内部a的值发生了变化,实际的列表a 的值已经被改变。
<div id="0x04-2"></div>

#### <font color = "blue">类</font><br>
类的操作和java中基本相似。python同样支持继承，多继承，方法重写，私有属性、方法，以及运算符重载

<div id="0x05"></div>

### <b>0x05\- \- 错误&异常<b>

<div id="0x05-1"></div>

#### <font color = "blue">错误</font><br>

错误一般指python代码中的语法错误
<div id="0x05-2"></div>

#### <font color = "blue">异常</font><br>
###### <b>1.异常信息<b><br>
即使语法正确，程序在运行的过程中也可能发生错误。运行期间的错误被称作异常。
异常的种类有很多，如常见的：ZeroDivisionError,NameError,TypeError等等。

###### <b>2.异常处理<b><br>
异常处理的代码格式：
```python
try :
	print(5/0)
except ZeroDivisionError:
    print("You can't divide by 0!")
```
except函数也可以同时处理多个异常，如：
`except(RuntimeError,ZeroDivisionError):`
try-except 还有一个可选的 else语句

###### <b>3.常见的Python异常类型<b><br>
| 异常名称 | 异常描述 |
| :-     | :-     |
|BaseException|所有异常的基类|
|SystemExit |解释器请求退出|
|KeyboardInterrupt |用户中断执行(通常是输入^C)|
|Exception | 常规错误的基类|
|StopIteration |迭代器没有更多的值|
|GeneratorExit |生成器(generator)发生异常来通知退出|
|StandardError |所有的内建标准异常的基类|
|ArithmeticError |所有数值计算错误的基类|
|FloatingPointError	|浮点计算错误|
|OverflowError 	|数值运算超出最大限制|
|ZeroDivisionError |除(或取模)零 (所有数据类型)|
|AssertionError |断言语句失败|
|AttributeError |对象没有这个属性|
|EOFError |没有内建输入,到达EOF 标记|
|EnvironmentError |操作系统错误的基类|

<div id="0x06"></div>

### <b>0x06\- \- Python模块的安装(以Matplotlib为例)<b>

之前的安装缺少了部分环境导致Python最后的安装过程出现一个错误警告。导致Python3自带的Pip3未安装成功。我们重新安装一下依赖环境扩展包

###### <b>1.Python3.7.0依赖包<b><br>

`$ yum install -y gcc openssl* libffi libffi-devel zlib zlib-devel zlib-static readline-devel`


###### <b>2.Matplotlib图形呈现依赖包<b><br>

`$ yum install -y tcl tk tk-devel`

###### <b>3.重新安装Python3<b><br>
```python
$ tar -xzvf Python-3.7.0.tgz 
$ cd Python-3.7.0/
$ ./configure --with-ssl --with-tcltk-includes="-I/usr/include" --with-tcltk-libs="-L/usr/lib64 -ltcl8.5 -L/usr/lib64 -ltk8.5"
$ make
$ make install
```

make install 结束后，会发现不会出现第一次安装时结尾的报错而是提示success
可以在命令行输入
`$ python3`
和
`$ pip3`
检测是否安装成功。

###### <b>4.Pip3安装matplotlib<b><br>
`$ pip3 install --index-url https://pypi.douban.com/simple matplotlib`
###### <b>5.Matplotlib基本操作<b><br>

首先调用Matplotlib
`import Matplotlib.pyplot as plt`
调用了pyplot模块，并将它简化为plt，这样我们在后面的使用中就可以用plt来代替较长的pyplot。
来画一个简单的图像:

```python
import matplotlib.pyplot as plt 
squares = [1,4,9,16,25]
plt.plot(squares)   #plot()绘图函数
plt.show()   #show()打开matplotlib查看器并显示所绘图形
```
运行输出如下：
![](/img/006IjVYfgy1fxp1uzaoh9j30hs0dcdg0.jpg)

我们对输出的图片加一些修饰：
```python
import matplotlib.pyplot as plt 
squares = [1,4,9,16,25]
plt.plot(squares,linewidth=5) #linewidth参数调整画线粗细
plt.title("Square Number",fontsize=24) #title方法为图片命名
plt.xlabel("Value",fontsize=14) #xlabel方法为X轴坐标命名
plt.ylabel("Square of Value",fontsize=14) #ylabel方法为Y轴坐标命名
plt.tick_params(axis='both',labelsize=14) #配置参数刻度线样式。
plt.show()
```
输出变为以下形式:
![](/img/006IjVYfgy1fxp1wdy1ukj30hs0dct96.jpg)
plot方式画出的图默认是将各个点的值连接到一起，如果想要单独画出各个点，可以使用scatter的打印方式。
```python
import matplotlib.pyplot as plt
x_values = [1,2,3,4,5]
y_values = [1,4,9,16,25]
plt.scatter(x_values,y_values,s=10)
plt.title("Square Numbers",fontsize=24)
plt.xlabel("Value",fontsize=14)
plt.ylabel("Square of Value",fontsize=14)
plt.tick_params(axis='both',labelsize=14)
plt.show()
```
输出结果如下:
![](/img/006IjVYfgy1fxp1hskwz3j30hs0dct8y.jpg)
把采样点加多，即可画出y=x\*x的函数图像:
```python
import matplotlib.pyplot as plt
x_values = list(range(1,51))
y_values = [x**2 for x in x_values]
plt.scatter(x_values,y_values,s=40)
plt.xlabel("Values",fontsize=14)
plt.ylabel("Square of Values",fontsize=14)
plt.axis([0,60,0,3600])
plt.show()
```
输出如下:
![](/img/006IjVYfgy1fxp1liowyxj30hs0dcweo.jpg)

也可以改变他的颜色：
>颜色表可以参考着单一色
red,blue,yellow,green,pink,black,brown,purple,orange
https://matplotlib.org/tutorials/colors/colormaps.html

或是渐变色：
```python
import matplotlib.pyplot as plt
x_values = list(range(1,51))
y_values = [x**2 for x in x_values]
plt.scatter(x_values,y_values,c=y_values,
		cmap=plt.cm.Blues,s=40)
plt.xlabel("Values",fontsize=14)
plt.ylabel("Square of Values",fontsize=14)
plt.axis([0,60,0,3600])
plt.show()
```
输出结果如下：
![](/img/006IjVYfgy1fxp1tah2slj30hs0dcgly.jpg)
这里放出常用的颜色表:
![](/img/006IjVYfgy1fxp1the74jj30hu0dadjv.jpg)
![](/img/006IjVYfgy1fxp1tplnlfj30hs0ddju2.jpg)
图片编辑完毕，记得保存一下:
`plt.savefig('test.png',bbox_inches='tight') #自动保存图表，并将图表周边的空白区域裁减掉
`

[<center><font color = "Crimson">back -- 返回</font></center>
](#head)
