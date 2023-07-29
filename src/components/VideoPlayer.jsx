const VideoPlayer = ({src}) => {
    return (
        <div>
            <iframe src={src}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen className='w-[50vw] aspect-video rounded'>
            </iframe>
        </div>
    );
};

export default VideoPlayer;