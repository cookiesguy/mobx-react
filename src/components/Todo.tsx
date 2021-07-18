import { observer } from 'mobx-react';
import { useState } from 'react';

import { todo, Item } from '../mobx/store';

function Todo() {
   const [input, setInput] = useState('');

   const handleInputChange = (e: any) => {
      setInput(e.target.value);
   };

   return (
      <div className="todo">
         <button
            className="get-btn"
            onClick={() => {
               todo.getTodo();
            }}
         >
            Get todo
         </button>
         <input
            value={input}
            onChange={handleInputChange}
            placeholder="Todo name"
         ></input>
         <button
            className="add-btn"
            onClick={() => {
               const len = todo.TodoItem.length - 1;
               const newItem: Item = {
                  title: input,
                  id: todo.TodoItem[len].id + 1,
                  finished: false,
               };
               todo.addTodo(newItem);
            }}
         >
            Add
         </button>
         {todo.loading && <p>Loading...</p>}
         {todo.getSortTodo().map((item: Item) => (
            <div className="todo-item" key={item.id}>
               <p>Id: {item.id} </p>
               <p>Title: {item.title}</p>
               <p>Completed: {`${item.finished}`}</p>
               <button
                  className="delete-btn"
                  onClick={() => {
                     todo.removeItem(item.id);
                  }}
               >
                  Delete
               </button>
            </div>
         ))}
      </div>
   );
}
export default observer(Todo);
