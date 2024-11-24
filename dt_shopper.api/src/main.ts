import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomHttpExceptionFilter } from 'src/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',  
    methods: 'GET,POST,PATCH',  
    allowedHeaders: '*', 
    credentials: true 
  });

  // Habilitar validação global
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Isso garante que o NestJS converta automaticamente os tipos de dados
    whitelist: true, // Apenas propriedades definidas no DTO são permitidas (remove dados extras)
    forbidNonWhitelisted: true, // Garante que dados não permitidos causem erro
    skipMissingProperties: false, // Não permitir campos ausentes
  }));

  app.useGlobalFilters(new CustomHttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('DT Shopper API')
    .setDescription('API Desafio Técnico Shopper')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'DT Shopper API Docs',
  });

  await app.listen(8080);
}
bootstrap();
