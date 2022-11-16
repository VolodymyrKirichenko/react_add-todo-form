import { FC } from 'react';
import { PreparedTodo } from '../../types/app.typedefs';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: PreparedTodo[];
}

export const TodoList: FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
