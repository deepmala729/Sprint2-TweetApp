import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharetweetComponent } from './sharetweet.component';

describe('SharetweetComponent', () => {
  let component: SharetweetComponent;
  let fixture: ComponentFixture<SharetweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharetweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharetweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
