import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import pandasDataService from '../api/services';

interface FormValues {
  name: string;
  age: number;
  location: string;
  description: string;
  image: string;
}

const PandaEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  useEffect(() => {
    pandasDataService
      .getOne(id)
      .then((response) => {
        const { name, age, location, description, image } = response.data;
        setValue('name', name);
        setValue('age', age);
        setValue('location', location);
        setValue('description', description);
        setValue('image', image);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id, setValue]);

  const handleEditSubmit = async (data: FormValues) => {
    try {
      await pandasDataService.update(id, data);
      navigate(`/pandas/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between mb-4 transition duration-300 transform hover:-translate-y-1'>
          <Link to={`/pandas/${id}`} aria-label='Return to panda detail'>
            &larr; Panda Detail
          </Link>
          <Link
            to={`/pandas/${id}`}
            aria-label='Return to panda detail'
            className='inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50 focus:bg-emerald-900 focus:text-slate-50'
          >
            Cancel
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(handleEditSubmit)}
          className='flex flex-col flex-grow max-w-xl gap-4 mx-auto'
        >
          <h2 className='text-3xl font-extrabold text-emerald-900'>
            Edit Panda
          </h2>
          <div className='flex items-center mt-2'>
            <label htmlFor='name' className='mr-4 text-base text-gray-600'>
              Name:
            </label>
            <input
              className='w-full px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              type='text'
              {...register('name')}
            />
          </div>
          <div className='flex items-center mt-2'>
            <label htmlFor='age' className='mr-4 text-base text-gray-600'>
              Age:
            </label>
            <input
              className='w-full px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              type='number'
              {...register('age')}
            />
          </div>
          <div className='flex items-center mt-2'>
            <label htmlFor='location' className='mr-4 text-base text-gray-600'>
              Location:
            </label>
            <input
              className='w-full px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              type='text'
              {...register('location')}
            />
          </div>

          <div className='flex items-center mt-2'>
            <label
              htmlFor='description'
              className='mr-4 text-base text-gray-600'
            >
              Description:
            </label>
            <input
              className='w-full px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              type='text'
              {...register('description')}
            />
          </div>

          <div className='flex items-center mt-2'>
            <label htmlFor='image' className='mr-4 text-base text-gray-600'>
              Image:
            </label>
            <input
              className='w-full px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              type='text'
              {...register('image')}
            />
          </div>
          <div className='flex justify-between mt-4'>
            <button
              className='px-4 py-2 rounded-md bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50'
              type='submit'
            >
              Submit
            </button>
            <button
              className='px-4 py-2 rounded-md bg-slate-50 text-emerald-900 hover:bg-red-700 hover:text-slate-50'
              type='button'
              onClick={() => navigate(`/pandas/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PandaEdit;
