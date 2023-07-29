import Sidebar from "../components/Sidebar.jsx";
import VideoCard from "../components/VideoCard.jsx";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";

const Playlist = () => {
    const {playlists} = useGlobalVideos()
    return (
        <div className={'home-main flex gap-14'}>
            <Sidebar/>
            <div className='explore-main flex-1 flex flex-col gap-5'>
                <h1 className='text-2xl font-semibold'>Playlists</h1>
                <div className='all-playlists flex flex-wrap gap-6'>
                    {
                        playlists.length ?
                            playlists.map(video => (
                                <VideoCard key={video._id} video={video}/>
                            )):
                            <p className='text-black/30 pl-4 py-10 text-xl'>No Playlist Added Yet</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Playlist;