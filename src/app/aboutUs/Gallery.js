import {
    Box,
    Card,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import {
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
} from "../../resources/js/images";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Gallery = () => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1, padding: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        bgcolor={"#F2F5FF"}
                        fontWeight={"600"}
                        padding={1}
                        borderRadius={4}
                        marginBottom={2}
                        gutterBottom
                    >
                        Check Our Collection
                    </Typography>
                </Box>
                <Typography
                    variant="h4"
                    fontWeight={"600"}
                    align="center"
                    gutterBottom
                    textAlign={"center"}
                >
                    Our Furniture Gallery
                </Typography>
                <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    textAlign={"center"}
                    marginY={2}
                >
                    Explore Our Gallery of Inspiring Designs
                </Typography>
                <Grid container spacing={2}>
                    {images.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    alt={`Gallery image ${index + 1}`}
                                    image={image}
                                    height="200"
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Gallery;
