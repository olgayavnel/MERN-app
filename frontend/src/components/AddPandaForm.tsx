import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Panda } from './models';

const AddPandaFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .integer('Age must be an integer')
    .min(0, 'Age must be greater than or equal to 0')
    .max(100, 'Age must be less than or equal to 100')
    .required('Age is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string(),
  image: Yup.string(),
});

interface Props {
  onSubmit: (panda: Panda) => void;
}

const AddPandaForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Panda>({
    resolver: yupResolver(AddPandaFormSchema),
  });

  const onSubmitHandler = (data: Panda) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input type='text' {...register('name')} placeholder='Panda Name' />
      {errors.name && <p>{errors.name.message}</p>}
      <input type='number' {...register('age')} placeholder='Panda Age' />
      {errors.age && <p>{errors.age.message}</p>}
      <input
        type='text'
        {...register('location')}
        placeholder='Panda Location'
      />
      {errors.location && <p>{errors.location.message}</p>}
      <input
        type='text'
        {...register('description')}
        placeholder='Panda Description'
      />
      {errors.description && <p>{errors.description.message}</p>}
      <input type='text' {...register('image')} placeholder='Panda Image' />
      {errors.image && <p>{errors.image.message}</p>}
      <button type='submit'>Add Panda</button>
    </form>
  );
};

export default AddPandaForm;
