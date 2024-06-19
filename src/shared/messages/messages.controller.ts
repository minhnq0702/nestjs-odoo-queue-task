import { MessageDto } from '@/dto/message.dto';
import { MsgNotFound } from '@/entities/error.entity';
import { Message } from '@/entities/message.entity';
import { LoggerService } from '@/logger/logger.service';
import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
@UsePipes(ValidationPipe)
export class MessagesController {
  constructor(
    private readonly logger: LoggerService,
    private readonly msgSvc: MessagesService
  ) {}

  @Get()
  async ctrlListMsgs(): Promise<Message[]> {
    return this.msgSvc.listMsgs({ filterFields: {} });
  }

  @Post()
  async ctrlCreateMessage(@Body() payload: MessageDto): Promise<Message> {
    Array.from({ length: 10000 }, (_, i) => {
      this.msgSvc.createMsg({
        content: payload.content,
        sender: payload.sender,
        receiver: payload.receiver
      });
      this.logger.debug(`Creating message ${i + 1}`);
    });
    return this.msgSvc.createMsg({
      content: payload.content,
      sender: payload.sender,
      receiver: payload.receiver
    });
  }

  @Get(':id')
  async ctrlGetMessagekById(@Param('id') id: string): Promise<Message> {
    const msg = await this.msgSvc.getMsg({ filterFields: { id } });
    if (!msg) {
      throw new MsgNotFound(`Message with id ${id.toString()} not found`);
    }
    return msg;
  }

  @Post(':id/send')
  @HttpCode(200)
  async ctrlSendMessagekById(@Param('id') id: string): Promise<Message> {
    return this.msgSvc.sendMessageDirectly({ filterFields: { id } });
  }
}
