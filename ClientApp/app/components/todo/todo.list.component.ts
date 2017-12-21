import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    templateUrl: './todo.list.component.html'
})
export class TodoListComponent {
    public todoItems: any[];

    public constructor(private http: Http, private route: ActivatedRoute, private location: Location) {
        this.http.get("/api/todos/")
            .subscribe(results => {
                this.todoItems = results.json() as TodoItem[];
            }, error => {
                console.error(error);
            });
    } 

    delete(todo: TodoItem) {
        // A protected click or warning would be smart here.
        this.http.delete('/api/todos/' + todo.id)
            .subscribe(results => {
                this.todoItems.splice(this.todoItems.indexOf(todo), 1);
            }, error => {
                console.error(error);
            });
    }

}

interface TodoItem {
    id: number;
    name: string;
    isComplete: boolean;
}