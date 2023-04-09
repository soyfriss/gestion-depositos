import { useRef } from 'react';
import { Button } from 'react-admin';
import SignaturePad from 'react-signature-canvas';
import './sigCanvas.css';

const Signature = ({ saveSignature, close }) => {
  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();
  const save = () => {
    saveSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    clear();
  };

  return (
    <>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          // width: 500,
          // height: 200,
          className: 'sigCanvas',
        }}
      />
      <div>
        <Button onClick={save} label="SAVE" />
        <Button onClick={clear} label="CLEAR" />
      </div>
    </>
  );
};

export default Signature;
