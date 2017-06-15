import React from 'react';
import PropTypes from 'prop-types';

const Person = ({children, person}) => {
  return (
    <div>
      {children && React.cloneElement(children, {
        person
      })}
    </div>
  );
};

Person.propTypes = {
  children: PropTypes.node,
  person: PropTypes.object
};

export default Person;
