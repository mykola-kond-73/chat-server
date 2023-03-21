type getMessagesByRoomIdType = {
  roomId: string;
  page: number;
  count: number;
};

type updateMessageByIdType = {
  messageId: string;
  newMessage: string;
};

type deleteMessageById = {
  messageId: string;
  authorId: string;
};

export { getMessagesByRoomIdType, updateMessageByIdType, deleteMessageById };
