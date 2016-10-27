import React, {PropTypes} from 'react';
import bootstrap from '../../../util/bootstrapCss';

const Person = ({children, personAction, person}) => {

  return (
    <div className={bootstrap('container', 'm-t-2')}>
      {children && React.cloneElement(children, {
        personAction,
        person
      })}
    </div>
  );

};

Person.propTypes = {
  children: PropTypes.node,
  personAction: PropTypes.object,
  person: PropTypes.object
};

export default Person;
