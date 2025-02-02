import React from 'react';
import Card from './Card';

type Props = {
  items: any[];
};

const CardList: React.FC<Props> = ({ items }) => (
  <div className="card-list">
    {items.map((item, index) => (
      <Card key={index} name={item.name} description={item.description} />
    ))}
  </div>
);

export default CardList;
