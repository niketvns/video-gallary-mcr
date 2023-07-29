import {AiFillHome} from 'react-icons/ai'
import {MdExplore, MdOutlinePlaylistAdd, MdWatchLater} from 'react-icons/md'
import {useNavigate} from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate()

    return (
        <>
            <ul className='sidebar flex flex-col gap-4 min-w-fit px-4 py-10 text-lg'>
                <li className='flex items-center gap-2 font-semibold cursor-pointer hover:text-blue-500 transition duration-200' onClick={()=>navigate('/')}><AiFillHome/> Home</li>
                <li className='flex items-center gap-2 font-semibold cursor-pointer hover:text-blue-500 transition duration-200' onClick={()=>navigate('/explore')}><MdExplore/> Explore</li>
                <li className='flex items-center gap-2 font-semibold cursor-pointer hover:text-blue-500 transition duration-200' onClick={()=>navigate('/playlist')}><MdOutlinePlaylistAdd/> Playlist</li>
                <li className='flex items-center gap-2 font-semibold cursor-pointer hover:text-blue-500 transition duration-200' onClick={()=>navigate('/watch-later')}><MdWatchLater/> Watch Later</li>
            </ul>
        </>
    );
};

export default Sidebar;