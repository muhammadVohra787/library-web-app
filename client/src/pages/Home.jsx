import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Stack,
    Typography,
    Container,
    styled,
} from "@mui/material";

import HeroImg from "@/assets/hero_img.jpg";
import HeroImg2 from "@/assets/hero_img_2.jpg";
import useBookData from "@/api/use-book-data.js";
import { useEffect, useState } from "react";
import NavLink from "@/components/NavLink";

const Home = () => {
    const imageFolder = "/book-cover/";
    const adventureSectionImage = `${imageFolder}adventure.jpg`;
    const fantasySectionImage = `${imageFolder}fantasy.jpg`;

    const fictonBooks = useBookData();
    const fantasyBooks = useBookData();
    const adventureBooks = useBookData();

    const [isLoading, setIsLoading] = useState({
        fiction: true,
        fantasy: true,
        adventure: true,
    });

    const cancelIsLoading = (key) => {
        setIsLoading((prev) => {
            return {
                ...prev,
                [key]: false,
            };
        });
    };

    useEffect(() => {
        if (
            isLoading.fiction &&
            (fictonBooks.status.isComplete || fictonBooks.status.isError)
        ) {
            cancelIsLoading("fiction");
        }
        if (
            isLoading.fantasy &&
            (fantasyBooks.status.isComplete || fantasyBooks.status.isError)
        ) {
            cancelIsLoading("fantasy");
        }
        if (
            isLoading.adventure &&
            (adventureBooks.status.isComplete || adventureBooks.status.isError)
        ) {
            cancelIsLoading("adventure");
        }
    }, [
        isLoading.fiction,
        isLoading.fantasy,
        isLoading.adventure,
        fictonBooks.status.isComplete,
        fantasyBooks.status.isComplete,
        adventureBooks.status.isComplete,
        fictonBooks.status.isError,
        fantasyBooks.status.isError,
        adventureBooks.status.isError,
    ]);

    useEffect(() => {
        fictonBooks.getBooks({ filter: { tags: "Fiction" }, limit: 3 });
        fantasyBooks.getBooks({ filter: { tags: "Fantasy" }, limit: 3 });
        adventureBooks.getBooks({ filter: { tags: "Adventure" }, limit: 3 });
    }, []);

    return (
        <div>
            <Container>
                <div
                    className="hero-container"
                    style={{
                        backgroundColor: "#380980",
                        color: "#fff",
                        width: "100%",
                    }}
                >
                    <div
                        className="wp-block-columns"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: '100px'
                        }}
                    >
                        <div
                            className="wp-block-column"
                            style={{ flexBasis: "100%", padding: "40px" }}
                        >
                            <Typography
                                style={{
                                    fontFamily: "Helvetica",
                                    fontSize: "3vh",
                                }}
                            >
                                Unlock the world of knowledge with our e-library
                                - your gateway to infinite learning.
                            </Typography>
                            <div style={{ marginTop: "2rem" }}>
                                <NavLink
                                    className="explore-button"
                                    asButton
                                    to="/explore"
                                    style={{
                                        backgroundColor: "#fff",
                                        color: "#18044a",
                                        textDecoration: "none",
                                        padding: "10px 20px",
                                        textTransform: "uppercase",
                                        display: "inline-block",
                                        transition: "ease-in-out 2ms",
                                    }}
                                >
                                    Explore Now
                                </NavLink>
                            </div>
                        </div>
                    </div >
                </div>
                <img style={{marginTop: '20px'}} src={HeroImg}></img>
                <Stack spacing={10} mt={2} style={{ backgroundColor: "white" }}>
                    {/* Welcome Section */}

                    <Stack component="section" spacing={5}>
                        <Typography variant="h4" gutterBottom>
                            <span role="img" aria-label="Fiction Emoji">
                                📚
                            </span>{" "}
                            Fiction favourites
                        </Typography>
                        {isLoading.fiction && <CircularProgress />}
                        {!isLoading.fiction && (
                            <Grid container spacing={0}>
                                {Array.isArray(fictonBooks.data) &&
                                    fictonBooks.data.map((book, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={index}
                                            style={{
                                                padding: "10px",
                                                alignContent: "center",
                                            }}
                                        >
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    p: "20px",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {book.title}
                                                </Typography>

                                                <NavLink
                                                    to={`/book/${book.slug}`}
                                                >
                                                    <img
                                                        height={400}
                                                        width={180}
                                                        src={
                                                            imageFolder +
                                                            book.thumbnail
                                                        }
                                                        alt="bookImage"
                                                        style={{
                                                            display: "block",
                                                            margin: "auto",
                                                            marginTop: "15px",
                                                            marginBottom:
                                                                "15px",
                                                        }}
                                                    />
                                                </NavLink>
                                                <Typography variant="body2">
                                                    Author: {book.author}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Available: {book.stock}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                            </Grid>
                        )}
                    </Stack>
                    <Stack component="section" spacing={5}>
                        {/* Adventure Books Section */}
                        <img
                            src={adventureSectionImage}
                            alt="Adventure Section"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "20px",
                                marginBottom: "20px",
                            }}
                        />
                        <Typography variant="h4" gutterBottom>
                            <span role="img" aria-label="Adventure Emoji">
                                🚀
                            </span>{" "}
                            Adventure Escapes
                        </Typography>
                        {isLoading.adventure && <CircularProgress />}
                        {!isLoading.adventure && (
                            <Grid container spacing={0}>
                                {Array.isArray(adventureBooks.data) &&
                                    adventureBooks.data.map((book, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={index}
                                            style={{
                                                padding: "10px",
                                                alignContent: "center",
                                            }}
                                        >
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    p: "20px",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {book.title}
                                                </Typography>
                                                <NavLink
                                                    to={`/book/${book.slug}`}
                                                >
                                                    <img
                                                        height={400}
                                                        width={180}
                                                        src={
                                                            imageFolder +
                                                            book.thumbnail
                                                        }
                                                        alt="bookImage"
                                                        style={{
                                                            display: "block",
                                                            margin: "auto",
                                                            marginTop: "15px",
                                                            marginBottom:
                                                                "15px",
                                                        }}
                                                    />
                                                </NavLink>
                                                <Typography variant="body2">
                                                    Author: {book.author}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Available: {book.stock}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                            </Grid>
                        )}
                    </Stack>

                    <Stack component="section" spacing={5}>
                        {/* Fantasy Books Section */}
                        <img
                            src={fantasySectionImage}
                            alt="Fantasy Section"
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "20px",
                                marginBottom: "20px",
                            }}
                        />
                        <Typography variant="h4" gutterBottom>
                            <span role="img" aria-label="Fantasy Emoji">
                                🧙‍♂️
                            </span>{" "}
                            Fantasy favourites
                        </Typography>
                        {isLoading.fantasy && <CircularProgress />}
                        {!isLoading.fantasy && (
                            <Grid container spacing={0}>
                                {Array.isArray(fantasyBooks.data) &&
                                    fantasyBooks.data.map((book, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={index}
                                            style={{
                                                padding: "10px",
                                                alignContent: "center",
                                            }}
                                        >
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    p: "20px",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    {book.title}
                                                </Typography>
                                                <NavLink
                                                    to={`/book/${book.slug}`}
                                                >
                                                    <img
                                                        height={400}
                                                        width={180}
                                                        src={
                                                            imageFolder +
                                                            book.thumbnail
                                                        }
                                                        alt="bookImage"
                                                        style={{
                                                            display: "block",
                                                            margin: "auto",
                                                            marginTop: "15px",
                                                            marginBottom:
                                                                "15px",
                                                        }}
                                                    />
                                                </NavLink>
                                                <Typography variant="body2">
                                                    Author: {book.author}
                                                </Typography>
                                                <Typography variant="body2">
                                                    Available: {book.stock}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                            </Grid>
                        )}
                    </Stack>

                    <Box className="hero-container">
                        <img
                            src={HeroImg2}
                            style={{ width: "100%", height: "auto" }}
                        />
                        <Grid
                            container
                            className="hero-content"
                            spacing={0}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Stack alignItems="center" spacing={1}>
                                <NavLink
                                    asButton
                                    to="/explore"
                                    style={{
                                        backgroundColor: "#380980",
                                        color: "#fff",
                                        padding: "15px"
                                    }}
                                >
                                    Explore more books
                                </NavLink>
                            </Stack>
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
};

export default Home;
