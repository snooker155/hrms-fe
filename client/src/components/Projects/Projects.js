import React, { Component } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import './Projects.scss';
import Project from '../Project';
import Pagination from '../Pagination';

export default class Projects extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired
  }

  state = {
    catalog: this.props.projects.slice(),
    activePage: 1,
    itemsCountPerPage: 10,
    chips: [ ]
  }

  componentDidMount() {
    const { skills } = this.props;
    const data = { };
    for (let i = 0; i < skills.length; i++) {
      data[skills[i].title] = null;
    }

    M.Chips.init(document.querySelectorAll('.chips'), {
      placeholder: 'Enter skill',
      secondaryPlaceholder: 'Add skill',
      autocompleteOptions: {
        data,
        limit: 8,
        minLength: 1
      },
      onChipAdd: (undefined, chip) => {
        const chipContent = chip.innerText.split('\n')[0];
        this.setState(state => ({
          chips: [ ...state.chips, chipContent ]
        }));
        this.updateCatalog();

        document.querySelector('.chips').click();
      },
      onChipDelete: (undefined, chip) => {
        const chipContent = chip.innerText.slice(0, -5);
        this.setState(state => ({
          chips: [ ...state.chips.filter(chip => !(chip.toLowerCase() === chipContent.toLowerCase())) ]
        }));
        this.updateCatalog();
      }
    });

    M.FormSelect.init(document.querySelector('.js-select-department'));
    M.FormSelect.init(document.querySelector('.js-select-sorting'));

    window.scroll(0, 0);
  }

  handlePageChange = (newActivePage) => {
    window.scroll(0, 0);

    this.setState({
      activePage: newActivePage
    });
  }

  updateCatalog = () => {
    const { chips } = this.state;
    let newCatalog = [ ...this.props.projects ];

    const filterByDepartmentsValue = document.querySelector('.js-select-department').value;
    if (filterByDepartmentsValue !== 'all') {
      newCatalog = newCatalog.filter(project => project.department.title === filterByDepartmentsValue);
    }

    for (let i = 0; i < newCatalog.length; i++) {
      const isProjectSuitable = chips.every(chip => newCatalog[i].technologies.some(technology => technology.title.toLowerCase() === chip.toLowerCase()));
      if (!isProjectSuitable) {
        newCatalog.splice(i, 1);
        i--;
      }
    }

    const sortProjectsValue = +document.querySelector('.js-select-sorting').value;
    switch(sortProjectsValue) {
      case 1:
        newCatalog = newCatalog.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 2:
        newCatalog = newCatalog.sort((a, b) => -a.title.localeCompare(b.title));
        break;
      case 3:
        newCatalog = newCatalog.sort((a, b) => b.employees.length - a.employees.length);
        break;
      case 4:
        newCatalog = newCatalog.sort((a, b) => a.employees.length - b.employees.length);
        break;
      default:
        break;
    }

    this.setState({
      catalog: newCatalog,
      activePage: 1
    });
  }


  render() {
    const { catalog, activePage, itemsCountPerPage } = this.state;
    const { employees } = this.props;

    let departmentsOptions = new Set();
    for (let i = 0; i < employees.length; i++) {
      departmentsOptions.add(employees[i].department.title);
    }
    departmentsOptions = [ ...departmentsOptions ].map(department => (
      <option key={ department } value={ department }>{ department }</option>
    ));

    return (
      <section className="projects">
        <div className="z-depth-1">
          <div className="projects__toolbar">
            <div className="tools">
              <div className="tools__filtering">
                <div className="input-field input-field--department">
                  <i className="material-icons prefix">group</i>
                  <select className="select js-select-department" onChange={ this.updateCatalog }>
                    <option value="all">All departments</option>
                    { departmentsOptions }
                  </select>
                  <label>Filter by department</label>
                </div>
              </div>

              <div className="tools__sorting">
                <div className="input-field input-field--sorting">
                  <i className="material-icons prefix">import_export</i>
                  <select className="select js-select-sorting" onChange={ this.updateCatalog }>
                    <option value="0">Default</option>
                    <option value="1">Project titles (A - Z)</option>
                    <option value="2">Project titles (Z - A)</option>
                    <option value="3">Number of employees (descending)</option>
                    <option value="4">Number of employees (ascending)</option>
                  </select>
                  <label>Sort by</label>
                </div>
              </div>
            </div>
            <div className="chips chips-placeholder chips-autocomplete">
              <input className="js-chips-input" />
            </div>
          </div>

          <div className="projects__catalog">
            {
              catalog.length
                ? catalog.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage).map(project => {
                    return (
                      <Project key={ project.id } project={ project } />
                    );
                  })
                : <p className="notFound">No projects were found for a given critetia.</p>
            }
          </div>

          {
            Math.ceil(catalog.length / itemsCountPerPage) > 1
              ? <div className="projects__pagination">
                  <Pagination
                    activePage={ activePage }
                    itemsCountPerPage={ itemsCountPerPage }
                    totalItemsCount={ catalog.length }
                    onChange={ this.handlePageChange }
                  />
                </div>
              : null
          }
        </div>
      </section>
    );
  }
}
