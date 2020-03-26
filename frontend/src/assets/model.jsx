import moment from "moment";
import dataCall from "../assets/dataCall";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import {
  inputNewEntry,
  openModal,
  actions,
  updateStateOfModal
} from "../redux/actions/index";
import "../css/modal.min.css";
import "../css/generalStyle.min.css";
import {} from "../redux/actions/index";
import { apiBaseUrl, dailySpotPriceURL } from "../assets/urlAssets";

const axios = require("axios");
export const Entrymodal = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const updateAsset = event => {
    axios(
      apiBaseUrl + "/asset",

      {
        method: "put",
        data: {
          postToUpdate: props.modal.postToUpdate,
          asset: props.modal.assetType,
          purchaseDate: moment(props.modal.datePurchased).format("MM-DD-YYYY"),
          sellDate: "2019-01-03",
          purchasePrice: props.modal.assetCost,
          sellPrice: 0,
          ouncesIn: props.modal.ouncesIn,
          assetValue: props.modal.assetValue
        },
        withCredentials: true
      }
    )
      .then(response => {
        dataCall(props.desiredLength, props.spotPrice);
        props.fetchData();
      })

      .catch(error => console.log(error));
  };
  const postData = evt => {
    axios(
      apiBaseUrl + "/asset",

      {
        method: "post",
        data: {
          asset: props.modal.assetType,
          purchaseDate: moment(props.modal.datePurchased).format("MM-DD-YYYY"),
          sellDate: "2019-01-03",
          purchasePrice: props.modal.assetCost,
          sellPrice: 0,
          ouncesIn: props.modal.ouncesIn,
          assetValue: props.modal.assetValue
        },
        withCredentials: true
      }
    )
      .then(response => response)
      .then(response => {
        dataCall(props.desiredLength, props.spotPrice);
        props.fetchData();
        props.inputNewEntry();
      })
      .catch(error => console.log(error));
  };
  const handleUpdate = event => {
    props.updateStateOfModal(event.target.value, event.target.name);
  };
  return (
    <div>
      <Button onClick={props.openModal}>Create Entry</Button>

      <Modal
        modalClassName={!props.dark ? "App" : "night"}
        isOpen={props.modal.modal}
        toggle={props.inputNewEntry}
      >
        <ModalHeader toggle={props.inputNewEntry}>Enter purchased</ModalHeader>
        <ModalBody className="modalContent">
          <Form>
            <FormGroup>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="modalButton" caret>
                  Asset Type:
                  {props.modal.assetType}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    name="assetType"
                    onClick={handleUpdate}
                    value="Silver"
                  >
                    Silver
                  </DropdownItem>
                  <DropdownItem
                    name="assetType"
                    onClick={handleUpdate}
                    value="Gold"
                  >
                    Gold
                  </DropdownItem>
                  <DropdownItem
                    name="assetType"
                    onClick={handleUpdate}
                    value="Copper"
                  >
                    Copper
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label for="EntrymodalNumber">Asset Value</Label>

              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  name="assetValue"
                  id="EntrymodalNumber"
                  placeholder="required"
                  onChange={handleUpdate}
                  value={props.modal.assetValue}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="EntrymodalNumber">Asset Cost</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>

                <Input
                  type="number"
                  name="assetCost"
                  id="EntrymodalNumber"
                  placeholder="required"
                  onChange={handleUpdate}
                  value={props.modal.assetCost}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="entryModalOunces">Total Ounces</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend"></InputGroupAddon>

                <Input
                  type="number"
                  name="ouncesIn"
                  id="entryModalOunces"
                  placeholder="required"
                  onChange={handleUpdate}
                  value={props.modal.ouncesIn}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="EntrymodalDate">Date Purchased</Label>

              <Input
                type="date"
                name="datePurchased"
                id="EntrymodalDate"
                placeholder="required"
                required
                onChange={handleUpdate}
                value={moment(props.modal.datePurchased).format("YYYY-MM-DD")}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            className="modalButton"
            onClick={props.modal.update === true ? updateAsset : postData}
          >
            {props.modal.update === true ? "Update" : "Submit"}
          </Button>
          <Button color="danger" onClick={props.inputNewEntry}>
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
    fetch: state.dataFetch,
    dark: state.dark
  };
};
const MapDispatchToProps = dispatch => {
  return {
    inputNewEntry: () => dispatch(inputNewEntry),
    openModal: () => dispatch(openModal),
    updateStateOfModal: (data, field) =>
      dispatch(updateStateOfModal(data, field)),
    fetchData: () => dispatch(actions.fetchData())
  };
};
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Entrymodal);
