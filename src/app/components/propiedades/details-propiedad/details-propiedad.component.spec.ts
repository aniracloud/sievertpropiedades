import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPropiedadComponent } from './details-propiedad.component';

describe('DetailsPropiedadComponent', () => {
  let component: DetailsPropiedadComponent;
  let fixture: ComponentFixture<DetailsPropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
