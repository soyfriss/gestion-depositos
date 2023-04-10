import { useState } from 'react';
import { Toolbar, SaveButton, Confirm, useRecordContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';

const EditToolbarWithConfirmation = ({ title, content, save }) => {
  const record = useRecordContext();
  const { getValues } = useFormContext();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = async () => {
    setOpen(false);
    await save(getValues());
  };

  return (
    <>
      <Toolbar>
        <SaveButton type="button" onClick={handleClick} />
        <Confirm
          isOpen={open}
          title={title}
          content={content}
          onConfirm={handleConfirm}
          onClose={handleDialogClose}
        />
      </Toolbar>
    </>
  );
};

export default EditToolbarWithConfirmation;
