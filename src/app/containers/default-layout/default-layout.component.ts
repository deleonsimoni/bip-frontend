import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  
  public sidebarMinimized = false;
  public navItems = navItems;
  user = false;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private authService: AuthenticationService,
    protected router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  logout(){
    this.toastr.success("Volte logo", "Logout");
    this.authService.logout();
    const returnUrl = '/';
    this.router.navigateByUrl(returnUrl);
   
  }
}
