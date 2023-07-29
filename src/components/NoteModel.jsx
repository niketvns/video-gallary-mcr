import {AiOutlineClose} from 'react-icons/ai'
import {useState} from "react";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import {v4 as uuid} from "uuid";

const NoteModel = ({setIsNoteModel, videoId}) => {
    const [note, setNote] = useState('')
    const {addNote} = useGlobalVideos()

    return (
        <div className='note-model absolute top-full right-0 bg-white rounded shadow border p-4 pt-8 text-sm flex flex-col gap-2 cursor-default'>
            <div className="close absolute top-1 right-1 text-lg cursor-pointer" onClick={()=>setIsNoteModel(false)}>
                <AiOutlineClose/>
            </div>
            <input type="text" placeholder='Enter Note Content...' className='border p-2 text-black' onChange={(e)=>setNote(e.target.value)}/>
            <button className='bg-blue-500 rounded p-2 text-white' onClick={()=> {
                addNote({_id: uuid(), note, videoId})
                setIsNoteModel(false)
            }}>Add New Note</button>
        </div>
    );
};

export default NoteModel;