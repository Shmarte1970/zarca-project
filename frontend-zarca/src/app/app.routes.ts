import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AlmacenesComponent } from './components/almacenes/almacenes.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'almacenes', component: AlmacenesComponent },
  { path: 'facturacion', component: FacturacionComponent },
  { path: 'welcome', component: WelcomeComponent},
];
