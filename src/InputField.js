import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { memo } from 'react';

export default memo(function InputField({
  name,
  id,
  label,
  type = 'text',
  placeholder,
  value,
  checked,
  ...props
}) {
  console.log(label)
  return (
    <div
      className={`input-field input-field--${type} input-field--${type}${
        type === 'radio' && value ? '--' + value : ''
      } ${checked ? 'input-field--' + type + '--checked' : ''}`}
    >
      <label
        htmlFor={id || name}
        className={`input-field__label input-field__label--${type}`}
      >
        {label}
      </label>
      <input
        id={id || name}
        name={name}
        type={type}
        className={`input-field__input input-field__input--${type} input-field__input--${type}${
          type === 'radio' && value ? '--' + value : ''
        }`}
        placeholder={placeholder}
        key={name === 'date' ? value || props.defaultValue : ''}
        value={value}
        checked={checked}
        {...props}
      ></input>
      {type === 'radio' && checked && <CheckRoundedIcon className='input-field--radio-icon'/>}
    </div>
  );
})
