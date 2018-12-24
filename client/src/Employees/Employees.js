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
import EmployeesSearchForm from "../EmployeesSearchForm";
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
    console.log(e);
    // const search_value = e.target.value === '' ? null : e.target.value;
    // console.log(search_value);
    // const { searchEmployees } = this.props;
    // searchEmployees(search_value);
  };

  // _handleDepartmentSearch = (selected) => {
  //   // const search_value = e.target.value === 'all' ? null : e.target.value;
  //   console.log(selected);
  //   const search_value = selected.length === 0 ? null : selected[0].id;
  //   console.log(search_value);
  //   const { searchEmployeesByDepartment } = this.props;
  //   searchEmployeesByDepartment(search_value);};
  //
  // _handleProjectSearch = (selected) => {
  //   // const search_value = e.target.value === 'all' ? null : e.target.value;
  //   console.log(selected);
  //   const search_value = selected.length === 0 ? null : selected[0].id;
  //   console.log(search_value);
  //   const { getEmployeesByProject } = this.props;
  //   getEmployeesByProject(search_value);
  // };

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

        <EmployeesSearchForm
          handleEmployeesSearch={ this._handleSearch }
          skills={ skills }
          departments={ departments }
          projects={ projects }
          searchDepartments={ searchDepartments }
          searchSkills={ searchSkills }
          isSkillsLoading={ isSkillsLoading }
          isDepartmentsLoading={ isDepartmentsLoading }
        />

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
