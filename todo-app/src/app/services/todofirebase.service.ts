import { Injectable, inject } from '@angular/core';
import { collection, CollectionReference, addDoc } from '@angular/fire/firestore';

import { Database, ref, set, push, getDatabase, child, get, remove, update } from '@angular/fire/database';
import { merge } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodofirebaseService {
  // private firestore = inject(Firestore);
  //todoCollection = collection(this.firestore, 'todo');
  private database = inject(Database);
  public todokey!: string;
  //private todoCollection: CollectionReference = collection(this.firestore, 'todo'); // Use AngularFire's collection

  /*
   async addTodo(data: any): Promise<void> {
     try {
       await addDoc(this.todoCollection, data);
       console.log('Todo added successfully');
     } catch (error) {
       console.error('Error adding todo:', error);
       // Handle errors, e.g., display error messages to the user
     }
   }*/


  /*
   async addTodo(data: any): Promise<void> {
     try {
       await addDoc(this.todoCollection, data); // Add document to the collection
       console.log('Todo added successfully');
     } catch (error) {
       console.error('Error adding todo:', error);
       // Handle errors
     } 
   }*/


  async addTodo(data: any): Promise<void> {
    try {
      // Create a reference to the 'todo' collection
      const todoRef = ref(this.database, 'todo'); // Base path
      // Push a new entry under the 'todo' collection
      const newTodoRef = push(todoRef);
      // Set the value of the new entry
      console.log('Expire Data' + data.expiredDate);
      await set(newTodoRef, data);
      console.log('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  /*
      async getTodos(): Promise<any[]> {
        try {
          // Create a reference to the root of the database
          const dbRef = ref(this.database);
      
          // Create a reference to the 'todo' collection
          const todoRef = child(dbRef, 'todo');
      
          // Fetch the data using the 'get' method
          const snapshot = await get(todoRef);
      
          // Check if data exists
          if (snapshot.exists()) {
            const data = snapshot.val() as Record<string, any>; // Ensure data is typed as an object
            console.log('Todos fetched successfully:', data);
            // Convert the data into an array
            return Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          } else {
            console.log('No todos found');
            return [];
          }
        } catch (error) {
          console.error('Error fetching todos:', error);
          throw error;
        }  
      } 


  // Existing method to get todos
  /*async getTodos(): Promise<any> {
    const todoRef = ref(this.database, 'todos');
    const snapshot = await get(todoRef); // Get the data

    console.log("Snapshopt data "+snapshot.val())
    return snapshot.val(); // Return the snapshot data
  }*/


  async getTodos(): Promise<any[]> {
    try {
      // Create a reference to the root of the database
      const dbRef = ref(this.database);

      // Create a reference to the 'todo' collection
      const todoRef = child(dbRef, 'todo');

      // Fetch the data using the 'get' method
      const snapshot = await get(todoRef);

      // Check if data exists
      if (snapshot.exists()) {
        // const data = snapshot.val() as Record<string, any>; // Ensure data is typed as an object
        //console.log('Todos fetched successfully:', data);
        // Convert the data into an array
        //return Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        return snapshot.val();
      } else {
        console.log('No todos found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }


  // New method to delete a todo by its key
  async deleteTodo(todoKey: string): Promise<void> {
    try {
      const todoRef = ref(this.database, `todo/${todoKey}`); // Path to the specific todo item using the generated key
      await remove(todoRef); // Delete the item from the database
      console.log(`Todo with key ${todoKey} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }


  // New method to delete a todo by its key
  async updateAsompleted(todoKey: string): Promise<void> {
    try {
      const todoRef = ref(this.database, `todo/${todoKey}`);
      await update(todoRef, { isCompleted: true });
      // isCompleted status should have to update as true;
      console.log(`Todo with key ${todoKey} marked as completed.`);
    } catch (error) {
      console.error('Error updating isCompleted status:', error);
      //console.error('Error deleting todo:', error);
    }
  }

  // New method to delete a todo by its key
  async revertComplete(todoKey: string): Promise<void> {
    try {
      const todoRef = ref(this.database, `todo/${todoKey}`);
      await update(todoRef, { isCompleted: false });
      // isCompleted status should have to update as true;
      console.log(`Todo with key ${todoKey} marked as uncompleted.`);
    } catch (error) {
      console.error('Error updating isCompleted status:', error);
      //console.error('Error deleting todo:', error);
    }
  }

  async editTask(data: any): Promise<void> {
     this.todokey = data.key;
     const keyValue = this.todokey;
    console.log("todoKey value " + keyValue);
    const todoUpatedText = data.todoText;
    console.log("this is the todoUpadateText: " + todoUpatedText);
    console.log("this is the textUpdate date: " + data.expiredDate);
    try {
      const todoRef = ref(this.database, `todo/${keyValue}`);
      await update(todoRef, { todoText: data.todoText , expiredDate : data.expiredDate});
      // isCompleted status should have to update as true;
      console.log(`Todo with key ${this.todokey} marked as uncompleted.`);
    } catch (error) {
      console.error('Error updating isCompleted status:', error);
      //console.error('Error deleting todo:', error);
    }
  }

}