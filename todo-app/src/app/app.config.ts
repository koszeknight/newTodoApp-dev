import {ApplicationConfig , importProvidersFrom} from "@angular/core";
import { provideRouter } from "@angular/router";
//import {provideFirebaseApp, getApp,initializeApp} from "@angular/fire/app";
//import {getFirestore,provideFirestore} from "@angular/fire/firestore";


const firebaseConfig = {


};




export const appConfig: ApplicationConfig ={

providers: [
    importProvidersFrom([
      //  provideFirebaseApp(()=> initializeApp(firebaseConfig)),
       // provideFirestore(() => getFirestore()),
]),

],

}
     
