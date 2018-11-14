import React, { Component } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import './Technologies.scss';
import Technology from '../Technology';
import Pagination from '../Pagination';

export default class Technologies extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    technologies: PropTypes.array.isRequired
  }

  state = {
    catalog: this.props.technologies.slice(),
    activePage: 1,
    itemsCountPerPage: 10
  }

  componentDidMount() {
    const { technologies } = this.props;

    const data = { };
    for (let i = 0; i < technologies.length; i++) {
      data[technologies[i].title] = null;
    }

    M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
      data,
      limit: 8,
      minLength: 1,
      onAutocomplete: this.updateCatalog
    });
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
    let newCatalog = [ ...this.props.technologies ];

    const inputTechnologyValue = document.querySelector('.js-input-technology').value.toLowerCase();
    newCatalog = newCatalog.filter(technology => technology.title.toLowerCase().includes(inputTechnologyValue));

    const sortTechnologiesValue = +document.querySelector('.js-select-sorting').value;
    switch(sortTechnologiesValue) {
      case 1:
        newCatalog = newCatalog.sort((a, b) => b.popularity - a.popularity);
        break;
      case 2:
        newCatalog = newCatalog.sort((a, b) => a.popularity - b.popularity);
        break;
      case 3:
        newCatalog = newCatalog.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 4:
        newCatalog = newCatalog.sort((a, b) => -a.title.localeCompare(b.title));
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

    return (
      <section className="technologies animated fadeInRight slow">
        <div className="technologies__toolbar z-depth-1">
          <div className="tools">
            <div className="tools__filtering">
              <div className="input-field input-field--technologies">
                <i className="material-icons prefix">search</i>
                <input type="text" id="autocomplete-input" className="autocomplete js-input-technology" onChange={ this.updateCatalog } />
                <label htmlFor="autocomplete-input">Search technology</label>
              </div>
            </div>

            <div className="tools__sorting">
              <div className="input-field input-field--sorting">
                <i className="material-icons prefix">import_export</i>
                <select className="select js-select-sorting" onChange={ this.updateCatalog }>
                  <option value="0">By default</option>
                  <option value="1">Tech popularity (descending)</option>
                  <option value="2">Tech popularity (ascending)</option>
                  <option value="3">Tech titles (A - Z)</option>
                  <option value="4">Tech titles (Z - A)</option>
                </select>
                <label>Sorting</label>
              </div>
            </div>
          </div>
        </div>

        <div className="technologies__catalog">
          {
            catalog.length
              ? catalog.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage).map(technology => {
                  return (
                    <Technology key={ technology.title } technology={ technology } />
                  );
                })
              : <p className="notFound">No technologies were found for a given critetia.</p>
          }
        </div>

        <div className="technologies__pagination">
            {
              Math.ceil(catalog.length / itemsCountPerPage) > 1
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
