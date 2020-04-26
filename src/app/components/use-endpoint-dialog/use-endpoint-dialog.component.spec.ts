import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseEndpointDialogComponent } from './use-endpoint-dialog.component';

describe('UseEndpointDialogComponent', () => {
  let component: UseEndpointDialogComponent;
  let fixture: ComponentFixture<UseEndpointDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseEndpointDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseEndpointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
