import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodoListComponent } from './view-todo-list.component';

describe('ViewTodoListComponent', () => {
  let component: ViewTodoListComponent;
  let fixture: ComponentFixture<ViewTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTodoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
