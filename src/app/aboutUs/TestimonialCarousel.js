import {
    Avatar,
    Box,
    Card,
    CardContent,
    Container,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { person1, person2 } from "../../resources/js/icons";

const testimonials = [
    {
        name: "Michael Roberts",
        comment:
            "I recently purchased a beautiful dining table that has transformed our dining area. The craftsmanship and attention to detail are remarkable.",
        rating: 5,
        image: person1,
    },
    {
        name: "Marta Brown",
        comment:
            "My experience has been consistently outstanding. I have furnished my entire home with their products, and it has exceeded my expectations.",
        rating: 5,
        image: person2,
    },
    {
        name: "Michael Roberts",
        comment:
            "I recently purchased a beautiful dining table that has transformed our dining area. The craftsmanship and attention to detail are remarkable.",
        rating: 5,
        image: person1,
    },
    {
        name: "Marta Brown",
        comment:
            "My experience has been consistently outstanding. I have furnished my entire home with their products, and it has exceeded my expectations.",
        rating: 5,
        image: person2,
    },
];

const TestimonialCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <Box sx={{ backgroundColor: "#F2F5FF" }}>
            <Container>
                <Box sx={{ padding: 4, textAlign: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body2"
                            bgcolor={"#ffff"}
                            fontWeight={"600"}
                            padding={1}
                            borderRadius={4}
                            marginBottom={2}
                            gutterBottom
                        >
                            Testimonial Section
                        </Typography>
                    </Box>
                    <Typography variant="h4" gutterBottom fontWeight={"600"}>
                        What Our Customers Say
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Discover the Stories and Experiences of Our Delighted
                        Customers
                    </Typography>
                    <Carousel
                        selectedItem={currentSlide}
                        onChange={setCurrentSlide}
                        showArrows={false}
                        showStatus={false}
                        showThumbs={true}
                        showIndicators={true}
                        autoPlay={true}
                        infiniteLoop={true}
                        interval={3000}
                        stopOnHover={true}
                        transitionTime={500}
                        swipeable={true}
                        centerMode={true}
                        centerSlidePercentage={50}
                        preventMovementUntilSwipeScrollTolerance={true}
                        swipeScrollTolerance={50}
                        emulateTouch={true}
                    >
                        {testimonials.map((testimonial, index) => (
                            <Card
                                key={index}
                                sx={{
                                    margin: "20px",
                                    padding: "20px",
                                    marginY: "5rem",
                                }}
                            >
                                <CardContent>
                                    <Avatar
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            margin: "auto",
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        sx={{ marginTop: 2 }}
                                    >
                                        “{testimonial.comment}”
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{ marginTop: 2 }}
                                    >
                                        {testimonial.name}
                                    </Typography>
                                    <Typography variant="body2" color="warning">
                                        {"★".repeat(testimonial.rating)}{" "}
                                        {"☆".repeat(5 - testimonial.rating)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </Box>
    );
};

export default TestimonialCarousel;
