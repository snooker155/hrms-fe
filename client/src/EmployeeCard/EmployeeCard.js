import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import './EmployeeCard.scss';
import EmployeeCard__Info from '../EmployeeCard__Info';
import EmployeeCard__Skills from '../EmployeeCard__Skills';
import EmployeeCard__Projects from '../EmployeeCard__Projects';
import {employeeActions} from "../_actions";
import connect from "react-redux/es/connect/connect";

class EmployeeCard extends Component {
  static propTypes = {
    employee: PropTypes.object,
    // projects: PropTypes.array.isRequired,
    // currentUserId: PropTypes.number.isRequired,
    match: PropTypes.object,
    getEmployeeById: PropTypes.func,
    employeeId: PropTypes.string,
    currentUserId: PropTypes.string
  };

  state = {
    activeTab: 1
  };

  constructor(props){
    super(props);
  }

  componentDidMount() {
    window.scroll(0, 0);

    const { employeeId, getEmployeeById } = this.props;
    getEmployeeById(employeeId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTab: 1
    });

    window.scroll(0, 0);

    // const { employeeId, getEmployeeById } = this.props;
    // if( nextProps.match.params.employeeId !== employeeId ) {
    //   const employeeId = nextProps.match.params.employeeId;
    //   getEmployeeById(employeeId);
    // }
  }

  componentDidUpdate(prevProps) {
    const { employeeId, getEmployeeById } = this.props;
    if( prevProps.match.params.employeeId !== employeeId ) {
      getEmployeeById(employeeId);
    }
  }

  onTabClick = (i) => {
    this.setState({
      activeTab: i
    });
  }

  render() {
    const { activeTab } = this.state;
    const { employee, currentUserId } = this.props;

    // * USER NOT FOUND *
    if (!employee) {
      return (<em>Loading...</em>);
    }

    for (let i = 0; i < employee.projects.length; i++) {
      employee.projects[i] = {
        ...employee.projects[i],
        description: employee.projects[i].description,
        // status,
        // technologies
      }
    }

    return (
      <div className="EmployeeCard animated fadeIn fast">
        <div className="EmployeeCard__presentation">
          <div className="EmployeeCard__avatar">
            <img className="EmployeeCard__image" src={ `https://randomuser.me/api/portraits/${ employee.gender ? 'men' : 'women' }/65.jpg` } />
          </div>
          <div>
            <h3 className="EmployeeCard__fullname">{ `${ employee.name } ${ employee.surname}` }</h3>
            <p className="EmployeeCard__department">
              <i className="material-icons">business</i>
              <Link to={`/departments/${ employee.department._id }`} >
                { employee.department.title }
              </Link>
            </p>

            <h3 className="EmployeeCard__contacts">
              <i className="material-icons">contact_mail</i>Email: { employee.email }
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
                <span>Projects</span>
              </li>
              <li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>
                <span>Skills</span>
              </li>
            </ul>

            <div className="c-tabs__content">
              { activeTab === 1
                ? <div className='EmployeeCard__info animated fadeIn fast'>
                    <EmployeeCard__Info employee={ employee } />
                  </div>
                : null
              }

              { activeTab === 2
                ? <div className='EmployeeCard__projects animated fadeIn fast'>
                  <h2>{ employee._id === currentUserId ? 'My' : null } Projects</h2>
                  {
                    employee.projects.map(project => <EmployeeCard__Projects key={ project._id } project={ project } position={ employee.position } />)
                  }
                </div>
                : null
              }

              { activeTab === 3
                ? <div className='EmployeeCard__skills animated fadeIn fast'>
                    <h2>{ employee._id === currentUserId ? 'My' : null } Skills</h2>
                    <EmployeeCard__Skills employee={ employee } currentUserId={ currentUserId }/>
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
  employeeId: ownProps.match.params.employeeId,
  currentUserId: state.auth.user._id
  // currentUserId: ownProps.match.params.employeeId
});

const mapDispatchToProps = dispatch => ({
  getEmployeeById: (id) => { dispatch(employeeActions.getById(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(EmployeeCard);
