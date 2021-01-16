import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  @Input() content:any;
  currentUserId:string;

  ngOnInit() {
    this.currentUserId = this._authService.currentUserId;
  }

}
