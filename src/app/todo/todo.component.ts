import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  uId: string;
  constructor(private toDoService: TodoService) {}

  ngOnInit() {
    this.uId = firebase.auth().currentUser.uid;
    this.toDoService
      .gettoDoList(this.uId)
      .snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        // sort array isChecked false --> true
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  // Receive title from textbox
  onAdd(itemTitle) {
    this.toDoService.addTitle(this.uId, itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUncheckTitle($key, !isChecked);
  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }
}
