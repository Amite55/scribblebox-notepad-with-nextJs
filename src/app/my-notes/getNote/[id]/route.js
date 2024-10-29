import { connectDB } from "@/lip/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    try {
        const db = await connectDB();
        const noteCollection = db.collection('note-All');

        if (!params?.id) {
            return new NextResponse(JSON.stringify({ message: "ID parameter missing" }), { status: 400 });
        }

        const resp = await noteCollection.findOne({ _id: new ObjectId(params.id) });

        if (!resp) {
            return new NextResponse(JSON.stringify({ message: "No data found for this ID" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: 'get data', data: resp }), { status: 200 });

    } catch (error) {
        
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
};
