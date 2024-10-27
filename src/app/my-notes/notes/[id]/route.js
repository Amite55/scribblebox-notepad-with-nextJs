import { connectDB } from "@/lip/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, {params}) => {
    const db = await connectDB();
    const noteCollection = await db.collection('note-All');
    try{
       const resp = await noteCollection.deleteOne({_id: new ObjectId(params.id)});
        return Response.json({message: 'This Notes Deleted', response: resp})
    } catch(error){
        return Response.json({message: "something in wrong "})
    }
}



