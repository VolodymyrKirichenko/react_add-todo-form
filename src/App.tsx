import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo, User } from './types/app.typedefs';
import { TodoList } from './components/TodoList';

const findUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);

const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => {
  const currentUser = findUserById(todo.userId);

  return {
    ...todo,
    user: currentUser,
  };
});

const getTodoId = (todos: PreparedTodo[]) => {
  const newId = Math.max(...todos.map(todo => todo.id));

  return newId + 1;
};

export const App = () => {
  const [todosList, setTodoList] = useState<PreparedTodo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [hasSelectedError, setHasSelectedError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelectedUser('');
    setHasSelectedError(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (isTitleError) {
      setIsTitleError(false);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setHasSelectedError(true);
    }

    if (!title.trim() || !selectedUser) {
      return;
    }

    const newTodo: PreparedTodo = {
      id: getTodoId(todosList),
      title,
      completed: false,
      userId: Number(selectedUser),
      user: findUserById(Number(selectedUser)),
    };

    setTodoList(currentTodos => [...currentTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="there should be a title here"
            value={title}
            onChange={handleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  key={id}
                  value={id}
                >
                  { name }
                </option>
              );
            })}
          </select>

          {(!selectedUser && hasSelectedError) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
