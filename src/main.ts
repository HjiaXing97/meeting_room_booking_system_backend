import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './fliter/http-exception.filter';
import { SuccessInterceptor } from './interceptor/success.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局请求异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 👈 添加全局请求成功拦截器
  app.useGlobalInterceptors(new SuccessInterceptor());

  // 👈 添加全局管道参数校验
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('会议室预定系统')
    .setDescription('接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap().then();
