// Home page
import dataArray from "../assets/dummydata.js";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

const Home = () => {
    const imageFolder = "/book-cover/";

    const fictionBooks = dataArray
        .filter((book) => book.tags.includes("Fiction"))
        .slice(0, 3);
    const adventureBooks = dataArray
        .filter((book) => book.tags.includes("Adventure"))
        .slice(0, 3);
    const fantasyBooks = dataArray
        .filter((book) => book.tags.includes("Fantasy"))
        .slice(0, 3);
    const welcomeImage = `${imageFolder}landing1.png`;
    const heroImage = `${imageFolder}fiction.jpg`;
    const adventureSectionImage = `${imageFolder}adventure.jpg`;
    const fantasySectionImage = `${imageFolder}fantasy.jpg`;

    return (
        <div>
            {/* Welcome Section */}
            <img
                src={welcomeImage}
                alt="Hero Section"
                style={{ width: "100%", height: "auto" }}
            />

            {/* Library Introduction Section */}
            <Box
                sx={{
                    backgroundColor: "#f5f5f5",
                    padding: "2rem",
                    borderRadius: "2rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    mt: "2rem",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    WELCOME TO OUR LIBRARY
                </Typography>
                <Typography variant="body1">
                    Explore a vast collection of books and borrow your favorites
                    today.
                </Typography>
            </Box>

            {/* Fiction Books Section */}
            <img
                src={heroImage}
                alt="Hero Section"
                style={{ width: "100%", height: "auto", mt: "2rem" }}
            />
            <Typography variant="h4" gutterBottom>
                <span role="img" aria-label="Fiction Emoji">
                    📚
                </span>{" "}
                Fiction Favorites
            </Typography>
            <Grid container spacing={4}>
                {fictionBooks.map((book, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ p: "20px", borderRadius: "10px" }}>
                            <Typography variant="h6">{book.title}</Typography>
                            <a href={`/book/${book.slug}`}>
                                <img
                                    height={"100%"}
                                    width={"auto"}
                                    src={imageFolder + book.thumbnail}
                                    alt="bookImage"
                                    style={{ display: "block", margin: "auto", mt: "15px", mb: "15px" }}
                                />
                            </a>
                            <Typography variant="body2">Author: {book.author}</Typography>
                            <Typography variant="body2">Available: {book.stock}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Adventure Books Section */}
            <img
                src={adventureSectionImage}
                alt="Adventure Section"
                style={{ width: "100%", height: "auto", mt: "2rem" }}
            />
            <Typography variant="h4" gutterBottom>
                <span role="img" aria-label="Adventure Emoji">
                    🚀
                </span>{" "}
                Adventure Escapes
            </Typography>
            <Grid container spacing={4}>
                {adventureBooks.map((book, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ p: "20px", borderRadius: "10px" }}>
                            <Typography variant="h6">{book.title}</Typography>
                            <a href={`/book/${book.slug}`}>
                                <img
                                    height={"100%"}
                                    width={"auto"}
                                    src={imageFolder + book.thumbnail}
                                    alt="bookImage"
                                    style={{ display: "block", margin: "auto", mt: "15px", mb: "15px" }}
                                />
                            </a>
                            <Typography variant="body2">Author: {book.author}</Typography>
                            <Typography variant="body2">Available: {book.stock}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Fantasy Books Section */}
            <img
                src={fantasySectionImage}
                alt="Fantasy Section"
                style={{ width: "100%", height: "auto", mt: "2rem" }}
            />
            <Typography variant="h4" gutterBottom>
                <span role="img" aria-label="Fantasy Emoji">
                    🧙‍♂️
                </span>{" "}
                Fantasy Favorites
            </Typography>
            <Grid container spacing={4}>
                {fantasyBooks.map((book, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper elevation={3} sx={{ p: "20px", borderRadius: "10px" }}>
                            <Typography variant="h6">{book.title}</Typography>
                            <a href={`/book/${book.slug}`}>
                                <img
                                    height={"100%"}
                                    width={"auto"}
                                    src={imageFolder + book.thumbnail}
                                    alt="bookImage"
                                    style={{ display: "block", margin: "auto", mt: "15px", mb: "15px" }}
                                />
                            </a>
                            <Typography variant="body2">Author: {book.author}</Typography>
                            <Typography variant="body2">Available: {book.stock}</Typography>
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
                    src={`${imageFolder}forMore.jpg`}
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
                    <Button variant="contained" color="success">
                        Find More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Home;
