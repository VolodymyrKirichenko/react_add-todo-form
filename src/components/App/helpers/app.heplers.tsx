import { PreparedTodo, User } from '../../../types/app.typedefs';
import usersFromServer from '../../../api/users';
import todosFromServer from '../../../api/todos';

export const findUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);

export const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => {
  const currentUser = findUserById(todo.userId);

  return {
    ...todo,
    user: currentUser,
  };
});

export const getTodoId = (todos: PreparedTodo[]) => {
  const newId = Math.max(...todos.map(todo => todo.id));

  return newId + 1;
};
