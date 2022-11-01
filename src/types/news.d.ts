export interface News {
  id: number;
  channelId: number;
  title: string;
  content: string;
  imageUrl: string;
  views: number;
  channel?: Channel;
  tags?: Tag[];
}
