import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPropiedadComponent } from './nueva-propiedad.component';

describe('NuevaPropiedadComponent', () => {
  let component: NuevaPropiedadComponent;
  let fixture: ComponentFixture<NuevaPropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
