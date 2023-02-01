import { Modal, Checkbox, styled } from '@nextui-org/react';

const CustomCheckbox = styled(Checkbox, {
  '.nextui-checkbox-text': {
    fontSize: '$lg'
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
      css={{borderRadius: '$xs'}}
      open={open}
      onClose={handleClose}
      className="modal-container"
      /* width="480px" */
      blur
    >
      <Modal.Body css={{padding: '30px'}}>
        <Checkbox.Group
          value={selected}
          color="primary"
          label="Select time"
          onChange={handleChange}
          name={name}
          css={{
            '.nextui-checkbox-group-items': {
              '& label:not(:first-child)': {
                marginTop: '20px'
              }
            }
          }}
        >
          {options.map((el, index) => <CustomCheckbox size='lg' value={index} key={index}>{el}</CustomCheckbox>)}
        </Checkbox.Group>
      </Modal.Body>
    </Modal>
  );
}
