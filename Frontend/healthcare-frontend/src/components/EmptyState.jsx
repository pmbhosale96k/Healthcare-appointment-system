import React from 'react';

const EmptyState = ({ message = 'No data available.' }) => {
  return <p className="empty-state">{message}</p>;
};

export default EmptyState;
