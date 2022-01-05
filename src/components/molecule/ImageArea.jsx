import { IconButton } from "@material-ui/core";
import AddPhotAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/styles";
import { useCallback } from "react";
import { storage } from "../../firebase";
import { ImagePreview } from "../attom/ImagePreview";

const useStyles = makeStyles({
    icon: {
        width: 48,
        height: 48 
    }  
})

export const ImageArea = (props) => {
    const classes = useStyles();

    const uploadImage = useCallback((event) => {
        // fileをBlobに変換
        const file = event.target.files;
        let blob = new Blob(file, {type: "image/jpeg"});

        //fileNameを16桁のランダムな文字列で
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQLSTUVWXYZ0123456789";
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
            .map((n) => S[n%S.length]).join('');

        //画像を保存するディレクトリを指定し、アップロード
        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        //アップロードした後、
        //firebaseのstorageからアップロードした画像のURLを取得し、stateで管理
        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    const newImage = {id: fileName, path: downloadURL};
                    props.setImages((prevState => [...prevState, newImage]))
                });
        })
    }, [props.setImages]);

    const deleteImage = useCallback(async(id) => {
        const ret = window.confirm('本当に削除しますか？');
        if(!ret) {
            return false
        } else {
            const newImages = props.images.filter(image => image.id !== id)
            props.setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    }, [props.images])

    return (
        <div>
            <div className="u-text-right">
                <div>
                    { props.images.length > 0 && (
                        props.images.map(image => 
                            <ImagePreview id={image.id} path={image.path} key={image.id} deleteImage={deleteImage}/>
                        )
                    ) }
                </div>
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotAlternateIcon />
                        <input type="file" className="u-display-none" id="image" 
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}