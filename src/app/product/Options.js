import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const Options = ({ furnitureItems }) => {
    return (
        <Container sx={{ marginY: 3 }}>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"stretch"}
                gap={3}
            >
                {furnitureItems.map((item, index) => (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2rem",
                        }}
                        key={index}
                        bgcolor={"#F2F5FF"}
                        borderRadius={3}
                        padding={3}
                    >
                        <Box>
                            <Typography
                                gutterBottom
                                variant="body1"
                                component="div"
                                textAlign={"center"}
                                fontWeight={"600"}
                                marginBottom={1}
                                sx={{ textWrap: { md: "nowrap" } }}
                            >
                                {item.title}
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    bgcolor: "white",
                                    color: "black",
                                    fontSize: "14px",
                                    textWrap: { md: "nowrap" },
                                    borderRadius: 4,
                                    boxShadow: "none",
                                }}
                                href={item.link}
                            >
                                See More
                            </Button>
                        </Box>
                        <Box>
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                width={"80%"}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Options;
