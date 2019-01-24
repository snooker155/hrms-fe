import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

import './DepartmentCard.scss';
import DepartmentCard__Staff from '../DepartmentCard__Staff';
import TechnologyCard__Projects from "../TechnologyCard_Projects/TechnologyCard__Projects";
import { departmentActions } from "../_actions";
import connect from "react-redux/es/connect/connect";
import Spinner from "react-spinner-material";

class DepartmentCard extends Component {
  static propTypes = {
    department: PropTypes.any,
    departmentId: PropTypes.string,
    currentUserId: PropTypes.string,
    getDepartmentById: PropTypes.func,
  };

  state = {
    activeTab: 1
  };

  componentDidMount() {
    window.scroll(0, 0);

    const { departmentId, getDepartmentById } = this.props;
    getDepartmentById(departmentId);
  }

  componentWillReceiveProps() {
    this.setState({
      activeTab: 1
    });

    window.scroll(0, 0);
  }

  onTabClick = (i) => {
    this.setState({
      activeTab: i
    });
  };

  render() {
    const { activeTab } = this.state;
    const { department, currentUserId } = this.props;

    // const [ department ] = departments.filter(department => department.title === decodeURI(location.pathname).split('/').pop());

    // * DEPARTMENT NOT FOUND *
    if (!department) {
      return (
        <div style={ { display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }
    // const departmentManager = department.employees.filter(employee => employee.position === 'Project Manager').pop();

    return (
      <div className="DepartmentCard animated fadeIn fast">
        <div className="DepartmentCard__presentation">
          <div className="DepartmentCard__avatar">
            <img className="DepartmentCard__image" src={ require(`../static-assets/img/departments/${ Number(department.id.toString().slice(-1)) + 1 }.png` ) } />
          </div>
          <div>
            <h3 className="DepartmentCard__title">{ department.attributes.name }</h3>
            {/*<p className="DepartmentCard__manager">*/}
              {/*<i className="material-icons">person_pin</i>*/}
              {/*<Link to={`/employees/${department.manager.attributes.username}`}>*/}
                {/*{ `${ department.manager.attributes.name } ${ department.manager.attributes.surname }`}*/}
              {/*</Link>*/}
            {/*</p>*/}
            <p className="DepartmentCard__staffCount">
              <i className="material-icons">people</i>{ `Staff count: ${ department.relationships.employees.data.length }` }
            </p>
            {/*<p className="DepartmentCard__projectsCount">*/}
              {/*<i className="material-icons">folder</i>{ `Projects: ${ department.projects.length }`}*/}
            {/*</p>*/}
          </div>
        </div>

        <div className="DepartmentCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Staff</span>
              </li>
              {/*<li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>*/}
                {/*<span>Projects</span>*/}
              {/*</li>*/}
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='DepartmentCard__Staff animated fadeIn fast'>
                    <h2>Staff</h2>
                    {/*<DepartmentCard__Staff employees={ department.employees } isDepartmentManager={ department.manager.id === currentUserId } />*/}
                    <DepartmentCard__Staff employees={ department.relationships.employees } />
                  </div>
                : null
              }
              {/*{ activeTab === 2*/}
                {/*? <div className='DepartmentCard__Projects animated fadeIn fast'>*/}
                    {/*<h2>Projects</h2>*/}
                    {/*<TechnologyCard__Projects projects={ department.projects } />*/}
                  {/*</div>*/}
                {/*: null*/}
              {/*}*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  department: state.departments.department,
  // employee: state.employees.employee,
  departmentId: ownProps.match.params.departmentId,
  currentUserId: state.auth.user.id,
  // // currentUserId: ownProps.match.params.employeeId,
  // skills: state.skills.skills,
  // skillsTypes: state.skills.skillsTypes,
});

const mapDispatchToProps = dispatch => ({
  getDepartmentById: (id) => { dispatch(departmentActions.getById(id)); },
  // updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  // deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); },
  // getAllSkills: () => { dispatch(skillActions.getAll()); },
  // getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  // getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(DepartmentCard);
