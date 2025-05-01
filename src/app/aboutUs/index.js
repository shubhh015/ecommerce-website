import React from "react";
import DedicationSection from "./DedicationSection";
import Gallery from "./Gallery";
import TestimonialCarousel from "./TestimonialCarousel";

const AboutUs = () => {
    return (
        <div>
            <Gallery />
            <TestimonialCarousel />
            <DedicationSection />
        </div>
    );
};

export default AboutUs;
