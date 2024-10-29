
import { connectDB } from "@/lip/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const servicesCollection = await db.collection('note-All');
    try {
        
        if (!params.id) {
            return new NextResponse(JSON.stringify({ error: "ID parameter is missing" }), { status: 400 });
        }

        const note = await servicesCollection.findOne({ _id: new ObjectId(params.id) });
        
        
        if (!note) {
            return new NextResponse(JSON.stringify({ error: "Note not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ note }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error: "An error occurred while fetching the note." }), { status: 500 });
    }
};
