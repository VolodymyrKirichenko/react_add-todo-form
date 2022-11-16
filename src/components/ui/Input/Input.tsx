import TextField from '@mui/material/TextField';
import cn from 'classnames';
import React, { FC } from 'react';

interface Props {
  title: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isTitleError: boolean;
}

export const Input: FC<Props> = (props) => {
  const { title, isTitleError, handleChange } = props;

  return (
    <div className="field">
      <div className="input">
        <TextField
          color={isTitleError ? 'error' : 'primary'}
          error={isTitleError}
          autoComplete="off"
          sx={{ width: 300 }}
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div
        className={cn('error', { isError: isTitleError })}
      >
        Please enter a title
      </div>
    </div>
  );
};
