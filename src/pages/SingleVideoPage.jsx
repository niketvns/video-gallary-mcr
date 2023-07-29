import {useParams} from "react-router-dom";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import {MdOutlinePlaylistAdd, MdOutlineWatchLater, MdEditNote, MdWatchLater} from 'react-icons/md'

const SingleVideoPage = () => {
    const {id} = useParams()
    const {findVideo, allVideos, addToWatchLater, removeFromWatchLater, isInWatchLater} = useGlobalVideos()
    const videoDetails = findVideo(Number(id))

    return (
        <div className={'single-video-main flex gap-4'}>
            <Sidebar/>
            <div className='flex flex-col gap-2'>
                <VideoPlayer src={videoDetails.src}/>
                <div className="details flex justify-between items-center border-b border-black/40 py-2">
                    <div className="logo-title flex items-center">
                        <div className="logo">
                            <img src='https://i.pinimg.com/1200x/0a/83/45/0a834586d8d488ed414c1a9980ab7f71.jpg' alt="" className='w-8 aspect-square object-cover'/>
                        </div>
                        <h1 className='text-xl font-semibold'>{videoDetails.title}</h1>
                    </div>
                    <div className="video-options flex gap-4 text-2xl pr-2 text-blue-500">
                        <div className="watch_later cursor-pointer">
                            {
                                isInWatchLater(videoDetails._id) ?
                                    <MdWatchLater title='Already in Watch Later' onClick={()=>removeFromWatchLater(videoDetails._id)}/> :
                                    <MdOutlineWatchLater title='Add to Watch Later' onClick={()=>addToWatchLater(videoDetails)}/>
                            }
                        </div>
                        <div className="playlist cursor-pointer">
                            <MdOutlinePlaylistAdd/>
                        </div>
                        <div className="add_note cursor-pointer">
                            <MdEditNote/>
                        </div>
                    </div>
                </div>
                <div className="notes">
                    <h1 className='text-2xl font-semibold py-4'>My Notes</h1>
                    <p className='text-black/30 px-4'>No notes added yet</p>
                </div>
            </div>
            <div className="more_videos flex flex-col gap-4">
                <h1 className='text-2xl font-semibold'>More Videos</h1>
                <div className="all_videos flex flex-col gap-2">
                    {
                        allVideos.map(video => (
                            <div key={video._id} className='flex gap-2 cursor-pointer'>
                                <img src={video.thumbnail} alt="" className='w-52 rounded'/>
                                <div className="text-blue-500 details">
                                    <h3 className='text-sm'>{video.title}</h3>
                                    <p className='text-sm py-2'>{video.creator}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleVideoPage;