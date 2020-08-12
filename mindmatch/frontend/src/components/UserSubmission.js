import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class UserSubmission extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activePaper: this.props.activePaper
      };
    }
    handleChange = e => {
      let { name, value } = e.target;
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
      console.log(this.state.activePaper)
      const activePaper = { ...this.state.activePaper, [name]: value };
      this.setState({ activePaper });
    };
    render() {
      const { toggle, onSave } = this.props;
      return (
        <div>
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        value={this.state.activePaper.title}
                        onChange={this.handleChange}
                        placeholder="Title"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="abstract">Abstract</Label>
                    <Input
                        type="textarea"
                        name="abstract"
                        value={this.state.activePaper.abstract}
                        onChange={this.handleChange}
                        placeholder="Abstract"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="year">Year</Label>
                    <Input
                        type="text"
                        pattern="[0-9]*"
                        name="year"
                        value={this.state.activePaper.year}
                        onChange={this.handleChange}
                        placeholder="Year"
                    />
                </FormGroup>
            </Form>
            <Button color="success" onClick={() => onSave(this.state.activePaper)}>
                Save
            </Button>
        </div>

      );
    }
  }