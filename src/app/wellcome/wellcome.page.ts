import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wellcome',
  templateUrl: './wellcome.page.html',
  styleUrls: ['./wellcome.page.scss'],
})
export class WellcomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logout() {
    //this.authService.logout();
  }
}
