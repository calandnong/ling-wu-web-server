import { NestFactory } from '@nestjs/core';
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

  await app.listen(3000);
}
bootstrap();
