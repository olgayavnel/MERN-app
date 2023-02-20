import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Panda } from './models';

type Props = {
  panda: Panda;
  onSubmit: (panda: Panda) => void;
  onCancel: () => void;
};

const EditPandaForm: React.FC<Props> = ({ panda, onSubmit, onCancel }) => {
  const initialValues: Panda = {
    _id: panda._id,
    name: panda.name,
    age: panda.age,
    location: panda.location,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number()
      .integer('Age must be an integer')
      .min(0, 'Age must be greater than or equal to 0')
      .max(100, 'Age must be less than or equal to 100')
      .required('Age is required'),
    location: Yup.string().required('Location is required'),
  });

  const handleSubmit = (values: Panda) => {
    onSubmit(values);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor='name'>Name:</label>
            <Field type='text' name='name' />
            <ErrorMessage name='name' />
          </div>
          <div>
            <label htmlFor='age'>Age:</label>
            <Field type='number' name='age' />
            <ErrorMessage name='age' />
          </div>
          <div>
            <label htmlFor='location'>Location:</label>
            <Field type='text' name='location' />
            <ErrorMessage name='location' />
          </div>
          <button type='submit' disabled={isSubmitting}>
            Save
          </button>
          <button type='button' onClick={handleCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditPandaForm;
