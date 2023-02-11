import React, { useEffect, useState } from 'react';
import pandasDataService from '../api/services';
import AddPandaForm from './AddPandaForm';
import { Panda } from './models';

const PandaList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [pandas, setPandas] = useState([]);

  useEffect(() => {
    retrievePandas();
  }, []);

  const retrievePandas = () => {
    pandasDataService
      .getAll()
      .then((response) => {
        setPandas(response.data.pandas);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (panda: Panda) => {
    setShowForm(false);
    // Add the new panda to the list of pandas
    // ...
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Panda'}
      </button>
      {showForm && <AddPandaForm onSubmit={handleSubmit} />}
      <ul>
        {pandas.map((panda: any) => (
          <li key={panda.id}>
            ID: {panda.id}. Name: {panda.name} - Age: {panda.age} - Location:{' '}
            {panda.location} - Description: {panda.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PandaList;
