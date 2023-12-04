import { CpfPipePipe } from './cpf-pipe.pipe';

describe('CpfPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CpfPipePipe();
    expect(pipe).toBeTruthy();
  });

  it('deve formatar cpf', () => {
    const pipe = new CpfPipePipe();

    const cpfFormatado = pipe.transform('27025168076');

    expect(cpfFormatado).toEqual('270.251.680-76');
  });

  it('não deve formatar cpf quando vazio', () => {
    const pipe = new CpfPipePipe();

    const cpfFormatado = pipe.transform('');

    expect(cpfFormatado).toEqual('');
  });

  it('não deve formatar cpf quando quantidade caracteres menor que 11', () => {
    const pipe = new CpfPipePipe();

    const cpfFormatado = pipe.transform('11111');

    expect(cpfFormatado).toEqual('11111');
  });
});
