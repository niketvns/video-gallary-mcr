import Sidebar from "../components/Sidebar.jsx";
import VideoCard from "../components/VideoCard.jsx";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import CreatePlaylistModel from "../components/CreatePlaylistModel.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";

const Playlist = () => {
    const [isCreatePlaylist, setIsCreatePlaylist] = useState(false)
    const navigate = useNavigate()

    const {playlists, deletePlaylist} = useGlobalVideos()
    return (
        <>
            <div className={'home-main flex gap-14'}>
                <Sidebar/>
                <div className='explore-main flex-1 flex flex-col gap-5'>
                    <h1 className='text-2xl font-semibold'>Playlists</h1>
                    <div className='all-playlists flex flex-wrap gap-6'>
                        {
                            playlists.length ?
                                playlists.map(({_id, title, desc, videos }) => (
                                    <div key={_id} className='relative'>
                                        <div className="close flex justify-end -top-1 right-1 text-lg cursor-pointer" onClick={()=>deletePlaylist(_id)}>
                                            <AiOutlineClose/>
                                        </div>
                                        <div className="playlistCard border p-2 rounded cursor-pointer w-44" onClick={()=>navigate(`/playlist/${_id}`)}>
                                            {
                                                videos.length ?
                                                    <img src={videos[0].thumbnail} alt="category_image" className='rounded w-full h-44 object-cover'/> :
                                                    <img src='/src/assets/empty-playlist.png' alt="category_image" className='rounded w-full h-44 object-cover'/>
                                            }
                                            <div className="details">
                                                <h2 className='font-semibold'>{title}</h2>
                                                <p className='text-black/60 line-clamp-1'>{desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )):
                                <p className='text-black/30 pl-4 py-10 text-xl'>No Playlist Added Yet</p>
                        }
                        <div className="categoryCard border rounded cursor-pointer w-44 p-2 flex justify-center items-center text-4xl" onClick={()=>setIsCreatePlaylist(true)}>
                            +
                        </div>
                    </div>
                </div>
            </div>

            {
                isCreatePlaylist &&
                <CreatePlaylistModel setIsCreatePlaylist={setIsCreatePlaylist}/>
            }
        </>
    );
};

export default Playlist;