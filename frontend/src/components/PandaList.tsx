import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pandasDataService from '../api/services';
import AddPandaForm from './AddPandaForm';
import { Panda } from './models';

const PandaList: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [pandas, setPandas] = useState<Panda[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

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
      .then(() => {
        retrievePandas(currentPage);
        setShowForm(false); // hides the form after submission + resets the form
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = (pandaId: string) => {
    pandasDataService
      .delete(pandaId)
      .then(() => {
        if (pandas.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          retrievePandas(currentPage);
        }
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
      {pandas.length > 0 && (
        <ul>
          {pandas.map((panda: any) => (
            <li key={panda._id}>
              Name: <Link to={`/pandas/${panda._id}`}>{panda.name}</Link> - Age:{' '}
              {panda.age} - Location: {panda.location}
              <button onClick={() => handleDelete(panda._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        {totalPages > 1 && (
          <div>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PandaList;
