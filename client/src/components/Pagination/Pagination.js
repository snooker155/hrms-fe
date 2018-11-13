import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

function Pagination(props) {
  const { activePage, itemsCountPerPage, totalItemsCount, onChange } = props;

  const numOfPages = Math.ceil(totalItemsCount / itemsCountPerPage);
  const paginationElems = [ ];
  for (let i = 1; i <= numOfPages; i++) {
    paginationElems.push(
      <li
        key={ i }
        className={ activePage === i ? 'active' : 'active-element' }
        onClick={ () => { onChange(i); } }>
        <a>{ i }</a>
      </li>
    );
  }

  return (
    <ul className="pagination">
      <li
        className={ activePage === 1 ? 'disabled' : 'active-element' }
        onClick={ () => (activePage !== 1) ? onChange(activePage - 1) : null }>
        <a><i className="material-icons">chevron_left</i></a>
      </li>

      { paginationElems }

      <li
        className={ activePage === numOfPages ? 'disabled' : 'active-element' }
        onClick={ () => (activePage !== numOfPages) ? onChange(activePage + 1) : null }>
        <a><i className="material-icons">chevron_right</i></a>
      </li>
    </ul>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
