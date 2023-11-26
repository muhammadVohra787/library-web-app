import { Box, Link, Stack, Typography } from "@mui/material";
import { NavBar } from "./NavBar";
import EtherealLogo from "@/assets/ethereal_logo_with_text.png";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <Stack direction="row" spacing={10} p={2} mb={10} alignItems="end">
            <Box width={200}>
                {/* Visually hidden header for screen readers */}
                <Box
                    component={location.pathname === "/" ? "h1" : "span"}
                    className="visuallyhidden"
                >
                    Ethereral
                </Box>
                <a href="/">
                    <img src={EtherealLogo} alt="Ethereral" />
                </a>
            </Box>
            <Stack direction="row" pb={1} flexGrow="1">
                <NavBar />
            </Stack>
        </Stack>
    );
}
