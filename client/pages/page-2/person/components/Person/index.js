import React from 'react';
import PropTypes from 'prop-types';

const Person = ({children, person}) => {
  return (
    <div className="person">
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
