// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './ProjectsSearchForm.scss';
import { FormGroup, FormControl, ControlLabel, Col, Form, Grid, Row } from "react-bootstrap";
import SearchForm from "../SearchForm/SearchForm";
import {DebounceInput} from "react-debounce-input";
import {Typeahead, Token} from "react-bootstrap-typeahead";


export default class ProjectsSearchForm extends Component {
  static propTypes = {
    projects: PropTypes.array,
    skills: PropTypes.array,
    departments: PropTypes.array,
    searchSkills: PropTypes.func,
    searchDepartments: PropTypes.func,
    isSkillsLoading: PropTypes.any,
    isDepartmentsLoading: PropTypes.any,
    handleEmployeesSearch: PropTypes.func,
  };

  state = {
    search: {
      employeeName: null,
      employeeSkills: null,
      employeeDepartment: null,
      employeeProject: null,
    }
  };

  _handleSearch = () => {
    const { search } = this.state;
    // console.log(search);
    const { handleEmployeesSearch } = this.props;
    handleEmployeesSearch(search);
  };

  _handleNameSearch = (e) => {
    const search_value = e.target.value === '' ? null : e.target.value;
    // console.log(search_value);
    this.setState((state) => ({
      ...state,
      search: {...state.search, employeeName: search_value },
    }), () => { this._handleSearch() });
    // const { handleEmployeesSearch } = this.props;
    // handleEmployeesSearch(search_value);
  };

  _handleSkillsSearch = (selected) => {
    // console.log(selected);
    const search_value = selected && selected.map(skill => skill._id).join(',');
    // console.log(search_value);
    this.setState((state) => ({
      ...state,
      search: {...state.search, employeeSkills: search_value },
    }), () => { this._handleSearch() });
    // this._handleSearch();
    // const search_value = e.target.value === '' ? null : e.target.value;
    // console.log(search_value);
    // const { handleEmployeesSearch } = this.props;
    // handleEmployeesSearch(search_value);
  };

  _handleDepartmentSearch = (selected) => {
    // console.log(selected);
    const search_value = selected.length === 0 ? null : selected[0].id;
    // console.log(search_value);
    this.setState((state) => ({
      ...state,
      search: {...state.search, employeeDepartment: +search_value },
    }), () => { this._handleSearch() });
    // this._handleSearch();
    // const search_value = e.target.value === '' ? null : e.target.value;
    // console.log(search_value);
    // const { handleEmployeesSearch } = this.props;
    // handleEmployeesSearch(search_value);
  };

  _handleProjectSearch = (selected) => {
    // console.log(selected);
    const search_value = selected.length === 0 ? null : selected[0].id;
    // console.log(search_value);
    this.setState((state) => ({
      ...state,
      search: {...state.search, employeeProject: +search_value },
    }), () => { this._handleSearch() });
    // this._handleSearch();
    // const search_value = e.target.value === '' ? null : e.target.value;
    // console.log(search_value);
    // const { handleEmployeesSearch } = this.props;
    // handleEmployeesSearch(search_value);
  };

  render() {
    const {
      projects,
      departments,
      skills,
      searchSkills,
      searchDepartments,
      isSkillsLoading,
      isDepartmentsLoading,
    } = this.props;


    return (
      <>
        <div className="employees__toolbar z-depth-1">
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup
                  controlId="searchEmployees"
                >
                  <DebounceInput
                    element={ FormControl }
                    minLength={ 3 }
                    debounceTimeout={ 300 }
                    placeholder="Search for employees..."
                    onChange={ this._handleNameSearch } />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={4}>
                <SearchForm
                  items={ skills }
                  search={ searchSkills }
                  // searchEmployeesBy={ searchEmployeesBySkills }
                  searchEmployeesBy={ this._handleSkillsSearch }
                  isLoading={ isSkillsLoading }
                  multiple={ true }
                  placeholder='Search for skills...'
                  labelKey={(option) => `${option.title}`}
                />
              </Col>

              <Col sm={4}>
                <SearchForm
                  items={ departments }
                  search={ searchDepartments }
                  searchEmployeesBy={ this._handleDepartmentSearch }
                  isLoading={ isDepartmentsLoading }
                  multiple={ false }
                  placeholder='Search for department...'
                  labelKey={ (option) => `${option.attributes.name}` }
                />
              </Col>

              <Col sm={4}>
                {
                  projects && projects.length
                    ? <Fragment>
                      <Typeahead
                        labelKey={(option) => `${option.name}`}
                        multiple={ false }
                        options={projects}
                        minLength={1}
                        placeholder="Search for project..."
                        onChange={this._handleProjectSearch}
                        renderToken={(option, props, index) => (
                          <Token
                            key={index}
                            onRemove={props.onRemove}>
                            {`${option.name}`}
                          </Token>
                        )}
                      />
                    </Fragment>
                    : <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}
