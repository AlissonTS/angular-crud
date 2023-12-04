import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageService, PrimeNGConfig } from 'primeng/api';

import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // stub
  let primengConfigStub: Partial<PrimeNGConfig>;
  let messageServiceStub: Partial<MessageService>;

  beforeEach(async () => {
    primengConfigStub = {
      setTranslation: (): void => {},
    };

    messageServiceStub = {
      add: (): void => {},
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: PrimeNGConfig,
          useValue: primengConfigStub,
        },
        {
          provide: MessageService,
          useValue: messageServiceStub,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
