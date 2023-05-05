import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('领悟服务端api文档')
    .setDescription('领悟服务端（pc）')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', in: 'header', name: 'Authorization' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
