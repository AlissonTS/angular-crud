import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfPipe',
})
export class CpfPipePipe implements PipeTransform {
  transform(valor: string): string {
    if (valor.length < 11) {
      return valor;
    }

    let valorFormatado = valor + '';

    valorFormatado = valorFormatado
      .padStart(11, '0')
      .substring(0, 11)
      .replace(/[^0-9]/, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return valorFormatado;
  }
}
