export const getNoteData = async () => {
    const res = await fetch('http://localhost:3000/services/api/get-all')
    const noteData = await res.json();
    return noteData;
}


export const getNoteDetailsData = async (id) => {
    const res = await fetch(`http://localhost:3000/services/api/${id}`)
    const noteDetailsData = await res.json();
    return noteDetailsData;
}