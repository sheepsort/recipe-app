import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEdtComponent } from './recipe-edt.component';

describe('RecipeEdtComponent', () => {
  let component: RecipeEdtComponent;
  let fixture: ComponentFixture<RecipeEdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
