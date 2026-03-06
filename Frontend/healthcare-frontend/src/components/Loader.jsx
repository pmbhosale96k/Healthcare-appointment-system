import React from 'react';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      {text}
    </div>
  );
};

export default Loader;
