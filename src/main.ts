import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('SPS API')
      .setDescription('The SPS API description')
      .setVersion('1.0')
      .addTag('sps')
      .addBearerAuth(
          {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT', // 선택 사항
              name: 'Authorization',
              in: 'header',
          },
          'accessToken', // <- 아래에서 사용하는 이름
      )
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      }),
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
