import React from 'react';
import { Button, Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

export const ConfirmationModal = ({ text, submit, cancel, ...rest }) => (
    <>
      <Modal.Body>
        <h4>{ text }</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="success" onClick={ submit }>Submit</Button>
        <Button onClick={ cancel }>Close</Button>
      </Modal.Footer>
    </>
);

ConfirmationModal.propTypes = {
  text: PropTypes.string,
  submit: PropTypes.func,
  cancel: PropTypes.func,
};
