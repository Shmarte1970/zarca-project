import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  showPass: string = 'password';

  constructor(
    public userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    /*
    this.username = new FormControl((!environment.production)?'':'', Validators.required);
    this.password = new FormControl((!environment.production)?'':'', Validators.required);
*/
    this.username = new FormControl;
    this.password = new FormControl;

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.userService.setUser(data);
        sessionStorage.setItem('userData', JSON.stringify(data));
        this.toastr.success('Has iniciado sesión correctamente');
        this.router.navigate(['/welcome']);
      },
      error: (e) => {
        console.log(e);
        this.toastr.warning('Error al iniciar sesión');
      },
    });
  }

 togglePassword() {
    if (this.showPass === 'password') {
      this.showPass = 'text';
    } else if (this.showPass === 'text') {
      this.showPass = 'password';
    }
  }


}
