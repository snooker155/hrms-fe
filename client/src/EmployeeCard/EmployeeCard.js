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
    deleteSkill: PropTypes.func
  };

  state = {
    activeTab: 1
  };

  constructor(props){
    super(props);
  }

  componentDidMount() {
    window.scroll(0, 0);

    const { employeeUsername, getEmployeeByUsername } = this.props;
    getEmployeeByUsername(employeeUsername);
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
  }

  render() {
    const { activeTab } = this.state;
    const { employee, currentUserUsername, updateSkill, deleteSkill } = this.props;

    // * USER NOT FOUND *
    if (!employee) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    if(employee.projects && employee.project.length !== 0) {
      for (let i = 0; i < employee.projects.length; i++) {
        employee.projects[i] = {
          ...employee.projects[i],
          description: employee.projects[i].description,
          // status,
          // technologies
        }
      }
    }

    return (
      <div className="EmployeeCard animated fadeIn fast">
        <div className="EmployeeCard__presentation">
          <div className="EmployeeCard__avatar">
            {/*<img className="EmployeeCard__image" src={ `https://randomuser.me/api/portraits/${ employee.attributes.gender === 'м' ? 'men' : 'women' }/65.jpg` } />*/}
            <img className="EmployeeCard__image" src={ avatar } />
          </div>
          <div>
            <h3 className="EmployeeCard__fullname">{ `${ employee.attributes.name } ${ employee.attributes.surname}` }</h3>
            <p className="EmployeeCard__department">
              <i className="material-icons">business</i>
              <Link to={`/departments/${ employee.relationships.unit.data.id }`} >
                { employee.relationships.unit.data.name }
              </Link>
            </p>

            <h3 className="EmployeeCard__contacts">
              <i className="material-icons">contact_mail</i>Email: { employee.attributes.email }
            </h3>
          </div>
        </div>
        <div className="EmployeeCard__tabs">
          <div className="c-tabs">
            <ul className="c-tabs__navbar">
              <li className={ activeTab === 1 ? 'current' : null } onClick={ () => this.onTabClick(1) }>
                <span>Info</span>
              </li>
              <li className={ activeTab === 2 ? 'current' : null } onClick={ () => this.onTabClick(2) }>
                <span>Skills</span>
              </li>
              {/*<li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>*/}
                {/*<span>Projects</span>*/}
              {/*</li>*/}
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='EmployeeCard__info animated fadeIn fast'>
                    <EmployeeCard__Info employee={ employee } />
                  </div>
                : null
              }

              { activeTab === 2
                ? <div className='EmployeeCard__skills animated fadeIn fast'>
                  <h2>{ employee.attributes.login === currentUserUsername ? 'My' : null } Skills</h2>
                  <EmployeeCard__Skills
                    employee={ employee }
                    currentUserUsername={ currentUserUsername }
                    updateSkill={ updateSkill }
                    deleteSkill={ deleteSkill }
                  />
                </div>
                : null
              }

              {/*{ activeTab === 3*/}
                {/*? <div className='EmployeeCard__projects animated fadeIn fast'>*/}
                  {/*<h2>{ employee.attributes.login === currentUserUsername ? 'My' : null } Projects</h2>*/}
                  {/*{*/}
                    {/*employee.projects.map(project => <EmployeeCard__Projects key={ project._id } project={ project } position={ employee.position } />)*/}
                  {/*}*/}
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
  employee: state.employees.employee,
  employeeUsername: ownProps.match.params.employeeUsername,
  currentUserUsername: state.auth.user.attributes.login
  // currentUserId: ownProps.match.params.employeeId
});

const mapDispatchToProps = dispatch => ({
  getEmployeeByUsername: (username) => { dispatch(employeeActions.getByUsername(username)); },
  updateSkill: (employee) => { dispatch(employeeActions.update(employee)); },
  deleteSkill: (employee) => { dispatch(employeeActions.delete(employee)); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(EmployeeCard);
