import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET  } from '@angular/fire/storage';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

import { environment } from '../../../environments/environment';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInOptions: [
    {
      requireDisplayName: true,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ],
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireStorageModule
  ],
  exports: [
    FirebaseUIModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ]
})
export class FirebaseModule { 
  static forRoot(): ModuleWithProviders<FirebaseModule> {
    return {
      ngModule: FirebaseModule,
      providers: [
        AngularFireAuthGuard,
        { provide: BUCKET, useValue: environment.firebaseConfig.storageBucket }
      ]
    };
  }
}
