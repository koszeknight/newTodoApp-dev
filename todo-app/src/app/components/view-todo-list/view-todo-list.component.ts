import { Component , Output , EventEmitter } from '@angular/core';
import { ViewItems } from 'src/app/models/view-items';
import { Items } from 'src/app/models/items';
import { TodofirebaseService } from 'src/app/services/todofirebase.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Adjust the path if necessary
import { MatDialog } from '@angular/material/dialog';
import { UpdateItem } from 'src/app/models/update-item';

@Component({
  selector: 'app-view-todo-list',
  standalone: false,
  templateUrl: './view-todo-list.component.html',
  styleUrl: './view-todo-list.component.css'
})
export class ViewTodoListComponent {
  constructor(
    private firebaseService: TodofirebaseService,
    private dialog: MatDialog) { }
  todos: any[] = [];

  // public listItems: Items[] = [];
  public listItems: any = [];
  public rowIndex!: number;
  //selectedItems!: ViewItems;
  selectedItems!: UpdateItem;
  showEditTask!: boolean;
  showAddTask!: boolean;



  public selectItem(selectedRow: number, item: UpdateItem) {
    this.rowIndex = selectedRow;
    this.selectedItems = item;
    console.log("this is the value of key "+this.selectedItems.key)
  }

  ngOnInit() {
    this.getData();
  }

  /*
  async getData(){
    this.todos = await this.firebaseService.getTodos();
    console.log(this.todos);
    this.listItems = this.todos;
   }
  */

  async getData() {

    this.todos = await this.firebaseService.getTodos();
    console.log(this.todos);
    this.listItems = Object.entries(this.todos).map(([key, value]) => ({
      key,
      ...value,
    })); // Adding the key to each item so we can reference it for deletion
  }

  // Delete selected todo item
  async deleteTodoItem(todoKey: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        // If the user confirmed the deletion, proceed with deleting the todo item
        try {
          await this.firebaseService.deleteTodo(todoKey);
          // After deletion, refresh the data
          await this.getData();

          // console.log(`Todo with key ${todoKey} deleted successfully.`);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      } else {
        // If the user canceled the action
        console.log('Todo deletion canceled');
      }
    });
  }

  // Upadte as Completed item 
  async updateToComplete(todoKey: string): Promise<void> {
    try {
      await this.firebaseService.updateAsompleted(todoKey);
      // After deletion, refresh the data
      alert("Upadate as Completed");
      await this.getData();
      // console.log(`Todo with key ${todoKey} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  
  // Upadte as Completed item 
  async revertComplete(todoKey: string): Promise<void> {
    try {
      await this.firebaseService.revertComplete(todoKey);
      // After deletion, refresh the data
      alert("Revert as UnCompleted");
      await this.getData();
      // console.log(`Todo with key ${todoKey} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  OpenEditProductView(){
    this.showEditTask = true;
  }

  closeEditView(){
    this.showEditTask = false;
  }

  closeAddView(){
    this.showAddTask = false;
  }

  showAddTasks(){
         this.showAddTask =true;
  }

}
