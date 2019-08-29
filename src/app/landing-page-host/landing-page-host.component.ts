import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing-page-host',
  templateUrl: './landing-page-host.component.html',
  styleUrls: ['./landing-page-host.component.scss']
})
export class LandingPageHostComponent implements OnInit {
  
  constructor(
  ) { 
  }

  redirectToForm(){
    $('html, body').animate({
      scrollTop: ($('#host-details-form-area').offset().top)
    },500);
  }

  ngOnInit() {
  }
}
