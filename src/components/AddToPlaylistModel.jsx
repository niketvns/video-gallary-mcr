import {AiOutlineClose} from "react-icons/ai";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import {useState} from "react";

const AddToPlaylistModel = ({setIsPlaylistModel, videoDetails}) => {
    const {playlists, createPlaylist, addToPlaylist} = useGlobalVideos()
    const [isCreatePlaylist, setIsCreatePlaylist] = useState(false)
    const [playlistDetails, setPlaylistDetails] = useState({
        title: '',
        desc: ''
    })

    const changeHandler = (e) => {
        const {name, value} = e.target
        setPlaylistDetails(prevState => ({...prevState, [name]: value}))
    }

    const submitHandler = () => {
        createPlaylist(playlistDetails)
        setIsCreatePlaylist(false)
    }

    return (
        <div className='add-playlist-model w-52 absolute top-full right-0 bg-white rounded shadow border p-4 pt-8 text-sm flex flex-col gap-2 cursor-default'>
            <div className="close absolute top-1 right-1 text-lg cursor-pointer" onClick={()=>setIsPlaylistModel(false)}>
                <AiOutlineClose/>
            </div>
            <ul className='flex flex-col gap-1'>
                {
                    playlists.length ?
                    playlists.map(({_id, title}) => (
                        <li key={_id} className='p-2 px-3 cursor-pointer bg-black/10 text-black rounded' onClick={()=>addToPlaylist(videoDetails, _id)}>{title}</li>
                    )) :
                        <p className='text-black/30'>No Playlist Found</p>
                }
            </ul>
            {
                isCreatePlaylist &&
                <form onSubmit={submitHandler} className='flex flex-col gap-2 bg-blue-100 p-1'>
                    <input required type="text" name='title' placeholder='Playlist Title' className='border p-2 text-black' onChange={changeHandler}/>
                    <input type="text" name='desc' placeholder='Playlist Description' className='border p-2 text-black' onChange={changeHandler}/>
                    <button className='bg-blue-500 rounded p-2 text-white'>Create</button>
                </form>
            }
            {!isCreatePlaylist && <button className='bg-blue-500 rounded p-2 text-white' onClick={()=>setIsCreatePlaylist(true)}>Create New Playlist</button>}
        </div>
    );
};

export default AddToPlaylistModel;