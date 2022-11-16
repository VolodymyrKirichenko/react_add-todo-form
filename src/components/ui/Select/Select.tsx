import { FC } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import cn from 'classnames';
import Select from '@mui/material/Select';
import usersFromServer from '../../../api/users';

interface Props {
  selectedUser: string;
  setSelectedUser: (user: string) => void;
  hasSelectedError: boolean;
}

export const SelectUi: FC<Props> = (props) => {
  const { hasSelectedError, setSelectedUser, selectedUser } = props;

  return (
    <div className="field">
      <div className="input">
        <FormControl sx={{ m: 1, width: 300, margin: 0 }}>
          <InputLabel
            id="demo-multiple-name-label"
            color={!selectedUser && hasSelectedError ? 'error' : 'primary'}
          >
            Name
          </InputLabel>

          <Select
            color={!selectedUser && hasSelectedError ? 'error' : 'primary'}
            error={!selectedUser && hasSelectedError}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectedUser}
            onChange={(e) => (
              setSelectedUser(e.target.value))}
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

      <div
        className={cn('error', {
          isError: (!selectedUser && hasSelectedError),
        })}
      >
        Please choose a user
      </div>
    </div>
  );
};
