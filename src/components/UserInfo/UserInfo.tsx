import { FC } from 'react';
import { User } from '../../types/app.typedefs';

interface Props {
  user: User,
}

export const UserInfo: FC<Props> = (props) => {
  const { user } = props;

  return (
    <a className="userInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
