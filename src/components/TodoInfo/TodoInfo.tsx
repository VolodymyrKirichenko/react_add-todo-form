import { FC } from 'react';
import classNames from 'classnames';
import Paper from '@mui/material/Paper';
import { PreparedTodo } from '../../types/app.typedefs';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: PreparedTodo,
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    title,
    id,
    user,
    completed,
  } = todo;

  return (
    <Paper elevation={2}>
      <article
        data-id={id}
        className={classNames('todoInfo', {
          'todoInfo--completed': completed,
        })}
      >
        <h2 className="todoInfo__title">
          {title}
        </h2>

        {user && (
          <UserInfo user={user} />
        )}
      </article>
    </Paper>
  );
};
