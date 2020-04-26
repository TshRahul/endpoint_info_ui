import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointInfoComponent } from './endpoint-info.component';

describe('EndpointInfoComponent', () => {
  let component: EndpointInfoComponent;
  let fixture: ComponentFixture<EndpointInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
