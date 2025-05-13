import CheckIcon from "@mui/icons-material/Check";
import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from "@mui/material";
import { space } from "../../resources/js/images";

const ElevateYourSpace = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F2F5FF",
                padding: 5,
            }}
        >
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h4"
                            component="h1"
                            fontWeight={"600"}
                            gutterBottom
                        >
                            Elevate Your Space with Uncompromising Quality
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Experience the epitome of furniture quality. Our
                            products are meticulously crafted with an unwavering
                            commitment to excellence. From the finest materials
                            to expert craftsmanship, each piece embodies
                            durability, comfort, and timeless style. Elevate
                            your space with the assurance of exceptional quality
                            and lasting beauty.
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon color="primary" />
                                </ListItemIcon>
                                <Typography variant="body1">
                                    Experience Unparalleled Quality
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon color="primary" />
                                </ListItemIcon>
                                <Typography variant="body1">
                                    Built to Last for Generations
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon color="primary" />
                                </ListItemIcon>
                                <Typography variant="body1">
                                    Loved by Customers Worldwide
                                </Typography>
                            </ListItem>
                        </List>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                marginTop: 3,
                                borderRadius: "3rem",
                                backgroundColor: "#054C73",
                            }}
                        >
                            Shop Now
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={6} container justifyContent="center">
                        <Box
                            component="img"
                            src={space}
                            alt="Furniture"
                            sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: 2,
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ElevateYourSpace;
