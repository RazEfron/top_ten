import React from 'react';
import ReactDOM from 'react-dom';

import Console from './console'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Console/>, root);
});
