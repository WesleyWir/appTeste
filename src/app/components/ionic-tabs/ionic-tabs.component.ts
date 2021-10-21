import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ionic-tabs',
  templateUrl: './ionic-tabs.component.html',
  styleUrls: ['./ionic-tabs.component.scss'],
})
export class IonicTabsComponent implements OnInit {

  constructor(private router : Router) { 

  }

  ngOnInit() {}

  public goToCadastrar(): void {
    this.router.navigate(['/cadastrar']);
  }

  public goToHome(): void {
    this.router.navigate(['/home']);
  }
}
