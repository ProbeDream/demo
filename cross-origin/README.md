### 01|代码使用方法

- 安装`node-dev`
```bash
yarn global add node-dev 
```

- 下载对应的代码
```bash
git clone git@github.com:ProbeDream/demo.git
```

- 进入到`bb-com`文件夹运行`server.js`
```bash
cd bb-com && node-dev server.js
```

- 进入到`probe-com`文件夹运行`server.js`
```bash
cd probe-com && node-dev server.js
```
设值对应的映射:
```
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
127.0.0.1 bb.com
127.0.0.1 probe.com    
```

- 访问对应的域名:
```bash
https://bb.com:8888/index.html
https://probe.com:9999/index.html
```

- 对应的测试做完了之后,删除/注释(`通过#号注释`)对应的映射文件中的映射内容
