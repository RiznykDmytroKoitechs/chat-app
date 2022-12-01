import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayInit {
  private logger = new Logger(ChatGateway.name);
  constructor(private chatService: ChatService) {}

  afterInit(): void {
    this.logger.log('Websocket gateway inited');
  }
}
