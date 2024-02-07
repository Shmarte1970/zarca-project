import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [NgClass, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const sessionUser = sessionStorage.getItem('userData');
    if (sessionUser) this.userService.setUser(JSON.parse(sessionUser));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.userService.isLoggedIn() && this.router.url !== '/login') {
          this.router.navigate(['/login']);
          if (this.router.url !== '/')
            this.toastr.warning('Necesitas iniciar sesión');
        }
      }
    });
  }

  @Input()
  collapsed = false;

  @Input()
  screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';

    if (!this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
