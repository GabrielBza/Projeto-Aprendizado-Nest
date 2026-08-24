import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEditar } from './botao-editar';

describe('BotaoEditar', () => {
  let component: BotaoEditar;
  let fixture: ComponentFixture<BotaoEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoEditar],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoEditar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
