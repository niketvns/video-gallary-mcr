import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import {AiOutlineClose} from "react-icons/ai";
import {useState} from "react";

const CreatePlaylistModel = ({setIsCreatePlaylist}) => {
    const [playlistDetails, setPlaylistDetails] = useState({
        title: '',
        desc: ''
    })
    const {createPlaylist} = useGlobalVideos()

    const changeHandler = (e) => {
        const {name, value} = e.target
        setPlaylistDetails(prevState => ({...prevState, [name]: value}))
    }

    const submitHandler = () => {
        createPlaylist(playlistDetails)
        setIsCreatePlaylist(false)
    }

    return (
        <div className='create_playlist_model fixed inset-0 bg-black/20 flex justify-center items-center'>
            <div className="card bg-white p-4 rounded relative">
                <div className="close absolute top-1 right-1 text-lg cursor-pointer" onClick={()=>setIsCreatePlaylist(false)}>
                    <AiOutlineClose/>
                </div>
                <h1 className='text-xl font-semibold'>Create a Playlist</h1>
                <form onSubmit={submitHandler} className="input flex flex-col gap-2 p-4">
                    <input required type="text" name='title' placeholder='Title of Playlist' className='border p-2 w-full' onChange={changeHandler}/>
                    <input type="text" name='desc' placeholder='Playlist Description' className='border p-2 w-full' onChange={changeHandler}/>
                    <button className='bg-blue-500 text-white p-2 rounded'>Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModel;