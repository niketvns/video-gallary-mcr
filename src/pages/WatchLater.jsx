import Sidebar from "../components/Sidebar.jsx";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import VideoCard from "../components/VideoCard.jsx";

const WatchLater = () => {
    const {watchLater} = useGlobalVideos()

    return (
        <div className={'home-main flex gap-14'}>
            <Sidebar/>
            <div className='explore-main flex-1 flex flex-col gap-5'>
                <h1 className='text-2xl font-semibold'>Watch Later</h1>
                <div className='all-watch-later flex flex-wrap gap-6'>
                    {
                        watchLater.length ?
                        watchLater.map(video => (
                            <VideoCard key={video._id} video={video}/>
                        )):
                        <p className='text-black/30 pl-4 py-10 text-xl'>Nothing in the Watch Later</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default WatchLater;