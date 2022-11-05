import { Provider } from './Context';
import { useState } from 'react';

export type AppState = {
  todos: { id: number; text: string; done: boolean }[];
  onSubmiting: (data: string) => void;
  onDelete: (idNumber: number) => void;
  onRemove: (idNumber: number) => void;
};

type Props = {
  children: (props: AppState) => JSX.Element;
};
const Container = ({ children }: Props) => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'navigator', done: false },
    { id: 2, text: 'navigator2', done: false },
  ]);

  const handleAddTodo = (data: string) => {
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        { id: prevTodos.length + 1, text: data, done: false },
      ];
    });
  };
  const handleDeleting = (idNumber: number) => {
    setTodos(todos =>
      todos.filter(todo => {
        return todo.id !== idNumber;
      })
    );
  };
  const handleRemoving = (idNumber: number) => {
    setTodos(prevTodos => {return prevTodos.map(todo => {
      if(idNumber !== todo.id) {
        return todo
      } return {...todo, done: !todo.done}
    })})

    // setTodos(prevTodos =>
    //   prevTodos.map(todo => {
    //     if (inNumber === todo.id) {
    //       return { todo };
    //     }
    //     return { ...todo, done: !todo.done };
    //   })
    // );
  };
  const appState: AppState = {
    todos,
    onSubmiting: handleAddTodo,
    onDelete: handleDeleting,
    onRemove: handleRemoving,
  };

  return <Provider value={appState}>{children(appState)}</Provider>;
};

export default Container;
