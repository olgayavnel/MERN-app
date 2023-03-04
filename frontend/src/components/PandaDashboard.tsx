import React, { useEffect, useState } from 'react';
import pandasDataService from '../api/services';
import AddPandaForm from './AddPandaForm';
import { Panda } from '../models';
import PandaList from './PandaList';

const PandaDashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [pandas, setPandas] = useState<Panda[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Panda[]>([]);

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
    <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <section className='mt-8 overflow-hidden'>
        <div className='flex flex-row justify-between'>
          {/* Add panda */}
          <div className='mb-4'>
            <button
              className={`px-4 py-2 font-semibold rounded-md ${
                showAddForm ? 'hidden' : ''
              }`}
              onClick={() => setShowAddForm(!showAddForm)}
              aria-label='Add a new panda'
            >
              Add Panda
            </button>
          </div>

          {/* Search Bar */}
          <div className='mb-4'>
            <input
              id='searchInput'
              className='px-3 py-2 border rounded-md border-emerald-700'
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Search pandas…'
              title='Search pandas by name'
            />
          </div>
        </div>

        {/* ADD FORM OVERLAY */}
        {showAddForm && (
          <div
            className='fixed inset-0 z-10 flex items-center justify-center overflow-auto bg-slate-800 bg-opacity-80'
            role='dialog'
            aria-modal='true'
          >
            <button
              className='absolute top-0 right-0 mx-4 my-4 cursor-pointer bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50'
              onClick={() => setShowAddForm(false)}
            >
              &times;
            </button>
            <div className='max-w-md p-6 mx-auto my-10'>
              <AddPandaForm onSubmit={handleAddSubmit} />
            </div>
          </div>
        )}

        {/* LIST OF PANDAS */}
        <article>
          {searchResults.length > 0 ? (
            <PandaList pandas={searchResults} handleDelete={handleDelete} />
          ) : pandas.length > 0 ? (
            <PandaList pandas={pandas} handleDelete={handleDelete} />
          ) : (
            <p>No pandas found.</p>
          )}
        </article>

        {/* PAGINATION */}
        <div className='flex justify-center'>
          {totalPages > 1 && (
            <div className='flex gap-3'>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={`px-4 py-2 ${
                    pageNumber === currentPage
                      ? ''
                      : 'bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50'
                  } font-semibold rounded-md`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PandaDashboard;
