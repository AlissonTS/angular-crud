import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICliente } from '../model/cliente.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly API = `${environment.API}/clientes`;

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(this.API);
  }

  adicionarCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.API, cliente);
  }

  buscarClientePorId(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.API}/${id}`);
  }

  editarCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${this.API}/${cliente.id}`, cliente);
  }

  excluirCliente(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
