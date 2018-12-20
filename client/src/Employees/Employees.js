// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import M from 'materialize-css';

import './Employees.scss';
import Employee from '../Employee';
import Pagination from '../Pagination';
import {employeeActions, skillActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import SearchForm from "../SearchForm/SearchForm";
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
    getNames: PropTypes.func,
    count: PropTypes.number,
    isLoading: PropTypes.any,
    searchEmployees: PropTypes.func,
  };

  state = {
    // catalog: this.props.employees.slice(),
    // chips: [],
    activePage: 1,
    itemsCountPerPage: 24,
  };

  componentDidMount() {
    window.scroll(0, 0);
    const { itemsCountPerPage } = this.state;
    const { getAllEmployees } = this.props;
    getAllEmployees(itemsCountPerPage);
    // const { skills } = this.props;
    // const data = { };
    // for (let i = 0; i < skills.length; i++) {
    //   data[skills[i].title] = null;
    // }

    // M.Chips.init(document.querySelectorAll('.chips'), {
    //   placeholder: 'Enter skill',
    //   secondaryPlaceholder: 'Add skill',
    //   autocompleteOptions: {
    //     data,
    //     limit: 8,
    //     minLength: 1
    //   },
    //   onChipAdd: (undefined, chip) => {
    //     const chipContent = chip.innerHTML.split('<i').shift();
    //
    //     this.setState(state => ({
    //       chips: [ ...state.chips, chipContent ]
    //     }));
    //     this.updateCatalog();
    //
    //     document.querySelector('.chips').click();
    //   },
    //   onChipDelete: (undefined, chip) => {
    //     const chipContent = chip.innerHTML.split('<i').shift();
    //     this.setState(state => ({
    //       chips: [ ...state.chips.filter(chip => !(chip.toLowerCase() === chipContent.toLowerCase())) ]
    //     }));
    //     this.updateCatalog();
    //   }
    // });

    // M.FormSelect.init(document.querySelector('.js-select-department'));
    // M.FormSelect.init(document.querySelector('.js-select-project'));
    // M.FormSelect.init(document.querySelector('.js-select-sorting'));
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
    const search_value = e.target.value;
    console.log(search_value);
    const { searchEmployees, getAllEmployees } = this.props;
    const { itemsCountPerPage } = this.state;
    if( search_value.length >= 3 ) {
      searchEmployees(search_value);
    }else {
      getAllEmployees(itemsCountPerPage);
    }
  };

  render() {
    const { catalog, activePage, itemsCountPerPage } = this.state;
    const { employees, projects, count } = this.props;

    // * EMPLOYEES NOT LOADED *
    if (!employees) {
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
          {/*<div className="chips chips-placeholder chips-autocomplete">*/}
            {/*<input className="js-chips-input" />*/}
          {/*</div>*/}

          {/*<form>*/}
            {/*<FormGroup*/}
              {/*controlId="searchValue"*/}
              {/*// validationState={this.getValidationState()}*/}
            {/*>*/}
              {/*/!*<ControlLabel>Working example with validation</ControlLabel>*!/*/}
              {/*<FormControl*/}
                {/*type="text"*/}
                {/*value={ searchEmployee }*/}
                {/*placeholder="Search employee..."*/}
                {/*onChange={ this._searchHandle }*/}
              {/*/>*/}
            {/*</FormGroup>*/}
          {/*</form>*/}

          {/*<SearchForm searchNames={ searchNames } getNames={ getNames } isLoading={ isLoading }/>*/}

          <form>
            <FormGroup
              controlId="searchEmployees"
              // validationState={this.getValidationState()}
            >
              <FormControl
                type="text"
                // value={this.state.value}
                placeholder="Search for employees..."
                onChange={this._handleSearch}
              />
            </FormGroup>
          </form>
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
  searchNames: state.employees.searchNames,
  isLoading: state.employees.loading,
  count: state.employees.count,
  // employeeUsername: ownProps.match.params.employeeUsername,
  // currentUserUsername: state.auth.user.attributes.login,
  // currentUserId: ownProps.match.params.employeeId,
  // skills: state.skills.skills,
  // skillsTypes: state.skills.skillsTypes,
});

const mapDispatchToProps = dispatch => ({
  getAllEmployees: (limit, page) => { dispatch(employeeActions.getAll(limit, page)); },
  getNames: (value) => { dispatch(employeeActions.getNames(value)); },
  searchEmployees: (value) => { dispatch(employeeActions.search(value)); },
  // getEmployeeByUsername: (username) => { dispatch(employeeActions.getByUsername(username)); },
  // updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  // deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); },
  // getAllSkills: () => { dispatch(skillActions.getAll()); },
  // getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  // getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Employees);
