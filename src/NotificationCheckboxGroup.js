import { Modal, Checkbox, styled } from '@nextui-org/react';

const CustomCheckbox = styled(Checkbox, {
  '.nextui-checkbox-container': {
    borderRadius: '3px'
  },
})

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
      css={{borderRadius: '3px'}}
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
          {options.map((el, index) => <CustomCheckbox value={index} key={index}>{el}</CustomCheckbox>)}
        </Checkbox.Group>
      </Modal.Body>
    </Modal>
  );
}
