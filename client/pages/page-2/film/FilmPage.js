import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Film from './components/Film';
import * as filmAction from './action';

function mapStateToProps(state, ownProps) {
  const film = state.get('film');
  return {
    allFilmList: film.get('allFilmList'),
    popularityFilmList: film.get('popularityFilmList')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filmAction: bindActionCreators(filmAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film);
