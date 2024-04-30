import { ISession } from './ISession';

type TaggedState<T extends string> = { tag: T };

export type Home = TaggedState<'home'> & {
  type: 'breath'; // could have more types in the future
};

export type Config = TaggedState<'config'> & {
  type: 'breath'; // could have more types in the future
  config: ISession;
};

export type Session = TaggedState<'session'> & {
  session: ISession;
};

export type PranaState = Home | Config | Session;

export const PranaStates = {
  isHome: (state: PranaState): state is Home => state.tag === 'home',
  isConfig: (state: PranaState): state is Config => state.tag === 'config',
  isSession: (state: PranaState): state is Session => state.tag === 'session',
};
