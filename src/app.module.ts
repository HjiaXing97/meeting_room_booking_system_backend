import { Module } from '@nestjs/common';

import { UserModule } from './module/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './guard/login.guard';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'huang',
          signOptions: {
            expiresIn: '1h'
          }
        };
      }
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoginGuard
    }
  ]
})
export class AppModule {}
