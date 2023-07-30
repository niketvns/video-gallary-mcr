import {createContext, useContext, useState} from "react";
import {categories} from "../db/categories.js";
import {videos} from "../db/videos.js";
import {v4 as uuid} from "uuid";

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

    const editNote = (newNote) => {
        setNotes(prevState => prevState.map(note => note._id === newNote._id ? {...note, note: newNote.note} : note))
    }

    const createPlaylist = (playlist) => {
        setPlaylists(prevState => [{_id: uuid() ,...playlist, videos: []}, ...prevState])
    }

    const deletePlaylist = (playlistId) => {
        setPlaylists(prevState => prevState.filter(({_id}) => _id !== playlistId))
    }

    const findPlaylist = (playlistId) => {
        return playlists.find(playlist => playlist._id === playlistId);
    }

    const addToPlaylist = (video, playlistId) => {
        setPlaylists(prevState => prevState.map(playlist => playlist._id === playlistId ? {...playlist, videos: [video, ...playlist.videos] } : playlist))
        alert('Added to '+findPlaylist(playlistId).title)
    }

    return (
        <videoLibraryContext.Provider value={{allCategories, isInWatchLater, allVideos, watchLater, addToWatchLater, removeFromWatchLater, findCategoryVideos, findVideo, playlists, notes, addNote, deleteNote, editNote, createPlaylist, findPlaylist, addToPlaylist, deletePlaylist}}>
            {children}
        </videoLibraryContext.Provider>
    )
}

const useGlobalVideos = () => useContext(videoLibraryContext)

export {VideoLibraryContextProvider, useGlobalVideos}