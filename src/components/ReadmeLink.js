import React from 'react';

const ReadmeLink = ({ spaceAbove }) => {
  console.log(spaceAbove);
  return (
    <a
      href="https://www.freecodecamp.org/"
      target="_blank"
      rel="noopener noreferrer"
      className={`readmeLink ${spaceAbove ? `spaceAbove` : ''}`}
    >
      README
    </a>
  );
};

export default ReadmeLink;
