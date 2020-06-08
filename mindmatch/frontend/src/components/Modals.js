import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Author Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                type="text"
                name="first_name"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="First Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Last Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="orcid_id">ORCID iD</Label>
              <Input
                type="text"
                name="orcid_id"
                value={this.state.activeItem.orcid_id}
                onChange={this.handleChange}
                placeholder="ORCID iD"
              />
            </FormGroup>
            <FormGroup>
              <Label for="scopus_id">Scopus ID</Label>
              <Input
                type="text"
                name="scopus_id"
                value={this.state.activeItem.scopus_id}
                onChange={this.handleChange}
                placeholder="Scopus ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="researcher_id">Researcher ID</Label>
              <Input
                type="text"
                name="researcher_id"
                value={this.state.activeItem.researcher_id}
                onChange={this.handleChange}
                placeholder="Researcher ID"
              />
            </FormGroup>
            <FormGroup>
              <Label for="isni_id">ISNI</Label>
              <Input
                type="text"
                name="isni_id"
                value={this.state.activeItem.isni_id}
                onChange={this.handleChange}
                placeholder="ISNI"
              />
            </FormGroup>
            {/* <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}