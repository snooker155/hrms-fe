import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import './EmployeeCard.scss';
import EmployeeCard__Info from '../components/EmployeeCard__Info';
import EmployeeCard__Skills from '../components/EmployeeCard__Skills';
import EmployeeCard__Projects from '../components/EmployeeCard__Projects';
import {authActions, employeeActions} from "../_actions";
import connect from "react-redux/es/connect/connect";

class EmployeeCard extends Component {
  static propTypes = {
    employee: PropTypes.object,
    projects: PropTypes.array.isRequired,
    // currentUserId: PropTypes.number.isRequired,
    match: PropTypes.object,
    getEmployeeById: PropTypes.func
  };

  state = {
    activeTab: 1
  };

  constructor(props){
    super(props);

    const { match, getEmployeeById } = this.props;
    getEmployeeById(match.params.userId);
  }

  componentDidMount() {
    window.scroll(0, 0);
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
  }

  render() {
    const { activeTab } = this.state;
    const { employee, projects } = this.props;

    // const [ user ] = employees.filter(employee => employee.id === Number(location.pathname.split('/').pop()));

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
            <img className="EmployeeCard__image" src={ `https://randomuser.me/api/portraits/${ employee.gender }/65.jpg` } />
          </div>
          <div>
            <h3 className="EmployeeCard__fullname">{ `${ employee.name } ${ employee.surname}` }</h3>
            <p className="EmployeeCard__department">
              <i className="material-icons">business</i>
              <Link to={ employee.department.link }>
                { employee.department.title }
              </Link>
            </p>

            <h3 className="EmployeeCard__contacts">
              <i className="material-icons">contact_mail</i>Contacts:
            </h3>
            <div className="EmployeeCard__contacts-images">
              {/*{*/}
                {/*user.socialMedia.map(media => (*/}
                  {/*<Link key={ media } to={ '/' }>*/}
                    {/*<img src={ require(`../../static-assets/img/socialMediaIcons/${ media }.png`) } />*/}
                  {/*</Link>*/}
                {/*))*/}
              {/*}*/}
           </div>
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
              <li className={ activeTab === 3 ? 'current' : null } onClick={ () => this.onTabClick(3) }>
                <span>Projects</span>
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
                ? <div className='EmployeeCard__skills animated fadeIn fast'>
                    {/*<h2>{ user.id === currentUserId ? 'My' : null } Skills</h2>*/}
                    <h2>Skills</h2>
                    {/*<EmployeeCard__Skills user={ user } currentUserId={ currentUserId }/>*/}
                    <EmployeeCard__Skills employee={ employee }/>
                  </div>
                : null
              }

              { activeTab === 3
                ? <div className='EmployeeCard__projects animated fadeIn fast'>
                    {/*<h2>{ user.id === currentUserId ? 'My' : null } Projects</h2>*/}
                    <h2>Projects</h2>
                    {
                      employee.projects.map(project => <EmployeeCard__Projects key={ project.id } project={ project } position={ employee.position } />)
                    }
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

const mapStateToProps = state => ({
  employee: state.employees.employee
});

const mapDispatchToProps = dispatch => ({
  getEmployeeById: (id) => { dispatch(employeeActions.getById(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(EmployeeCard);
