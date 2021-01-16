import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';
import { CommonUtilities } from '../../../utilities/common.utilities';
import { CHAT_TYPES } from 'src/app/constants/firestore.constant';
@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {

  constructor(
    private ac: ActivatedRoute,
    private router: Router,
    private _chatService: ChatService,
    private _authService: AuthService
  ) { }

  chatContents:any[] = [];
  currentUserId:string;
  receiverName: string;
  chatMessage: string;
  chatId: string;
  @ViewChild('messgaeContainer',{static: true}) private messgaeContainer: ElementRef;
  ngOnInit() {
    this.currentUserId = this._authService.currentUserId;
    this.ac.queryParams.subscribe(params => {
      if(params.chatId){
        this.chatId = params.chatId;
        this.getChatDetails(params.chatId);
        this.getChatContents(params.chatId);
      }
    })
  }

  getChatDetails(chatId){
    this._chatService.getChatMeta(chatId).subscribe(async chatData => {
      const receiver = chatData.chatType == CHAT_TYPES.PRIVATE ? chatData.participants.filter(uid => uid!=this.currentUserId)[0] : null;
      if(receiver){
        const usersInfo = await this._chatService.getUsersInfo([receiver]);
        if(usersInfo.size){
          const userData = usersInfo.docs[0];
          this.receiverName = userData.data().displayName;
        }
      }
      
    })
  }
  sendMessage(){
    if(this.chatMessage){
      this._chatService.addTextMessage(this.chatId,this.currentUserId, this.chatMessage).then(resp => {
        this.chatMessage = "";
        //this.messgaeContainer.nativeElement
        this.messgaeContainer.nativeElement.scrollTop = this.messgaeContainer.nativeElement.scrollHeight;
      });
    }
  }

  getChatContents(chatId){
    this._chatService.getChatDetails(chatId).subscribe(contents => {
      console.log('contents',contents);
      if(contents.length){
        this.chatContents = [];
        contents.forEach(content => {
          console.log('ct ',content.payload.doc.data());
          this.chatContents.push(content.payload.doc.data());
        })
      }
    })
  }

  backToChatList(){
    this.router.navigate(['/']);
  }

  getTime(time){
    return CommonUtilities.getDateTime(time)
  }

}
