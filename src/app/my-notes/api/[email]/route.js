import { connectDB } from "@/lip/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
    try {
        const { params } = context;
        if (!params?.email) {
            return new NextResponse(JSON.stringify({ error: "Email parameter is missing" }), { status: 400 });
        }

        const db = await connectDB();
        const noteCollection = db.collection('note-All');
        const myNotes = await noteCollection.find({ email: params.email }).toArray();

        return new NextResponse(JSON.stringify({ myNotes }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Error loading notes' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

