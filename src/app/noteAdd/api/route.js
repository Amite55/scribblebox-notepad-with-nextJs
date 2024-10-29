import { connectDB } from "@/lip/connectDB";

export const POST = async (request) => {
    const newNote = await request.json();
    try{
        const db = await connectDB();
        const noteCollection = db.collection('note-All');
        const resp = await noteCollection.insertOne(newNote);
        return Response.json({message: "New note Create"}, {status: 200});
    } catch(error) {
        return Response.json({message: "Something Is Wrong"}, {status: 50})
    }
}