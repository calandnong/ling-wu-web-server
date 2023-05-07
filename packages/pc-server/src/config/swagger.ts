import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Config, useConfig } from './configuration';
import type { SwaggerConfig } from '.';

export function setupSwagger(app: INestApplication) {
  const config = useConfig();
  const swaggerConfig = config.get<SwaggerConfig>(Config.SWAGGER);
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
