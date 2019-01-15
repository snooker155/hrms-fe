// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './Technologies__SearchForm.scss';
import { FormGroup, FormControl, ControlLabel, Col, Form, Grid, Row, Button, ButtonToolbar, InputGroup } from "react-bootstrap";
import SearchForm from "../SearchForm/SearchForm";
import {DebounceInput} from "react-debounce-input";
import {Typeahead, Token} from "react-bootstrap-typeahead";


export default class Technologies__SearchForm extends Component {
  static propTypes = {
    handleTechnologiesSearch: PropTypes.func,
    superuser: PropTypes.bool,
  };

  state = {
    search: {
      technologyName: null,
    }
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

  render() {
    const { superuser } = this.props;

    return (
      <>
        <div className="technologies__toolbar z-depth-1">
          <Form>
            <Row>
              <Col md={ superuser ? 10 : 12 }>
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
                <Col md={2}>
                  <Button bsStyle="primary">Create</Button>
                </Col>
              }
            </Row>
          </Form>
        </div>
      </>
    );
  }
}
