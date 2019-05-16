import React from 'react'
import _ from 'lodash';
const Pagination = props => {
    // return nav>ul.pagination>li.page-item>a.page-link;
    //items count is the total of all the movies
    const { itemsCount , pageSize } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    //must include plus one because lodash leave off the last page
    //this creates an array of the page numbers
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map(page => (
            <li key={page} className="page-item">
              <a className="page-link">{page}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
}
 
export default Pagination;