import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { traducaoPtBr } from '../../pt-br';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private config: PrimeNGConfig) {}

  ngOnInit(): void {
    this.setTraducaoApp();
  }

  setTraducaoApp(): void {
    this.config.setTranslation(traducaoPtBr);
  }
}
