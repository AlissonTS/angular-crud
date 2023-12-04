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

  it('não deve formatar cpf', () => {
    const pipe = new CpfPipePipe();

    const cpfFormatado = pipe.transform('');

    expect(cpfFormatado).toEqual('');
  });
});
