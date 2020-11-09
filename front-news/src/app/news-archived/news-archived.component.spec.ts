import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArchivedComponent } from './news-archived.component';

describe('NewsArchivedComponent', () => {
  let component: NewsArchivedComponent;
  let fixture: ComponentFixture<NewsArchivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsArchivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
