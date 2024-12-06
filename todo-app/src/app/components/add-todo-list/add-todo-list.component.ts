import { Component,Output,EventEmitter } from '@angular/core';
import { TodofirebaseService } from 'src/app/services/todofirebase.service';
import {FormBuilder, Validators} from '@angular/forms';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-add-todo-list',
  templateUrl: './add-todo-list.component.html',
  styleUrls: ['./add-todo-list.component.css']
})
export class AddTodoListComponent {
  @Output() refreshTodoList : EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelAddView: EventEmitter<void> = new EventEmitter<void> ();

  constructor(
    private fb: FormBuilder,
    private firebaseService: TodofirebaseService) {}
  ListFrom = this.fb.group({
    todoText: ['', Validators.required],
    // isCompleted: ['', Validators.required],
  });

//constructor() {}

get f() {
  return this.ListFrom.controls;
}

  addData(){
    const { todoText } = this.ListFrom.value as { todoText: string };
    //const { todoItem }  =  this.ListFrom.value;
    const newItem: Items={
      todoText,          // Value from the form
      isCompleted: false // Default value for isCompleted
     }; 
    
     //const newItem = {text: 'Learn Angular practicles' , isCompleted: "true"};

     console.log("Items data "+newItem.todoText +",");
     this.firebaseService
     .addTodo(newItem)
     .then(() => {
        console.log('Data added Successfully');
        alert("Data added successfully");
        this.refreshTodoList.emit();
        
     }).catch((error) => {
        console.error("Error adding data",error);
     });
  }

  close(){
    this.cancelAddView.emit();
  }


    
}
