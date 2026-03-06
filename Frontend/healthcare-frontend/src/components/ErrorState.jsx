import React from 'react';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="error-state">
      <p className="error">{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
};

export default ErrorState;
