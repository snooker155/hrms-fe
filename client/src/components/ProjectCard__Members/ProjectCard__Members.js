import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProjectCard__Members.scss';
import CardTableActions from '../CardTableActions';

export default class ProjectCard__Members extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    isProjectManager: PropTypes.bool.isRequired
  }

  state = {
    employees: this.props.employees,
    editableRow: null
  }

  componentDidMount() {
    document.querySelector('.ProjectCard__staffCount').innerHTML = `<i class="material-icons">people</i>Team: ${ this.props.employees.length }`;
  }

  onAddClick = () => {
    const newEmployee = {
      name: '',
      surname: '',
      link: '/employees',
      startDate: new Date().toJSON()
    };

    const count = Number(document.querySelector('.ProjectCard__staffCount').innerHTML.split(' ').pop());
    document.querySelector('.ProjectCard__staffCount').innerHTML = `<i class="material-icons">people</i>Team: ${ count + 1 }`;

    this.setState(state => ({
      employees: [ ...state.employees, { ...newEmployee, id: state.employees.length } ],
      editableRow: state.employees.length
    }));
  }

  onEditClickHandler = i => {
    this.setState({
      editableRow: i
    });
  }

  onDeleteClickHandler = i => {
    const count = Number(document.querySelector('.ProjectCard__staffCount').innerHTML.split(' ').pop());
    document.querySelector('.ProjectCard__staffCount').innerHTML = `<i class="material-icons">people</i>Team: ${ count - 1 }`;

    this.setState(state => ({
      employees: [ ...state.employees.slice(0, i), ...state.employees.slice(i + 1) ]
    }));
  }

  onApplyClickHandler = i => {
    const { employees } = this.state;
    const newFullName = document.querySelector('.js-input-field-fullname');
    const newPosition = document.querySelector('.js-input-field-position');

    const splittedFullName = newFullName.value.trim().split(' ');
    if (splittedFullName.length < 2 || splittedFullName[0] === '' || splittedFullName[1] === '') {
      newFullName.classList.add('invalid');
      return;
    }

    if (newPosition.value.trim() === '') {
      newPosition.classList.add('invalid');
      return;
    }

    const user = {
      ...employees[i],
      name: splittedFullName[0],
      surname: splittedFullName[1],
      position: newPosition.value.trim()
    };

    this.setState(state => ({
      employees: [ ...state.employees.slice(0, i), user,...state.employees.slice(i + 1) ],
      editableRow: null
    }));
  }

  onCancelClickHandler = i => {
    const { employees } = this.state;
    if (employees[i].name === '' && employees[i].surname === '') {
      const count = Number(document.querySelector('.ProjectCard__staffCount').innerHTML.split(' ').pop());
      document.querySelector('.ProjectCard__staffCount').innerHTML = `<i class="material-icons">people</i>Team: ${ count - 1 }`;

      this.setState((state) => ({
        employees: [ ...state.employees.slice(0, i), ...state.employees.slice(i + 1) ],
        editableRow: null
      }));
    } else {
      this.setState({
        editableRow: null
      });
    }
  }

  render() {
    const { employees, editableRow } = this.state;
    const { isProjectManager } = this.props;

    return (
      <>
        { isProjectManager
          ? <i className={ editableRow !== null
                          ? 'material-icons material-icons--add material-icons--disabled'
                          : 'material-icons material-icons--add'}
                onClick={ this.onAddClick }>
              note_add
            </i>
          : null
        }
        <table className="pc-members">
          <thead>
            <tr className="pc-members__row">
              <th className="pc-members__item">
                <span>Full Name</span>
              </th>
              <th className="pc-members__item">
                <span>Position</span>
              </th>
              <th className="pc-members__item">
                <span>Start Date</span>
              </th>
              { isProjectManager
                ?  <th className="pc-members__item">
                      <span>Actions</span>
                    </th>
                : null
              }
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee, i) => (
                <tr key={ employee.name + employee.surname + employee.id }
                    className={ editableRow !== null && editableRow !== i
                              ? 'pc-members__row pc-members__row--disabled'
                              : 'pc-members__row'
                }>
                  <td className="pc-members__item">
                    { editableRow === i
                      ? <input type="text"
                              className="input-field js-input-field-fullname"
                              defaultValue= { `${ employee.name } ${ employee.surname }` }
                              autoFocus={ true }
                              onFocus={ e => { e.target.classList.remove('invalid'); } }
                        />
                      : <Link to={ employee.link } >
                          { `${ employee.name } ${ employee.surname }` }
                        </Link>
                    }
                  </td>
                  <td className="pc-members__item">
                    { editableRow === i
                      ? <input type="text"
                              className="input-field js-input-field-position"
                              defaultValue={ employee.position }
                              onFocus={ e => { e.target.classList.remove('invalid'); } }
                        />
                      : <> { employee.position } </>
                    }
                  </td>
                  <td className="pc-members__item">
                    { new Date(employee.startDate).toLocaleDateString() }
                  </td>
                  { isProjectManager
                    ?  <td className="pc-members__item pc-members__item--edit">
                          <CardTableActions
                            isActive={ editableRow === i }
                            onEditClick={ () => { this.onEditClickHandler(i) } }
                            onDeleteClick={ () => { this.onDeleteClickHandler(i) } }
                            onApplyClick={ () => { this.onApplyClickHandler(i) } }
                            onCancelClick={ () => { this.onCancelClickHandler(i) } }
                          />
                        </td>
                    : null
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }
}
