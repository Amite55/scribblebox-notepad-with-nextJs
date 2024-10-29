import { connectDB } from "@/lip/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const newUser = await request.json();
    try{
        const db = await connectDB();
        const userCollection = db.collection('users');
        const exist = await userCollection.findOne({email : newUser.email});
        if(exist){
            return NextResponse.json({message: "User Already Exist"}, {status: 304})
        };
        const hashPassword = bcrypt.hashSync(newUser.password, 15);
        const resp = await userCollection.insertOne({...newUser, password: hashPassword});
        return NextResponse.json({message: "New user Create"}, {status: 200});
    } catch(error) {
       
        return NextResponse.json({message: "Something Is Wrong"}, {status: 50})
    }
}