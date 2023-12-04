import { AbstractControl } from '@angular/forms';

export function idadeClienteValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const dataNascimento = control.value;

  return isDataNascimentoValida(dataNascimento, 18, 60)
    ? null
    : { idadeInvalida: true };
}

function isDataNascimentoValida(
  dataNascimento: Date,
  idadeMinima: number,
  idadeMaxima: number
): boolean {
  const hoje = new Date();

  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const m = hoje.getMonth() - dataNascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }

  return idade >= idadeMinima && idade < idadeMaxima;
}
