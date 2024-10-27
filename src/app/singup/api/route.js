import { connectDB } from "@/lip/connectDB";
import bcrypt from "bcrypt";


export const POST = async (request) => {
    const newUser = await request.json();
    try{
        const db = await connectDB();
        const userCollection = db.collection('users');
        const exist = await userCollection.findOne({email : newUser.email});
        if(exist){
            return Response.json({message: "User Already Exist"}, {status: 304})
        };
        const hashPassword = bcrypt.hashSync(newUser.password, 15);
        const resp = await userCollection.insertOne({...newUser, password: hashPassword});
        return Response.json({message: "New user Create"}, {status: 200});
    } catch(error) {
        console.log(error);
        return Response.json({message: "Something Is Wrong"}, {status: 50})
    }
}