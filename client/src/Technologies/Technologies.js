import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Technologies.scss';
import Technology from '../Technology';
import Pagination from '../Pagination';
import {projectActions, skillActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";
import EmployeesSearchForm from "../Employees__SearchForm";
import Technologies__SearchForm from "../Technologies__SearchForm/Technologies__SearchForm";
import Projects__List from "../Projects__List/Projects__List";
import Technologies__List from "../Technologies__List/Technologies__List";

class Technologies extends Component {
  static propTypes = {
    technologies: PropTypes.array,
    getAllTechnologies: PropTypes.func,
    searchTechnologies: PropTypes.func,
    isTechnologiesLoading: PropTypes.bool,
    count: PropTypes.number,
    superuser: PropTypes.bool,
    getSkillsTypes: PropTypes.func,
    skillsTypes: PropTypes.array,
    addNewSkill: PropTypes.func,
  };

  state = {
    search: null,
  };

  componentDidMount() {
    window.scroll(0, 0);
    const { getAllTechnologies, getSkillsTypes } = this.props;
    getAllTechnologies(7, 1);
    getSkillsTypes();
  }

  _handlePageChange = (limit, page) => {
    console.log(limit + " : " + page);
    window.scroll(0, 0);
    const { getAllTechnologies, searchTechnologies } = this.props;
    const { search } = this.state;
    if(search) {
      searchTechnologies(search, limit, page);
    }else {
      getAllTechnologies(limit, page);
    }
    // console.log(page);
    // this.setState((state) => ({
    //   ...state,
    //   activePage: page,
    // }));
  };

  _handleSearch = (search) => {
    // console.log(search);
    this.setState((state) => ({
      ...state,
      search: search,
    }));
    const { searchTechnologies, getAllTechnologies } = this.props;
    if(search) {
      searchTechnologies(search);
    }else{
      getAllTechnologies(7, 1);
    }
  };

  _addNewSkill = (newSkill) => {
    // console.log(newSkill);
    const { addNewSkill } = this.props;
    addNewSkill(newSkill);
  };

  render() {
    const {
      technologies,
      count,
      isTechnologiesLoading,
      superuser,
      skillsTypes,
    } = this.props;

    // * TECHNOLOGIES NOT LOADED *
    if (!technologies) {
      return (
        <div style={ { display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    return (
      <section className="technologies">
        {/*<div className="technologies__toolbar z-depth-1">*/}
          {/*<div className="tools">*/}
            {/*<div className="tools__filtering">*/}
              {/*<div className="input-field input-field--technologies">*/}
                {/*<i className="material-icons prefix">search</i>*/}
                {/*<input type="text" id="autocomplete-input" className="autocomplete js-input-technology" onChange={ this.searchTechnologies } />*/}
                {/*<label htmlFor="autocomplete-input">Search technology</label>*/}
              {/*</div>*/}
            {/*</div>*/}

            {/*<div className="tools__sorting">*/}
              {/*<div className="input-field input-field--sorting">*/}
                {/*<i className="material-icons prefix">import_export</i>*/}
                {/*<select className="select js-select-sorting" onChange={ this.sortTechnologies }>*/}
                  {/*<option value="0">Default</option>*/}
                  {/*<option value="1">Tech popularity (descending)</option>*/}
                  {/*<option value="2">Tech popularity (ascending)</option>*/}
                  {/*<option value="3">Tech titles (A - Z)</option>*/}
                  {/*<option value="4">Tech titles (Z - A)</option>*/}
                {/*</select>*/}
                {/*<label>Sort by</label>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</div>*/}

        <Technologies__SearchForm
          handleTechnologiesSearch={ this._handleSearch }
          superuser={ superuser }
          skillsTypes={ skillsTypes }
          addNewSkill={ this._addNewSkill }
        />

        <Technologies__List
          technologies={ technologies }
          count={ count }
          isTechnologiesLoading={ isTechnologiesLoading }
          handlePageChange={ this._handlePageChange }
        />

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // skills: state.skills.skills,
  // projects: state.projects.projects,
  // employees: state.employees.employees,
  // departments: state.departments.departments,
  //@TODO: filter should be replaced from component
  technologies: state.skills.skills.filter(skill => skill.type === 'technology'),
  isTechnologiesLoading: state.skills.loading,
  count: state.skills.count,
  superuser: state.auth.user.superuser,
  // isSkillsLoading: state.skills.loading,
  // isDepartmentsLoading: state.departments.loading,
  skillsTypes: state.skills.skillsTypes.filter(type => type === 'technology'),
});

const mapDispatchToProps = dispatch => ({
  //@TODO: slow operation to get popularity of skills
  getAllTechnologies: (limit, page) => { dispatch(skillActions.getByType('technology', limit, page)); },
  searchTechnologies: (value, limit, page) => { dispatch(skillActions.search(value, limit, page)); },
  getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  addNewSkill: (newSkill) => { dispatch(skillActions.create(newSkill)); },
  // searchTechnologies: (value) => { dispatch(projectActions.search(value)); },
  // searchSkills: (search_value) => { dispatch(skillActions.search(search_value)); },
  // searchDepartments: (search_value) => { dispatch(departmentActions.search(search_value)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Technologies);
