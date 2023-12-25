import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Delete,
  Param
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { MeetingRoomDto } from './dto';

@Controller('meeting')
export class MeetingRoomController {
  @Inject(MeetingRoomService)
  private readonly meetingRoomService: MeetingRoomService;

  @Post('create')
  async meetingCreate(@Body() body: MeetingRoomDto) {
    return await this.meetingRoomService.createMeeting(body);
  }

  @Get('all')
  async meetingList() {
    return await this.meetingRoomService.meetingAll();
  }

  @Post('list')
  async meetingPageList(@Body() body: any) {
    return await this.meetingRoomService.meetingPageList(body);
  }

  @Delete('delete/:id')
  async meetingDelete(@Param('id') id: string) {
    return await this.meetingRoomService.deleteMeeting(Number(id));
  }
}
