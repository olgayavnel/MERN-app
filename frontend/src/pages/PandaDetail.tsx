import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import pandasDataService from '../api/services';
import { Panda } from '../components/models';

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
      <Link to='/' aria-label='Return to dashboard'>
        Dashboard
      </Link>
      <Link to={`/pandas/${panda._id}/edit`} aria-label='Edit panda'>
        <FaEdit />
      </Link>
      <h2>{panda.name}</h2>
      <p>Age: {panda.age}</p>
      <p>Location: {panda.location}</p>
      <p>Description: {panda.description}</p>
      <img src={panda.image} alt={panda.name} />
    </div>
  );
};

export default PandaDetail;
