import moment from "moment";
import dataCall from "../assets/dataCall";
const accessString = localStorage.getItem("JWT");
import React, { useState, useReducer } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import {
  clickedAction,
  dropdownClickedAction,
  actions
} from "../redux/actions/index";

export const Example = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      assetType: "Silver",
      assetValue: "",
      assetCost: 0,
      ouncesIn: 0,
      datePurchased: ""
    }
  );
  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  };

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const postData = evt => {
    console.log(moment(userInput.datePurchased).format("MM-DD-YYYY"));
    axios({
      method: "post",
      headers: { Authorization: "Bearer " + accessString },
      url: "http://localhost:3000/asset",
      data: {
        asset: userInput.assetType,
        purchaseDate: userInput.datePurchased + "T00:00:00",
        sellDate: "2019-01-03",
        purchasePrice: userInput.assetCost,
        sellPrice: 0,
        ouncesIn: userInput.ouncesIn,
        assetValue: userInput.assetValue
      }
    })
      .then(response => response)
      .then(response => {
        dataCall(props.desiredLength, props.spotPrice);
        props.fetchData();
      })
      .catch(error => console.log(error));
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
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  Asset Type: {userInput.assetType}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    name="assetType"
                    onClick={handleChange}
                    value="Silver"
                  >
                    Silver
                  </DropdownItem>
                  <DropdownItem
                    name="assetType"
                    onClick={handleChange}
                    value="Gold"
                  >
                    Gold
                  </DropdownItem>
                  <DropdownItem
                    name="assetType"
                    onClick={handleChange}
                    value="Copper"
                  >
                    Copper
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Asset Value</Label>

              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  name="assetValue"
                  id="exampleNumber"
                  placeholder="required"
                  onChange={handleChange}
                  value={userInput.assetValue}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Asset Cost</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>

                <Input
                  type="number"
                  name="assetCost"
                  id="exampleNumber"
                  placeholder="required"
                  onChange={handleChange}
                  value={userInput.assetCost}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Total Ounces</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend"></InputGroupAddon>

                <Input
                  type="number"
                  name="ouncesIn"
                  id="exampleNumber"
                  placeholder="required"
                  onChange={handleChange}
                  value={userInput.ouncesIn}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Date Purchased</Label>

              <Input
                type="date"
                name="datePurchased"
                id="exampleDate"
                placeholder="required"
                required
                onChange={handleChange}
                value={userInput.datePurchased}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={postData}>
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
    asset: state.asset,
    fetch: state.dataFetch
  };
};
const MapDispatchToProps = dispatch => {
  return {
    clickedAction: () => dispatch(clickedAction),
    dropdownClickedAction: () => dispatch(dropdownClickedAction),
    fetchData: () => dispatch(actions.fetchData())
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Example);
