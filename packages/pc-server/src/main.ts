import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { appUse } from '@/common/use';
import { AppModule } from '@/app.module';
import { setupSwagger } from '@/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 注册use
  appUse(app);
  // 设置swagger
  setupSwagger(app);
  // 开启跨域
  // app.enableCors();
  // 全局拦截器
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除类上不存在的字段
      // whitelist:true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
