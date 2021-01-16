import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule  } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {OverlayModule} from '@angular/cdk/overlay';
// import {TextFieldModule} from '@angular/cdk/text-field';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
   // OverlayModule,
   // TextFieldModule
  ],
  exports: [
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
   // OverlayModule,
   // TextFieldModule
  ]
})
export class CoreModule { }
