import React, { useEffect, useState } from 'react';
import { FaEdit, FaMapMarkerAlt, FaBirthdayCake } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import pandasDataService from '../api/services';
import { Panda } from '../models';

const PandaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [panda, setPanda] = useState<Panda | null>(null);

  useEffect(() => {
    pandasDataService
      .getOne(id as string)
      .then((response) => {
        setPanda(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  if (!panda) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-between mb-4 transition duration-300 transform hover:-translate-y-1'>
        <Link to='/' aria-label='Return to dashboard'>
          &larr; Dashboard
        </Link>
        <Link
          to={`/pandas/${panda._id}/edit`}
          aria-label='Edit panda'
          className='inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm bg-emerald-900 text-slate-50 hover:bg-slate-50 hover:text-emerald-900 focus:bg-slate-50 focus:text-emerald-900'
        >
          <FaEdit className='w-5 h-5 mr-2 -ml-1' />
          Edit
        </Link>
      </div>
      <div className='flex flex-col h-full max-w-xl mx-auto'>
        <h2 className='text-3xl font-extrabold text-emerald-900'>
          {panda.name}
        </h2>
        <div className='flex items-center mt-2'>
          <p className='mr-4 text-base text-gray-600'>
            <FaBirthdayCake className='inline-block mr-2 text-emerald-900' />
            <span className='text-lg font-bold'>{panda.age}</span> years old
          </p>

          <p className='ml-4 text-base text-gray-600'>
            <FaMapMarkerAlt className='inline-block mr-2 text-emerald-900' />
            {panda.location}
          </p>
        </div>
        <p className='mt-4 text-base text-gray-600'>{panda.description}</p>
        <img
          className='object-cover w-full mt-4 rounded-lg shadow-lg h-96'
          src={panda.image}
          alt={panda.name}
        />
      </div>
    </div>
  );
};

export default PandaDetail;
