import axios from "axios";

export const getNoteData = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_VITE_URL}/services/api/get-all`)
    return data ;
}


export const getNoteDetailsData = async (id) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_VITE_URL}/services/api/${id}`)
    return data ;
}