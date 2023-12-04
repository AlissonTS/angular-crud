import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarClienteComponent } from './clientes/listar-cliente/listar-cliente.component';
import { CadastrarClienteComponent } from './clientes/cadastrar-cliente/cadastrar-cliente.component';

const routes: Routes = [
  { path: '', component: ListarClienteComponent },
  { path: 'lista-clientes', component: ListarClienteComponent },
  { path: 'cadastrar-cliente', component: CadastrarClienteComponent },
  { path: 'cadastrar-cliente/:id', component: CadastrarClienteComponent },
  { path: '**', redirectTo: '/lista-clientes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
