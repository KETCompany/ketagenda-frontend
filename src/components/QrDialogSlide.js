import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import QRCode from 'qrcode.react';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class QrDialogSlide extends Component {
  render() {
    const { open, handleQRClickClose, value } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          transition={Transition}
          keepMounted
          onClose={handleQRClickClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <QRCode
              value={value}
              size='128'
             />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default QrDialogSlide;
