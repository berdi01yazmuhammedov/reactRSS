import React from 'react';
import { Item } from '../api';

type CardListProps = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

const CardList: React.FC<CardListProps> = ({ items, onItemClick }) => {
  return (
    <div className="card-list">
      {items.map((item) => (
        <div key={item.id} className="card" onClick={() => onItemClick(item)}>
          {'login' in item ? (
            <>
              <img src={item.avatar_url} alt={item.login} width="50" />
              <div>{item.login}</div>
            </>
          ) : (
            <>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardList;
