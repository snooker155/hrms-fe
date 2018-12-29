import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import M from 'materialize-css';

import './Projects.scss';
import Project from '../Project';
import Pagination from '../Pagination';
import {departmentActions, employeeActions, projectActions, skillActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";
import EmployeesSearchForm from "../EmployeesSearchForm";
import ProjectsSearchForm from "../ProjectsSearchForm/ProjectsSearchForm";
import ProjectsList from "../ProjectsList/ProjectsList";

class Projects extends Component {
  static propTypes = {
    projects: PropTypes.array,
    // employees: PropTypes.array,
    // skills: PropTypes.array,
    // departments: PropTypes.array,
    count: PropTypes.number,
    // isSkillsLoading: PropTypes.bool,
    isProjectsLoading: PropTypes.bool,
    // isDepartmentsLoading: PropTypes.bool,
    getAllProjects: PropTypes.func,
    searchProjects: PropTypes.func,
    // searchSkills: PropTypes.func,
    // searchDepartments: PropTypes.func,
  };

  // state = {
  //   activePage: 1,
  //   itemsCountPerPage: 20,
  // };

  componentDidMount() {
    window.scroll(0, 0);
    const { getAllProjects } = this.props;
    getAllProjects();
  }

  handlePageChange = (limit, page) => {
    window.scroll(0, 0);
    const { getAllProjects } = this.props;
    getAllProjects(limit, page);
    console.log(page);
    // this.setState((state) => ({
    //   ...state,
    //   activePage: page,
    // }));
  };

  // updateCatalog = () => {
  //   this.setState({
  //     catalog: newCatalog,
  //     activePage: 1
  //   });
  // }

  _handleSearch = (search) => {
    console.log(search);
    const { searchProjects } = this.props;
    searchProjects(search);
  };


  render() {
    const {
      // employees,
      projects,
      // departments,
      count,
      // skills,
      // searchSkills,
      // searchDepartments,
      // isSkillsLoading,
      // isDepartmentsLoading,
      isProjectsLoading
    } = this.props;

    // * PROJECTS NOT LOADED *
    // if (!projects || !employees || !skills || !departments) {
    // if (!projects || isProjectsLoading) {
    if (!projects) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    return (
      <section className="projects">
        <div className="z-depth-1">

          <ProjectsSearchForm
            handleProjectsSearch={ this._handleSearch }
            // projects={ projects }
            // skills={ skills }
            // departments={ departments }
            // searchDepartments={ searchDepartments }
            // searchSkills={ searchSkills }
            // isSkillsLoading={ isSkillsLoading }
            // isDepartmentsLoading={ isDepartmentsLoading }
          />

          {/*<div className="projects__toolbar">*/}
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
              {/*</div>*/}

              {/*<div className="tools__sorting">*/}
                {/*<div className="input-field input-field--sorting">*/}
                  {/*<i className="material-icons prefix">import_export</i>*/}
                  {/*<select className="select js-select-sorting" onChange={ this.updateCatalog }>*/}
                    {/*<option value="0">Default</option>*/}
                    {/*<option value="1">Project titles (A - Z)</option>*/}
                    {/*<option value="2">Project titles (Z - A)</option>*/}
                    {/*<option value="3">Number of employees (descending)</option>*/}
                    {/*<option value="4">Number of employees (ascending)</option>*/}
                  {/*</select>*/}
                  {/*<label>Sort by</label>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<div className="chips chips-placeholder chips-autocomplete">*/}
              {/*<input className="js-chips-input" />*/}
            {/*</div>*/}
          {/*</div>*/}

          <ProjectsList
            projects={ projects }
            count={ count }
            isProjectsLoading={ isProjectsLoading }
            handlePageChange={ this.handlePageChange }
          />

        </div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Projects);
