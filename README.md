### Contents
> 前端性能监控自动化平台

#### 运行
1. $ git clone https://github.com/xiuhonglee/monitoring.git
2. npm install 
3. bower install 
   在Linux（Centos下），以root权限安装bower时，加上--allow-roott =>  
   `$ npm install --allow-root`
4. http://stackoverflow.com/questions/34243731/mongodb-28663-cannot-start-server

#### 代办
##### 如何在Linux命令行操作MongoDB 
> 通过js脚本来操作MongoDB
```sh
################# demo.js  #####################

# 切换数据库
use your_db_name

# 查看集合
show collections

# 插入文档数据
db.col_name.insert(document)
………………

#################################################

# 引入脚本
$ mongo < demo.js

```

2. 通过json文件向mongoDB中插入数据


