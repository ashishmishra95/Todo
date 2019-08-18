import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) {}
  gettoDoList(id: string) {
    this.toDoList = this.firebasedb.list(`titles/${id}`);
    console.log(this.toDoList);
    return this.toDoList;
  }
  // Adding new items in list
  addTitle(id: string, title: string) {
    this.toDoList.push({
      title: title,
      dateAdded: Date.now(),
      isChecked: false
    });
  }
  // Unique key  to identify items in the list
  checkOrUncheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }
  removeTitle($key: string) {
    this.toDoList.remove($key);
  }
}
