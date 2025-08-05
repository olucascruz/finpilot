import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetasVsRealizado } from './metas';

describe('Metas', () => {
  let component: MetasVsRealizado;
  let fixture: ComponentFixture<MetasVsRealizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetasVsRealizado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetasVsRealizado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
