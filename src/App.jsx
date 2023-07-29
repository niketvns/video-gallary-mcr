import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import './App.css'
import SingleCategoryPage from "./pages/SingleCategoryPage.jsx";
import SingleVideoPage from "./pages/SingleVideoPage.jsx";
import Explore from "./pages/Explore.jsx";
import Playlist from "./pages/Playlist.jsx";
import WatchLater from "./pages/WatchLater.jsx";

const App = () => {
    return (
        <div className='app_main p-6'>
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/explore'} element={<Explore/>} />
                <Route path={'/playlist'} element={<Playlist/>} />
                <Route path={'/watch-later'} element={<WatchLater/>} />
                <Route path={'/category/:categoryName'} element={<SingleCategoryPage/>} />
                <Route path={'/video/watch/:id'} element={<SingleVideoPage/>} />
            </Routes>
        </div>
    )
}

export default App