import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPropiedadesComponent } from './lista-propiedades.component';

describe('ListaPropiedadesComponent', () => {
  let component: ListaPropiedadesComponent;
  let fixture: ComponentFixture<ListaPropiedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPropiedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
