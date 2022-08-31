import {Injectable} from "@angular/core";

export interface Todo {
  _id: number;
  title: string;
  content: string;
  isCompleted: boolean;
}

@Injectable()
export class TodoService {
}
