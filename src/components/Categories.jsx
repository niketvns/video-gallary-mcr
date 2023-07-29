import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import {useNavigate} from "react-router-dom";

const Categories = () => {
    const {allCategories} = useGlobalVideos()
    const navigate = useNavigate()


    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-2xl font-semibold'>Categories</h1>
            <div className='all-category flex flex-wrap gap-6'>
                {
                    allCategories.map(({_id, thumbnail, category}) => (
                        <div key={_id} className="categoryCard cursor-pointer" onClick={()=>navigate(`/category/${category}`)}>
                            <img src={thumbnail} alt="category_image" className='rounded'/>
                            <h2 className='font-semibold'>{category}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Categories;