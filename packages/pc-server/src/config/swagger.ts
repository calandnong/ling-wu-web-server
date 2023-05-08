import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Config } from './configuration';
import type { SwaggerConfig } from '.';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>(Config.SWAGGER);
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
