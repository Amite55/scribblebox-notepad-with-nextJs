import { MongoClient, ServerApiVersion } from "mongodb";

let db;
export const connectDB = async () => {
    if(db) return db;
    try{
        // const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
        const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.g2fbusk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
          db = client.db('scribble-box-note');
          return db;
    } catch(error) {
        console.log(error);
    }
}