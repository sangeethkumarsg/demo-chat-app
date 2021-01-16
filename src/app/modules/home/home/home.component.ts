import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ChatService } from '../../../services/chat.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  emailSearch:string = "";
  ngOnInit() {
  }

  logout() {
    console.log("logout");

    this.firebaseAuth.signOut().then(success => {
      localStorage.removeItem('_loggedInUserInfo');
      this.router.navigateByUrl('/auth');
    });
    console.log("After logout");
    console.log("After navigation");

  }

  async searchByEmail(){
    if(this.emailSearch){
      const resp = await this.chatService.searchUserByEmail(this.emailSearch);
      if(resp.empty){
        alert('User not found');
        return null;
      }
      this.startChat(resp.docs[0].data().uid);

    }
  }

  async startChat(uid){
    const currentUserId = this.authService.currentUserId;
    console.log('uid: ',uid, ' current userId: ',currentUserId);
    //return null;
    if(uid == currentUserId){
      alert('You cannot chat to yourself :)');
      return null;
    }
    const existingChat = await this.chatService.isChatExists([currentUserId, uid]);
    if(existingChat.empty){
      console.log('chat not available');
      const newChatInfo = await this.chatService.startChat([currentUserId, uid]);
      this.router.navigate(['/chat-detail'],{
        'queryParams': {
          chatId : newChatInfo.id
        }})
    }else{
      console.log('chat exists');
      this.router.navigate(['/chat-detail'],{
        'queryParams': {
          chatId : existingChat.docs[0].id
        }})
    }
    
    
  }

}
