import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../question-artist/question-artist.jsx';
import GenreQuestionScreen from '../question-genre/question-genre.jsx';
import {GameType} from '../../const.js';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1
    };
  }

  _renderGameScreen() {
    const {errorCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorCount={errorCount}
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0
            });
          }}
        />
      );
    }

    if (questions) {
      switch (question.type) {
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
              question={question}
            />
          );

        case GameType.ARTIST:
          return (
            <ArtistQuestionScreen
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
              question={question}
            />
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
            <GenreQuestionScreen
              onAnswer={() => { }}
              question={questions[0]}
            />
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen
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
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};

export default App;
