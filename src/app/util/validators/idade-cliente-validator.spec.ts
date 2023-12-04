import { FormControl } from '@angular/forms';
import { idadeClienteValidator } from './idade-cliente-validator';

describe('idadeClienteValidator', () => {
  it('não deve validar idade menor de 18 anos', () => {
    const errors = idadeClienteValidator(new FormControl(new Date()));
    expect(errors).not.toBeNull();
  });

  it('não deve validar idade maior de 60 anos', () => {
    const dataAtual = new Date();

    const anoAnterior = dataAtual.getFullYear() - 70;
    const dataAnterior = new Date(`${anoAnterior}/01/01`);

    const errors = idadeClienteValidator(new FormControl(dataAnterior));
    expect(errors).not.toBeNull();
  });

  it('deve validar idade maior de 18 anos e menor de 60', () => {
    const dataAtual = new Date();

    const anoAnterior = dataAtual.getFullYear() - 55;
    const dataAnterior = new Date(`${anoAnterior}/01/01`);

    const errors = idadeClienteValidator(new FormControl(dataAnterior));
    expect(errors).toBeNull();
  });
});
