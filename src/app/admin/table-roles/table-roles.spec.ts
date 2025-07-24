import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRoles } from './table-roles';

describe('TableRoles', () => {
  let component: TableRoles;
  let fixture: ComponentFixture<TableRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
