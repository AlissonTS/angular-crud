import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MensagemService } from '../../services/mensagem.service';
import { ClienteService } from '../../services/cliente.service';

import { cpfValidator } from '../../util/validators/cpf-validator';
import { nomeClienteValidator } from '../../util/validators/nome-cliente-validator';
import { idadeClienteValidator } from '../../util/validators/idade-cliente-validator';

interface ClienteForm {
  nomeCliente: FormControl<string>;
  cpf: FormControl<string>;
  dataNascimento: FormControl<Date>;
  rendaMensal: FormControl<number>;
  email: FormControl<string>;
  dataCadastro: FormControl<Date>;
}

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrl: './cadastrar-cliente.component.scss',
})
export class CadastrarClienteComponent implements OnInit {
  clienteForm: FormGroup<ClienteForm>;
  id: number;
  cpf: string;

  constructor(
    private clienteService: ClienteService,
    private mensagemService: MensagemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = 0;
    this.cpf = '';

    this.clienteForm = new FormGroup<ClienteForm>({
      nomeCliente: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, nomeClienteValidator], // TODO colocar validador trim spaces
      }),
      cpf: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, cpfValidator],
      }),
      dataNascimento: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required, idadeClienteValidator],
      }),
      rendaMensal: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.01)],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      dataCadastro: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        const idBusca = Number(parametros['id']);

        if (idBusca && idBusca > 0) {
          this.buscarCliente(idBusca);
          this.id = parametros['id'];
        } else {
          this.id = 0;
        }
      } else {
        this.id = 0;
      }
    });
  }

  buscarCliente(id: number): void {
    this.clienteService.buscarClientePorId(id).subscribe({
      next: cliente => {
        this.clienteForm.setValue({
          nomeCliente: cliente.nomeCliente,
          cpf: cliente.cpf,
          dataNascimento: new Date(cliente.dataNascimento),
          rendaMensal: cliente.rendaMensal,
          email: cliente.email,
          dataCadastro: new Date(cliente.dataCadastro),
        });

        this.cpf = cliente.cpf;

        this.clienteForm.get('cpf')?.disable();
      },
      error: () => {
        this.id = 0;
        this.clienteForm.reset();
      },
    });
  }

  onSubmitCliente(): void {
    if (this.clienteForm.invalid) {
      this.setTodosCamposTouched();

      return;
    }

    if (!this.id) {
      this.cadastrarCliente();
    } else {
      this.alterarCliente();
    }
  }

  cadastrarCliente(): void {
    this.clienteService
      .adicionarCliente(this.clienteForm.getRawValue())
      .subscribe({
        next: () => {
          this.mensagemService.adicionarMensagem(
            'success',
            'Sucesso',
            'Cliente cadastrado com sucesso'
          );

          this.router.navigate(['lista-clientes']);
        },
        error: () => {
          this.mensagemService.adicionarMensagem(
            'error',
            'Erro',
            'Erro ao cadastrar cliente'
          );
        },
      });
  }

  alterarCliente(): void {
    const cliente = {
      ...this.clienteForm.getRawValue(),
      id: this.id,
      cpf: this.cpf,
    };

    this.clienteService.editarCliente(cliente).subscribe({
      next: () => {
        this.mensagemService.adicionarMensagem(
          'success',
          'Sucesso',
          'Cliente alterado com sucesso'
        );

        this.router.navigate(['lista-clientes']);
      },
      error: () => {
        this.mensagemService.adicionarMensagem(
          'error',
          'Erro',
          'Erro ao alterar cliente'
        );
      },
    });
  }

  setTodosCamposTouched(): void {
    Object.keys(this.clienteForm.controls).forEach(key => {
      this.clienteForm.get(key)?.markAsTouched();
    });
  }
}
