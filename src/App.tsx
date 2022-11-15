import './App.scss';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TodoList } from './components/TodoList';
import { PreparedTodo, User } from './types/app.typedefs';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

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
  const [todoList, setTodoList] = useState<PreparedTodo[]>(preparedTodos);
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
      id: getTodoId(todoList),
      title,
      completed: false,
      userId: Number(selectedUser),
      user: findUserById(Number(selectedUser)),
    };

    setTodoList(currentTodos => [...currentTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="app">
      <Paper elevation={5}>
        <Box
          sx={{
            backgroundColor: 'lightgrey',
          }}
        >
          <div className="app__body">
            <h1>Add todo form</h1>

            <form onSubmit={onSubmit}>
              <div className="gap">
                <div className="field">
                  <div className="input">
                    <TextField
                      sx={{ width: 300 }}
                      id="outlined-basic"
                      label="Message"
                      variant="outlined"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>

                  {isTitleError && (
                    <span className="error">Please enter a title</span>
                  )}
                </div>

                <div className="field">
                  <div className="input">
                    <FormControl sx={{ m: 1, width: 300, margin: 0 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Name
                      </InputLabel>

                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={selectedUser}
                        onChange={(event) => (
                          setSelectedUser(event.target.value))}
                        input={<OutlinedInput label="Name" />}
                      >
                        {usersFromServer.map((user) => {
                          const { id, name } = user;

                          return (
                            <MenuItem
                              key={id}
                              value={id}
                            >
                              {name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    {(!selectedUser && hasSelectedError) && (
                      <span className="error">Please choose a user</span>
                    )}
                  </div>
                </div>

                <Button
                  sx={{ width: 'max-content' }}
                  variant="contained"
                  endIcon={<SendIcon />}
                  data-cy="submitButton"
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </form>

            <TodoList todos={todoList} />
          </div>
        </Box>
      </Paper>
    </div>
  );
};
