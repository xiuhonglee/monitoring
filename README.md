#### 搭建Linux Server环境

##### 安装git

```sh 
# yum install git
## git version 1.8.3.1
```

##### 安装node
```sh 
# curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
# yum -y install nodejs
## node version v6.2.1

## see also: https://nodejs.org/en/download/package-manager/
```

##### 安装gcc编译工具
```sh 
# yum -y install gcc gcc-c++ make flex bison gperf ruby \
  openssl-devel freetype-devel fontconfig-devel libicu-devel sqlite-devel \
  libpng-devel libjpeg-devel

## see also: http://phantomjs.org/build.html
```

##### 安装phantomjs

```sh 
# npm install -g phantomjs
```

##### 安装phantomas

```sh 
# npm install -g phantomas
```

##### 安装mongodb

```sh 
## 下载安装包
# curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.2.7.tgz

## 解压
# tar -zxvf mongodb-linux-x86_64-3.2.7.tgz

## 指定安装地址
# mkdir -p mongodb
# cp -R -n mongodb-linux-x86_64-3.2.7/ /usr/local/mongodb

## export PATH 
export PATH="usr/local/mongodb/bin":$PATH

```

#### 遇到的问题

##### 运行Phantomas报错
```sh 
## 描述：运行 # phantomas https://github.com/macbre/phantomas --verbose报错
TypeError: Bad argument
    at ChildProcess.spawn (child_process.js:933:24)
    at exports.spawn (child_process.js:733:9)
    at engines.run (/usr/local/lib/node_modules/phantomas/lib/engines.js:128:10)
    at phantomas (/usr/local/lib/node_modules/phantomas/lib/index.js:66:16)
    at task (/usr/local/lib/node_modules/phantomas/bin/phantomas.js:145:14)
    at /usr/local/lib/node_modules/phantomas/node_modules/async/lib/async.js:718:13

## 原因：安装Phantomas时，依赖安装的phantomjs版本有问题
## 解决：用独立安装的phantomjs包替换phantomas中的phantomjs
```

##### 启动mongod
```sh 
## 描述：在~/下执行mongod没有反应
## 原因：未知
## 解决：进入mongodb安装目录/usr/local下，执行
./mongod --storageEngine=mmapv1 --dbpath /usr/local/mongodb 启动

```


