import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async batchAddition(operations) {
    return await this.$transaction(operations);
  }
}
