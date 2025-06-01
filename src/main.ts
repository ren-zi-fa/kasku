import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3100'],
    credentials: true,
  });

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  const config = new DocumentBuilder()
    .setTitle('KasKu')
    .setDescription('Api Untuk KasKu')
    .addServer('http://localhost:3100')
    .setVersion('1.0')
    .addTag('KasKu')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
