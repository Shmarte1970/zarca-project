import { Component, OnInit } from '@angular/core';
import { Rol } from '../../models/roles';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { UserService } from '../../services/users.service';
import { toggleModal } from '../../utils/animations';
import { CreateRoleModalComponent } from '../create-role-modal/create-role-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditRoleModalComponent } from '../edit-role-modal/edit-role-modal.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    NgClass,
    CreateRoleModalComponent,
    EditRoleModalComponent,
    DeleteModalComponent,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  animations: [toggleModal],
})
export class RolesComponent implements OnInit {
  roles: Rol[] = [];
  selectedRole: any = {};
  selectedRoleId: number = 0;
  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;

  constructor(public userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.roles = data.entities;
      },
      error: (e) => {
        console.log(e);
        this.toastr.warning('Error al solicitar los datos de los roles');
      },
    });
  }

  selectRole(role: any) {
    this.selectedRole = role;
    this.selectedRoleId = role.id;
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  addRoleToList(role: any) {
    this.roles.unshift(role);
    this.selectedRole = role;
    this.selectedRoleId = role.id;
  }

  replaceRole(modifiedRole: any) {
    const rolesIndex = this.roles.indexOf(this.selectedRole);
    this.roles.splice(rolesIndex, 1, modifiedRole);
    this.selectedRole = modifiedRole;
    this.selectedRoleId = modifiedRole.id;
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  openEditModal() {
    this.showEditModal = true;
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeCreateModal(e: any) {
    this.showCreateModal = false;
    if (e.id) this.addRoleToList(e);
  }

  closeEditModal(e: any) {
    this.showEditModal = false;
    if (e.id) this.replaceRole(e);
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteRole() {
    this.closeDeleteModal();
    this.userService.deleteRole(this.selectedRoleId).subscribe({
      next: (data) => {
        this.toastr.success('Rol eliminado correctamente');
        this.getRoles();
        this.selectedRole = {};
        this.selectedRoleId = 0;
      },
      error: (e) => {
        console.log(e);
        this.toastr.warning('Error al eliminar el rol');
      },
    });
  }
}
