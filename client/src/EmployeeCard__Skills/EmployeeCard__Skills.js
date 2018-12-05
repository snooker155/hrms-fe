import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EmployeeCard__Skills.scss';
import StarRating from '../StarRating';
import CardTableActions from '../CardTableActions';

export default class EmployeeCard__Skills extends Component {
  static propTypes = {
    employee: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      manager: PropTypes.shape({
        _id: PropTypes.string.isRequired
      }),
      skills: PropTypes.array.isRequired
    }),
    currentUserId: PropTypes.string.isRequired,
    editSkill: PropTypes.func,
    createSkill: PropTypes.func,
    deleteSkill: PropTypes.func
  };

  state = {
    editableRow: null
  };

  addSkill = () => {
    const { _id: employeeId, manager: { _id: employeeManagerId } } = this.props.employee;

    this.setState(state => ({
      skills: [ ...state.skills, {
        title: '',
        degree: [
          {
            value: 0,
            source: employeeId,
            date: null
          },
          {
            value: 0,
            source: employeeManagerId,
            date: null
          }
        ],
        link: '/skills'
      }],
      editableRow: state.skills.length
    }));
  };

  onEditClickHandler = index => {
    this.setState({
      editableRow: index
    });
  };

  onDeleteClickHandler = index => {
    const { employee, deleteSkill } = this.props;
    employee.skills.splice(index, 1);
    deleteSkill(employee);
    this.setState({
      editableRow: null
    });
  };

  onApplyClickHandler = index => {
    const { skills } = this.state;
    const { currentUserId } = this.props;

    const inputValue = document.querySelector('.js-input-field-skill');
    if (inputValue.value.trim() === '') {
      inputValue.classList.add('invalid');
      return;
    }

    const degree = skills[index].degree.filter(degree => degree.source !== currentUserId).pop();
    let value = 0;
    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById( `star${ i }__r${ index }` );
      if (star.checked) {
        value = Number(star.value);
        break;
      }
    }

    const newSkill = {
      title: inputValue.value.trim(),
      degree: [
        degree,
        {
          value: value,
          source: currentUserId,
          date: new Date().toJSON()
        }
      ],
      link: encodeURI(`/skills/${ inputValue.value.trim() }`)
    };

    this.setState((state) => ({
      skills: [ ...state.skills.slice(0, index), newSkill, ...state.skills.slice(index + 1) ],
      editableRow: null
    }));
  };

  onCancelClickHandler = () => {
    this.setState({
      editableRow: null
    });
    // const { skills } = this.state;
    // const { currentUserId } = this.props;
    //
    // if (skills[index].title !== '') {
    //   let degree = skills[index].degree.filter(degree => degree.source === currentUserId).pop();
    //   if (degree.date === null) {
    //     degree = skills[index].degree.filter(degree => degree.source !== currentUserId).pop();
    //   }
    //
    //   let value = 0;
    //   for (let i = 1; i <= 5; i++) {
    //     const star = document.getElementById( `star${ i }__r${ index }` );
    //     if (star.checked) {
    //       value = Number(star.value);
    //       break;
    //     }
    //   }
    //
    //   if (value != degree.value) {
    //     document.getElementById( `star${ 6 - degree.value }__r${ index }` ).click();
    //   }
    //
    //   this.setState({
    //     editableRow: null
    //   });
    // } else {
    //   this.setState((state) => ({
    //     skills: [ ...state.skills.slice(0, index), ...state.skills.slice(index + 1) ],
    //     editableRow: null
    //   }));
    // }
  };

  render() {
    const { editableRow } = this.state;
    const { employee: { _id: employeeId, skills: skills, manager: { _id: employeeManagerId } },  currentUserId } = this.props;

    return (
      <>
        { currentUserId === employeeId || currentUserId === employeeManagerId
          ? <i className={ editableRow !== null ? 'material-icons material-icons--add material-icons--disabled' : 'material-icons material-icons--add'} onClick={ this.addSkill }>note_add</i>
          : null
        }
        <table className="ec-skills striped">
            <thead>
              <tr className="ec-skills__row">
                <th className="ec-skills__item">
                  <span>Skill</span>
                </th>
                <th className="ec-skills__item">
                  <span>Level</span>
                </th>
                <th className="ec-skills__item">
                  <span>Last update</span>
                </th>
                { currentUserId === employeeId || currentUserId === employeeManagerId
                  ?  <th className="ec-skills__item">
                        <span>Actions</span>
                      </th>
                  : null
                }
              </tr>
            </thead>

            <tbody>
            {
              skills.map((skill, i) => {
                return (
                  <tr key={ `${ skill.skill.title } ${ i }` }
                      className={ editableRow !== null && editableRow !== i
                                 ? 'ec-skills__row ec-skills__row--disabled'
                                 : 'ec-skills__row'
                  }>
                    <td className="ec-skills__item">
                      { editableRow === i
                          ? <input type="text"
                                   className="input-field js-input-field-skill"
                                   defaultValue={ skill.skill.title }
                                   autoFocus={ true }
                                   onFocus={ e => e.target.classList.remove('invalid') }
                            />
                          : <span><Link to={ `/skills/${ skill.skill._id}` }>{ skill.skill.title }</Link></span>
                      }
                    </td>
                    <td className="ec-skills__item">
                      <StarRating
                        employee_degree={ skill.employee_degree }
                        manager_degree={ skill.manager_degree }
                        isManager={ currentUserId === employeeManagerId }
                        employeeId={ employeeId }
                        index={ i }
                        editableRow={ editableRow === i } />
                    </td>
                    <td className="ec-skills__item">
                      <span>{ new Date(skill.updated).toLocaleDateString() }</span>
                    </td>
                    { currentUserId === employeeId || currentUserId === employeeManagerId
                        ? <td className="ec-skills__item ec-skills__item--edit">
                            <CardTableActions
                              isActive={ editableRow === i }
                              onEditClick={ () => { this.onEditClickHandler(i); } }
                              onDeleteClick={ () => { this.onDeleteClickHandler(i); } }
                              onApplyClick={ () => { this.onApplyClickHandler(i); } }
                              onCancelClick={ () => { this.onCancelClickHandler(i); } }
                            />
                          </td>
                        : null
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </>
    );
  }
}
