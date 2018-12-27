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
import Employee from "../Employee";

class Projects extends Component {
  static propTypes = {
    employees: PropTypes.array,
    projects: PropTypes.array,
    skills: PropTypes.array,
    departments: PropTypes.array,
    count: PropTypes.number,
    isProjectsLoading: PropTypes.bool,
    isSkillsLoading: PropTypes.bool,
    isDepartmentsLoading: PropTypes.bool,
    getAllProjects: PropTypes.func,
    searchSkills: PropTypes.func,
    searchDepartments: PropTypes.func,
    searchProjects: PropTypes.func,
  };

  state = {
    // catalog: this.props.projects.slice(),
    activePage: 1,
    itemsCountPerPage: 10,
    // chips: [ ]
  }

  componentDidMount() {
    window.scroll(0, 0);
    const { itemsCountPerPage } = this.state;
    const { getAllProjects } = this.props;
    getAllProjects(itemsCountPerPage);
  }

  handlePageChange = (newActivePage) => {
    window.scroll(0, 0);

    this.setState({
      activePage: newActivePage
    });
  };

  // updateCatalog = () => {
  //   const { chips } = this.state;
  //   let newCatalog = [ ...this.props.projects ];
  //
  //   const filterByDepartmentsValue = document.querySelector('.js-select-department').value;
  //   if (filterByDepartmentsValue !== 'all') {
  //     newCatalog = newCatalog.filter(project => project.department.title === filterByDepartmentsValue);
  //   }
  //
  //   for (let i = 0; i < newCatalog.length; i++) {
  //     const isProjectSuitable = chips.every(chip => newCatalog[i].technologies.some(technology => technology.title.toLowerCase() === chip.toLowerCase()));
  //     if (!isProjectSuitable) {
  //       newCatalog.splice(i, 1);
  //       i--;
  //     }
  //   }
  //
  //   const sortProjectsValue = +document.querySelector('.js-select-sorting').value;
  //   switch(sortProjectsValue) {
  //     case 1:
  //       newCatalog = newCatalog.sort((a, b) => a.title.localeCompare(b.title));
  //       break;
  //     case 2:
  //       newCatalog = newCatalog.sort((a, b) => -a.title.localeCompare(b.title));
  //       break;
  //     case 3:
  //       newCatalog = newCatalog.sort((a, b) => b.employees.length - a.employees.length);
  //       break;
  //     case 4:
  //       newCatalog = newCatalog.sort((a, b) => a.employees.length - b.employees.length);
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   this.setState({
  //     catalog: newCatalog,
  //     activePage: 1
  //   });
  // }


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
      isProjectsLoading
    } = this.props;

    // * PROJECTS NOT LOADED *
    // if (!projects || !employees || !skills || !departments) {
    console.log(!projects);
    if (!projects || isProjectsLoading) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    console.log(projects[0].id);

    // let departmentsOptions = new Set();
    // for (let i = 0; i < employees.length; i++) {
    //   departmentsOptions.add(employees[i].department.title);
    // }
    // departmentsOptions = [ ...departmentsOptions ].map(department => (
    //   <option key={ department } value={ department }>{ department }</option>
    // ));

    return (
      <section className="projects">
        <div className="z-depth-1">

          {/*<ProjectsSearchForm*/}
            {/*handleEmployeesSearch={ this._handleSearch }*/}
            {/*skills={ skills }*/}
            {/*departments={ departments }*/}
            {/*projects={ projects }*/}
            {/*searchDepartments={ searchDepartments }*/}
            {/*searchSkills={ searchSkills }*/}
            {/*isSkillsLoading={ isSkillsLoading }*/}
            {/*isDepartmentsLoading={ isDepartmentsLoading }*/}
          {/*/>*/}

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
            Math.ceil(projects.length / itemsCountPerPage) > 1
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
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  projects: state.projects.projects,
  employees: state.employees.employees,
  skills: state.skills.skills,
  departments: state.departments.departments,
  count: state.projects.count,
  isProjectsLoading: state.projects.loading,
  isSkillsLoading: state.skills.loading,
  isDepartmentsLoading: state.departments.loading,
});

const mapDispatchToProps = dispatch => ({
  getAllProjects: () => { dispatch(projectActions.getAll()); },
  searchProjects: (value) => { dispatch(employeeActions.search(value)); },
  searchSkills: (search_value) => { dispatch(skillActions.search(search_value)); },
  searchDepartments: (search_value) => { dispatch(departmentActions.search(search_value)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Projects);
