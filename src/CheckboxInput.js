import { useState } from 'react';
import { Modal } from '@nextui-org/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default function CheckboxInput({
  label,
  options,
  checked,
  handleChange,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="input-field input-field--select">
      <label
        htmlFor="custom-select"
        className="input-field__label input-field__label--select"
      >
        {label}
      </label>
      <div className="selected-items" onClick={handleOpen}>
        {checked.includes(true) ? (
          checked.map(
            (el, index) =>
              el && (
                <span className="input-field__selected__item" key={index}>
                  {options[index]}
                </span>
              )
          )
        ) : (
          <span className="input-field__selected__item">None</span>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        className="modal-container"
        css={{ borderRadius: '4px' }}
        width="480px"
      >
        <Modal.Body noPadding>
            <div className={`select-options`}>
              {options.map((op, index) => {
                return (
                  <label
                    className="select-options__label"
                    key={op.slice(0, 2) + index}
                    htmlFor={op.replaceAll(' ', '-')}
                  >
                    <span className="option__checkbox">
                      <input
                        type="checkbox"
                        className="option__checkbox__input"
                        name={op.replaceAll(' ', '-')}
                        id={op.replaceAll(' ', '-')}
                        value={index}
                        onChange={() => handleChange(index)}
                        checked={checked[index]}
                      />
                      {checked[index] ? (
                        <CheckBoxIcon
                          className="checkbox-icon checkbox-icon--checked"
                          fontSize="large"
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          className="checkbox-icon"
                          fontSize="large"
                        />
                      )}
                    </span>
                    {op}
                  </label>
                );
              })}
            </div>
            <button className="modal-container__button" onClick={handleClose}>
              OK
            </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
