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
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
const axios = require("axios");
const accessString = localStorage.getItem("JWT");
import dataCall from "../assets/dataCall";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import postProductsAction from "../redux/postAsset";
import {
  clickedAction,
  fetchData,
  postProducts,
  postProductsPending
} from "../redux/actions/index";

export const Example = props => {
  const createEntry = event => {
    console.log(this.props.desiredDate);
  };

  return (
    <div>
      <Button color="danger" onClick={props.clickedAction}>
        Create Entry
      </Button>

      <Modal isOpen={props.modal} toggle={props.clickedAction}>
        <ModalHeader toggle={props.clickedAction}>Enter purchased</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Dropdown>
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Silver</DropdownItem>
                  <DropdownItem>Gold</DropdownItem>
                  <DropdownItem>Copper</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Asset Value</Label>
              /*
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  placeholder="Optional"
                />
              </InputGroup>
              */
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Asset Cost</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                /*{" "}
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  placeholder="required"
                  required
                />
                *//
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Input
                name="number"
                id="exampleNumber"
                placeholder="required"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleDate">Date Purchased</Label>
              /*{" "}
              <Input
                type="date"
                name="date"
                id="exampleDate"
                placeholder="required"
                required
              />
              */
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.onFetchData}>
            Do Something
          </Button>
          <Button color="secondary" onClick={props.clickedAction}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const MapStateToProps = state => {
  return {
    modal: state.modal,
    todos: state.todos
  };
};
const MapDispatchToProps = dispatch => {
  return {
    clickedAction: () => dispatch(clickedAction),
    onFetchData: () => dispatch(fetchData(accessString))
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Example);
