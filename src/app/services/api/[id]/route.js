// import { connectDB } from "@/lip/connectDB";

// export const GET = async (request, {params}) =>{
//     const db = await connectDB();
//     const servicesCollection = await db.collection('note-All');
//     try{
//         const note = await servicesCollection.findOne({_id : params.id});
//         return Response.json({note});
//     } catch(error) {
//         console.log(error);
//     }
// }


import { connectDB } from "@/lip/connectDB";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const servicesCollection = await db.collection('note-All');
    try {
        
        if (!params.id) {
            return new Response(JSON.stringify({ error: "ID parameter is missing" }), { status: 400 });
        }

        const note = await servicesCollection.findOne({ _id: new ObjectId(params.id) });
        
        
        if (!note) {
            return new Response(JSON.stringify({ error: "Note not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ note }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "An error occurred while fetching the note." }), { status: 500 });
    }
};
