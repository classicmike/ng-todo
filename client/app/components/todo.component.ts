import { Component, OnInit } from '@angular/core';
import { TodoService} from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: `todo.component.html`,
})
export class TodoComponent implements OnInit  { 
  todos: Todo[];

  constructor(private _todoService: TodoService){
    
  }

  ngOnInit(){
    this.todos = [];

    this._todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      })
  }
}