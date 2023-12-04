import { AbstractControl } from '@angular/forms';

import { cpf } from 'cpf-cnpj-validator';

export function cpfValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const cpfInput: string = control.value;

  return cpf.isValid(cpfInput) ? null : { cpfInvalido: control.value };
}
