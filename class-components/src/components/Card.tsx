import React from 'react';

type Props = {
  name: string;
  description: string;
};

const Card: React.FC<Props> = ({ name, description }) => (
  <div className="card">
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
);

export default Card;
