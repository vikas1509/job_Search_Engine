import React from 'react';

const Loader = ({ loading }) => {
  return (
    <div id="loader" style={{ display: loading ? 'block' : 'none' }}>
      Loading...
    </div>
  );
};

export default Loader;