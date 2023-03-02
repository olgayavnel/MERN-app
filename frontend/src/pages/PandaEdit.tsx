import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    <form onSubmit={handleSubmit(handleEditSubmit)}>
      <label>
        Name:
        <input type='text' {...register('name')} />
      </label>
      <label>
        Age:
        <input type='number' {...register('age')} />
      </label>
      <label>
        Location:
        <input type='text' {...register('location')} />
      </label>
      <label>
        Description:
        <input type='text' {...register('description')} />
      </label>
      <label>
        Image:
        <input type='text' {...register('image')} />
      </label>
      <button
        className='bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50'
        type='submit'
      >
        Submit
      </button>
      <button
        className='bg-slate-50 text-emerald-900 hover:bg-red-700 hover:text-slate-50'
        type='button'
        onClick={() => navigate(`/pandas/${id}`)}
      >
        Cancel
      </button>
    </form>
  );
};

export default PandaEdit;
