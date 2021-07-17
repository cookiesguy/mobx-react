import { action, observable, makeAutoObservable } from 'mobx';

export interface Item {
   id: number;
   title: string;
   finished: boolean;
}

class Todo {
   @observable
   TodoItem: Array<Item>;
   loading: boolean;
   constructor(items: Array<Item>) {
      this.TodoItem = items;
      makeAutoObservable(this);
      this.loading = false;
   }

   @action
   addTodo(item: Item): void {
      this.TodoItem.push(item);
   }

   @action
   removeItem(id: number): void {
      this.TodoItem = this.TodoItem.filter(item => item.id !== id);
   }

   @action
   getTodo(): void {
      this.loading = true;
      fetch('https://jsonplaceholder.typicode.com/todos')
         .then(res => res.json())
         .then(data => {
            const array: Array<Item> = [];
            const random: number = Math.floor(Math.random() * 100) + 0;
            const end: number = random < 190 ? random + 10 : 200;
            for (let i = random; i < end; i++) {
               array.push({
                  id: data[i].id,
                  title: data[i].title,
                  finished: data[i].completed,
               });
            }
            this.loading = false;
            this.TodoItem = array;
         });
   }
}

const arr: Array<Item> = [
   {
      title: 'Code mobx',
      id: 1,
      finished: false,
   },
];

const todo = new Todo(arr);

export { todo };
