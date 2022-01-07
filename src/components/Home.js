import React from 'react';
import logo from '../img/gemstone-logo.png';

import ReadmeLink from './ReadmeLink';

const Home = () => {
  return (
    <div>
      <h2 className="homeTitle">
        A custom password vault for your local machine
      </h2>
      <div className="home-logo-frame">
        <img src={logo} />
      </div>
      <p className="homeText">
        New users: Follow the initial steps laid out in the README below to set
        up your local database and server.
      </p>
      <ReadmeLink />
    </div>
  );
};

export default Home;
