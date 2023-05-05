<div align="center">
  <img src="./docs/KoaBoot.png" width=440px height=300px/>
   <h1 align="center">KoaBoot.js</h1>
   <h2 align="center">基于Koa.js和原生js模仿springboot设计二次封装的服务端框架</h2>
   <h5 align="center">⚠️KoaBoot.js正在开发中</h5>
</div>

<p align="center">
    <a href="https://github.com/2pown/enlace/actions">
      <img src="https://github.com/2pown/enlace/workflows/run%20lib%20test/badge.svg" alt="GitHub Actions">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/JavaScript-%F0%9F%92%AA-blue" alt="JavaScript">
    </a>
        <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/nodeJs-%F0%9F%92%AA-blue" alt="nodeJs">
    </a>
    <a href="https://github.com/2pown/enlace/blob/develop/LICENSE">
      <img src="https://img.shields.io/badge/license-Apache2.0-red.svg" alt="Licence-Apache-2.0">
    </a>
    <a href="https://www.codacy.com/gh/2pown/enlace?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=2pown/enlace&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/dc9bab23c5634fccba88b43c583e7850"/></a>
</p>

# TODO

- [x] 完成 基本层次的模仿与实现
- [x] 完善 Http 与 mysql 的装饰器
- [x] 完善面向对象编程开发体验
- [x] 自动扫描 Controller 导入路由
- [x] 完成 上传文件测试版本
- [x] 其他...

# Features

- **面向注解与面向对象**: 层次更加的清晰以及编写服务端代码的阅读性更高
- **让 nodejs 平台上开发服务端更加规范化（虽然有 nest.js）**: 对新手上手服务端开发以及不懂 typescript 的前端 coder 更加友好

# Simple Usage

Simple.js

```typescript
 **/
/**
 * Greated By xuanhei on 2020/9/4
 **/

const {Api,Controller,PostMapping,GetMapping,DeleteMapping,PutMapping,FilePostMapping} = require('../Annotation/HttpAnnotion');
const IndexService = require("../Service/IndexService");
const {Init,Autowired} = require("../Annotation/InitAnnontion")
const ResultCode = require('../Utils/ResultCode');
/**
 * 首页api
 */
@Api("/Article")
@Controller
@Init //增加这个注解给方法修改
class IndexController{
    //自动实例化
    @Autowired(IndexService)
    indexService;
    /**
     *  增加文章
     */
    @PostMapping("/addArticle")
    addArticle(data,next){
        return this.indexService.addTest(data);
    }

    /**
     *  删除文章
     */
    @DeleteMapping("/deleteArticle")
    deleteArticle(data){
        return this.indexService.deleteTest(data);
    }

    @PutMapping("/updateArticle")
    updateArticle(data,next){
        return this.indexService.updateArticle(data)
    }

    /**
     *  查询单篇文章
     */
    @GetMapping("/selectOneTest")
    selectOneTest(data,next){
        return this.indexService.selectOneTest(data)
    }

    /**
     *  查询多篇文章
     */
    @GetMapping("/selectArticle")
    selectArticle(data,next){
        return this.indexService.selectTest(data)
    }

    /**
     *  上传文件
     */
    @FilePostMapping("/upFile")
    upFile(ctx,next){
        return this.indexService.upFile(ctx,next);
    }
}

```

run

```bash
git clone https://gitee.com/JSshuai2015/koa-boot.-js
cd koa-boot.-js
npm install
npm run dev
```

# 组成部分

- [Annotation](#annotation): 注解修饰层，用于装配一些本项目需要预先封装好用以复用的事情
- [Config](#config): 配置文件，存放文件上传路径以及 mysql 连接配置
- [Controller](#controller): 控制器层，相应用户请求：决定使用什么视图，需要准备什么数据来显示
- [Server](#server): 存放业务逻辑处理，也是一些关于数据库处理的操作，但不是直接和数据库打交道，他需要导入 Mapper 层，Mapper 层是直接对数据库打交道的，Server 主打数据输入和输出过程的处理
- [Mapper](#mapper): Mapper 层，完成对数据库的 curd，并返回处理结果
- [Pojo](#pojo): 实体层，暂未实现
- [Utils](#utils): 封装的一些常用工具插件
- [KoaBootApplication.js](#koabootapplication): 启动入口
- 其他...: 等我后面更新吧。

# Annotation

注解修饰层，用于装配一些本项目需要预先封装好用以复用的事情

# Config

配置文件，存放文件上传路径以及 mysql 连接配置

### Example

```typescript
/**
 * Greated By xuanhei on 2020/9/5
 **/
// 数据库配置
const config = {
  port: 3000, // koa运行端口
  database: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "koadb", // 数据库名
  },
};

module.exports = config;
```

# Controller

### 控制器

控制器层，相应用户请求：决定使用什么视图，需要准备什么数据来显示，示例代码:

```typescript
/**
 * Greated By xuanhei on 2020/9/4
 **/

const {
  Api,
  Controller,
  PostMapping,
  GetMapping,
  DeleteMapping,
  PutMapping,
  FilePostMapping,
} = require("../Annotation/HttpAnnotion");
const IndexService = require("../Service/IndexService");
const { Init, Autowired } = require("../Annotation/InitAnnontion");
const ResultCode = require("../Utils/ResultCode");
/**
 * 首页api
 */
@Api("/Article")
@Controller
@Init //增加这个注解给方法修改
class IndexController {
  //自动实例化
  @Autowired(IndexService)
  indexService;
  /**
   *  增加文章
   */
  @PostMapping("/addArticle")
  addArticle(data, next) {
    return this.indexService.addTest(data);
  }

  /**
   *  删除文章
   */
  @DeleteMapping("/deleteArticle")
  deleteArticle(data) {
    return this.indexService.deleteTest(data);
  }

  @PutMapping("/updateArticle")
  updateArticle(data, next) {
    return this.indexService.updateArticle(data);
  }

  /**
   *  查询单篇文章
   */
  @GetMapping("/selectOneTest")
  selectOneTest(data, next) {
    return this.indexService.selectOneTest(data);
  }

  /**
   *  查询多篇文章
   */
  @GetMapping("/selectArticle")
  selectArticle(data, next) {
    return this.indexService.selectTest(data);
  }

  /**
   *  上传文件
   */
  @FilePostMapping("/upFile")
  upFile(ctx, next) {
    return this.indexService.upFile(ctx, next);
  }
}
```

# Server

### 服务层

存放业务逻辑处理，也是一些关于数据库处理的操作，但不是直接和数据库打交道，他需要导入 Mapper 层，Mapper 层是直接对数据库打交道的，Server 主打数据输入和输出过程的处理

```typescript
/**
 * Greated By xuanhei on 2020/9/6
 **/

const IndexMapper = require("../Mapper/IndexMapper");
const ResultCode = require("../Utils/ResultCode");
const { Init, Autowired } = require("../Annotation/InitAnnontion");
const { Service } = require("../Annotation/ServiceAnnontion");
const uploadimg = require("../Utils/FileUtil");
const { autobind } = require("core-decorators");
@Service
// @Init //增加这个注解给方法修改
class IndexService {
  // @Autowired("../Mapper/IndexMapper")
  indexMapper = new IndexMapper();

  addTest(data) {
    const that = this;
    return async function () {
      let SQLDATA = {};
      try {
        SQLDATA = await that.indexMapper.addTest(data);
      } catch (e) {
        console.log(e);
      }
      if (SQLDATA && SQLDATA === 1) {
        return ResultCode.SUCCESS({
          message: "插入成功",
        });
      }
      return ResultCode.SUCCESS({
        message: "插入失败",
      });
    };
  }
  deleteTest(id) {
    const that = this;
    return async function () {
      let SQLDATA = {};
      try {
        SQLDATA = await that.indexMapper.deleteTest(id);
      } catch (e) {
        console.log(e);
      }
      if (SQLDATA && SQLDATA === 1) {
        return ResultCode.SUCCESS({
          message: "删除成功",
        });
      }
      return ResultCode.SUCCESS({
        message: "删除失败",
      });
    };
  }
  updateArticle(data) {
    const that = this;
    return async function () {
      let SQLDATA = {};
      try {
        SQLDATA = await that.indexMapper.updateTest(data);
      } catch (e) {
        console.log(e);
      }
      if (SQLDATA && SQLDATA === 1) {
        return ResultCode.SUCCESS({
          message: "更改成功",
        });
      }
      return ResultCode.SUCCESS({
        message: "更改失败",
      });
    };
  }

  /**
   *  查询单条数据
   */
  selectOneTest(id) {
    const that = this;
    return async function () {
      return ResultCode.SUCCESS({
        data: that.indexMapper.selectOneTest(id),
        message: "查询成功",
      });
    };
  }

  /**
   *  查询多条数据
   */
  selectTest() {
    const that = this;
    return async function () {
      return ResultCode.SUCCESS({
        data: that.indexMapper.selectTest(),
        message: "查询成功",
      });
    };
  }

  /**
   *  上传文件
   */
  upFile(ctx, next) {
    return async function () {
      const imgUrl = uploadimg(ctx);
      if (imgUrl) {
        return ResultCode.SUCCESS({
          data: imgUrl,
          message: "文件上传成功",
        });
      } else {
        return ResultCode.ERRO({
          data: null,
          message: "文件上传失败",
        });
      }
    };
  }
}

module.exports = IndexService;
```

# Mapper

### Mapper 层

Mapper 层，完成对数据库的 curd，并返回处理结果，此处简单封装了直接 sql 查询的注解，使用自定义占位符 :yourKey 形式，正则切割自动匹配传入对象的 key+value，具体自己去体验吧

```typescript
/**
 * Greated By xuanhei on 2020/9/6
 **/

const {
  Mapper,
  Insert,
  Delete,
  Update,
  Select,
} = require("../Annotation/MapperAnnotion");

@Mapper
class IndexMapper {
  /**
   *  增加数据
   */
  @Insert("insert into test set name=:name,age=:age")
  addTest(obj) {}

  /**
   *  删除数据
   */
  @Delete("DELETE FROM test WHERE id=:id")
  deleteTest(id) {}

  /**
   *  删除数据
   */
  @Update("UPDATE test SET name=:name,age=:age WHERE id=:id")
  updateTest(data) {}

  /**
   *  查询多条数据
   */
  @Select("select * from test where id=:id", 1) //0为默认返回数组 1为返回对象，默认可以不传
  selectOneTest(id) {}

  /**
   *  查询多条数据
   */
  @Select("select * from test")
  selectTest() {}
}
module.exports = IndexMapper;
```

# Pojo

### 实体层，校验器以及数据库字段匹配和装配可在此层完成（暂未实现）

```typescript
//类似

@Init
class Test {
  id = 0;
  name = "";
  age = 0;
}
```

# Utils

### 工具层，目前只有统一返回状态以及上传文件工具

```typescript
//工具类
const path = require("path");
const fs = require("fs");
function uploadimg(ctx, next) {
  console.log(JSON.stringify(ctx.request, null, " "));
  const fileName = ctx.request.files["file"]["name"];
  const file = ctx.request.files["file"];
  // 创建可读流
  const render = fs.createReadStream(file.path);
  let filePath = `${path.resolve(
    __dirname,
    "../FileStatic/images"
  )}/${fileName}`;
  const fileDir = path.join(__dirname, "../FileStatic/images");
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, (err) => {
      console.log(err);
      console.log("创建失败");
    });
  }
  // 创建写入流
  const upStream = fs.createWriteStream(filePath);
  render.pipe(upStream);
  return filePath;
}

module.exports = uploadimg;
```

```typescript
//返回类
module.exports = new (class ResultCode {
  SUCCESS({ code = 200, message = "操作成功", data = "", state = true }) {
    const Result = { code, message, data, state };
    const response = {};
    Object.keys(Result).forEach((key) => {
      if (Result[key]) response[key] = Result[key];
    });
    return response;
  }
  ERRO({ code = 500, message = "操作失败", state = false }) {
    const Result = { code, message, state };
    const response = {};
    Object.keys(Result).forEach((key) => {
      if (Result[key]) response[key] = Result[key];
    });
    return response;
  }
})();
```

# KoaBootApplication

### 启动入口

不需要说了吧

```typescript

```

# 构建指南

git clone to your PC...

# Maintainers

[@coder 猪](https://gitee.com/JSshuai2015).

# License

[Apache-2.0](LICENSE) © coderPig
