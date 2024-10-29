import { connectDB } from "@/lip/connectDB";
import { NextResponse } from "next/server";

export const GET = async () =>{
    const db = await connectDB();
    const servicesCollection = await db.collection('note-All');
    try{
        const notes = await servicesCollection.find().toArray();
        return NextResponse.json({notes});
    } catch(error) {
        return NextResponse.json({message: "something in wrong "})
    }
}