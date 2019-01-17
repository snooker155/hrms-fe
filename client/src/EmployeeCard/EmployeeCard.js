import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import './EmployeeCard.scss';
import EmployeeCard__Info from '../EmployeeCard__Info';
import EmployeeCard__Skills from '../EmployeeCard__Skills';
import EmployeeCard__Projects from '../EmployeeCard__Projects';
import {employeeActions, skillActions} from "../_actions";
import connect from "react-redux/es/connect/connect";
import avatar from '../static-assets/img/avatar-default.png'
import Spinner from "react-spinner-material";
import Grid from "react-bootstrap/es/Grid";
import EmployeeCard__Presentation from "../EmployeeCard__Presentation/EmployeeCard__Presentation";
import TechnologyCard__Presentation from "../TechnologyCard__Presentation/TechnologyCard__Presentation";

class EmployeeCard extends Component {
  static propTypes = {
    employee: PropTypes.object,
    // projects: PropTypes.array.isRequired,
    // currentUserId: PropTypes.number.isRequired,
    match: PropTypes.object,
    getEmployeeByUsername: PropTypes.func,
    employeeUsername: PropTypes.string,
    currentUserUsername: PropTypes.string,
    updateSkill: PropTypes.func,
    deleteSkill: PropTypes.func,
    skills: PropTypes.array,
    getAllSkills: PropTypes.func,
    skillsTypes: PropTypes.array,
    getSkillsTypes: PropTypes.func,
    getSkillsByType: PropTypes.func,
    superuser: PropTypes.bool,
    currentUserId: PropTypes.string,
  };

  state = {
    activeTab: 1
  };

  constructor(props){
    super(props);
  }

  componentDidMount() {
    window.scroll(0, 0);

    const { employeeUsername, getEmployeeByUsername, getAllSkills, getSkillsTypes } = this.props;
    getEmployeeByUsername(employeeUsername);
    getAllSkills();
    getSkillsTypes();
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   activeTab: 1
    // });

    window.scroll(0, 0);

    // const { employeeId, getEmployeeById } = this.props;
    // if( nextProps.match.params.employeeId !== employeeId ) {
    //   const employeeId = nextProps.match.params.employeeId;
    //   getEmployeeById(employeeId);
    // }
  }

  componentDidUpdate(prevProps) {
    const { employeeUsername, getEmployeeByUsername } = this.props;
    if( prevProps.match.params.employeeUsername !== employeeUsername ) {
      getEmployeeByUsername(employeeUsername);
    }
  }

  onTabClick = (i) => {
    this.setState({
      activeTab: i
    });
  };

  render() {
    const { activeTab } = this.state;
    const {
      employee,
      currentUserUsername,
      updateSkill,
      deleteSkill,
      skills,
      skillsTypes,
      getSkillsByType,
      superuser,
      currentUserId
    } = this.props;

    // * USER NOT FOUND *
    if (!employee) {
      return (
        <div style={ { display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    // if(employee.projects && employee.project.length !== 0) {
    //   for (let i = 0; i < employee.projects.length; i++) {
    //     employee.projects[i] = {
    //       ...employee.projects[i],
    //       description: employee.projects[i].description,
    //       // status,
    //       // technologies
    //     }
    //   }
    // }

    return (
      <div className="EmployeeCard animated fadeIn fast">
        <EmployeeCard__Presentation employee={ employee } />
        <div className="EmployeeCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Info</span>
              </li>
              <li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>
                <span>Skills</span>
              </li>
              <li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>
                <span>Projects</span>
              </li>
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1 &&
                <div className='EmployeeCard__info animated fadeIn fast'>
                    <EmployeeCard__Info
                      employee={ employee }
                      currentUserId={ currentUserId }
                    />
                </div>
              }

              { activeTab === 2
                ? <div className='EmployeeCard__skills animated fadeIn fast'>
                  <h2>{ employee.attributes.login === currentUserUsername ? 'My' : null } Skills</h2>
                  <EmployeeCard__Skills
                    employee={ employee }
                    currentUserUsername={ currentUserUsername }
                    currentUserId={ currentUserId }
                    updateSkill={ updateSkill }
                    deleteSkill={ deleteSkill }
                    skills={ skills }
                    skillsTypes = { skillsTypes }
                    getSkillsByType = { getSkillsByType }
                    superuser = { superuser }
                  />
                </div>
                : null
              }

              { activeTab === 3
                ? <div className='EmployeeCard__projects animated fadeIn fast'>
                  <h2>{ employee.attributes.login === currentUserUsername ? 'My' : null } Projects</h2>
                  <div className='EmployeeCard__projects__list'>
                    {
                      employee.projects.map(project => <EmployeeCard__Projects key={ project.id } project={ project } position={ employee.relationships.position.data.title } />)
                    }
                  </div>
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  employee: state.employees.employee,
  employeeUsername: ownProps.match.params.employeeUsername,
  currentUserUsername: state.auth.user.attributes.login,
  currentUserId: state.auth.user.id,
  // currentUserId: ownProps.match.params.employeeId,
  skills: state.skills.skills,
  skillsTypes: state.skills.skillsTypes,
  superuser: state.auth.user.superuser,
});

const mapDispatchToProps = dispatch => ({
  getEmployeeByUsername: (username) => { dispatch(employeeActions.getByUsername(username)); },
  updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); },
  getAllSkills: () => { dispatch(skillActions.getAll()); },
  getSkillsTypes: () => { dispatch(skillActions.getSkillsTypes()); },
  getSkillsByType: (skillType) => { dispatch(skillActions.getByType(skillType)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(EmployeeCard);
