import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  constructor(private messageService: MessageService) {}

  adicionarMensagem(
    severidade: string,
    sumario: string,
    detalhe: string
  ): void {
    // if(!severidade || !(sumario || detalhe))
    this.messageService.add({
      severity: severidade,
      summary: sumario,
      detail: detalhe,
    });
  }
}
