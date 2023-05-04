import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('给它家小程序端服务端api文档')
    .setDescription('给它家小程序端')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', in: 'header', name: 'Authorization' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
