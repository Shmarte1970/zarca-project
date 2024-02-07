import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navbarData } from './nav-data';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { fadeInOut, rotate } from '../../utils/animations';

interface SideNavToggle {
  screenWidth: number;
  isCollapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [fadeInOut, rotate],
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();

  isCollapsed = true;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onresize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.isCollapsed = false;
      this.onToggleSidenav.emit({
        isCollapsed: this.isCollapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(public userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.isCollapsed = true;
    this.onToggleSidenav.emit({
      isCollapsed: this.isCollapsed,
      screenWidth: this.screenWidth,
    });
  }

  logout() {
    this.userService.logout();
    this.toastr.info('Has cerrado sesión');
  }

  checkAllow(roleAccess: any): boolean {
    if (!this.userService.currentUser) return false;
    
    return roleAccess.some((element: any) => {
      let result = false;

      this.userService.currentUser.roles.forEach((rol: any) => {
        if (element == rol.id) result = true;
      });
      return result;
    });
  }
}
