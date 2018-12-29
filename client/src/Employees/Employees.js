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
    projects: PropTypes.array,
    skills: PropTypes.array,
    getAllEmployees: PropTypes.func,
    searchSkills: PropTypes.func,
    count: PropTypes.number,
    isSkillsLoading: PropTypes.any,
    isDepartmentsLoading: PropTypes.any,
    searchEmployees: PropTypes.func,
    departments: PropTypes.array,
    getAllProjects: PropTypes.func,
    searchDepartments: PropTypes.func,
  };

  state = {
    activePage: 1,
    itemsCountPerPage: 24,
    multiple: false,
  };

  componentDidMount() {
    window.scroll(0, 0);
    const { itemsCountPerPage } = this.state;
    const { getAllEmployees, getAllProjects } = this.props;
    getAllEmployees(itemsCountPerPage);
    getAllProjects();
  }


  // updateCatalog = () => {
  //   this.setState({
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

  _handleSearch = (search) => {
    console.log(search);
    const { searchEmployees } = this.props;
    searchEmployees(search);
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
    } = this.props;

    // * EMPLOYEES NOT LOADED *
    if (!employees || !skills || !departments || !projects) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

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
  projects: state.projects.list,
});

const mapDispatchToProps = dispatch => ({
  getAllEmployees: (limit, page) => { dispatch(employeeActions.getAll(limit, page)); },
  searchEmployees: (value) => { dispatch(employeeActions.search(value)); },
  searchSkills: (search_value) => { dispatch(skillActions.search(search_value)); },
  searchDepartments: (search_value) => { dispatch(departmentActions.search(search_value)); },
  getAllProjects: () => { dispatch(projectActions.getAll()); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Employees);
