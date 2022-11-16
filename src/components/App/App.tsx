import './App.scss';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TodoList } from '../TodoList';
import { PreparedTodo } from '../../types/app.typedefs';
import { Input } from '../ui/Input/Input';
import { SelectUi } from '../ui/Select/Select';
import { findUserById, getTodoId, preparedTodos } from './helpers/app.heplers';

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
                <Input
                  title={title}
                  handleChange={handleChange}
                  isTitleError={isTitleError}
                />

                <SelectUi
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  hasSelectedError={hasSelectedError}
                />

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
