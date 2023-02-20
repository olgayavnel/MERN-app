import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import pandasDataService from '../api/services';
import { Panda } from './models';

const PandaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [panda, setPanda] = useState<Panda | null>(null);

  useEffect(() => {
    pandasDataService
      .getOne(id as string)
      .then((response) => {
        setPanda(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  if (!panda) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{panda.name}</h2>
      <p>Age: {panda.age}</p>
      <p>Location: {panda.location}</p>
    </div>
  );
};

export default PandaDetail;
