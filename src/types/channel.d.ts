export interface Channel {
  id: number;
  name: string;
  platformId: number;
  subscribers: number;
  url: string;
  isUseToParse: boolean;
  news?: News[];
  platform?: Platform;
  tags?: Tag[];
  regions?: Region[];
}
