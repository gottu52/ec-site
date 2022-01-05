export const ImagePreview = (props) => {
    return(
        <div className="p-media__thumb" onClick={() => props.deleteImage(props.id)} >
            <img src={props.path} alt="プレビュー" />
        </div>
    )
}