import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb'

// Define Column Collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
	boardId: Joi.string().required(), // also ObjectId when create new
	title: Joi.string().required().min(1).max(30).trim(),
	cardOrder: Joi.array().items(Joi.string()).default([]),
	createdAt: Joi.date().timestamp().default(Date.now()),
	updatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
	return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
	try {
		const validatedValue = await validateSchema(data)
		const insertValue = {
			...validatedValue,
			boardId: ObjectID(validatedValue.boardId),
		}

		const result = await getDB()
			.collection(columnCollectionName)
			.insertOne(insertValue)

		return result.ops[0]
	} catch (error) {
		throw new Error(error.message)
	}
}

/**
 * @param {string} columnId
 * @param {string} cardId
 */
const pushCardOrder = async (columnId, cardId) => {
	try {
		const result = await getDB()
			.collection(columnCollectionName)
			.findOneAndUpdate(
				{ _id: ObjectID(columnId) },
				{ $push: { cardOrder: cardId } },
				{ returnOriginal: false }
			)

		return result.value
	} catch (error) {
		throw new Error(error)
	}
}

const update = async (id, data) => {
	try {
		const updateData = {
			...data,
			boardId: ObjectID(data.boardId),
		}
		if (data.boardId) {
			updateData.boardId = ObjectID(data.boardId)
		}

		const result = await getDB()
			.collection(columnCollectionName)
			.findOneAndUpdate(
				{ _id: ObjectID(id) },
				{ $set: updateData },
				{ returnOriginal: false }
			)
		return result.value
	} catch (error) {
		throw new Error(error.message)
	}
}

export const ColumnModel = {
	columnCollectionName,
	createNew,
	update,
	pushCardOrder,
}
