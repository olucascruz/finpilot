import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetasDialog } from './metas-dialog';

describe('MetasDialog', () => {
  let component: MetasDialog;
  let fixture: ComponentFixture<MetasDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetasDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetasDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
