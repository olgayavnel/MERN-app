import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Panda } from './models';

const EditPandaFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .min(0, 'Age must be greater than or equal to 0')
    .max(100, 'Age must be less than or equal to 100')
    .required('Age is required'),
  location: Yup.string().required('Location is required'),
});

type Props = {
  panda: Panda;
  onSubmit: (panda: Panda) => void;
  onCancel: () => void;
};

const EditPandaForm: React.FC<Props> = ({ panda, onSubmit, onCancel }) => {
  const { handleSubmit, control, formState } = useForm<Panda>({
    resolver: yupResolver(EditPandaFormSchema),
    defaultValues: {
      _id: panda._id,
      name: panda.name || '',
      age: panda.age || 0,
      location: panda.location || '',
      description: panda.description || '',
      image: panda.image || '',
    },
  });

  const { errors, isSubmitting } = formState;

  const onSubmitHandler = (values: Panda) => {
    onSubmit(values);
  };

  const onCancelHandler = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label htmlFor='name'>Name:</label>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <input type='text' {...field} placeholder='Panda Name' />
          )}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor='age'>Age:</label>
        <Controller
          name='age'
          control={control}
          render={({ field }) => (
            <input type='number' {...field} placeholder='Panda Age' />
          )}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <div>
        <label htmlFor='location'>Location:</label>
        <Controller
          name='location'
          control={control}
          render={({ field }) => (
            <input type='text' {...field} placeholder='Panda Location' />
          )}
        />
        {errors.location && <span>{errors.location.message}</span>}
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <input type='text' {...field} placeholder='Panda Description' />
          )}
        />
      </div>
      <div>
        <label htmlFor='image'>Image:</label>
        <Controller
          name='image'
          control={control}
          render={({ field }) => (
            <input type='text' {...field} placeholder='Panda Image' />
          )}
        />
      </div>
      <button type='submit' disabled={isSubmitting}>
        Save
      </button>
      <button type='button' onClick={onCancelHandler}>
        Cancel
      </button>
    </form>
  );
};

export default EditPandaForm;
