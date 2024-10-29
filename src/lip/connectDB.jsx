import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

let db;
export const connectDB = async () => {
    if(db) return db;
    try{
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
      return NextResponse.json({message: "something in wrong "})
    }
}