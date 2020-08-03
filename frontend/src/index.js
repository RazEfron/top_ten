import React from 'react';
import ReactDOM from 'react-dom';

import Console from './Console'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Console/>, root);
});
