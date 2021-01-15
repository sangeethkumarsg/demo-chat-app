import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { FirebaseModule } from './modules/firebase/firebase.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule
  ],
  providers: [ AngularFireAuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
