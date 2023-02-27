import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Panda } from './models';

interface Props {
  pandas: Panda[];
  handleDelete: (id: string) => void;
}

const PandaList: React.FC<Props> = ({ pandas, handleDelete }) => {
  return (
    <div className='overflow-y-auto'>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
        {pandas.map((panda: Panda) => (
          <Link
            key={panda._id}
            to={`/pandas/${panda._id}`}
            className='block group '
          >
            <li className='relative px-6 py-8 transition-colors duration-200 transform bg-white shadow-md rounded-2xl hover:bg-gray-100'>
              <h2 className='mb-2 text-2xl font-bold'>{panda.name}</h2>
              <p className='text-gray-600'>{panda.age} years old</p>
              <p className='mb-4 text-gray-600'>{panda.location}</p>
              <div className='absolute bottom-0 right-0 flex items-center space-x-2'>
                <button
                  className='bg-transparent hover:bg-transparent'
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDelete(panda._id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PandaList;
