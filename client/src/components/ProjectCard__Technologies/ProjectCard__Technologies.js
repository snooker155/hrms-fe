import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProjectCard__Technologies.scss';
import CardTableActions from '../CardTableActions';

export default class ProjectCard__Technologies extends Component {
  static propTypes = {
    technologies: PropTypes.array.isRequired,
    employees: PropTypes.array.isRequired,
    isProjectManager: PropTypes.bool.isRequired
  }

  state = {
    technologies: this.props.technologies,
    editableRow: null
  }

  onAddClick = () => {
    const newTechnology = {
      title: '',
      version: '',
      link: '/skills'
    };

    this.setState(state => ({
      technologies: [ ...state.technologies, newTechnology ],
      editableRow: state.technologies.length
    }));
  }

  onEditClickHandler = i => {
    this.setState({
      editableRow: i
    });
  }

  onDeleteClickHandler = i => {
    this.setState(state => ({
      technologies: [ ...state.technologies.slice(0, i), ...state.technologies.slice(i + 1) ]
    }));
  }

  onApplyClickHandler = i => {
    const { technologies } = this.state;
    const newTechnology = document.querySelector('.js-input-field-technology');
    const newVersion = document.querySelector('.js-input-field-version');

    if (newTechnology.value.trim() === '') {
      newTechnology.classList.add('invalid');
      return;
    }

    if (newVersion.value.trim() === '') {
      newVersion.classList.add('invalid');
      return;
    }

    const editedTechnology = {
      ...technologies[i],
      title: newTechnology.value.trim(),
      version: newVersion.value.trim(),
      link: encodeURI(`/skills/${ newTechnology.value.trim() }`)
    };

    this.setState(state => ({
      technologies: [ ...state.technologies.slice(0, i), editedTechnology,...state.technologies.slice(i + 1) ],
      editableRow: null
    }));
  }

  onCancelClickHandler = i => {
    const { technologies } = this.state;
    if (technologies[i].title === '' && technologies[i].version === '') {
      this.setState((state) => ({
        technologies: [ ...state.technologies.slice(0, i), ...state.technologies.slice(i + 1) ],
        editableRow: null
      }));
    } else {
      this.setState({
        editableRow: null
      });
    }
  }

  render() {
    const { technologies, editableRow } = this.state;
    const { employees, isProjectManager } = this.props;

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
        <table className="pc-technologies striped">
          <thead>
            <tr className="pc-technologies__row">
              <th className="pc-technologies__item">
                <span>Technology Title</span>
              </th>
              <th className="pc-technologies__item">
                <span>Version</span>
              </th>
              <th className="pc-technologies__item">
                <span>Staff Count</span>
              </th>
              { isProjectManager
                ? <th className="pc-technologies__item">
                      <span>Actions</span>
                    </th>
                : null
              }
            </tr>
          </thead>
          <tbody>
            {
              technologies.map((technology, i) => (
                <tr key={ technology.title + i }
                    className={ editableRow !== null && editableRow !== i
                              ? 'pc-technologies__row pc-technologies__row--disabled'
                              : 'pc-technologies__row'
                }>
                  <td className="pc-technologies__item">
                    { editableRow === i
                      ? <input type="text"
                              className="input-field js-input-field-technology"
                              defaultValue= { technology.title }
                              autoFocus={ true }
                              onFocus={ e => { e.target.classList.remove('invalid'); } }
                        />
                      : <Link to={ technology.link } >
                          { technology.title }
                        </Link>
                    }
                  </td>
                  <td className="pc-technologies__item">
                    { editableRow === i
                      ? <input type="text"
                              className="input-field js-input-field-version"
                              defaultValue= { technology.version }
                              onFocus={ e => { e.target.classList.remove('invalid'); } }
                        />
                      : <> { technology.version } </>

                    }
                  </td>
                  <td className="pc-technologies__item">
                  { editableRow === i
                      ? null
                      : employees.reduce((sum, employee) => employee.skills.find(skill => skill.title === technology.title) ? (sum + 1) : sum, 0)
                  }
                  </td>
                  { isProjectManager
                    ?  <td className="pc-technologies__item pc-technologies__item--edit">
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
