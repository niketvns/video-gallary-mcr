import {createContext, useContext, useState} from "react";
import {categories} from "../db/categories.js";
import {videos} from "../db/videos.js";

const videoLibraryContext = createContext()

const VideoLibraryContextProvider = ({children}) => {
    const [allCategories, setAllCategories] = useState(categories)
    const [allVideos, setAllVideos] = useState(videos)
    const [watchLater, setWatchLater] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [notes, setNotes] = useState([])

    const findCategoryVideos = (categoryName) => {
        return allVideos.filter(video => video.category === categoryName )
    }

    const findVideo = (id) => {
        return allVideos.find(video => video._id === id )
    }

    const addToWatchLater = (video) => {
        setWatchLater(prevState => [video, ...prevState])
    }

    const removeFromWatchLater = (videoId) => {
        setWatchLater(prevState => prevState.filter(video => video._id !== videoId))
    }

    const isInWatchLater = (id) => {
        return watchLater.some(video => video._id === id )
    }

    const addNote = (note) => {
        setNotes(prevState => [note, ...prevState])
    }

    const deleteNote = (noteId) => {
        setNotes(prevState => prevState.filter(note => note._id !== noteId))
    }

    return (
        <videoLibraryContext.Provider value={{allCategories, isInWatchLater, allVideos, watchLater, addToWatchLater, removeFromWatchLater, findCategoryVideos, findVideo, playlists, notes, addNote, deleteNote}}>
            {children}
        </videoLibraryContext.Provider>
    )
}

const useGlobalVideos = () => useContext(videoLibraryContext)

export {VideoLibraryContextProvider, useGlobalVideos}