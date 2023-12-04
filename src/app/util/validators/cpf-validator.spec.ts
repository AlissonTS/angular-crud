import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf-validator';

describe('cpfValidator', () => {
  it('deve validar cpf válido', () => {
    const errors = cpfValidator(new FormControl('27025168076'));
    expect(errors).toBeNull();
  });

  it('não deve validar cpf inválido', () => {
    const errors = cpfValidator(new FormControl('11111111111'));
    expect(errors).not.toBeNull();
  });
});
