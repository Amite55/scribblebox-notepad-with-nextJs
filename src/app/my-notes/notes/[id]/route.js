import { connectDB } from "@/lip/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, {params}) => {
    const db = await connectDB();
    const noteCollection = await db.collection('note-All');
    try{
       const resp = await noteCollection.deleteOne({_id: new ObjectId(params.id)});
        return NextResponse.json({message: 'This Notes Deleted', response: resp})
    } catch(error){
        return NextResponse.json({message: "something in wrong "})
    }
}



