import React from 'react';

function Pagination  ({ photosPerPage, totalphotos, paginate, activePage }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalphotos / photosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className='pagination'>
                {pageNumbers.map((number) => (
                    <li className={number === activePage ? "page-item active" : "page-item"} >
                        <a className="page-link" onClick={() => paginate(number)}> {number} </a> 
                    </li>
                ))}
                Total Count: {totalphotos}
            </ul>
        </div>
    );
};
export default Pagination;