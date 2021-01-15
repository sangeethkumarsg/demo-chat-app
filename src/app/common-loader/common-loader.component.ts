import { Component, OnInit } from '@angular/core';
import { CommonLoaderService } from './common-loader.service';

@Component({
  selector: 'app-common-loader',
  templateUrl: './common-loader.component.html',
  styleUrls: ['./common-loader.component.scss']
})
export class CommonLoaderComponent implements OnInit {

  defaultMsg = 'Loading...';
  constructor(
    public _commonLoaderService: CommonLoaderService
  ) { }

  ngOnInit() {
  }

}
