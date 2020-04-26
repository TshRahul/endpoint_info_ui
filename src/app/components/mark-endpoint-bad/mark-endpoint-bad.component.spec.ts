import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEndpointBadComponent } from './mark-endpoint-bad.component';

describe('MarkEndpointBadComponent', () => {
  let component: MarkEndpointBadComponent;
  let fixture: ComponentFixture<MarkEndpointBadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkEndpointBadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkEndpointBadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
