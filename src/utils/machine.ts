import { Action, Actions } from './actions';
import { Config, Home, Session, PranaState, PranaStates } from './states';
import { ISession } from './ISession';
import { SessionTypes } from './SessionTypes';

type Reducer = (action: Action, state: PranaState) => PranaState;

const reduceHome = (action: Action, state: Home) => {
  if (Actions.isTypeSelected(action)) {
    // Transition to ConfigState, passing along the selected type
    // and an initial configuration
    return <Config>{
      tag: 'config',
      type: action.type,
      config: getInitialConfig(action.type),
    };
  }
  return state;
};

const reduceConfig = (action: Action, state: Config) => {
  // options here are cancel or start
  if (Actions.isConfigCancelled(action)) {
    // Transition to HomeState
    return <Home>{
      tag: 'home',
      type: state.type,
    };
  }

  if (Actions.isSessionStart(action)) {
    // Transition to SessionState
    return <Session>{
      tag: 'session',
      type: state.type,
      session: action.config,
    };
  }
};

const reduceSession = (action: Action, state: Session) => {
  // options here are cancel or complete
  if (Actions.isSessionCancelled(action)) {
    // Transition to HomeState
    return <Home>{
      tag: 'home',
      type: state.session.sessionType,
    };
  }
  if (Actions.isSessionComplete(action)) {
    // Log the session to storage
    // TODO: add an abstraction over localStorage so we can test this
    // without actually using localStorage
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push(action.session);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    // Transition to HomeState
    return <Home>{
      tag: 'home',
      type: state.session.sessionType,
    };
  }
};

export const PranaReducer: Reducer = (action, state) => {
  if (PranaStates.isHome(state)) {
    return reduceHome(action, state);
  }
  if (PranaStates.isConfig(state)) {
    return reduceConfig(action, state);
  }
  if (PranaStates.isSession(state)) {
    return reduceSession(action, state);
  }
  return state;
};

function getInitialConfig(type: string): ISession {
  return SessionTypes.find(s => s.sessionType === type);
}
