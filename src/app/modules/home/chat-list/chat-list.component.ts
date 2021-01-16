import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { CHAT_TYPES } from '../../../constants/firestore.constant';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _chatService: ChatService
  ) { }

  chats:any[] = [];
  ngOnInit() {
    this.getUsersChat();
  }

  async getUsersChat(){
    const currentUserId = this._authService.currentUserId;
    const chats = await this._chatService.getChatByUserId(currentUserId);
    const chatsArray = [];
    let users = [];
    if(chats.size){
      chats.forEach(chat => {
        const chatData = chat.data();
        for(const userId of chatData.participants){
          if(users.indexOf(userId) == -1){
            users.push(userId);
          }
        }
        chatsArray.push({
          id: chat.id,
          receiver: chatData.chatType == CHAT_TYPES.PRIVATE ? chatData.participants.filter(uid => uid!=currentUserId)[0] : null,
          name: chatData.name
        })
      })
      users = users.filter((uid) => uid!=currentUserId);
      if(!users.length){
        console.log('users list empty');
        return null;
      }
      const usersInfo = await this._chatService.getUsersInfo(users);
      const usersObj = {};
      if(usersInfo.size){
        usersInfo.forEach(us => {
          usersObj[us.id] = us.data();
        })
      }
      chatsArray.forEach(chat => {
        if(chat.receiver && usersObj.hasOwnProperty(chat.receiver)){
          chat.name = usersObj[chat.receiver].displayName;
        }
      });
      this.chats = chatsArray;
      console.log('chats: ',this.chats);
    }
  }

  async populateChatInfo(chatArray, chat, currentUserId){
    //const participantsInfo = await this._chatService.getParticipantsInfoByChatId(chat.id);
    const participants = chat.data().participants;
    //const userInfo = 
  }

  chatClick(chat){
    //const currentUserId = this._authService.currentUserId;
    console.log('chat: ',chat);
    this._router.navigate(['/chat-detail'],{
      'queryParams': {
        chatId : chat.id
      }})
  }

}
