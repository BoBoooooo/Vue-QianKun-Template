# Vue-Qiankun-Template

本项目参考自[微前端 qiankun 从搭建到部署的实践](https://juejin.im/post/6875462470593904653)

🍌 [在线演示地址](http://server.boboooooo.top:7777)

# 基座和子应用技术栈

- 基座 main vue2.x
- 子应用 sub-vue vue2.x
- 子应用 sub-react react
- 子应用 sub-vue3 vue3.x

# 开始使用

根目录集成了`npm-run-all`,支持一键执行子项目的 script 命令。

```javascript
npm run install
npm start
```

访问 http://localhost:9000 即可

默认 用户名/密码 admin/123

# 部署

[同域部署问题参考这个issue](https://github.com/umijs/qiankun/issues/400)

- build

```javascript
npm run build
```

- 拷贝 main 和相应 subapp 文件至 nginx 下

```javascript
server {
    listen 80;
    server_name xxx.com;
    location / {
        root   /data/web/qiankun/main;  # 主应用所在的目录
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    location /subapp {
	    alias /data/web/qiankun/subapp;
        try_files $uri $uri/ /index.html;
    }

}
```
