import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
	try {
		const result = await BoardModel.createNew(data)
    return result
	} catch (error) {
		throw new Error(error)
	}
}

const getFullBoard = async (boardId) => {
	try {
		const result = await BoardModel.getFullBoard(boardId)
    return result
	} catch (error) {
		throw new Error(error)
	}
}

export const BoardService = { createNew, getFullBoard }
