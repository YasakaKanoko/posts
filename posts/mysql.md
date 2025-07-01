---
date: 2025-05-20
title: MySQL
category: Database
tags:
- mysql
- db
description: 
---
# <samp>MySQL</samp>

::: details <samp>目录</samp>

[[TOC]]

:::

## <samp>配置</samp>

1. 下载 [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

2. 解压后，在根目录新建 `my.ini`

   ::: code-group

   ```ini[my.ini]
   [mysqld]
   # 设置3306端口
   port=3306
   # 设置mysql的安装目录
   basedir=D:\mysql-8.0.27
   # 设置mysql数据库的数据的存放目录, data文件夹它会自行创建，不要自己手动创建
   datadir= D:\mysql-8.0.27\Data
   # 允许最大连接数
   max_connections=200
   # 允许连接失败的次数
   max_connect_errors=10
   # 服务端使用的字符集默认为utf8mb4
   character-set-server=utf8mb4
   # 创建新表时将使用的默认存储引擎
   default-storage-engine=INNODB
   # 默认使用"mysql_native_password"插件认证
   #mysql_native_password
   default_authentication_plugin=mysql_native_password
   [mysql]
   # 设置mysql客户端默认字符集
   default-character-set=utf8mb4
   [client]
   # 设置mysql客户端连接服务端时默认使用的端口
   port=3306
   default-character-set=utf8mb4
   ```

   :::

3. 初始化 MySQL

   ```sh
   cd D:\mysql-8.0.27\bin
   
   mysqld --initialize --console
   
   # 安装mysql服务
   mysqld --install
   
   # 启动mysql服务
   net start mysql
   
   # 重置密码
   mysql -uroot -p
   ```

4. 配置环境变量

   | `Path` | `D:\mysql-8.0.27\bin` |
   | ------ | --------------------- |

5. 查看版本号

   ```sh
   mysql -V
   ```

## <samp>命令行</samp>

```sh
# 进入mysql命令行
mysql -uroot -p

# 查看字符编码
show variables like 'character\_set\_%';

# 重启mysql服务
net stop mysql
net start mysql

# 查看当前数据库
show databases
```

## <samp>SQL</samp>

<samp>**SQL(Structured Query Language，结构化查询语言)**</samp>，分为：<samp>**DDL**</samp>、<samp>**DML**</samp>、<samp>**DCL**</samp>

- <samp>**DDL(Data Definition Language，数据定义语言)**</samp>：用于定义和修改数据库的结构(如：表、模式、索引等)，以及数据库对象的创建、更改和删除

  ```sql
  -- 创建数据库对象
  CREATE TABLE users ( id INT PRIMARY KEY, name VARCHAR(50) );
  
  -- 修改已有的数据结构
  ALTER TABLE users ADD COLUMN email VARCHAR(100);
  
  -- 删除数据库对象
  DROP TABLE users;
  
  -- 清空表中的所有数据, 但保留表结构
  TRUNCATE TABLE users;
  ```
  
- <samp>**DML(Data Manipulation Language，数据操作语言)**</samp>：用于操作数据库中的数据，包括插入、更新、删除和查询数据

  ```sql
  -- 查询数据
  SELECT * FROM users WHERE id = 1;
  
  -- 插入新数据
  INSERT INTO users (id, name) VALUES (1, 'Alice');
  
  -- 更新现有数据
  UPDATE users SET name = 'Bob' WHERE id = 1;
  
  -- 删除数据
  DELETE FROM users WHERE id = 1;
  ```
  
- <samp>**DCL(Data Control Language，数据控制语言)**</samp>：用于定义数据库的访问权限和安全级别，控制用户对数据库的操作权限

  ```sql
  -- 授予用户权限
  GRANT SELECT, INSERT ON users TO 'user1';
  
  -- 撤销用户权限
  REVOKE SELECT ON users FROM 'user1';
  
  -- (特定数据库如 SQL Server)明确拒绝权限
  DENY SELECT ON users TO 'user1';
  ```
