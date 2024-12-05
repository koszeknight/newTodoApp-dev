import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoListComponent } from './components/add-todo-list/add-todo-list.component';
import { ViewTodoListComponent } from './components/view-todo-list/view-todo-list.component';
import { EditTodoListComponent } from './components/edit-todo-list/edit-todo-list.component';
const routes: Routes = [
  {path:'view-todoList', component:ViewTodoListComponent },
  {path:'add-Todos', component:AddTodoListComponent },
  {path:'edit-TodoList', component: EditTodoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
