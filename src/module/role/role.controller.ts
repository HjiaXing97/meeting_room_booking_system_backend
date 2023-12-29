import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async createRole(@Body() body: CreateRoleDto) {
    return await this.roleService.createRole(body);
  }

  @Post('list')
  async roleList(@Body() body: any) {
    return await this.roleService.roleList(body);
  }

  @Get('user/:id')
  roleUser(@Param('id') id: string) {
    return this.roleService.roleUser(id);
  }
}
