import React from "react";

export default function Pagination(props) {
  const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (props.currentPage !== props.nPages)
      props.setCurrentPage(props.currentPage + 1);
  };
  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a onClick={prevPage} href="#">
              Previous
            </a>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={props.currentPage === pgNumber ? "active" : ""}
            >
              <a onClick={() => props.setCurrentPage(pgNumber)} href="#">
                {pgNumber}
              </a>
            </li>
          ))}
          <li>
            <a onClick={nextPage} href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
