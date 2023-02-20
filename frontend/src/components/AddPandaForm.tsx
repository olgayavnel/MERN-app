import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Panda } from './models';

interface Props {
  onSubmit: (panda: Panda) => void;
}

const AddPandaForm: React.FC<Props> = ({ onSubmit }) => {
  const initialValues = {
    _id: '',
    name: '',
    age: 0,
    location: '',
  };

  const handleSubmit = (values: Panda) => {
    onSubmit(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Field type='text' name='name' placeholder='Panda Name' />
        <Field type='number' name='age' placeholder='Panda Age' />
        <Field type='text' name='location' placeholder='Panda Location' />
        <button type='submit'>Add Panda</button>
      </Form>
    </Formik>
  );
};

export default AddPandaForm;
