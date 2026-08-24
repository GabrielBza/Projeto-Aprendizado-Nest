import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoDeletar } from './botao-deletar';

describe('BotaoDeletar', () => {
  let component: BotaoDeletar;
  let fixture: ComponentFixture<BotaoDeletar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoDeletar],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoDeletar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
