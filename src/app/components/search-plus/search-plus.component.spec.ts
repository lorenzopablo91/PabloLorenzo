import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlusComponent } from './search-plus.component';

describe('SearchPlusComponent', () => {
  let component: SearchPlusComponent;
  let fixture: ComponentFixture<SearchPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPlusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
