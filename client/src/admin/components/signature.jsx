import React, { Component } from 'react'
import { Button } from '@mui/material';
import SignaturePad from 'react-signature-canvas';
import styles from './signature.module.css';

class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trimmedDataURL: ''
    }
    this.sigPad = {}
  }

  clear = () => {
    this.sigPad.clear()
  }

  save = () => {
    if (this.sigPad.isEmpty()) {
      this.setState({
        trimmedDataURL: ''
      });
    } else {
      this.setState({
        trimmedDataURL: this.sigPad.getTrimmedCanvas()
          .toDataURL('image/png')
      });
    }
  }

  componentDidUpdate() {
    this.props.setSignatureCanvas(this.state.trimmedDataURL);
  }

  render() {
    let { trimmedDataURL } = this.state

    return (
      <div>
        <div>
          <SignaturePad canvasProps={{ className: styles.sigCanvas }}
            ref={(ref) => { this.sigPad = ref }} />
        </div>
        <div>
          <Button onClick={this.save} variant="outlined" sx={{ mr: 2 }}>SAVE</Button>
          <Button onClick={this.clear} variant="outlined">CLEAR</Button>
        </div>
        {trimmedDataURL
          ? <img className={styles.sigImage}
            src={trimmedDataURL} />
          : null}
      </div>
    );

  }
}

export default Signature;
