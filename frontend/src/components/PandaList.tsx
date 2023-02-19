import React, { useEffect, useState } from 'react';
import pandasDataService from '../api/services';
import AddPandaForm from './AddPandaForm';
import { Panda } from './models';

const PandaList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [pandas, setPandas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    retrievePandas(currentPage);
  }, [currentPage]);

  const retrievePandas = (pageNumber: number) => {
    pandasDataService
      .getAll(pageNumber)
      .then((response) => {
        setPandas(response.data.pandas);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (panda: Panda) => {
    pandasDataService
      .create(panda)
      .then((response) => {
        retrievePandas(currentPage);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Panda'}
      </button>
      {showForm && <AddPandaForm onSubmit={handleSubmit} />}
      <ul>
        {pandas.map((panda: any) => (
          <li key={panda.id}>
            Name: {panda.name} - Age: {panda.age} - Location: {panda.location}
          </li>
        ))}
      </ul>
      <div>
        {pageNumbers.map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PandaList;
