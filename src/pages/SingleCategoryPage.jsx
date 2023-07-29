import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import {useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import VideoCard from "../components/VideoCard.jsx";

const SingleCategoryPage = () => {
    const {categoryName} = useParams()
    const {findCategoryVideos} = useGlobalVideos()
    const videos = findCategoryVideos(categoryName)

    console.log(videos)

    return (
        <div className={'home-main flex gap-14'}>
            <Sidebar/>
            <div className='flex flex-col gap-6'>
                <h1 className='text-2xl font-semibold'>{categoryName}</h1>
                <div className='all-category flex flex-wrap gap-6'>
                    {
                        videos.map((video) => (
                            <VideoCard key={video._id} video={video}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SingleCategoryPage;