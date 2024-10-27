import { connectDB } from "@/lip/connectDB";

export const GET = async () =>{
    const db = await connectDB();
    const servicesCollection = await db.collection('note-All');
    try{
        const notes = await servicesCollection.find().toArray();
        return Response.json({notes});
    } catch(error) {
        console.log(error);
    }
}