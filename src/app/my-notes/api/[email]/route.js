import { connectDB } from "@/lip/connectDB";




export const GET = async (request, { params }) => {
    try {
        const db = await connectDB();
        const noteCollection = db.collection('note-All');
        const myNotes = await noteCollection.find({ email: params.email }).toArray();

        return new Response(JSON.stringify({ myNotes }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.log("Error fetching notes:", error);
        return new Response(JSON.stringify({ message: 'Error loading notes' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
