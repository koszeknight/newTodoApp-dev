import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTodoListComponent } from './components/add-todo-list/add-todo-list.component';
import { environment } from '../Environment/environment'; // Adjust path as needed
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import {ViewTodoListComponent} from './components/view-todo-list/view-todo-list.component';





@NgModule({
  declarations: [
    AppComponent,
    AddTodoListComponent,
    ViewTodoListComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Provide Realtime Database
    provideDatabase(() => getDatabase()),
    //provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Add here
   // provideFirestore(() => getFirestore()) // Add here
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
