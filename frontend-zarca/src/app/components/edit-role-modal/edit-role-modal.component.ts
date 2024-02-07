import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-role-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-role-modal.component.html',
  styleUrl: './edit-role-modal.component.css',
})
export class EditRoleModalComponent implements OnInit {
  @Output()
  closeModal: EventEmitter<any>;

  @Input()
  selectedRole: any = {};

  roleForm: FormGroup;
  id: FormControl = new FormControl('');
  name: FormControl = new FormControl('', Validators.required);

  constructor(public userService: UserService, private toastr: ToastrService) {
    this.closeModal = new EventEmitter<any>();

    this.roleForm = new FormGroup({
      id: this.id,
      name: this.name,
    });
  }

  ngOnInit(): void {
    this.roleForm.setValue(this.selectedRole);
  }

  close(state: any) {
    this.closeModal.emit(state);
  }

  editRole() {
    this.userService
      .putRole(this.roleForm.value, this.selectedRole.id)
      .subscribe({
        next: (modifiedRole) => {
          this.toastr.success('Rol modificado correctamente');
          this.close(modifiedRole);
        },
        error: (e) => {
          console.log(e);
          this.toastr.error('Error al modificar el rol');
        },
      });
  }
}
