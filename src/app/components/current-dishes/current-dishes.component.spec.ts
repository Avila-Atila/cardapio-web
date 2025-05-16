import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDishesComponent } from './current-dishes.component';

describe('CurrentDishesComponent', () => {
  let component: CurrentDishesComponent;
  let fixture: ComponentFixture<CurrentDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
