# 领悟接口（pc端）

<img
  src="./docs/imgs/ling-wu-logo.png" width="440px"
/>

## 项目简介

领悟是一个社交化的知识分享平台，用户可以发布问题、分享经验、发表观点、写文章等，与来自不同领域的人交流。我们注重内容的质量和专业性，通过严格筛选和审核机制保证内容可靠性。领悟会根据用户的偏好和历史行为，推荐相关领域的高质量文章和问题。此外，我们还提供了“专栏”、“收藏”、“私信”等特色功能，方便用户记录和管理学习和交流历程。我们希望让用户轻松获取有价值的知识，认识更多的人，并拓展视野和思路。

## 技术栈

  * node
  * pnpm
  * nestjs
  * typescript
  * rxjs
  * express
  * jest
  * swagger
  * typeorm
  * mysql
  * redis
  * eslint
  * husky
  * lint-staged
  * commitlint
  * monorepo
  * 更多待补充...

## 代办事项:

- [x] 完成基于pnpm的monorepo基建
- [x] 完成 hello,wold的nestjs项目基建
- [x] 完成typescript标准化
- [x] 加入eslint、husky、lint-staged、commitlint的仓库规范基建
- [x] [完成项目基础结构与说明文档1.0](./docs//1.nestjs%E9%A1%B9%E7%9B%AE%E5%9F%BA%E7%A1%80%E7%BB%93%E6%9E%84%E4%B8%8E%E8%AF%B4%E6%98%8E.md)
- [x] [完成pc-server中的一个请求打入时的程序流程图](./docs//2.%E4%B8%80%E4%B8%AA%E8%AF%B7%E6%B1%82%E5%BC%80%E5%A7%8B%E5%88%B0%E7%BB%93%E6%9D%9F%E8%BF%87%E7%A8%8B%E4%B8%AD%E7%9A%84nestjs%E7%A8%8B%E5%BA%8F%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.md)
- [x] 完成项目配置&环境变量配置建设
- [x] 完成mysql与redis配置与应用建设
- [ ] 完成jwt与鉴权模块建设
- [ ] 完成docker配置
- [ ] 完成模块拆分
- [ ] 完成模块相关实体建立
- [ ] 完成模块相关接口开发
- [ ] 其他...

## 功能列表:
待补充...

## 项目目录/文件介绍
- .husky: husky相关配置
- .vscode: vscode相关配置
- docs: 大仓相关文档&资源
- packages: 大仓内的所有项目/包存放目录
  - pc-server: pc端项目接口服务源码，[目录结构](./docs//1.nestjs%E9%A1%B9%E7%9B%AE%E5%9F%BA%E7%A1%80%E7%BB%93%E6%9E%84%E4%B8%8E%E8%AF%B4%E6%98%8E.md)
  - shared: 可以单独发布出去的工具集合，预留给微服务模式和前端导入使用类型（比如各个接口的response类型和request参数类型等）等场景
- package.json: 大仓的依赖配置
  - dev: 运行pc-server项目的命令
  - lint: 扫描整个大仓的eslint规范
- pnpm-workspace.yaml: workspace配置
- tsconfig.base.json: 项目基础ts配置
- 其他...

待补充...

## 运行指南

### 运行环境准备
- node >= 16.19.0
- pnpm >= 6.32.20
- mysql >= mysql8
- redis

### 安装依赖
```bash
pnpm i
```
### 配置项目配置
路径：packages/pc-server/config
进入：config.development.yaml
本地提前创建数据库: lingwu
配置详细：
```yaml
# 数据库配置
db:
  type: 'mysql' # "mysql" | "mariadb"
  host: '127.0.0.1'
  port: 3306
  username: 'xxx'
  password: 'xxx'
  database: 'lingwu' # 需要自己建库
  autoLoadEntities: true
  synchronize: true # 生产环境禁止打开

# redis的配置
redis:
  host: '127.0.0.1'
  port: 6379
  # password: 'xxxx'

# swagger的配置
swagger:
  open: true # 是否开启
  path: 'swagger-docs' # 文档路径
  title: '领悟服务端api文档' # swagger标题
  description: '领悟服务端（pc）' # swagger描述
  version: '1.0.0' # 接口版本
  bearerAuth: # 认证配置
    type: 'http'
    in: 'header'
    name: 'Authorization'
```

### 运行项目
```bash
pnpm run dev
```
### 访问地址（默认配置，需要更换可以在env文件中配置）

[接口地址：http://127.0.0.1:3000](http://127.0.0.1:3000)

[swagger地址：http://127.0.0.1:3000/swagger-docs](http://127.0.0.1:3000/swagger-docs)

### 其他
待补充...


## 共建指南


待补充..

## Maintainers

[@calandnong](https://github.com/calandnong).

## License

[MIT](LICENSE) © coderPig
