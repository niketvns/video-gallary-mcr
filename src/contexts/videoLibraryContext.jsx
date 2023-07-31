import {createContext, useContext, useEffect, useState} from "react";
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

    useEffect(()=>{
        setWatchLater(JSON.parse(localStorage.getItem('watchLater')) ?? [])
        setPlaylists(JSON.parse(localStorage.getItem('playlists')) ?? [])
        setNotes(JSON.parse(localStorage.getItem('notes')) ?? [])
    },[])

    useEffect(()=>{
        if (watchLater.length){
            localStorage.setItem('watchLater', JSON.stringify(watchLater))
        }
        if (notes.length){
            localStorage.setItem('notes', JSON.stringify(notes))
        }
        if (playlists.length){
            localStorage.setItem('playlists', JSON.stringify(playlists))
        }
    },[watchLater, notes, playlists])

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
        if (watchLater.length === 1){
            localStorage.setItem('watchLater', JSON.stringify([]))
        }
    }

    const isInWatchLater = (id) => {
        return watchLater.some(video => video._id === id )
    }

    const addNote = (note) => {
        setNotes(prevState => [note, ...prevState])
    }

    const deleteNote = (noteId) => {
        setNotes(prevState => prevState.filter(note => note._id !== noteId))
        if (notes.length === 1){
            localStorage.setItem('notes', JSON.stringify([]))
        }
    }

    const editNote = (newNote) => {
        setNotes(prevState => prevState.map(note => note._id === newNote._id ? {...note, note: newNote.note} : note))
    }

    const createPlaylist = (playlist) => {
        setPlaylists(prevState => [{_id: uuid() ,...playlist, videos: []}, ...prevState])
    }

    const deletePlaylist = (playlistId) => {
        setPlaylists(prevState => prevState.filter(({_id}) => _id !== playlistId))
        localStorage.setItem('playlists', JSON.stringify([]))
    }

    const findPlaylist = (playlistId) => {
       return playlists.find(playlist => playlist._id === playlistId)
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