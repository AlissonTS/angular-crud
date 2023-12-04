import { TestBed } from '@angular/core/testing';

import { MessageService } from 'primeng/api';

import { MensagemService } from './mensagem.service';

describe('MensagemService', () => {
  let service: MensagemService;

  let messageService: MessageService;

  // stub
  let messageServiceStub: Partial<MessageService>;

  beforeEach(() => {
    messageServiceStub = {
      add: (): void => {},
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: messageServiceStub,
        },
      ],
    });
    service = TestBed.inject(MensagemService);
    messageService = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar mensagem', () => {
    const severidade = 'success';
    const sumario = 'Sucesso';
    const detalhe = 'Adicionando mensagem de sucesso';

    const spyMessage = spyOn(messageService, 'add').and.callThrough();

    service.adicionarMensagem(severidade, sumario, detalhe);

    expect(spyMessage).toHaveBeenCalledOnceWith({
      severity: severidade,
      summary: sumario,
      detail: detalhe,
    });
  });
});
