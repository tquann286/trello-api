import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectID } from 'mongodb'

// Define Board Collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
	title: Joi.string().required().min(1).max(30).trim(),
	columnOrder: Joi.array().items(Joi.string()).default([]),
	createdAt: Joi.date().timestamp().default(Date.now()),
	updatedAt: Joi.date().timestamp().default(null),
	_destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
	return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
	try {
		const value = await validateSchema(data)
		const result = await getDB()
			.collection(boardCollectionName)
			.insertOne(value)
		console.log(result.ops[0])
		return result.ops[0]
	} catch (error) {
		throw new Error(error)
	}
}

const getFullBoard = async (boardId) => {
	try {
		const result = await getDB()
			.collection(boardCollectionName)
			.aggregate([
				{ $match: { _id: ObjectID(boardId) } },
				{
					$lookup: {
						from: 'columns', // collection name
						localField: '_id',
						foreignField: 'boardId',
						as: 'columns',
					},
				},
				{
					$lookup: {
						from: 'cards', // collection name
						localField: '_id',
						foreignField: 'boardId',
						as: 'cards',
					},
				},
			])
			.toArray()

		return result[0] || []
	} catch (error) {
		throw new Error(error)
	}
}

export const BoardModel = { createNew, getFullBoard }
