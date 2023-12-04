import { AbstractControl } from '@angular/forms';

export function nomeClienteValidator(
  control: AbstractControl
): { [key: string]: string } | null {
  const nomeCliente: string = control.value;

  if (!nomeCliente) {
    return null;
  }

  if (!verificarEspacos(nomeCliente)) {
    return { nomeInvalido: 'Nome do cliente é obrigatório.' };
  }

  if (!verificarSobrenomeValido(nomeCliente)) {
    return {
      nomeInvalido: 'Nome do cliente deve ter pelo menos um sobrenome.',
    };
  }

  return null;
}

function verificarEspacos(nomeCliente: string): boolean {
  const nomeClienteTrim = nomeCliente.trim();

  return nomeClienteTrim.length > 0;
}

function verificarSobrenomeValido(nomeCliente: string): boolean {
  const arrayNomeSobrenome = nomeCliente
    .split(' ')
    .filter(nome => nome.length > 0);

  return arrayNomeSobrenome.length >= 2;
}
