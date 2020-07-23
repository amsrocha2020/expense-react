import React from 'react';

const Pagination = ({ contentPerPage, totalRows, paginate }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRows / contentPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className="pagination mb-5">
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} href="#" className="page-link">
                        {number}
                    </a>
                </li>
            ))}
            </ul>
        </nav>
    )

}

export default Pagination;