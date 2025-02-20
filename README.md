<h2 align="center">
Frank 换肤修改版
</h2>
<p align="center">
<a href="https://lolfrank.cn" rel="nofollow"><img src="./public/preface.jpg"></a>
</p>
<p align="center">
<a href="https://lolfrank.cn" style="margin-right: 24px" rel="nofollow">🚀立即下载</a>
<a href="https://www.yuque.com/java-s/frank/introduction" rel="nofollow">🔎使用手册</a>
</p>

## 👋 介绍
这是基于原作Frank进行增加换肤能力的新工具

## 注意
游戏目录选择Game目录，也就是有League of Legends.exe的目录。

## 🔧 技术栈

- Rust
- Tauri
- Vue3
- Typescript
- TailwindCSS

## 📊 目录结构

```
src
├─assets                # 一些资源文件
├─background            # 前端的逻辑窗口
├─lcu                   # Lcu接口
├─main                  # 主窗口
│  ├─router
│  ├─store
│  └─views
│      ├─home           # 首页
│      ├─rank           # 英雄数据排行
│      ├─record         # 排位笔记
│      ├─rune           # 符文配置
│      └─teammate       # 队友数据
├─matchAnalysis         # 战绩数据分析窗口
├─queryMatch            # 我的战绩窗口
├─recentMatch           # 对局详情战绩窗口
├─resources             # 一些资源

src-tauri
├─icons
├─src
│  ├─lcu
│  └─shaco              # 连接lcu第三方库
│  └─lib.rs             # 入口函数
│  └─main.rs
│  └─lcu.rs
```

## 📥 运行

```
git clone https://github.com/Java-S12138/frank.git
cd src
pnpm install
cd src-tauri # 安装rust所需要的组件
cd..
pnpm run tauri dev
```

构建

```
pnpm run tauri build
```


## 点个 Star 支持我们 ⭐
<p align='center'>
  <a href="https://github.com/Java-S12138/frank/stargazers">
    <img src="https://api.star-history.com/svg?repos=Java-S12138/frank&type=Date">
  </a>
</p>
