// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import './Employees.scss';
import Employee from '../Employee';
import Pagination from '../Pagination';
import type {EmployeeType} from "../../_types";

type EmployeeListProps = {|
  employees: Array<EmployeeType>,
  projects: Array<any>,
  skills: Array<any>
|};

export default class Employees extends Component<EmployeeListProps> {
  // static propTypes = {
  //   employees: PropTypes.array.isRequired,
  //   projects: PropTypes.array.isRequired,
  //   skills: PropTypes.array.isRequired
  // }

  state = {
    catalog: this.props.employees.slice(),
    chips: [],
    activePage: 1,
    itemsCountPerPage: 12
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
        const chipContent = chip.innerHTML.split('<i').shift();

        this.setState(state => ({
          chips: [ ...state.chips, chipContent ]
        }));
        this.updateCatalog();

        document.querySelector('.chips').click();
      },
      onChipDelete: (undefined, chip) => {
        const chipContent = chip.innerHTML.split('<i').shift();
        this.setState(state => ({
          chips: [ ...state.chips.filter(chip => !(chip.toLowerCase() === chipContent.toLowerCase())) ]
        }));
        this.updateCatalog();
      }
    });

    M.FormSelect.init(document.querySelector('.js-select-department'));
    M.FormSelect.init(document.querySelector('.js-select-project'));
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
    let newCatalog = [ ...this.props.employees ];

    const filterByDepartmentsValue = document.querySelector('.js-select-department').value;
    if (filterByDepartmentsValue !== 'all') {
      newCatalog = newCatalog.filter(employee => employee.department.title === filterByDepartmentsValue);
    }

    const filterByProjectsValue = document.querySelector('.js-select-project').value;
    if (filterByProjectsValue !== 'all') {
      newCatalog = newCatalog.filter(employee => employee.projects.some(project => project.title === filterByProjectsValue));
    }

    for (let i = 0; i < newCatalog.length; i++) {
      const isEmployeeSuitable = chips.every(chip => newCatalog[i].skills.some(skill => skill.title.toLowerCase() === chip.toLowerCase()));
      if (!isEmployeeSuitable) {
        newCatalog.splice(i, 1);
        i--;
      }
    }

    const sortEmployeesValue = +document.querySelector('.js-select-sorting').value;
    switch(sortEmployeesValue) {
      case 1:
        newCatalog = newCatalog.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 2:
        newCatalog = newCatalog.sort((a, b) => -a.name.localeCompare(b.name));
        break;
      case 3:
        newCatalog = newCatalog.sort((a, b) => a.surname.localeCompare(b.surname));
        break;
      case 4:
        newCatalog = newCatalog.sort((a, b) => -a.surname.localeCompare(b.surname));
        break;
      case 5:
        newCatalog = newCatalog.sort((a, b) => a.department.title.localeCompare(b.department.title));
        break;
      case 6:
        newCatalog = newCatalog.sort((a, b) => -a.department.title.localeCompare(b.department.title));
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
    const { employees, projects } = this.props;

    let departmentsOptions = new Set();
    for (let i = 0; i < employees.length; i++) {
      departmentsOptions.add(employees[i].department.title);
    }
    departmentsOptions = [ ...departmentsOptions ].map(department => (
      <option key={ department } value={ department }>{ department }</option>
    ));

    const projectsOptions = projects.map(project => (
      <option key={ project.title } value={ project.title }>{ project.title }</option>
    ));

    return (
      <section className="employees">
        <div className="employees__toolbar z-depth-1">
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
              <div className="input-field input-field--projects">
                <i className="material-icons prefix">folder</i>
                <select className="select js-select-project" onChange={ this.updateCatalog }>
                  <option value="all">All projects</option>
                  { projectsOptions }
                </select>
                <label>Filter by project</label>
              </div>
            </div>

            <div className="tools__sorting">
              <div className="input-field input-field--sorting">
                <i className="material-icons prefix">import_export</i>
                <select className="select js-select-sorting" onChange={ this.updateCatalog }>
                  <option value="0">Default</option>
                  <option value="1">Employee names (A - Z)</option>
                  <option value="2">Employee names (Z - A)</option>
                  <option value="3">Employee surnames (A - Z)</option>
                  <option value="4">Employee surnames (Z - A)</option>
                  <option value="5">Department names (A - Z)</option>
                  <option value="6">Department names (Z - A)</option>
                </select>
                <label>Sort by</label>
              </div>
            </div>
          </div>
          <div className="chips chips-placeholder chips-autocomplete">
            <input className="js-chips-input" />
          </div>
        </div>

        <div className="employees__catalog">
          {
            catalog.length
              ? catalog.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage).map(employee => {
                  return (
                    <Employee key={ employee.id } employee={ employee } />
                  );
                })
              : <p className="notFound">No employees were found for a given critetia.</p>
          }
        </div>

        <div className="employees__pagination">
          { Math.ceil(catalog.length / itemsCountPerPage) > 1
              ? <Pagination
                  activePage={ activePage }
                  itemsCountPerPage={ itemsCountPerPage }
                  totalItemsCount={ catalog.length }
                  onChange={ this.handlePageChange }
                />
              : null
          }
        </div>
      </section>
    );
  }
}
