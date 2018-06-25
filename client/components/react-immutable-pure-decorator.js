import { is } from 'immutable';

function shouldComponentUpdate(nextProps, nextState) {
  const state = this.state || {};

  return (
    !(this.updateOnProps || Object.keys({ ...nextProps, ...this.props })).every(
      p => is(nextProps[p], this.props[p])
    ) ||
    !(this.updateOnStates || Object.keys({ ...nextState, ...state })).every(s =>
      is(nextState[s], state[s])
    )
  );
}

function reactImmutablePureDecorator(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}

export default reactImmutablePureDecorator;
