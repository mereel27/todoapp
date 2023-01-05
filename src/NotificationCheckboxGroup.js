import { Modal, Checkbox } from '@nextui-org/react';

export default function NotificationCheckboxGroup({
  open,
  selected,
  handleClose,
  handleChange,
  options,
  name,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="modal-container"
      width="480px"
      blur
    >
      <Modal.Body css={{padding: '30px'}}>
        <Checkbox.Group
          value={selected}
          color="primary"
          label="Select time"
          onChange={handleChange}
          name={name}
        >
          {options.map((el, index) => <Checkbox value={index} key={index}>{el}</Checkbox>)}
        </Checkbox.Group>
      </Modal.Body>
    </Modal>
  );
}
