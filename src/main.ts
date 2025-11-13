import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // تنظیمات CORS
  app.enableCors({
    origin: ['http://localhost:5000', 'http://skillplus.surge.sh'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
  });

  // تنظیم Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  // حذف این خط مشکل‌ساز
  // const dataSource = app.get('DataSource');
  // await dataSource.initialize();

  await app.listen(3000);
}
bootstrap();