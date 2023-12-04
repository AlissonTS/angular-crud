import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ClienteService } from './cliente.service';

import {
  mockClientes,
  mockClienteIncluir,
  mockClienteIncluido,
  mockClienteAlterado,
} from '../testing/mock-cliente';

import { environment } from '../../environments/environment';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService],
    });
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar clientes', () => {
    service.listarClientes().subscribe(data => {
      expect(data).toBe(mockClientes);
    });

    const req = httpMock.expectOne(`${environment.API}/clientes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);
    httpMock.verify();
  });

  it('deve cadastrar cliente', () => {
    const cliente = {
      ...mockClienteIncluir,
    };

    service.adicionarCliente(cliente).subscribe(data => {
      expect(data).toBe(mockClienteIncluido);
    });

    const req = httpMock.expectOne(`${environment.API}/clientes`);
    expect(req.request.method).toBe('POST');
    req.flush(mockClienteIncluido);
    httpMock.verify();
  });

  it('deve buscar cliente por id', () => {
    service.buscarClientePorId(1).subscribe(data => {
      expect(data).toBe(mockClientes[0]);
    });

    const req = httpMock.expectOne(`${environment.API}/clientes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes[0]);
    httpMock.verify();
  });

  it('deve editar cliente', () => {
    const cliente = {
      ...mockClienteIncluido,
    };

    service.editarCliente(cliente).subscribe(data => {
      expect(data).toBe(mockClienteAlterado);
    });

    const req = httpMock.expectOne(`${environment.API}/clientes/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockClienteAlterado);
    httpMock.verify();
  });

  it('deve excluir cliente', () => {
    const id = 2;

    service.excluirCliente(id).subscribe(data => {
      expect(data).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.API}/clientes/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    httpMock.verify();
  });
});
