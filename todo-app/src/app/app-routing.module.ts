import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoListComponent } from './components/add-todo-list/add-todo-list.component';
import { ViewTodoListComponent } from './components/view-todo-list/view-todo-list.component';
const routes: Routes = [
  {path:'view-todoList', component:ViewTodoListComponent },
  {path:'add-Todos', component:AddTodoListComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
