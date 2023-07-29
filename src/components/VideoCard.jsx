import {useNavigate} from "react-router-dom";
import {MdOutlineWatchLater, MdWatchLater} from 'react-icons/md'
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";

const VideoCard = ({video}) => {
    const {_id, thumbnail, category, title, views, creator} = video
    const navigate = useNavigate()
    const {isInWatchLater, addToWatchLater, removeFromWatchLater} = useGlobalVideos()

    return (
        <div className="video-card cursor-pointer w-72 relative border rounded">
            <div className="watchLater absolute right-0 bg-white p-2 rounded-bl-2xl text-xl text-blue-500">
                {
                    isInWatchLater(_id) ?
                        <MdWatchLater title='Already in Watch Later' onClick={()=>removeFromWatchLater(_id)}/> :
                        <MdOutlineWatchLater title='Add to Watch Later' onClick={()=>addToWatchLater(video)}/>
                }
            </div>
            <img src={thumbnail} alt="category_image" className='w-full h-40 rounded-t' onClick={()=>navigate(`/video/watch/${_id}`)}/>
            <div className="details flex py-2">
                <div className="logo">
                    <img src='https://i.pinimg.com/1200x/0a/83/45/0a834586d8d488ed414c1a9980ab7f71.jpg' alt="" className='w-10 aspect-square object-cover'/>
                </div>
                <div>
                    <h2 className='font-semibold'>{title}</h2>
                    <h2 className='font-semibold'>{category}</h2>
                    <p className='line-clamp-1'>{views} Views | {creator}</p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;