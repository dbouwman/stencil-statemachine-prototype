import { ISession } from './ISession';

type TaggedAction<T extends string> = { tag: T };

export type TypeSelected = TaggedAction<'typeSelected'> & { type: string };
export type ConfigCancelled = TaggedAction<'configCancelled'>;
export type SessionStart = TaggedAction<'sessionStart'> & { config: ISession };
export type SessionCancelled = TaggedAction<'sessionCancelled'>;
export type SessionComplete = TaggedAction<'sessionComplete'> & { session: ISession };

export type Action = TypeSelected | ConfigCancelled | SessionStart | SessionCancelled | SessionComplete;

export const Actions = {
  isTypeSelected: (action: Action): action is TypeSelected => action.tag === 'typeSelected',
  isConfigCancelled: (action: Action): action is ConfigCancelled => action.tag === 'configCancelled',
  isSessionStart: (action: Action): action is SessionStart => action.tag === 'sessionStart',
  isSessionCancelled: (action: Action): action is SessionCancelled => action.tag === 'sessionCancelled',
  isSessionComplete: (action: Action): action is SessionComplete => action.tag === 'sessionComplete',
};
