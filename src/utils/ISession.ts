export interface ISession {
  name: string;
  sessionType: 'breath';
  timings: {
    inhale: number;
    inhold: number;
    exhale: number;
    exhold: number;
  };
  rounds?: number;
}
