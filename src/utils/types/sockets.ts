type connType = {
    roomId: string
}

type createMessageType = {
    message: string
    authorId: string
    roomId: string
    createdDate: string
    token?: string
}

type updateMessageType = {
    message: {
        id: string
        authorId: string
        message: string
        createdDate: string
        isUpdate: boolean
        roomId: string
        createdAt: string
        updatedAt: string
    },
    roomId: string
}

type deleteMessageType = {
    messageId: string
    roomId: string
}

export {
    createMessageType,
    connType,
    updateMessageType,
    deleteMessageType
}