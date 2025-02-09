import React from 'react';

type Props = {
  name: string;
  description: string;
};

const Card: React.FC<Props> = ({ name, description }) => (
  <div className="card">
    <div className="cell">{name}</div>
    <div className="cell">{description}</div>
  </div>
);

export default Card;
