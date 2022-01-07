import React from 'react';

const Sort = ({ fetchWidgets }) => {
  // console.log(fetchWidgets(true));
  const fetchName = () => {
    fetchWidgets(true);
  };

  const fetchDate = () => {
    fetchWidgets(false);
  };

  const test = (t) => {
    let extraMessage = '';
    if (t) {
      extraMessage = 'howdy howdy';
    } else {
      extraMessage = '';
    }
    console.log('testing button ', extraMessage);
  };
  return (
    <div className="sort-bar">
      <h3>Sort By:</h3>
      <button className="btn btn-primary" onClick={fetchDate}>
        Date
      </button>
      <button className="btn btn-primary" onClick={fetchName}>
        Name
      </button>
    </div>
  );
};

export default Sort;
