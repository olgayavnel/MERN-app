import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import pandasDataService from '../api/services';

const EditPandaFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .min(0, 'Age must be greater than or equal to 0')
    .max(100, 'Age must be less than or equal to 100')
    .required('Age is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().max(
    1000,
    'Description must be at most 1000 characters'
  ),
  image: Yup.string(),
});

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
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(EditPandaFormSchema),
  });

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
          className='flex flex-col flex-grow h-full max-w-3xl gap-4 mx-auto '
        >
          <h2 className='text-3xl font-extrabold text-emerald-900'>
            Edit Panda
          </h2>

          <div className='flex flex-col mt-2 md:flex-row md:items-center'>
            <label
              htmlFor='name'
              className='mr-4 text-base text-gray-600 md:w-1/3'
            >
              Panda Name:
            </label>
            <input
              className='flex-1 px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              {...register('name')}
              aria-label='Enter Panda Name'
              required
            />
            {errors.name && (
              <p className='text-xs italic text-red-500'>
                {errors.name.message}
              </p>
            )}
          </div>
          <div className='flex flex-col mt-2 md:flex-row md:items-center'>
            <label
              htmlFor='age'
              className='mr-4 text-base text-gray-600 md:w-1/3'
            >
              Panda Age:
            </label>
            <input
              className='flex-1 px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='number'
              {...register('age')}
              aria-label='Enter Panda Age'
              required
            />
            {errors.age && (
              <p className='text-xs italic text-red-500'>
                {errors.age.message}
              </p>
            )}
          </div>
          <div className='flex flex-col mt-2 md:flex-row md:items-center'>
            <label
              htmlFor='location'
              className='mr-4 text-base text-gray-600 md:w-1/3'
            >
              Panda Location:
            </label>
            <input
              className='flex-1 px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              {...register('location')}
              aria-label='Enter Panda Location'
              required
            />
            {errors.location && (
              <p className='text-xs italic text-red-500'>
                {errors.location.message}
              </p>
            )}
          </div>

          <div className='flex flex-col mt-2 md:flex-row md:items-center'>
            <label
              htmlFor='description'
              className='mr-4 text-base text-gray-600 md:w-1/3'
            >
              Description:
            </label>

            <textarea
              className='flex-1 w-full px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              maxLength={1000}
              {...register('description')}
              aria-label='Enter Panda Description'
              required
            />

            {errors.description && (
              <p className='text-xs italic text-red-500'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='flex flex-col mt-2 md:flex-row md:items-center'>
            <label
              htmlFor='image'
              className='mr-4 text-base text-gray-600 md:w-1/3'
            >
              Image:
            </label>
            <input
              className='flex-1 px-4 py-6 text-lg leading-tight border rounded-md focus:outline-none focus:shadow-outline'
              type='text'
              {...register('image')}
              aria-label='Enter Panda Image'
              required
            />
            {errors.image && (
              <p className='text-xs italic text-red-500'>
                {errors.image.message}
              </p>
            )}
          </div>
          <div className='flex self-end mt-4'>
            <button
              className='px-4 py-2 rounded-md bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50'
              type='submit'
              aria-label='Submit Edit'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PandaEdit;
