import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Panda } from '../models';

const AddPandaFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .min(0, 'Age must be greater than or equal to 0')
    .max(100, 'Age must be less than or equal to 100')
    .required('Age is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().max(
    420,
    'Description must be at most 420 characters'
  ),
  image: Yup.string(),
});

interface Props {
  onSubmit: (panda: Panda) => void;
}

const AddPandaForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<Panda>({
    resolver: yupResolver(AddPandaFormSchema),
  });

  const onSubmitHandler = (data: Panda) => {
    onSubmit(data);
    reset(); // Reset the form after successful submission
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='flex flex-col items-center w-full max-w-md mt-8 space-y-4'
    >
      <div className='w-full'>
        <label className='block mb-2 font-bold text-slate-50' htmlFor='name'>
          Name
        </label>
        <input
          className={`w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.name ? 'border-red-500' : ''
          }`}
          type='text'
          {...register('name')}
        />
        {errors.name && (
          <p className='text-xs italic text-red-500'>{errors.name.message}</p>
        )}
      </div>
      <div className='w-full'>
        <label className='block mb-2 font-bold text-slate-50' htmlFor='age'>
          Age
        </label>
        <input
          className={`w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.age ? 'border-red-500' : ''
          }`}
          type='number'
          {...register('age')}
        />
        {errors.age && (
          <p className='text-xs italic text-red-500'>{errors.age.message}</p>
        )}
      </div>
      <div className='w-full'>
        <label
          className='block mb-2 font-bold text-slate-50'
          htmlFor='location'
        >
          Location
        </label>
        <input
          className={`w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.location ? 'border-red-500' : ''
          }`}
          type='text'
          {...register('location')}
        />
        {errors.location && (
          <p className='text-xs italic text-red-500'>
            {errors.location.message}
          </p>
        )}
      </div>
      <div className='w-full'>
        <label
          className='block mb-2 font-bold text-slate-50'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          maxLength={420}
          className={`border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.description ? 'border-red-500' : ''
          } max-h-[10rem]`}
          {...register('description')}
        />

        {errors.description && (
          <p className='text-xs italic text-red-500'>
            {errors.description.message}
          </p>
        )}
      </div>
      <div className='w-full'>
        <label className='block mb-2 font-bold text-slate-50' htmlFor='image'>
          Image URL
        </label>
        <input
          className={`w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
            errors.image ? 'border-red-500' : ''
          }`}
          type='text'
          {...register('image')}
        />
        {errors.image && (
          <p className='text-xs italic text-red-500'>{errors.image.message}</p>
        )}
      </div>
      <div className='flex justify-between w-full'>
        <button
          className='px-4 py-2 rounded-md bg-slate-50 text-emerald-900 hover:bg-emerald-900 hover:text-slate-50'
          type='submit'
          disabled={!isDirty}
        >
          Add Panda
        </button>
        <button
          className='px-4 py-2 rounded-md bg-slate-50 text-emerald-900 hover:bg-red-700 hover:text-slate-50'
          type='button'
          disabled={!isDirty}
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddPandaForm;
