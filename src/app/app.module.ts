import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { FirebaseModule } from './modules/firebase/firebase.module';

import { CommonLoaderComponent } from './common-loader/common-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { Platform } from '@angular/cdk/platform';

@NgModule({
  declarations: [
    AppComponent,
    CommonLoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FirebaseModule,
    MatProgressSpinnerModule
  ],
  providers: [ AngularFireAuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
