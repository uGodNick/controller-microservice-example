export interface Comment {
  id: number;
  userId: number;
  content: string;
  repliedToCommentId: number;
  repliedToComment?: Comment;
  createdByUser?: User;
  emojis?: Emoji[];
}
