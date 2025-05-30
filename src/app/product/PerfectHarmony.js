import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { packageIcon } from "../../resources/js/icons";
import { PerfectHarmonyBg } from "../../resources/js/images";
const PerfectHarmony = () => {
    return (
        <Box
            sx={{ padding: 8, textAlign: "center", backgroundColor: "#F2F5FF" }}
        >
            <Container>
                <Box
                    display={"flex"}
                    gap={"4rem"}
                    justifyContent={{ sm: "center", lg: "space-between" }}
                    alignItems={"center"}
                    flexWrap={{ xs: "wrap", lg: "nowrap" }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            component="h1"
                            gutterBottom
                            textAlign={"left"}
                            fontWeight={"600"}
                        >
                            Perfect Harmony: Comfort & Style
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                            color="#666666"
                            textAlign={"center"}
                        >
                            Explore furniture that harmoniously combines comfort
                            and style to elevate your home
                        </Typography>
                        <Box
                            display={"flex"}
                            flexDirection={{ xs: "column", md: "row" }}
                            alignItems={"center"}
                            flexWrap={"wrap"}
                            justifyItems={"center"}
                            marginTop={3}
                            textAlign={"center"}
                        >
                            <Button
                                variant="outlined"
                                color="black"
                                sx={{
                                    marginRight: 1,
                                    textWrap: "nowrap",
                                    borderRadius: "25px",
                                }}
                            >
                                Explore Our Offers
                            </Button>

                            <Button
                                variant="text"
                                color="black"
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "25px",
                                    paddingX: "0.5rem",
                                    paddingY: "0.5rem",
                                    marginRight: "0.5rem",
                                    boxShadow: 3,
                                }}
                            >
                                <PlayArrowIcon />
                            </Button>
                            <Typography
                                variant="body2"
                                sx={{ textWrap: "nowrap" }}
                                gutterBottom
                            >
                                Watch Video
                            </Typography>
                        </Box>
                    </Box>

                    <img
                        src={PerfectHarmonyBg}
                        alt="Comfortable furniture"
                        width={"55%"}
                    />
                </Box>

                <Box
                    sx={{
                        marginTop: 4,
                        display: {
                            xs: "none",
                            sm: "none",
                            md: "none",
                            lg: "flex",
                        },
                        alignItems: "center",
                        backgroundColor: "white",
                        paddingY: 2,
                        paddingLeft: 5,
                        borderRadius: 8,
                        width: { md: "80%", lg: "70%" },
                        position: "relative",
                        top: -45,
                        boxShadow: 3,
                    }}
                >
                    <Box sx={{ marginRight: 3 }}>
                        <Typography
                            variant="body2"
                            color="#909090"
                            fontWeight={"600"}
                            textAlign={"left"}
                        >
                            Comfort
                        </Typography>
                        <Typography
                            variant="body2"
                            display={"flex"}
                            alignItems={"center"}
                            color="#999999"
                            gap={0.5}
                        >
                            <SelfImprovementIcon color="warning" /> Cozy Seating
                        </Typography>
                    </Box>
                    <Box sx={{ marginRight: 3 }}>
                        <Typography
                            variant="body2"
                            color="#909090"
                            fontWeight={"600"}
                            textAlign={"left"}
                        >
                            Quality Assurance
                        </Typography>
                        <Typography
                            variant="body2"
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                            color="#999999"
                        >
                            <ThumbUpOffAltIcon color="warning" /> Cozy Seating
                        </Typography>
                    </Box>
                    <Box sx={{ marginRight: 3 }}>
                        <Typography
                            variant="body2"
                            color="#909090"
                            fontWeight={"600"}
                            textAlign={"left"}
                        >
                            Free Shipping
                        </Typography>
                        <Typography
                            variant="body2"
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                            marginTop={0.5}
                            color="#999999"
                        >
                            <img src={packageIcon} alt="pkg" color="warning" />{" "}
                            No-Cost Delivery
                        </Typography>
                    </Box>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ margin: "0 20px" }}
                    />
                    <Box sx={{ marginRight: 3 }}>
                        <Typography
                            variant="body2"
                            color="#909090"
                            fontWeight={"600"}
                            textAlign={"left"}
                        >
                            Secure Checkout
                        </Typography>
                        <Typography
                            variant="body2"
                            display={"flex"}
                            alignItems={"center"}
                            gap={0.5}
                            marginTop={0.5}
                            color="#999999"
                        >
                            <VerifiedOutlinedIcon color="warning" /> Secure
                            Payments
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="black"
                        sx={{
                            marginRight: 1,

                            textWrap: "nowrap",
                            borderRadius: "25px",
                        }}
                    >
                        See More
                    </Button>
                </Box>

                <Box sx={{ marginTop: 4 }}>
                    <Grid container spacing={2} justifyContent="center">
                        {[
                            "Lowe's",
                            "DeWalt",
                            "Home Depot",
                            "IKEA",
                            "Makita",
                            "3M",
                        ].map((brand) => (
                            <Grid item key={brand}>
                                <Typography
                                    variant="h5"
                                    color="#313131"
                                    fontWeight={"600"}
                                >
                                    {brand}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default PerfectHarmony;
