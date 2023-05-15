import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Config, useAppConfig } from './configuration';

export function setupSwagger(app: INestApplication) {
  const config = useAppConfig(app);
  const swaggerConfig = config.get(Config.SWAGGER);
  // 判断是否需要打开swagger
  if (!swaggerConfig.open) {
    return;
  }
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth(swaggerConfig.bearerAuth)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerConfig.path, app, document);
}
