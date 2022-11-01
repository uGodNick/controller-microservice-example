export interface Region {
  id: number;
  name: string;
  timezone: string;
  channels?: Channel[];
}
