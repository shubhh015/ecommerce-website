import React from "react";
import { heroHome } from "../../resources/js/images";
import Features from "./Features";
import Hero from "./Hero";
import InspirationCollection from "./InspirationCollection";
import NewCollectionSection from "./NewCollectionSection";

const Home = () => {
    return (
        <div>
            <Hero
                content={<NewCollectionSection />}
                url={heroHome}
                type={"img"}
                align={"end"}
            />
            <Features />
            <InspirationCollection />
        </div>
    );
};

export default Home;
