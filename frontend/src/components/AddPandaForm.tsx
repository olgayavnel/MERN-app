import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Panda } from './models';

interface Props {
  onSubmit: (panda: Panda) => void;
}

const AddPandaForm: React.FC<Props> = ({ onSubmit }) => {
  const [panda, setPanda] = useState({
    id: '',
    name: '',
    age: 0,
    location: '',
  });

  const handleSubmit = (values: any) => {
    setPanda({
      id: values.id,
      name: values.name,
      age: values.age,
      location: values.location,
    });
    onSubmit(panda);
  };

  return (
    <Formik initialValues={panda} onSubmit={handleSubmit}>
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
