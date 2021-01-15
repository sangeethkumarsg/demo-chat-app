import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { COLLECTION_ROOTS } from '../../../constants/firestore.constant';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(data => {
      if (data) {
        console.log('Auth state changed: ', data.uid);
        this.router.navigateByUrl('/');
        console.log('data: ',data);
        this.authService.setUserData(data);
      }
    })
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {

    console.log('User logged: ', data);
    console.log('User id: ', data.authResult.user.uid);
  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.error("Login error: ", data);
  }

}
