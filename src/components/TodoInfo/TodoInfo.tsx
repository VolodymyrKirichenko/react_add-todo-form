import { FC } from 'react';
import classNames from 'classnames';
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
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
