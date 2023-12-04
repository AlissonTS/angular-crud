import { FormControl } from '@angular/forms';
import { nomeClienteValidator } from './nome-cliente-validator';

describe('nomeClienteValidator', () => {
  it('deve validar nome do cliente com 1 sobrenome', () => {
    const errors = nomeClienteValidator(new FormControl('Alisson Souza'));
    expect(errors).toBeNull();
  });

  it('deve validar nome do cliente com 2 sobrenomes', () => {
    const errors = nomeClienteValidator(
      new FormControl('Alisson Trindade Souza')
    );
    expect(errors).toBeNull();
  });

  it('não deve validar nome do cliente sem sobrenome', () => {
    const errors = nomeClienteValidator(new FormControl('Alisson'));
    expect(errors).not.toBeNull();
  });

  it('não deve validar nome do cliente preenchido apenas com espaços', () => {
    const errors = nomeClienteValidator(new FormControl('   '));
    expect(errors).not.toBeNull();
  });
});
