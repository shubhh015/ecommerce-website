import { Box, Typography } from "@mui/material";
import React from "react";

const Hero = ({ content, url, align, type, containerClass }) => {
    return (
        <Box className={`${containerClass}`}>
            <Box
                sx={{
                    bgcolor: "white",
                    position: "relative",
                    height: { xs: "593px", sm: "593px", xl: "593px" },
                }}
            >
                {type === "video"
                    ? url && (
                          <video
                              src={url}
                              style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                  zIndex: 1,
                              }}
                              autoPlay
                              loop
                              muted
                          ></video>
                      )
                    : url && (
                          <img
                              src={url}
                              alt="hero"
                              style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  height: "100%",
                                  width: "100%",
                                  objectFit: "cover",
                                  zIndex: 1,
                              }}
                          />
                      )}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: align || "center",
                        alignItems: align ? align.split("-")[1] : "center",

                        zIndex: 3,
                    }}
                >
                    <Typography variant="h6" component="div">
                        {content}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
