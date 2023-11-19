import React from "react";
import dataArray from "../assets/dummydata.js";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";


const ProductList = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "gray" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        "& .titleBook": {
            whiteSpace: "normal",
            fontSize: "2vh",
            fontWeight: 600,
            maxHeight: "2.4em",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        "& .bookAuthor": {
            fontSize: "1.8vh",
            fontWeight: 500,
        },
        "& .bookStock": {
            fontSize: "1.7vh",
            fontWeight: 600,
            color: "green",
        },

    }));
    const bookFileName = "../../img/";
    return (
        <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {dataArray.map((item, index) => (
                <Grid item xs={4}>
                <Item className="bookBlock" >
                    <p className="titleBook">{item.title}</p>
                    <br></br>
                    <img
                        height={300}
                        width={230}
                        src={bookFileName + item.selectedFile}
                        alt="bookImage"
                    />;
                    <br></br>
                    <p className="bookAuthor">Author: {item.author}</p>
                    <br></br>
                    <p className="bookStock">Avaialbe: {item.stock}</p>
                </Item>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
