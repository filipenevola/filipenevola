import { MongoClient } from 'mongodb';

export const DB_NAME = 'verdaoracional';

let clientPromise;

export function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getDb() {
  const promise = getClientPromise();
  if (!promise) return null;
  const client = await promise;
  return client.db(DB_NAME);
}

export async function getCollection(name) {
  const db = await getDb();
  return db ? db.collection(name) : null;
}
