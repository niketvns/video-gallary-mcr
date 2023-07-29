import Sidebar from "../components/Sidebar.jsx";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import VideoCard from "../components/VideoCard.jsx";
import {useState} from "react";

const Explore = () => {
    const [searchInput, setSearchInput] = useState('')
    const {allVideos} = useGlobalVideos()

    const searchResult = allVideos.filter(video => video.title.toUpperCase().includes(searchInput.toUpperCase()))

    return (
        <div className={'home-main flex gap-14'}>
            <Sidebar/>
            <div className='explore-main flex-1 flex flex-col gap-5'>
                <h1 className='text-2xl font-semibold'>Explore</h1>
                <input type="search" name="search" id="search" autoComplete='off' placeholder='Search Video by Title' className='border p-2 px-6 text-center rounded-full shadow w-full' onChange={(e)=>setSearchInput(e.target.value)}/>
                <div className="all-videos flex gap-6 flex-wrap">
                    {
                        searchResult.map(video => (
                            <VideoCard key={video._id} video={video}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Explore;