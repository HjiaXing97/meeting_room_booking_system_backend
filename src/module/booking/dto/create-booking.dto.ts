import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty({
    message: '预定人不能为空'
  })
  user_id: number;
  @IsNotEmpty({
    message: '会议室不能为空'
  })
  room_id: number;
  @IsNotEmpty({
    message: '会议开始时间不能为空'
  })
  start_time: string;
  @IsNotEmpty({
    message: '会议结束时间不能为空'
  })
  end_time: string;
  status: string;
  note: string;
}
