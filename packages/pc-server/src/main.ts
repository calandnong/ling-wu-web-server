import { NestFactory } from '@nestjs/core';
import { Config, useAppConfig } from './config/configuration';
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

  const config = useAppConfig(app);
  const appConfig = config.get(Config.SERVER);
  const swaggerConfig = config.get(Config.SWAGGER);
  await app.listen(appConfig.port);
  console.log(`项目运行在：http://127.0.0.1:${appConfig.port}`);
  console.log(`swagger-ui地址：http://127.0.0.1:${appConfig.port}/${swaggerConfig.path}`);
}
bootstrap();
