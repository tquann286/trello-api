import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

// HAKPkb4fGMxJdYi9

export const connectDB = async () => {
	const client = new MongoClient(env.MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})

	try {
		// Connect the client to the sever
		await client.connect()
		console.log('connected successfully to server')

		//List databases
		await listDatabases(client)

	} finally {
		// Ensures that client will close when finish/error
    console.log('closed')
		await client.close()
	}
}

const listDatabases = async (client) => {
	const databasesList = await client.db().admin().listDatabases()
	console.log(databasesList)
  console.log('Your databases:')
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}
