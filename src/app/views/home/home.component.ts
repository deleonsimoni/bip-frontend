import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.authService.getToken()){
      this.router.navigate( [ '/dashboard' ]);
    } else {
      this.router.navigate( [ '/login' ]);
    }
  }

}
