import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

import { ClienteService } from '../../services/cliente.service';
import { MensagemService } from '../../services/mensagem.service';

import { CadastrarClienteComponent } from './cadastrar-cliente.component';
import { ListarClienteComponent } from '../listar-cliente/listar-cliente.component';

import { ICliente } from '../../model/cliente.model';

import {
  mockClienteAlterado,
  mockClienteIncluido,
  mockClienteIncluir,
  mockClientes,
  mockErro,
} from '../../testing/mock-cliente';

describe('CadastrarClienteComponent', () => {
  let component: CadastrarClienteComponent;
  let fixture: ComponentFixture<CadastrarClienteComponent>;

  // services
  let clienteService: ClienteService;
  let mensagemService: MensagemService;
  let router: Router;

  // stubs
  let clienteServiceStub: Partial<ClienteService>;
  let mensagemServiceStub: Partial<MensagemService>;

  beforeEach(async () => {
    clienteServiceStub = {
      buscarClientePorId: (): Observable<ICliente> => {
        return of(mockClientes[0]);
      },
      adicionarCliente: (): Observable<ICliente> => {
        return of(mockClienteIncluido);
      },
      editarCliente: (): Observable<ICliente> => {
        return of(mockClienteAlterado);
      },
    };

    mensagemServiceStub = {
      adicionarMensagem: (): void => {},
    };

    await TestBed.configureTestingModule({
      declarations: [CadastrarClienteComponent],
      providers: [
        {
          provide: ClienteService,
          useValue: clienteServiceStub,
        },
        {
          provide: MensagemService,
          useValue: mensagemServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'lista-clientes', component: ListarClienteComponent },
        ]),
        InputTextModule,
        InputMaskModule,
        CalendarModule,
        InputNumberModule,
        ButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarClienteComponent);
    component = fixture.componentInstance;

    clienteService = TestBed.inject(ClienteService);
    mensagemService = TestBed.inject(MensagemService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar cliente e setar formulário de alteração', () => {
    // arrange
    component.cpf = '';

    // arrange to compare
    const cliente = mockClientes[0];
    const id = mockClientes[0].id ? mockClientes[0].id : 0;

    // spy on
    const spy = spyOn(clienteService, 'buscarClientePorId').and.callThrough();

    // call method
    component.buscarCliente(id);

    // expect
    expect(spy).toHaveBeenCalled();
    expect(component.cpf).toBe(cliente.cpf);
    expect(component.clienteForm.getRawValue()).toEqual({
      nomeCliente: cliente.nomeCliente,
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });
  });

  it('não deve buscar cliente e setar formulário de alteração - erro na chamada de busca do service', () => {
    // arrange
    component.id = 0;
    component.cpf = '';

    // arrange to compare
    const cliente = mockClientes[0];
    const id = mockClientes[0].id ? mockClientes[0].id : 0;

    // spy on
    const spy = spyOn(clienteService, 'buscarClientePorId').and.returnValue(
      throwError(() => mockErro)
    );

    // call method
    component.buscarCliente(id);

    // expect
    expect(spy).toHaveBeenCalled();
    expect(component.id).not.toBe(id);
    expect(component.cpf).not.toBe(cliente.cpf);
    expect(component.clienteForm.getRawValue).not.toEqual({
      nomeCliente: cliente.nomeCliente,
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });
  });

  it('deve incluir novo cliente', () => {
    // arrange
    component.id = 0;

    const cliente = mockClienteIncluir;

    // arrange form
    component.clienteForm.setValue({
      nomeCliente: cliente.nomeCliente,
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });

    // spy on
    const spy = spyOn(clienteService, 'adicionarCliente').and.callThrough();

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    const spyRouter = spyOn(router, 'navigate');

    // call method
    component.onSubmitCliente();

    // expect
    expect(spy).toHaveBeenCalled();
    expect(spyMessage).toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente cadastrado com sucesso'
    );
    expect(spyRouter).toHaveBeenCalled();
  });

  it('não deve incluir novo cliente - erro na chamada adicionarCliente do service', () => {
    // arrange
    component.id = 0;

    const cliente = mockClienteIncluir;

    // arrange form
    component.clienteForm.setValue({
      nomeCliente: cliente.nomeCliente,
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });

    // spy on
    const spy = spyOn(clienteService, 'adicionarCliente').and.returnValue(
      throwError(() => mockErro)
    );

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    const spyRouter = spyOn(router, 'navigate');

    // call method
    component.onSubmitCliente();

    // expect
    expect(spy).toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente cadastrado com sucesso'
    );
    expect(spyMessage).toHaveBeenCalledWith(
      'error',
      'Erro',
      'Erro ao cadastrar cliente'
    );
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('não deve incluir novo cliente - formulário inválido', () => {
    // arrange
    component.id = 0;

    const cliente = mockClienteIncluir;

    // arrange form
    component.clienteForm.setValue({
      nomeCliente: 'Alisson',
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });

    // spy on
    const spy = spyOn(clienteService, 'adicionarCliente').and.callThrough();

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    const spyRouter = spyOn(router, 'navigate');

    // call method
    component.onSubmitCliente();

    // expect
    expect(spy).not.toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente cadastrado com sucesso'
    );
    expect(spyMessage).not.toHaveBeenCalledWith(
      'error',
      'Erro',
      'Erro ao cadastrar cliente'
    );
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('deve alterar cliente cadastrado', () => {
    // arrange to set form
    const cliente = mockClienteIncluir;

    // arrange
    component.id = 1;
    component.cpf = mockClienteIncluir.cpf;

    // arrange form
    component.clienteForm.setValue({
      nomeCliente: cliente.nomeCliente,
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });

    // spy on
    const spy = spyOn(clienteService, 'editarCliente').and.callThrough();

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    const spyRouter = spyOn(router, 'navigate');

    // call method
    component.onSubmitCliente();

    // expect
    expect(spy).toHaveBeenCalled();
    expect(spyMessage).toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente alterado com sucesso'
    );
    expect(spyRouter).toHaveBeenCalled();
  });

  it('não deve alterar cliente cadastrado - erro na chamada editarCliente do service', () => {
    // arrange to set form
    const cliente = mockClienteIncluir;

    // arrange
    component.id = 1;
    component.cpf = mockClienteIncluir.cpf;

    // arrange form
    component.clienteForm.setValue({
      nomeCliente: cliente.nomeCliente,
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });

    // spy on
    const spy = spyOn(clienteService, 'editarCliente').and.returnValue(
      throwError(() => mockErro)
    );

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    const spyRouter = spyOn(router, 'navigate');

    // call method
    component.onSubmitCliente();

    // expect
    expect(spy).toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente alterado com sucesso'
    );
    expect(spyMessage).toHaveBeenCalledWith(
      'error',
      'Erro',
      'Erro ao alterar cliente'
    );
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('não deve alterar cliente cadastrado - formulário invalido', () => {
    // arrange to set form
    const cliente = mockClienteIncluir;

    // arrange
    component.id = 1;
    component.cpf = mockClienteIncluir.cpf;

    // arrange form
    component.clienteForm.setValue({
      nomeCliente: 'Alisson',
      cpf: cliente.cpf,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaMensal: cliente.rendaMensal,
      email: cliente.email,
      dataCadastro: new Date(cliente.dataCadastro),
    });

    // spy on
    const spy = spyOn(clienteService, 'editarCliente').and.callThrough();

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    const spyRouter = spyOn(router, 'navigate');

    // call method
    component.onSubmitCliente();

    // expect
    expect(spy).not.toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente alterado com sucesso'
    );
    expect(spyRouter).not.toHaveBeenCalled();
  });
});
