import { Divider, Typography } from "@mui/material";
import React from "react";
import {
    bedroom,
    dining,
    heroHome,
    Inspiration1,
    Inspiration2,
    Inspiration3,
    living,
    PurchaseSecurely,
    Room,
    Warehouse,
} from "../../resources/js/images";
import BeautifyYourSpace from "./BeautifyYourSpace";
import Features from "./Features";
import Hero from "./Hero";
import InspirationCollection from "./InspirationCollection";
import MailingListForm from "./MailingListForm";
import NewCollectionSection from "./NewCollectionSection";

const Home = () => {
    const Inspiration = [
        {
            img: Inspiration1,
            alt: "Inspiration 1",
        },
        {
            img: Inspiration2,
            alt: "Inspiration 2",
        },
        {
            img: Inspiration3,
            alt: "Inspiration 3",
        },
    ];
    const Range = [
        {
            img: dining,
            alt: "Dining",
            desc: (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ my: 2 }}
                    fontWeight={"600"}
                >
                    Dining
                </Typography>
            ),
        },
        {
            img: living,
            alt: "Living",
            desc: (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ my: 2 }}
                    fontWeight={"600"}
                >
                    Living
                </Typography>
            ),
        },
        {
            img: bedroom,
            alt: "Bedroom",
            desc: (
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ my: 2 }}
                    fontWeight={"600"}
                >
                    Bedroom
                </Typography>
            ),
        },
    ];

    const Steps = [
        {
            img: PurchaseSecurely,
            alt: "purchase",
            desc: (
                <>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ my: 2 }}
                        fontWeight={"600"}
                    >
                        Purchase Securely
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        textAlign={"center"}
                        sx={{ my: 0.5, ml: 5, width: { md: "80%" } }}
                        color="#666666"
                        lineHeight={"18px"}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </>
            ),
        },
        {
            img: Warehouse,
            alt: "warehouse",
            desc: (
                <>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ my: 2 }}
                        fontWeight={"600"}
                    >
                        Ships From Warehouse
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        textAlign={"center"}
                        sx={{ my: 0.5, ml: 5, width: { md: "80%" } }}
                        color="#666666"
                        lineHeight={"18px"}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </>
            ),
        },
        {
            img: Room,
            alt: "Room",
            desc: (
                <>
                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ my: 2 }}
                        fontWeight={"600"}
                    >
                        Style Your Room
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        textAlign={"center"}
                        sx={{ my: 0.5, ml: 5, width: { md: "80%" } }}
                        color="#666666"
                        lineHeight={"18px"}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </>
            ),
        },
    ];
    return (
        <div>
            <Hero
                content={<NewCollectionSection />}
                url={heroHome}
                type={"img"}
                align={"end"}
            />
            <Features />
            <InspirationCollection
                title="Inspiration Collection"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                items={Inspiration}
            />
            <BeautifyYourSpace />
            <InspirationCollection
                title="Browse The Range"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                items={Range}
            />
            <Divider />
            <InspirationCollection
                title="How It Works"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                items={Steps}
            />
            <MailingListForm />
        </div>
    );
};

export default Home;
