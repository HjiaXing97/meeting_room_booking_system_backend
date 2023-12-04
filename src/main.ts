import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './fliter/http-exception.filter';
import { SuccessInterceptor } from './interceptor/success.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局请求异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 👈 添加全局请求成功拦截器
  app.useGlobalInterceptors(new SuccessInterceptor());

  // 👈 添加全局管道参数校验
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap().then();
