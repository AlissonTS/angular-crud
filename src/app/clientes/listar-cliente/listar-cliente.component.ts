import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { MensagemService } from '../../services/mensagem.service';
import { ClienteService } from '../../services/cliente.service';

import { ICliente } from '../../model/cliente.model';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrl: './listar-cliente.component.scss',
  providers: [ConfirmationService],
})
export class ListarClienteComponent implements OnInit {
  clientes: ICliente[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private mensagemService: MensagemService,
    private confirmationService: ConfirmationService
  ) {
    this.clientes = [];
  }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: clientes => {
        this.clientes = clientes;
      },
      error: () => {
        this.mensagemService.adicionarMensagem(
          'error',
          'Erro',
          'Erro ao listar clientes'
        );
      },
    });
  }

  onAlterarCliente(cliente: ICliente): void {
    if (!cliente || !cliente.id) {
      return;
    }

    this.router.navigate(['cadastrar-cliente', cliente.id]);
  }

  onExcluirCliente(cliente: ICliente): void {
    if (!cliente || !cliente.id) {
      return;
    }

    const id = cliente.id;

    this.confirmationService.confirm({
      message: 'Confirmar exclusão do cliente?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluirCliente(id);
      },
    });
  }

  excluirCliente(idCliente: number): void {
    const id = idCliente;

    this.clienteService.excluirCliente(id).subscribe({
      next: () => {
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);

        this.mensagemService.adicionarMensagem(
          'success',
          'Sucesso',
          'Cliente excluído'
        );
      },
      error: () => {
        this.mensagemService.adicionarMensagem(
          'error',
          'Erro',
          'Erro ao excluir cliente'
        );
      },
    });
  }
}
