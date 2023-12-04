import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBr from '@angular/common/locales/pt';

import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

registerLocaleData(ptBr);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListarClienteComponent } from './clientes/listar-cliente/listar-cliente.component';
import { CadastrarClienteComponent } from './clientes/cadastrar-cliente/cadastrar-cliente.component';

import { CpfPipePipe } from './util/pipes/cpf-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListarClienteComponent,
    CadastrarClienteComponent,
    CpfPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    CalendarModule,
    InputNumberModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
