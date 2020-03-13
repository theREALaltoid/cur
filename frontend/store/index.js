
      <Modal isOpen={this.props.showModal} toggle={dispatch(clickModal)}>
        <ModalHeader toggle={this.toggle}>Enter purchased</ModalHeader>
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
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  placeholder="Optional"
                  onChange={this.handleInputChange}
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
