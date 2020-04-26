import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointDataComponent } from './endpoint-data.component';

describe('EndpointDataComponent', () => {
  let component: EndpointDataComponent;
  let fixture: ComponentFixture<EndpointDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
