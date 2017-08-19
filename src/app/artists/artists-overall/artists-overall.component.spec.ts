import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsOverallComponent } from './artists-overall.component';

describe('ArtistsOverallComponent', () => {
  let component: ArtistsOverallComponent;
  let fixture: ComponentFixture<ArtistsOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistsOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
