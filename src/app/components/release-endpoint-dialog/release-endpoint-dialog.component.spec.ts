import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseEndpointDialogComponent } from './release-endpoint-dialog.component';

describe('ReleaseEndpointDialogComponent', () => {
  let component: ReleaseEndpointDialogComponent;
  let fixture: ComponentFixture<ReleaseEndpointDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseEndpointDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseEndpointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
