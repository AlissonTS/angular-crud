import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MensagemService } from '../../services/mensagem.service';
import { ClienteService } from '../../services/cliente.service';

import { ListarClienteComponent } from './listar-cliente.component';
import { CadastrarClienteComponent } from '../cadastrar-cliente/cadastrar-cliente.component';
import { CpfPipePipe } from '../../util/pipes/cpf-pipe.pipe';

import { ICliente } from '../../model/cliente.model';

import { mockClientes, mockErro } from '../../testing/mock-cliente';

describe('ListarClienteComponent', () => {
  let component: ListarClienteComponent;
  let fixture: ComponentFixture<ListarClienteComponent>;

  // services
  let clienteService: ClienteService;
  let mensagemService: MensagemService;
  let router: Router;

  // stubs
  let clienteServiceStub: Partial<ClienteService>;
  let mensagemServiceStub: Partial<MensagemService>;

  beforeEach(async () => {
    clienteServiceStub = {
      listarClientes: (): Observable<ICliente[]> => {
        return of(mockClientes);
      },
      excluirCliente: (): Observable<object> => {
        return of({});
      },
    };

    mensagemServiceStub = {
      adicionarMensagem: (): void => {},
    };

    await TestBed.configureTestingModule({
      declarations: [ListarClienteComponent, CpfPipePipe],
      providers: [
        {
          provide: ClienteService,
          useValue: clienteServiceStub,
        },
        {
          provide: MensagemService,
          useValue: mensagemServiceStub,
        },
        ConfirmationService,
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'cadastrar-cliente', component: CadastrarClienteComponent },
          {
            path: 'cadastrar-cliente/:id',
            component: CadastrarClienteComponent,
          },
        ]),
        TableModule,
        ButtonModule,
        ToastModule,
        TooltipModule,
        ConfirmDialogModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarClienteComponent);
    component = fixture.componentInstance;

    clienteService = TestBed.inject(ClienteService);
    mensagemService = TestBed.inject(MensagemService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve listar clientes', () => {
    // arrange
    component.clientes = [];

    // spy on
    const spy = spyOn(clienteService, 'listarClientes').and.callThrough();
    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    // call method
    component.listarClientes();

    // expect
    expect(spy).toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalled();
    expect(component.clientes.length).toBe(mockClientes.length);
  });

  it('não deve listar clientes - erro na chamada listarClientes do service', () => {
    // arrange
    component.clientes = [];

    // spy on
    const spy = spyOn(clienteService, 'listarClientes').and.returnValue(
      throwError(() => mockErro)
    );
    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    // call method
    component.listarClientes();

    // expect
    expect(spy).toHaveBeenCalled();
    expect(spyMessage).toHaveBeenCalledWith(
      'error',
      'Erro',
      'Erro ao listar clientes'
    );
    expect(component.clientes.length).not.toBe(mockClientes.length);
  });

  it('deve navegar para a tela de detalhe/alterar cliente', () => {
    // arrange
    const cliente = {
      ...mockClientes[0],
    };

    // spy on
    const spy = spyOn(router, 'navigate');

    // call method
    component.onAlterarCliente(cliente);

    // expect
    expect(spy).toHaveBeenCalled();
  });

  it('não deve navegar para a tela de detalhe/alterar cliente se id não informado', () => {
    // arrange
    const cliente = {
      ...mockClientes[0],
      id: 0,
    };

    // spy on
    const spy = spyOn(router, 'navigate');

    // call method
    component.onAlterarCliente(cliente);

    // expect
    expect(spy).not.toHaveBeenCalled();
  });

  it('deve excluir cliente', () => {
    // arrange
    component.clientes = [...mockClientes];
    const quantidadeClientes = component.clientes.length;

    const clienteExcluir = component.clientes[1];

    // spy on
    /* eslint-disable */
    const spyConfirm = spyOn<any>(ConfirmationService.prototype, 'confirm').and.callFake(
      (c: any) => {
        c.accept();
      }
    );

    const spyCancelar = spyOn(
      clienteService,
      'excluirCliente'
    ).and.callThrough();

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    // call method
    component.onExcluirCliente(clienteExcluir);

    // expect
    expect(spyConfirm).toHaveBeenCalled();
    expect(spyCancelar).toHaveBeenCalled();
    expect(spyMessage).toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente excluído'
    );
    expect(component.clientes.length).toBe(quantidadeClientes - 1);
  });

  it('não deve excluir cliente - erro na chamada excluirCliente do service', () => {
    // arrange
    component.clientes = [...mockClientes];
    const quantidadeClientes = component.clientes.length;

    const clienteExcluir = component.clientes[1];

    // spyOn
    /* eslint-disable */
    const spyConfirm = spyOn<any>(ConfirmationService.prototype, 'confirm').and.callFake(
      (c: any) => {
        c.accept();
      }
    );

    const spyCancelar = spyOn(clienteService, 'excluirCliente').and.returnValue(
      throwError(() => mockErro)
    );

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    // call method
    component.onExcluirCliente(clienteExcluir);

    // expect
    expect(spyConfirm).toHaveBeenCalled();
    expect(spyCancelar).toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalledWith(
      'success',
      'Sucesso',
      'Cliente excluído'
    );
    expect(spyMessage).toHaveBeenCalledWith(
      'error',
      'Erro',
      'Erro ao excluir cliente'
    );
    expect(quantidadeClientes).toBe(component.clientes.length);
  });

  it('não deve excluir cliente se id não informado', () => {
    // arrange
    component.clientes = [...mockClientes];
    const quantidadeClientes = component.clientes.length;

    const clienteExcluir = {
      ...mockClientes[1],
      id: 0,
    };

    // spyOn
    /* eslint-disable */
    const spyConfirm = spyOn<any>(ConfirmationService.prototype, 'confirm').and.callFake(
      (c: any) => {
        c.accept();
      }
    );

    const spyCancelar = spyOn(clienteService, 'excluirCliente').and.returnValue(
      throwError(() => mockErro)
    );

    const spyMessage = spyOn(
      mensagemService,
      'adicionarMensagem'
    ).and.callThrough();

    // call method
    component.onExcluirCliente(clienteExcluir);

    // expect
    expect(spyConfirm).not.toHaveBeenCalled();
    expect(spyCancelar).not.toHaveBeenCalled();
    expect(spyMessage).not.toHaveBeenCalled();
    expect(quantidadeClientes).toBe(component.clientes.length);
  });
});
