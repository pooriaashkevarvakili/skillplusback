import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // فعال‌سازی CORS برای همه درخواست‌ها
  app.enableCors();

  // تنظیم Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Swagger API docs for NestJS app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  // نکته مهم: Render پورت را خودش ست می‌کند
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
