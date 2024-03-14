import React from 'react';
import { Link } from 'react-router-dom';

const InvalidPath = () => {
    return (
      <div>
        <h2>Invalid path</h2>
        <Link to={"/"}>
          <h3>Back to all articles</h3>
        </Link>
      </div>
    );
};

export default InvalidPath;