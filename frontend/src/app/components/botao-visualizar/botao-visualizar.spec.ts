import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoVisualizar } from './botao-visualizar';

describe('BotaoVisualizar', () => {
  let component: BotaoVisualizar;
  let fixture: ComponentFixture<BotaoVisualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoVisualizar],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoVisualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
