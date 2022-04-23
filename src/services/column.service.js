import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
	try {
		const newColumn = await ColumnModel.createNew(data)
		newColumn.cards = []

		//update columnOrder Array in Board collection
		const { boardId, _id: newColumnId } = newColumn
		await BoardModel.pushColumnOrder(boardId.toString(), newColumnId.toString())

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
		if (updateData._id) delete updateData._id
		if (updateData.cards) delete updateData.cards

		const updatedColumn = await ColumnModel.update(id, updateData)

		if (updatedColumn._destroy) {
			// Remove all cards in this column
		}

		return updatedColumn
	} catch (error) {
		throw new Error(error)
	}
}

export const ColumnService = { createNew, update }
