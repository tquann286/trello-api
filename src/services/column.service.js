import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
	try {
		const newColumn = await ColumnModel.createNew(data)

		//update columnOrder Array in Board collection
		const { boardId, _id: newColumnId } = newColumn
		const updatedBoard = await BoardModel.pushColumnOrder(boardId.toString(), newColumnId.toString())

    return newColumn
	} catch (error) {
		throw new Error(error)
	}
}

const update = async (id, data) => {
	try {
		const updateData = {
			...data,
			updatedAt: Date.now(),
		}
		const result = await ColumnModel.update(id, data)
    return result
	} catch (error) {
		throw new Error(error)
	}
}

export const ColumnService = { createNew, update }
