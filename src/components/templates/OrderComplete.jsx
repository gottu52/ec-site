import { makeStyles } from "@material-ui/core"
import { push } from "connected-react-router"
import { useDispatch } from "react-redux"
import { PrimaryButton } from "../attom/PrimaryButton"


const useStyles = makeStyles({
    text: {
        fontSize: '30px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '100px 0 50px 0'
    }
})


export const OrderComplete = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    return(
        <div>
            <h1 className={classes.text}>注文が完了しました!!</h1>
            <div className="center">
                <PrimaryButton 
                    label={"商品一覧に戻る"}
                    onClick={() => dispatch(push('/'))}
                />    
            </div>
        </div>
    )
}