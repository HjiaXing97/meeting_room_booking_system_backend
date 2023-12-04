import { Module } from '@nestjs/common';

import { UserModule } from './module/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  providers: []
})
export class AppModule {}
