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
import Avatar from "@mui/material/Avatar";
import { comfort } from "../../resources/js/images";

const ElevateYourMood = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{ padding: 4, display: "flex", alignItems: "center" }}
        >
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} container justifyContent="center">
                    <Box
                        component="img"
                        src={comfort}
                        alt="Comfortable furniture"
                        sx={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 2,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight={"600"}
                        gutterBottom
                    >
                        Elevate Your Mood with Comfortable Furniture
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Your surroundings have a profound impact on your mood.
                        Discover how our high-quality furniture can transform
                        your space into a haven of comfort and happiness. Create
                        an environment that nurtures your well-being and
                        elevates your spirits with the perfect blend of style
                        and coziness.
                    </Typography>

                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon color="primary" />
                            </ListItemIcon>
                            <Typography variant="body1">
                                Unmatched Comfort
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon color="primary" />
                            </ListItemIcon>
                            <Typography variant="body1">
                                Crafted for Quality
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon color="primary" />
                            </ListItemIcon>
                            <Typography variant="body1">
                                Stylish Elegance
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

                    <Box
                        sx={{
                            marginTop: 4,
                            padding: 2,
                            border: "1px solid #ddd",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="body2">
                            We guarantee your comfort
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 1,
                            }}
                        >
                            <Avatar
                                alt="Victor Adams"
                                src="your-avatar-url.jpg"
                            />{" "}
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                Victor Adams <br />
                                Interior Design and Styling
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ElevateYourMood;
