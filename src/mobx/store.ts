import { action, observable, makeAutoObservable, computed } from 'mobx';

export interface Item {
   id: number;
   title: string;
   finished: boolean;
}

class Todo {
   @observable // Just a decoration to know this is observable state ,can remove it
   TodoItem: Array<Item>;
   loading: boolean;
   constructor(items: Array<Item>) {
      this.TodoItem = items;
      makeAutoObservable(this);
      this.loading = false;
   }

   @action // Just a decoration to know this is an action to change state can remove it
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
   @computed
   getSortTodo(): Array<Item> {
      const sorted = this.TodoItem.slice().sort((a, b) => a.id - b.id);
      return sorted;
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
