// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './Technologies__SearchForm.scss';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Form,
  Grid,
  Row,
  Button,
  ButtonToolbar,
  InputGroup,
  Modal
} from "react-bootstrap";
import SearchForm from "../SearchForm/SearchForm";
import {DebounceInput} from "react-debounce-input";
import {Typeahead, Token} from "react-bootstrap-typeahead";
import SkillForm from "../SkillForm";
import {ConfirmationModal} from "../_components";
import NewSkillForm from "../NewSkillForm/NewSkillForm";


export default class Technologies__SearchForm extends Component {
  static propTypes = {
    handleTechnologiesSearch: PropTypes.func,
    superuser: PropTypes.bool,
    skillsTypes: PropTypes.array,
    addNewSkill: PropTypes.func,
  };

  state = {
    search: {
      technologyName: null,
    },
    showModal: false,
  };

  showModal = () => {
    this.setState((state) => ({
      ...state,
      showModal: true,
    }));
  };

  hideModal = () => {
    this.setState((state) => ({
      ...state,
      showModal: false,
    }));
  };

  _handleSearch = () => {
    const { search } = this.state;
    // console.log(search);
    const { handleTechnologiesSearch } = this.props;
    handleTechnologiesSearch(search.technologyName);
  };

  _handleNameSearch = (e) => {
    const search_value = e.target.value === '' ? null : e.target.value;
    // console.log(search_value);
    this.setState((state) => ({
      ...state,
      search: {...state.search, technologyName: search_value },
    }), () => { this._handleSearch() });
  };

  _addNewSkill = (newSkill) => {
    const { addNewSkill } = this.props;
    addNewSkill(newSkill);

    this.setState((state) => ({
      ...state,
      showModal: false,
    }));
  };

  render() {
    const { superuser, skillsTypes, addNewSkill } = this.props;

    return (
      <>
        <div className="technologies__toolbar z-depth-1">
          <Form>
            <Row>
              <Col md={ superuser ? 11 : 12 }>
                <FormGroup controlId="searchTechnologies">
                  <DebounceInput
                      element={ FormControl }
                      minLength={ 1 }
                      debounceTimeout={ 500 }
                      placeholder="Search for technologies..."
                      onChange={ this._handleNameSearch } />
                </FormGroup>
              </Col>

              { superuser &&
                <Col md={1}>
                  <Button bsStyle="primary" className="addSkill" onClick={ this.showModal }>
                    <i className="material-icons">add</i>
                  </Button>
                </Col>
              }
            </Row>
          </Form>
        </div>

        {superuser &&
          <Modal
            dialogClassName="add-skill-modal"
            show={this.state.showModal}>
            <NewSkillForm
              skillsTypes={skillsTypes}
              hideModal={this.hideModal}
              addNewSkill={ this._addNewSkill }/>
          </Modal>
        }

        {/*<Modal*/}
          {/*dialogClassName="add-skill-modal"*/}
          {/*show={ showConfirmationModal }>*/}
          {/*<ConfirmationModal*/}
            {/*text='Вы действительно хотите удалить эту технологию'*/}
            {/*submit={ this.deleteTechnology }*/}
            {/*cancel={ this.hideConfirmationModal }*/}
            {/*showConfirmationModal={ showConfirmationModal }*/}
          {/*/>*/}
        {/*</Modal>*/}
      </>
    );
  }
}
