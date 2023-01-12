import mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/blogg";

let cachedDB = null;

export async function connectToDatabase() {
	if (cachedDB) {
		console.log("Cached database");
		return cachedDB;
	}

	const client = await mongoClient.connect(mongoURI);

	cachedDB = client.db();
	return cachedDB;
}
