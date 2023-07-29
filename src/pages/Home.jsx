import Sidebar from "../components/Sidebar.jsx";
import Categories from "../components/Categories.jsx";

const Home = () => {

    return (
        <div className={'home-main flex gap-14'}>
                <Sidebar/>
                <Categories/>
        </div>
    );
};

export default Home;