import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import M from 'materialize-css';

import './Projects__List.scss';
import Project from '../Project';
import Pagination from '../Pagination';
import {departmentActions, employeeActions, projectActions, skillActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";
import EmployeesSearchForm from "../Employees__SearchForm";
import ProjectsSearchForm from "../Projects__SearchForm/ProjectsSearchForm";

class Projects__List extends Component {
  static propTypes = {
    projects: PropTypes.array,
    count: PropTypes.number,
    isProjectsLoading: PropTypes.bool,
    handlePageChange: PropTypes.func,
  };

  state = {
    activePage: 1,
    itemsCountPerPage: 20,
  };

  handlePageChange = (limit, page) => {
    window.scroll(0, 0);
    const { handlePageChange } = this.props;
    handlePageChange(limit, page);
    console.log(page);
    this.setState((state) => ({
      ...state,
      activePage: page,
    }));
  };


  render() {
    const {
      activePage,
      itemsCountPerPage,
      // multiple
    } = this.state;

    const {
      projects,
      count,
      isProjectsLoading
    } = this.props;

    // * PROJECTS NOT LOADED *
    if (isProjectsLoading) {
      return (
        <div style={ { display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    return (
      <>
          <div className="projects__catalog">
            {
              projects.length !== 0
                ? projects.map(project => {
                    return (
                      <Project key={ project.id } project={ project } />
                    );
                  })
                : <p className="notFound">No projects were found for a given critetia.</p>
            }
          </div>

          {
            Math.ceil(count / itemsCountPerPage) > 1
              ? <div className="projects__pagination">
                  <Pagination
                    activePage={ activePage }
                    itemsCountPerPage={ itemsCountPerPage }
                    totalItemsCount={ count }
                    onChange={ this.handlePageChange }
                  />
                </div>
              : null
          }
      </>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  // skills: state.skills.skills,
  projects: state.projects.projects,
  // employees: state.employees.employees,
  // departments: state.departments.departments,
  count: state.projects.count,
  isProjectsLoading: state.projects.loading,
  // isSkillsLoading: state.skills.loading,
  // isDepartmentsLoading: state.departments.loading,
});

const mapDispatchToProps = dispatch => ({
  getAllProjects: (limit, page) => { dispatch(projectActions.getAllWithPages(limit, page)); },
  searchProjects: (value) => { dispatch(projectActions.search(value)); },
  // searchSkills: (search_value) => { dispatch(skillActions.search(search_value)); },
  // searchDepartments: (search_value) => { dispatch(departmentActions.search(search_value)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Projects__List);
