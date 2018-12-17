import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, Button, Modal} from 'react-bootstrap';

export default class SkillForm extends Component {
  static propTypes = {
    skills: PropTypes.array,
    skillsTypes: PropTypes.array,
    getSkillsByType: PropTypes.func,
    hideModal: PropTypes.func,
    addSkill: PropTypes.func,
  };

  state={
    type: null,
    skill: null,
  };

  onChangeType = (e) => {
    const type = e.target.value === '' ? null : e.target.value;
    const { getSkillsByType } = this.props;
    console.log(type);
    getSkillsByType(type);
    this.setState(state => ({
      ...state,
      type: type,
    }));
  };

  onChangeSkill = (e) => {
    const skill = e.target.value;
    console.log(skill);
    this.setState(state => ({
      ...state,
      skill: skill,
    }));
  };

  save = () => {
    const { addSkill } = this.props;
    const { skill } = this.state;
    console.log(skill);
    addSkill(skill);
  };

  render() {
    const { type, skill } = this.state;
    const { hideModal } = this.props;

    return (
      <>
      <Modal.Header>
        <Modal.Title>Add skill</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Type</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onChangeType}>
              <option value="">select</option>
              { this.props.skillsTypes && this.props.skillsTypes.length !== 0
                ? this.props.skillsTypes.map((type, i) => {
                  return (
                    <option key={ `${ type } ${ i }` } value={type}>{type}</option>
                  );
                })
                : null
              }
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Skill</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.onChangeSkill} disabled={!type}>
              <option value="">select</option>
              { this.props.skills && this.props.skills.length !== 0
                ? this.props.skills.map((skill, i) => {
                  return (
                    <option key={ `${ skill.title } ${ i }` } value={skill._id}>{skill.title}</option>
                  );
                })
                : null
              }
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={ this.save } disabled={ !skill }>Save</Button>
          <Button onClick={ hideModal }>Close</Button>
        </Modal.Footer>
      </>
    );
  }
}
