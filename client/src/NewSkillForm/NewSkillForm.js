import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, ControlLabel, FormControl, Button, Modal} from 'react-bootstrap';
import {DebounceInput} from "react-debounce-input";
import './NewSkillForm.scss';

export default class NewSkillForm extends Component {
  static propTypes = {
    skillsTypes: PropTypes.array,
    hideModal: PropTypes.func,
    addNewSkill: PropTypes.func,
  };

  state={
    newSkill: {
      type: "",
      title: "",
      latest_ver: "",
      website: "",
      wiki: "",
      git: "",
      internal_community_url: "",
      external_community_url: "",
      description: "",
    },
  };

  onChangeType = (e) => {
    const type = e.target.value === '' ? null : e.target.value;
    // console.log(type);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        type: type,
      }
    }));
  };

  onChangeSkillTitle = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        title: value,
      }
    }));
  };

  onChangeSkillVersion = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        latest_ver: value,
      }
    }));
  };

  onChangeSkillWebsite = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        website: value,
      }
    }));
  };

  onChangeSkillWiki = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        wiki: value,
      }
    }));
  };

  onChangeSkillGit = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        git: value,
      }
    }));
  };

  onChangeSkillIntCom = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        internal_community_url: value,
      }
    }));
  };

  onChangeSkillExtCom = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        external_community_url: value,
      }
    }));
  };

  onChangeSkillDescription = (e) => {
    const value = e.target.value;
    // console.log(value);
    this.setState(state => ({
      newSkill: {
        ...state.newSkill,
        description: value,
      }
    }));
  };

  save = () => {
    const { addNewSkill } = this.props;
    const { newSkill } = this.state;
    // console.log(newSkill);
    addNewSkill(newSkill);
  };

  render() {
    const { newSkill } = this.state;
    const { hideModal } = this.props;

    return (
      <>
      <Modal.Header>
        <Modal.Title>Add skill</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select Type</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={ newSkill.type } onChange={this.onChangeType}>
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
            <ControlLabel>Skill title</ControlLabel>
            <FormControl type="text" placeholder="Skill title" value={ newSkill.title } onChange={ this.onChangeSkillTitle }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Latest version</ControlLabel>
            <FormControl type="text" placeholder="Latest version" value={ newSkill.latest_ver } onChange={ this.onChangeSkillVersion }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Website URL</ControlLabel>
            <FormControl type="text" placeholder="Website URL" value={ newSkill.website } onChange={ this.onChangeSkillWebsite }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Wiki URL</ControlLabel>
            <FormControl type="text" placeholder="Wiki URL" value={ newSkill.wiki } onChange={ this.onChangeSkillWiki }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>GIT URL</ControlLabel>
            <FormControl type="text" placeholder="GIT URL" value={ newSkill.git } onChange={ this.onChangeSkillGit }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Internal Community URL</ControlLabel>
            <FormControl type="text" placeholder="Internal Community URL" value={ newSkill.internal_community_url } onChange={ this.onChangeSkillIntCom }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>External Community URL</ControlLabel>
            <FormControl type="text" placeholder="External Community URL" value={ newSkill.external_community_url } onChange={ this.onChangeSkillExtCom }/>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" value={ newSkill.description } onChange={ this.onChangeSkillDescription }/>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" className="skillModalButton" onClick={ this.save } disabled={ !newSkill.title }>Save</Button>
          <Button onClick={ hideModal } className="skillModalButton">Close</Button>
        </Modal.Footer>
      </>
    );
  }
}
