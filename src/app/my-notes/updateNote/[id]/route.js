import { connectDB } from "@/lip/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, {params}) => {
    const db = await connectDB();
    const noteCollection = await db.collection('note-All');
    const updateDoc = await request.json();
    try{
       const resp = await noteCollection.updateOne(
        {_id: new ObjectId(params.id)},
        {
            $set: {...updateDoc}
        },
        {upsert: true}
    );
        return NextResponse.json({message: 'This Notes Deleted', response: resp})
    } catch(error){
        return NextResponse.json({message: "something in wrong "})
    }
}
