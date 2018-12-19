import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import Pager from "react-bootstrap/es/Pager";

const propTypes = {
  activePage: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

class Pagination extends Component {

  // const numOfPages = Math.ceil(totalItemsCount / itemsCountPerPage);
  // const paginationElems = [ ];
  // for (let i = 1; i <= numOfPages; i++) {
  //   paginationElems.push(
  //     <li
  //       key={ i }
  //       className={ activePage === i ? 'active' : 'active-element' }
  //       onClick={ () => { onChange(i); } }>
  //       <a>{ i }</a>
  //     </li>
  //   );
  // }

  _prev = () => {
    const { activePage, itemsCountPerPage, onChange } = this.props;
    onChange(itemsCountPerPage, (activePage - 1))
  };

  _next = () => {
    const { activePage, itemsCountPerPage, onChange } = this.props;
    onChange(itemsCountPerPage, (activePage + 1))
  };

  render() {
    const { activePage, itemsCountPerPage, totalItemsCount } = this.props;

    return (
      <Pager>
        <Pager.Item
          disabled={activePage - 1 <= 0}
          onClick={ this._prev }
        >Previous
        </Pager.Item>
        <Pager.Item
          disabled={activePage + 1 >= Math.ceil(totalItemsCount / itemsCountPerPage)}
          onClick={ this._next }
        >Next
        </Pager.Item>
      </Pager>
    );
  }
}

Pagination.propTypes = propTypes;

export default Pagination;
