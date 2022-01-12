import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles({
    iconCell: {
        height: 48,
        width: 48  
    } 
})

export const SizeTable = (props) => {
    const classes = useStyles()
    //商品のサイズ、数量
    const sizes = props.sizes

    return(
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map(size => (
                            <TableRow key={size.size}>
                                {/* サイズ */}
                                <TableCell component="th" scope="row">
                                    {size.size}
                                </TableCell>
                                {/* 数量 */}
                                <TableCell>
                                    残り{size.quantity}
                                </TableCell>
                                {/* カートアイコン */}
                                <TableCell className={classes.iconCell}>
                                    {size.quantity > 0 ? (
                                        // クリックでカートに商品を追加
                                        <IconButton onClick={() => props.addProductToCart(size.size)}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : (
                                        <div>売り切れ</div>
                                    )}
                                </TableCell>
                                {/* お気に入りアイコン */}
                                <TableCell className={classes.iconCell} onClick={() => props.addProductToFavorite()}>
                                    <IconButton>
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}