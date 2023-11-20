import dataArray from "../assets/dummydata.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React from "react";
import { Button, Typography } from "@mui/material";
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
    const firstSixItems = dataArray.slice(0, 6);
    const imageFolder = "../../img/";
    return (
        <div>
    <div style={{ position: "relative", width: "100%" }}>
      <img
        className="forMoreImg"
        height={"10vh"}
        width={"100%"}
        src={imageFolder + "landing.jpg"}
        alt="Find More"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          msTransform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#000000", // Text color
        }}
      >
        <div
          style={{
            backgroundColor: "#C4C2C2", // Gray color
            padding: "1rem",
            borderRadius: "20px", // Border radius for curved ends
          }}
        >
          <Typography variant="h4" component="div" gutterBottom
          style={{fontFamily: 'Cursive'}}
          >
            Welcome to our Online Library
          </Typography>
          <Typography variant="subtitle1" component="div"
          style={{fontFamily: 'Cursive'}}>
            Explore a vast collection of books and borrow your favorites today.
          </Typography>
        </div>
      </div>
    </div>


            <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {firstSixItems.map((item, index) => (
                    <Grid item xs={4}>
                        <Item className="bookBlock">
                            <p className="titleBook">{item.title}</p>
                            <br></br>
                            <img
                                height={300}
                                width={230}
                                src={imageFolder + item.selectedFile}
                                alt="bookImage"
                            />
                            ;<br></br>
                            <p className="bookAuthor">Author: {item.author}</p>
                            <br></br>
                            <p className="bookStock">Avaialbe: {item.stock}</p>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <div style={{ position: "relative", width: "100%" }}>
                <img
                    className="forMoreImg"
                    height={"300vh"}
                    width={"100%"}
                    src={imageFolder + "forMore.jpg"}
                    alt="Find More"
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        msTransform: "translate(-50%, -50%)",
                    }}
                >
                    <Button
                        className="findMoreButton"
                        variant="contained"
                        color="success"
                        style={{ outline: "none" }}
                    >
                        Find More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
