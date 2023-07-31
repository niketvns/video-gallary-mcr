import Sidebar from "../components/Sidebar.jsx";
import VideoCard from "../components/VideoCard.jsx";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import {useParams} from "react-router-dom";

const PlaylistDetailsPage = () => {
    const {findPlaylist} = useGlobalVideos()
    const {playlistId} = useParams()

    const playlistDetails = findPlaylist(playlistId);

    return (
        <div className={'playlistDetails flex gap-14'}>
            <Sidebar/>
            <div className='explore-main flex-1 flex flex-col gap-5'>
                <h1 className='text-2xl font-semibold'>{playlistDetails?.title}</h1>
                {playlistDetails?.desc && <p><b>Description: </b>{playlistDetails?.desc}</p>}
                <div className='all-watch-later flex flex-wrap gap-6'>
                    {
                        playlistDetails?.videos.length ?
                            playlistDetails?.videos.map(video => (
                                <VideoCard key={video._id} video={video}/>
                            )):
                            <p className='text-black/30 pl-4 py-10 text-xl'>Nothing in the {playlistDetails?.title}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default PlaylistDetailsPage;