import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    templateUrl: './todo.edit.component.html'
})
export class TodoEditComponent implements OnInit {

    public todoItem: any;

    public constructor(private http: Http, private route: ActivatedRoute, private location: Location) {
        this.todoItem = {
            "id": 0,
            "name": "Your name here!",
            "isComplete": false
        } as TodoItem;
    } 

    public ngOnInit() {
        this.route.params.subscribe(params => {
            if(params["id"] && params["id"] > 0) {
                this.http.get("/api/todos/" + params["id"])
                    .subscribe(results => {
                        this.todoItem = results.json() as TodoItem;
                        // this.person.document_id = params["documentId"];
                    }, error => {
                        console.error(error);
                    });
            }
        });
    }

    public save() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let promise;
        
        if (this.todoItem.id === 0 ) {
            promise = this.http.post("/api/todos", JSON.stringify(this.todoItem), options);
        } else {
            promise = this.http.put("/api/todos/" + this.todoItem.id, JSON.stringify(this.todoItem), options);
        }
        
        promise.subscribe(results => {
            this.location.back();
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