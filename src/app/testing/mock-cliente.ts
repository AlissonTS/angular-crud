import { ICliente } from '../model/cliente.model';

export const mockClientes: ICliente[] = [
  {
    id: 1,
    nomeCliente: 'Nome sobrenome',
    cpf: '16618284007',
    dataNascimento: new Date('1990-12-03T02:00:00.000Z'),
    rendaMensal: 2000,
    email: 'teste@gmail.com',
    dataCadastro: new Date('2023-12-03T12:13:53.606Z'),
  },
  {
    id: 2,
    nomeCliente: 'Nome sobrenome 2',
    cpf: '58711394005',
    dataNascimento: new Date('2004-01-05T02:00:00.000Z'),
    rendaMensal: 2000,
    email: 'teste@gmail.com',
    dataCadastro: new Date('2023-12-03T12:13:53.606Z'),
  },
];

export const mockClienteIncluir: ICliente = {
  nomeCliente: 'Nome sobrenome',
  cpf: '16618284007',
  dataNascimento: new Date('1990-12-03T02:00:00.000Z'),
  rendaMensal: 2000,
  email: 'teste@gmail.com',
  dataCadastro: new Date('2023-12-03T12:13:53.606Z'),
};

export const mockClienteIncluido: ICliente = {
  id: 1,
  nomeCliente: 'Nome sobrenome',
  cpf: '16618284007',
  dataNascimento: new Date('1990-12-03T02:00:00.000Z'),
  rendaMensal: 2000,
  email: 'teste@gmail.com',
  dataCadastro: new Date('2023-12-03T12:13:53.606Z'),
};

export const mockClienteAlterado: ICliente = {
  id: 1,
  nomeCliente: 'Nome sobrenome alterado',
  cpf: '16618284007',
  dataNascimento: new Date('1990-12-03T02:00:00.000Z'),
  rendaMensal: 2000,
  email: 'teste@gmail.com',
  dataCadastro: new Date('2023-12-03T12:13:53.606Z'),
};

export const mockErro = {};
