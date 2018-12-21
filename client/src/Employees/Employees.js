// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import M from 'materialize-css';

import './Employees.scss';
import Employee from '../Employee';
import Pagination from '../Pagination';
import {departmentActions, employeeActions, skillActions, projectActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";
import { FormGroup, FormControl, ControlLabel, Col, Form, Grid, Row } from "react-bootstrap";
import SearchForm from "../SearchForm/SearchForm";
import {DebounceInput} from "react-debounce-input";
import {Typeahead, Token} from "react-bootstrap-typeahead";
// import type {EmployeeType} from "../../_types";

// type EmployeeListProps = {|
//   employees: Array<EmployeeType>,
//   projects: Array<any>,
//   skills: Array<any>
// |};

// export default class Employees extends Component<EmployeeListProps> {
class Employees extends Component {
  static propTypes = {
    employees: PropTypes.array,
    searchNames: PropTypes.array,
    projects: PropTypes.array,
    skills: PropTypes.array,
    getAllEmployees: PropTypes.func,
    getAllSkills: PropTypes.func,
    searchSkills: PropTypes.func,
    count: PropTypes.number,
    isSkillsLoading: PropTypes.any,
    isDepartmentsLoading: PropTypes.any,
    searchEmployees: PropTypes.func,
    searchEmployeesBySkills: PropTypes.func,
    getAllDepartments: PropTypes.func,
    departments: PropTypes.array,
    searchEmployeesByDepartment: PropTypes.func,
    getAllProjects: PropTypes.func,
    getEmployeesByProject: PropTypes.func,
    searchDepartments: PropTypes.func,
  };

  state = {
    // catalog: this.props.employees.slice(),
    // chips: [],
    activePage: 1,
    itemsCountPerPage: 24,
    multiple: false,
  };

  componentDidMount() {
    window.scroll(0, 0);
    const { itemsCountPerPage } = this.state;
    const { getAllEmployees, getAllSkills, getAllDepartments, getAllProjects } = this.props;
    getAllEmployees(itemsCountPerPage);
    // getAllSkills();
    // getAllDepartments();
    getAllProjects();
    // const { skills } = this.props;
    // const data = { };
    // for (let i = 0; i < skills.length; i++) {
    //   data[skills[i].title] = null;
    // }
  }

  // handlePageChange = (newActivePage) => {
  //   window.scroll(0, 0);
  //
  //   this.setState({
  //     activePage: newActivePage
  //   });
  // };

  // updateCatalog = () => {
  //   const { chips } = this.state;
  //   let newCatalog = [ ...this.props.employees ];
  //
  //   const filterByDepartmentsValue = document.querySelector('.js-select-department').value;
  //   if (filterByDepartmentsValue !== 'all') {
  //     newCatalog = newCatalog.filter(employee => employee.department.title === filterByDepartmentsValue);
  //   }
  //
  //   const filterByProjectsValue = document.querySelector('.js-select-project').value;
  //   if (filterByProjectsValue !== 'all') {
  //     newCatalog = newCatalog.filter(employee => employee.projects.some(project => project.title === filterByProjectsValue));
  //   }
  //
  //   for (let i = 0; i < newCatalog.length; i++) {
  //     const isEmployeeSuitable = chips.every(chip => newCatalog[i].skills.some(skill => skill.title.toLowerCase() === chip.toLowerCase()));
  //     if (!isEmployeeSuitable) {
  //       newCatalog.splice(i, 1);
  //       i--;
  //     }
  //   }
  //
  //   const sortEmployeesValue = +document.querySelector('.js-select-sorting').value;
  //   switch(sortEmployeesValue) {
  //     case 1:
  //       newCatalog = newCatalog.sort((a, b) => a.name.localeCompare(b.name));
  //       break;
  //     case 2:
  //       newCatalog = newCatalog.sort((a, b) => -a.name.localeCompare(b.name));
  //       break;
  //     case 3:
  //       newCatalog = newCatalog.sort((a, b) => a.surname.localeCompare(b.surname));
  //       break;
  //     case 4:
  //       newCatalog = newCatalog.sort((a, b) => -a.surname.localeCompare(b.surname));
  //       break;
  //     case 5:
  //       newCatalog = newCatalog.sort((a, b) => a.department.title.localeCompare(b.department.title));
  //       break;
  //     case 6:
  //       newCatalog = newCatalog.sort((a, b) => -a.department.title.localeCompare(b.department.title));
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   this.setState({
  //     catalog: newCatalog,
  //     activePage: 1
  //   });
  // };

  _changePage = (limit, page) => {
    const { getAllEmployees } = this.props;
    getAllEmployees(limit, page);
    console.log(page);
    this.setState((state) => ({
      ...state,
      activePage: page,
    }));
  };

  _handleSearch = (e) => {
    const search_value = e.target.value === '' ? null : e.target.value;
    console.log(search_value);
    const { searchEmployees } = this.props;
    searchEmployees(search_value);
  };

  _handleDepartmentSearch = (selected) => {
    // const search_value = e.target.value === 'all' ? null : e.target.value;
    console.log(selected);
    const search_value = selected.length === 0 ? null : selected[0].id;
    console.log(search_value);
    const { searchEmployeesByDepartment } = this.props;
    searchEmployeesByDepartment(search_value);};

  _handleProjectSearch = (selected) => {
    // const search_value = e.target.value === 'all' ? null : e.target.value;
    console.log(selected);
    const search_value = selected.length === 0 ? null : selected[0].id;
    console.log(search_value);
    const { getEmployeesByProject } = this.props;
    getEmployeesByProject(search_value);
  };

  render() {
    const { activePage, itemsCountPerPage, multiple } = this.state;
    const {
      employees,
      projects,
      departments,
      count,
      skills,
      searchSkills,
      searchDepartments,
      isSkillsLoading,
      isDepartmentsLoading,
      searchEmployeesBySkills,
      searchEmployeesByDepartment
    } = this.props;

    // * EMPLOYEES NOT LOADED *
    if (!employees || !skills || !departments || !projects) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    // let departmentsOptions = new Set();
    // for (let i = 0; i < employees.length; i++) {
    //   departmentsOptions.add(employees[i].department.title);
    // }
    // departmentsOptions = [ ...departmentsOptions ].map(department => (
    //   <option key={ department } value={ department }>{ department }</option>
    // ));
    //
    // const projectsOptions = projects.map(project => (
    //   <option key={ project.title } value={ project.title }>{ project.title }</option>
    // ));

    return (
      <section className="employees">
        <div className="employees__toolbar z-depth-1">
          {/*<div className="tools">*/}
            {/*<div className="tools__filtering">*/}
              {/*<div className="input-field input-field--department">*/}
                {/*<i className="material-icons prefix">group</i>*/}
                {/*<select className="select js-select-department" onChange={ this.updateCatalog }>*/}
                  {/*<option value="all">All departments</option>*/}
                  {/*{ departmentsOptions }*/}
                {/*</select>*/}
                {/*<label>Filter by department</label>*/}
              {/*</div>*/}
              {/*<div className="input-field input-field--projects">*/}
                {/*<i className="material-icons prefix">folder</i>*/}
                {/*<select className="select js-select-project" onChange={ this.updateCatalog }>*/}
                  {/*<option value="all">All projects</option>*/}
                  {/*{ projectsOptions }*/}
                {/*</select>*/}
                {/*<label>Filter by project</label>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className="tools__sorting">*/}
              {/*<div className="input-field input-field--sorting">*/}
                {/*<i className="material-icons prefix">import_export</i>*/}
                {/*<select className="select js-select-sorting" onChange={ this.updateCatalog }>*/}
                  {/*<option value="0">Default</option>*/}
                  {/*<option value="1">Employee names (A - Z)</option>*/}
                  {/*<option value="2">Employee names (Z - A)</option>*/}
                  {/*<option value="3">Employee surnames (A - Z)</option>*/}
                  {/*<option value="4">Employee surnames (Z - A)</option>*/}
                  {/*<option value="5">Department names (A - Z)</option>*/}
                  {/*<option value="6">Department names (Z - A)</option>*/}
                {/*</select>*/}
                {/*<label>Sort by</label>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}

          <Form>
              <Row>
                <Col md={12}>
                  <FormGroup
                    controlId="searchEmployees"
                    // validationState={this.getValidationState()}
                  >
                    <DebounceInput
                      element={ FormControl }
                      minLength={ 3 }
                      debounceTimeout={ 300 }
                      placeholder="Search for employees..."
                      onChange={ this._handleSearch } />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col sm={4}>
                  <SearchForm
                    items={ skills }
                    search={ searchSkills }
                    searchEmployeesBy={ searchEmployeesBySkills }
                    isLoading={ isSkillsLoading }
                    multiple={ true }
                    placeholder='Search for skills...'
                    labelKey={(option) => `${option.title}`}
                  />
                </Col>

                <Col sm={4}>
                  {/*<FormGroup controlId="searchEmployees">*/}
                    {/*<FormControl*/}
                      {/*componentClass="select"*/}
                      {/*placeholder="Search for department..."*/}
                      {/*onChange={ this._handleDepartmentSearch }*/}
                    {/*>*/}
                      {/*<option value="all">All departments</option>*/}
                      {/*{*/}
                        {/*departments && departments.length*/}
                          {/*? departments.map(department => {*/}
                            {/*return (*/}
                              {/*<option key={ department.id } value={ department.id }>{ department.attributes.name }</option>*/}
                            {/*);*/}
                          {/*})*/}
                          {/*: null*/}
                      {/*}*/}
                    {/*</FormControl>*/}
                  {/*</FormGroup>*/}

                  <SearchForm
                    items={ departments }
                    search={ searchDepartments }
                    searchEmployeesBy={ this._handleDepartmentSearch }
                    isLoading={ isDepartmentsLoading }
                    multiple={ multiple }
                    placeholder='Search for department...'
                    labelKey={ (option) => `${option.attributes.name}` }
                  />
                </Col>

                <Col sm={4}>
                  {/*<FormGroup controlId="searchEmployees">*/}
                    {/*<FormControl*/}
                      {/*componentClass="select"*/}
                      {/*placeholder="Search for project..."*/}
                      {/*onChange={ this._handleProjectSearch }*/}
                    {/*>*/}
                      {/*<option value="all">All projects</option>*/}
                      {/*{*/}
                        {/*projects && projects.length*/}
                          {/*? projects.map(project => {*/}
                            {/*return (*/}
                              {/*<option key={ project.id } value={ project.id }>{ project.name }</option>*/}
                            {/*);*/}
                          {/*})*/}
                          {/*: null*/}
                      {/*}*/}
                    {/*</FormControl>*/}
                  {/*</FormGroup>*/}

                  {
                    projects && projects.length
                      ? <Fragment>
                        <Typeahead
                          labelKey={(option) => `${option.name}`}
                          multiple={ multiple }
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

        <div className="employees__catalog">
          {
            employees.length
              ? employees.map(employee => {
                return (
                  <Employee key={ employee.id } employee={ employee } />
                );
              })
              : <p className="notFound">No employees were found for a given critetia.</p>
          }
        </div>

        <div className="employees__pagination">
          { Math.ceil(count / itemsCountPerPage) > 1
            ? <Pagination
              activePage={ activePage }
              itemsCountPerPage={ itemsCountPerPage }
              totalItemsCount={ count }
              onChange={ this._changePage }
            />
            : null
          }
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  employees: state.employees.employees,
  skills: state.skills.skills,
  isSkillsLoading: state.skills.loading,
  isDepartmentsLoading: state.departments.loading,
  count: state.employees.count,
  departments: state.departments.departments,
  projects: state.projects.projects,
  // employeeUsername: ownProps.match.params.employeeUsername,
  // currentUserUsername: state.auth.user.attributes.login,
  // currentUserId: ownProps.match.params.employeeId,
  // skills: state.skills.skills,
  // skillsTypes: state.skills.skillsTypes,
});

const mapDispatchToProps = dispatch => ({
  getAllEmployees: (limit, page) => { dispatch(employeeActions.getAll(limit, page)); },
  searchEmployees: (value) => { dispatch(employeeActions.search(value)); },
  getAllSkills: () => { dispatch(skillActions.getAll()); },
  searchSkills: (search_value) => { dispatch(skillActions.search(search_value)); },
  searchDepartments: (search_value) => { dispatch(departmentActions.search(search_value)); },
  searchEmployeesBySkills: (skillsArray) => { dispatch(employeeActions.searchBySkills(skillsArray)); },
  getAllDepartments: () => { dispatch(departmentActions.getAll()); },
  searchEmployeesByDepartment: (department) => { dispatch(employeeActions.searchByDepartment(department)); },
  getAllProjects: () => { dispatch(projectActions.getAll()); },
  getEmployeesByProject: (project) => { dispatch(employeeActions.searchByProject(project)); },
  // getEmployeeByUsername: (username) => { dispatch(employeeActions.getByUsername(username)); },
  // updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  // deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); },
  // getAllSkills: () => { dispatch(skillActions.getAll()); },
  // getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  // getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Employees);
