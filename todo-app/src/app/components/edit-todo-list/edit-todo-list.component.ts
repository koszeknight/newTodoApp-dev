import { Component, Input,Output ,EventEmitter} from '@angular/core';
import { ViewItems } from 'src/app/models/view-items';
import {FormBuilder, Validators} from '@angular/forms';
import { TodofirebaseService } from 'src/app/services/todofirebase.service';
import { Items } from 'src/app/models/items';
import { UpdateItem } from 'src/app/models/update-item';

@Component({
  selector: 'app-edit-todo-list',
  templateUrl: './edit-todo-list.component.html',
  styleUrl: './edit-todo-list.component.css'
})
export class EditTodoListComponent {
 @Input() todoItems!:UpdateItem ;
 
 @Output() cancelEditView: EventEmitter<void> = new EventEmitter<void> ();
 @Output() refreshTodoList: EventEmitter<void> = new EventEmitter<void> ();

 constructor(
  private fb: FormBuilder,
  private firebaseService: TodofirebaseService) {}


  

    cancel(){
      this.cancelEditView.emit();
    }
   
    async onSubmit(){
      //const {todoText} = this.ListFrom.value as { todoText : string }
      const key = this.todoItems.key
      const todoText =  this.todoItems.todoText;
      const newItem : UpdateItem ={
         key,
         todoText,
         isCompleted :false
      };
       
      console.log("newItem key" + newItem.key);
      console.log("newItem todoText" + newItem.todoText);

     try {
     await this.firebaseService.editTask(newItem);
      // After deletion, refresh the data
      alert("Upadated task");
      this.refreshTodoList.emit();
     } catch(error){
      console.error('Error onSubmit function :', error);
     }
        console.log("This is the onSubmit seciton");
  }
  
  

}
