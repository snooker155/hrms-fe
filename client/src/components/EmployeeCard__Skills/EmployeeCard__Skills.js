import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EmployeeCard__Skills.scss';
import StarRating from '../StarRating/StarRating';
import getLateDate from '../../utils/getLateDate';
import EmployeeCard__Actions from '../EmployeeCard__Actions/EmployeeCard__Actions';

export default class EmployeeCard__Skills extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      skills: PropTypes.array.isRequired
    }),
    currentUserId: PropTypes.number.isRequired
  }

  state = {
    skills: this.props.user.skills,
    editableRow: null
  }

  editSkillHandler(i) {
    this.setState({
      editableRow: i
    });
  }

  onApplyClickHandler(index) {
    const { currentUserId } = this.props;
    const inputValue = document.querySelector('.input-field').value;

    const newSkill = {
      title: inputValue,
      degree: [
        {
          value: 0,
          source: currentUserId,
          date: null
        },
        {
          value: 0,
          source: currentUserId,
          date: null
        }
      ],
      link: encodeURI(`/skills/${ inputValue }`)
    };

    this.setState((state) => ({
      skills: [ ...state.skills.slice(0, index), newSkill, ...state.skills.slice(index + 1) ],
      editableRow: null
    }));
  }

  onCancelClickHandler() {
    this.setState({
      editableRow: null
    });
  }

  deleteSkillHandler(index) {
    this.setState((state) => ({
      skills: [ ...state.skills.slice(0, index), ...state.skills.slice(index + 1) ]
    }));
  }

  componentWillReceiveProps() {
    this.setState({
      skills: this.props.user.skills,
      editableRow: null
    });
  }

  render() {
    const { skills, editableRow } = this.state;
    const { user, currentUserId } = this.props;

    return (
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
              {
                currentUserId === user.id || currentUserId === user.manager.id
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
                <tr key={ skill.title }
                    className={ editableRow !== null && editableRow !== i ? 'ec-skills__row ec-skills__row--disabled' : 'ec-skills__row'}>
                  <td className="ec-skills__item">
                    { editableRow === i
                      ? <input type="text" className="input-field" defaultValue={ skill.title } autoFocus={ true } />
                      : <span>{ skill.title }</span>
                    }
                  </td>
                  <td className="ec-skills__item">
                  { skill.degree.find(degree => degree.source === user.id)
                    ? <StarRating rate={ skill.degree.find(degree => degree.source === user.id) } editableRow={ editableRow === i } />
                    : null
                  }
                  </td>
                  <td className="ec-skills__item">
                    <span>{ getLateDate(skill.degree) }</span>
                  </td>
                  { currentUserId === user.id || currentUserId === user.manager.id
                      ? <td className="ec-skills__item ec-skills__item--edit">
                          <EmployeeCard__Actions
                            isActive={ editableRow === i }
                            onApplyClickHandler={ this.onApplyClickHandler.bind(this, i) }
                            onCancelClickHandler={ this.onCancelClickHandler.bind(this) }
                            editSkillHandler={ this.editSkillHandler.bind(this, i) }
                            deleteSkillHandler={ this.deleteSkillHandler.bind(this, i) }
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
    );
  }
}
