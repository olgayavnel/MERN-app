import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pandasDataService from '../api/services';
import AddPandaForm from './AddPandaForm';
import EditPandaForm from './EditPandaForm';
import { Panda } from './models';

const PandaList: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [currentPanda, setCurrentPanda] = useState<Panda | null>(null);
  const [pandas, setPandas] = useState<Panda[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Panda[]>([]);

  // useEffect(() => {
  //   retrievePandas(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    if (searchQuery === '') {
      retrievePandas(currentPage);
    } else {
      searchPandas(searchQuery);
    }
  }, [currentPage, searchQuery]);

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

  const handleAddSubmit = (panda: Panda) => {
    pandasDataService
      .create(panda)
      .then(() => {
        retrievePandas(currentPage);
        setShowAddForm(false); // hides the form after submission + resets the form
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditSubmit = (panda: Panda) => {
    if (JSON.stringify(panda) === JSON.stringify(currentPanda)) {
      setShowEditForm(false);
      setCurrentPanda(null);
      return;
    }

    pandasDataService
      .update(currentPanda?._id, panda)
      .then(() => {
        retrievePandas(currentPage);
        setShowEditForm(false);
        setCurrentPanda(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = (panda: Panda) => {
    setCurrentPanda(panda);
    setShowEditForm(true);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
    } else {
      searchPandas(searchQuery);
    }
  }, [searchQuery]);

  const searchPandas = (searchQuery: string) => {
    pandasDataService
      .find(searchQuery)
      .then((response) => {
        setSearchResults(response.data.pandas);
        setTotalPages(1);
        setPandas([]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search pandas…'
      />
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add Panda'}
      </button>
      {showAddForm && <AddPandaForm onSubmit={handleAddSubmit} />}

      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((panda: any) => (
            <li key={panda._id}>
              Name: <Link to={`/pandas/${panda._id}`}>{panda.name}</Link> - Age:{' '}
              {panda.age} - Location: {panda.location} - Description:{' '}
              {panda.description} - Image: {panda.image}
              <button onClick={() => handleEdit(panda)}>Edit Panda</button>
              <button onClick={() => handleDelete(panda._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : pandas.length > 0 ? (
        <ul>
          {pandas.map((panda: any) => (
            <li key={panda._id}>
              Name: <Link to={`/pandas/${panda._id}`}>{panda.name}</Link> - Age:{' '}
              {panda.age} - Location: {panda.location} - Description:{' '}
              {panda.description} - Image: {panda.image}
              <button onClick={() => handleEdit(panda)}>Edit Panda</button>
              <button onClick={() => handleDelete(panda._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pandas found.</p>
      )}

      {showEditForm && currentPanda && (
        <EditPandaForm
          panda={currentPanda}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setShowEditForm(false);
            setCurrentPanda(null);
          }}
        />
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
