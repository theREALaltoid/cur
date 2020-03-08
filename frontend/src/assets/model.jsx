import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
const ModalExample = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Create Entry
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Enter purchased</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleNumber">Asset Value</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  placeholder="Optional"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Asset Cost</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  placeholder="required"
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Troy Ounces Purchased</Label>
              <Input
                type="number"
                name="number"
                id="exampleNumber"
                placeholder="required"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleDate">Date Purchased</Label>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="required"
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
