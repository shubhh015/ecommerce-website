import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const MailingListForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email submitted:", email);
        setEmail("");
    };

    return (
        <Box sx={{ backgroundColor: "#F2F5FF" }}>
            <Container>
                <Box
                    sx={{
                        textAlign: "center",
                        padding: { xs: "3rem", sm: "5rem", md: "10rem" },
                    }}
                >
                    <Typography variant="h4" gutterBottom fontWeight={"600"}>
                        Join Our Mailing List
                    </Typography>
                    <Typography variant="body1" gutterBottom color="#666666">
                        Sign up to receive inspiration, product updates, and
                        special offers from our team.
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ marginTop: "3rem" }}>
                        <Box
                            display={"flex"}
                            gap={{ xs: "1rem", md: "0" }}
                            justifyContent={"center"}
                            flexWrap={{ xs: "wrap", md: "nowrap" }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email Address"
                                value={email}
                                sx={{
                                    borderBottomRightRadius: "0",
                                    borderTopRightRadius: "0",
                                }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: "40%",
                                    borderBottomLeftRadius: "0",
                                    borderTopLeftRadius: "0",
                                    backgroundColor: "#054C73",
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default MailingListForm;
