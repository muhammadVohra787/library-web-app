import dataArray from "../assets/dummydata.js";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ProductList = () => {
    const firstSixItems = dataArray.slice(0, 6);
    const imageFolder = "../../img/";

    return (
        <div>
            {/* Hero Section */}
            <div style={{ position: "relative", width: "100%" }}>
                <img
                    className="forMoreImg"
                    height={"2%"}
                    width={"100%"}
                    src={imageFolder + "landing1.png"}
                    alt="Find More"
                />
            </div>

            {/* Welcome Section */}
            <Box
                style={{
                    backgroundColor: "#f5f5f5",
                    padding: "2rem",
                    borderRadius: "2rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    style={{
                        fontFamily: "Bebas Neue",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#3e3e3e",
                    }}
                >
                    WELCOME TO OUR LIBRARY
                </Typography>
                <Typography
                    variant="body1"
                    component="div"
                    style={{
                        fontFamily: "Bebas Neue",
                        fontSize: "1rem",
                        color: "#555",
                    }}
                >
                    Explore a vast collection of books and borrow your favorites
                    today.
                </Typography>
            </Box>

            {/* Product Grid */}
            <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {firstSixItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            className="bookBlock"
                            elevation={3}
                            style={{ padding: "20px", borderRadius: "10px" }}
                        >
                            <Typography variant="h6" className="titleBook">
                                {item.title}
                            </Typography>
                            <img
                                height={300}
                                width={230}
                                src={imageFolder + item.selectedFile}
                                alt="bookImage"
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                }}
                            />
                            <Typography variant="body2" className="bookAuthor">
                                Author: {item.author}
                            </Typography>
                            <Typography variant="body2" className="bookStock">
                                Available: {item.stock}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Find More Section */}
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
