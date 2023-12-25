import { IsNotEmpty, IsNumber } from 'class-validator';

export class MeetingRoomDto {
  @IsNotEmpty({
    message: '会议室名称名称'
  })
  name: string;
  @IsNotEmpty({
    message: '容纳人数不能为空'
  })
  @IsNumber({})
  capacity: number;
  @IsNotEmpty({
    message: '会议室位置不能为空'
  })
  location: string;
  @IsNotEmpty({
    message: '设备不能为空'
  })
  equipment: string;
  description: string;
}
