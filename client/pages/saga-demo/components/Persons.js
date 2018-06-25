import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva/index';

@connect(({demo}) => ({
  persons: demo.persons,
}))
export default class Persons extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    persons: PropTypes.object,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'demo/getPerson',
      payload: {
        body: {},
      },
    });
  }


  render() {
    const {
      persons, location,
    } = this.props;

    console.info('persons----------', persons);
    console.info('location----------', location);

    return (
      <div>
        persons
      </div>
    );
  }
}
