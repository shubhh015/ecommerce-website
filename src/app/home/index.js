import React from "react";
import {
    bedroom,
    dining,
    heroHome,
    Inspiration1,
    Inspiration2,
    Inspiration3,
    living,
} from "../../resources/js/images";
import BeautifyYourSpace from "./BeautifyYourSpace";
import Features from "./Features";
import Hero from "./Hero";
import InspirationCollection from "./InspirationCollection";
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
            desc: "Dining",
        },
        {
            img: living,
            alt: "Living",
            desc: "Living",
        },
        {
            img: bedroom,
            alt: "Bedroom",
            desc: "Bedroom",
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
            <InspirationCollection
                title="How It Works"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                items={Range}
            />
        </div>
    );
};

export default Home;
