import {Component, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {Todo} from "./service/service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  todoForm: FormGroup
  editForm: FormGroup
  private url = 'http://localhost:5000/api';
  private unsubscribe$ = new Subject<void>();
  todos: Todo[] = [];
  editId: number | null = null

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: '',
      content: '',
    })
    this.editForm = this.fb.group({
      title: '',
      content: '',
    })
  }

  ngOnInit() {
    this.http.get<Todo[]>(this.url)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(todos => this.todos = todos)
  }

  addTodo() {
    this.http.post<Todo>(this.url, this.todoForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(todo => {
        this.todos.push(todo)
        this.todoForm.reset()
      })
  }

  deleteTodo(id: number) {
    this.http.delete<void>(this.url + `/${id}`)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo._id !== id)
      })
  }

  editTodo() {
    const newTodo = {_id: this.editId, ...this.editForm.value}
    this.http.put<Todo>(this.url, newTodo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.todos = this.todos.map(todo => {
          if (todo._id === newTodo._id) return newTodo
          else return todo
        })
        this.editOff()
      })
  }

  editOn(todo: Todo) {
    this.editId = todo._id
    this.editForm.controls['title'].setValue(todo.title)
    this.editForm.controls['content'].setValue(todo.content)
  }

  editOff() {
    this.editId = null
    this.editForm.controls['title'].setValue(null)
    this.editForm.controls['content'].setValue(null)
  }
}
