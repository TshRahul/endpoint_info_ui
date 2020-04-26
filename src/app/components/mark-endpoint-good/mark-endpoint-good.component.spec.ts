import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEndpointGoodComponent } from './mark-endpoint-good.component';

describe('MarkEndpointGoodComponent', () => {
  let component: MarkEndpointGoodComponent;
  let fixture: ComponentFixture<MarkEndpointGoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkEndpointGoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkEndpointGoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
