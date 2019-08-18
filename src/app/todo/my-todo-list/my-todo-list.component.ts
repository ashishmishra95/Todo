import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

import * as firebase from 'firebase';
export interface TODO {
  title: string;
  dateAdded: number;
  isChecked: boolean;
}

@Component({
  selector: 'app-my-todo-list',
  templateUrl: './my-todo-list.component.html',
  styleUrls: ['./my-todo-list.component.css']
})
export class MyTodoListComponent implements OnInit {
  iD: string;
  todoList: TODO[] = [];
  filteredList: TODO[][] = [];
  constructor(private todo: TodoService) {}

  ngOnInit() {
    this.iD = firebase.auth().currentUser.uid;
    this.todo
      .gettoDoList(this.iD)
      .snapshotChanges()
      .subscribe(item => {
        this.todoList = [];
        item.forEach(element => {
          const x = element.payload.val();
          x['$key'] = element.key;
          this.todoList.push(x);
        });
        // sort array isChecked false --> true
        this.todoList.sort((a, b) => {
          return b.dateAdded - a.dateAdded;
        });
        let temp: TODO[] = [];
        let d = new Date(this.todoList[0].dateAdded).toDateString();
        this.todoList.forEach(td => {
          const dVal = new Date(td.dateAdded).toDateString();
          if (dVal === d) {
            temp.push(td);
          } else {
            this.filteredList.push(temp);
            temp = [];
            temp.push(td);
          }
          d = dVal;
        });
        this.filteredList.push(temp);
        console.log(this.filteredList);
      });
  }
}
