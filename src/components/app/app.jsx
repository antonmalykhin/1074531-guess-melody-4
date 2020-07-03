import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../question-artist/question-artist.jsx';
import GenreQuestionScreen from '../question-genre/question-genre.jsx';
import GameScreen from '../game-screen/game-screen.jsx';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player.js';
import {GameType} from '../../const.js';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {
  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step
    } = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (questions) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GameScreen type={question.type}>
              <GenreQuestionScreenWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );

        case GameType.ARTIST:
          return (
            <GameScreen type={question.type}>
              <ArtistQuestionScreenWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreenWrapped
              onAnswer={() => { }}
              question={questions[0]}
            />
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreenWrapped
              onAnswer={() => { }}
              question={questions[1]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
