import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import classes from "./App.module.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button variant="primary">Bootstrap Test</Button>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Modal Test
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
