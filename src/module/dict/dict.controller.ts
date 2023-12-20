import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { DictService } from './dict.service';

@Controller('dict')
export class DictController {
  @Inject(DictService)
  private dictService: DictService;

  @Post('create')
  async createDict(@Body() body: any) {
    return this.dictService.createDict(body);
  }

  @Post('add/fields')
  async addFields(@Body() body: any) {
    await this.dictService.addFields(body);
  }
  @Get(':id')
  async getDict(@Param('id') id: string) {
    return await this.dictService.getDict(id);
  }
}
