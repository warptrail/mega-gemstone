import React from 'react';

const WidgetSearch = ({ search, handleInput }) => {
  return (
    <div className="searchbar">
      <input
        className="form-control"
        type="text"
        placeholder="Find A Widget"
        value={search}
        onChange={handleInput}
      />
    </div>
  );
};

export default WidgetSearch;
