import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Panda } from './models';

interface Props {
  pandas: Panda[];
  handleDelete: (id: string) => void;
}

const PandaList: React.FC<Props> = ({ pandas, handleDelete }) => {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
      {pandas.map((panda: Panda) => (
        <Link
          key={panda._id}
          to={`/pandas/${panda._id}`}
          className='group block'
        >
          <li className='relative bg-white py-8 px-6 rounded-2xl shadow-md transition-colors duration-200 transform hover:bg-gray-100'>
            <h2 className='text-2xl font-bold mb-2'>{panda.name}</h2>
            <p className='text-gray-600'>{panda.age} years old</p>
            <p className='text-gray-600 mb-4'>{panda.location}</p>
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
  );
};

export default PandaList;
