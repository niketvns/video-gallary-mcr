import {useNavigate, useParams} from "react-router-dom";
import {useGlobalVideos} from "../contexts/videoLibraryContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import {MdOutlinePlaylistAdd, MdOutlineWatchLater, MdEditNote, MdWatchLater, MdDelete} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import {GiCheckMark} from 'react-icons/gi'
import NoteModel from "../components/NoteModel.jsx";
import {useState} from "react";
import AddToPlaylistModel from "../components/AddToPlaylistModel.jsx";

const SingleVideoPage = () => {
    const [isNoteModel, setIsNoteModel] = useState(false)
    const [isPlaylistModel, setIsPlaylistModel] = useState(false)
    const [isNoteEdit, setIsNoteEdit] = useState(false)
    const [editedNote, setEditedNote] = useState()
    const {id} = useParams()
    const {findVideo, allVideos, addToWatchLater, removeFromWatchLater, isInWatchLater, notes, deleteNote, editNote} = useGlobalVideos()
    const videoDetails = findVideo(Number(id))
    const navigate = useNavigate()

    const notesInd = notes.filter(note=> note.videoId === videoDetails._id);

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
                        <div className="playlist cursor-pointer relative">
                            <MdOutlinePlaylistAdd onClick={()=>setIsPlaylistModel(prevState => !prevState)}/>
                            {isPlaylistModel && <AddToPlaylistModel videoDetails={videoDetails} setIsPlaylistModel={setIsPlaylistModel}/>}
                        </div>
                        <div className="add_note cursor-pointer relative">
                            <MdEditNote onClick={()=>setIsNoteModel(prevState => !prevState)}/>
                            {isNoteModel && <NoteModel setIsNoteModel={setIsNoteModel} videoId={videoDetails._id}/>}
                        </div>
                    </div>
                </div>
                <div className="notes">
                    <h1 className='text-2xl font-semibold py-4'>My Notes</h1>
                    <div className='all-note flex flex-col gap-2'>
                        {
                            notesInd.length ?
                                notesInd.map(({_id, note}) => (
                                    <div key={_id} className='flex justify-between items-center ml-4 bg-black/10 p-4 rounded'>
                                        {
                                            isNoteEdit ?
                                                <input type="text" name="note" id="note" placeholder='Edit Note...' value={editedNote} onChange={(e)=>setEditedNote(e.target.value)} className='p-1 rounded w-full mr-2'/> : <p>{note}</p>
                                        }
                                        <div className='flex gap-4 justify-center items-center'>
                                            <div>
                                                {
                                                    isNoteEdit ?
                                                        <GiCheckMark onClick={()=> {
                                                            editNote({_id, note: editedNote})
                                                            setIsNoteEdit(false)
                                                        }} className='cursor-pointer'/> :
                                                        <FiEdit className='text-lg cursor-pointer' onClick={()=> {
                                                            setIsNoteEdit(prevState => !prevState)
                                                            setEditedNote(note)
                                                        }}/>
                                                }

                                            </div>
                                            <div><MdDelete className='text-2xl cursor-pointer' onClick={()=>deleteNote(_id)}/></div>
                                        </div>
                                    </div>
                                )) :
                                <p className='text-black/30 px-4'>No notes added yet</p>
                        }
                    </div>
                </div>
            </div>
            <div className="more_videos flex flex-col gap-4">
                <h1 className='text-2xl font-semibold'>More Videos</h1>
                <div className="all_videos flex flex-col gap-2">
                    {
                        allVideos.map(video => (
                            <div key={video._id} className='flex gap-2 cursor-pointer' onClick={()=>navigate(`/video/watch/${video._id}`)}>
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