import { ISession } from './ISession';

export const SessionTypes: ISession[] = [
  {
    name: 'Debug Breath',
    sessionType: 'breath',
    timings: {
      inhale: 1000,
      inhold: 1000,
      exhale: 1000,
      exhold: 1000,
    },
  },
  {
    name: 'Box Breath',
    sessionType: 'breath',
    timings: {
      inhale: 4000,
      inhold: 4000,
      exhale: 4000,
      exhold: 4000,
    },
  },
  {
    name: 'Belly Breath',
    sessionType: 'breath',
    timings: {
      inhale: 2000,
      inhold: 160,
      exhale: 4000,
      exhold: 160,
    },
  },
];
