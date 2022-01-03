import React from "react";
import TextField from "@mui/core";

export const Textinput = (props) => {
    return(
        <TextField 
            // 幅maxか否か
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            // 複数行か否か
            multiline={props.multiline}
            // 必須項目か否か
            required={props.required}
            // 何行か
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
}
