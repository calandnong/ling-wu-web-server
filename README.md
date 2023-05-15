# 领悟接口（pc 端）

<img
  src="./docs/imgs/ling-wu-logo.png" width="440px"
/>

## 项目简介

领悟是一个社交化的知识分享平台，用户可以发布问题、分享经验、发表观点、写文章等，与来自不同领域的人交流。我们注重内容的质量和专业性，通过严格筛选和审核机制保证内容可靠性。领悟会根据用户的偏好和历史行为，推荐相关领域的高质量文章和问题。此外，我们还提供了“专栏”、“收藏”、“私信”等特色功能，方便用户记录和管理学习和交流历程。我们希望让用户轻松获取有价值的知识，认识更多的人，并拓展视野和思路。

## 技术栈

- node
- pnpm
- nestjs
- typescript
- rxjs
- express
- jest
- swagger
- typeorm
- mysql
- redis
- eslint
- husky
- lint-staged
- commitlint
- monorepo
- 更多待补充...

## 代办事项:

- [x] 完成基于 pnpm 的 monorepo 基建
- [x] 完成 hello,wold 的 nestjs 项目基建
- [x] 完成 typescript 标准化
- [x] 加入 eslint、husky、lint-staged、commitlint 的仓库规范基建
- [x] [完成项目基础结构与说明文档 1.0](./docs//1.nestjs%E9%A1%B9%E7%9B%AE%E5%9F%BA%E7%A1%80%E7%BB%93%E6%9E%84%E4%B8%8E%E8%AF%B4%E6%98%8E.md)
- [x] [完成 pc-server 中的一个请求打入时的程序流程图](./docs//2.%E4%B8%80%E4%B8%AA%E8%AF%B7%E6%B1%82%E5%BC%80%E5%A7%8B%E5%88%B0%E7%BB%93%E6%9D%9F%E8%BF%87%E7%A8%8B%E4%B8%AD%E7%9A%84nestjs%E7%A8%8B%E5%BA%8F%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.md)
- [x] 完成项目配置&环境变量配置建设
- [x] 完成 mysql 与 redis 配置与应用建设
- [ ] 完成 jwt 与鉴权模块建设
- [ ] 其他...

## 功能列表:

待补充...

## 项目目录/文件介绍

- .husky: husky 相关配置
- .vscode: vscode 相关配置
- docs: 大仓相关文档&资源
- packages: 大仓内的所有项目/包存放目录
  - pc-server: pc 端项目接口服务源码，[目录结构](./docs//1.nestjs%E9%A1%B9%E7%9B%AE%E5%9F%BA%E7%A1%80%E7%BB%93%E6%9E%84%E4%B8%8E%E8%AF%B4%E6%98%8E.md)
  - shared: 可以单独发布出去的工具集合，预留给微服务模式和前端导入使用类型（比如各个接口的 response 类型和 request 参数类型等）等场景
- package.json: 大仓的依赖配置
  - dev: 运行 pc-server 项目的命令
  - lint: 扫描整个大仓的 eslint 规范
- pnpm-workspace.yaml: workspace 配置
- tsconfig.base.json: 项目基础 ts 配置
- 其他...

待补充...

## 运行指南

### 运行环境准备

- node >= 16.19.0
- pnpm >= 6.32.20

### 安装依赖

```bash
pnpm i
```

### 运行项目

```bash
pnpm run dev
```

### 访问地址（默认配置，需要更换可以在 env 文件中配置）

[接口地址：http://127.0.0.1:3000](http://127.0.0.1:3000)

[swagger 地址：http://127.0.0.1:3000/swagger-docs](http://127.0.0.1:3000/swagger-docs)

### 其他

待补充...

## 共建指南

待补充..

## Maintainers

[@calandnong](https://github.com/calandnong).

## License

[MIT](LICENSE) © calandnong
