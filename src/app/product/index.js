import React from "react";
import {
    bed,
    desk,
    nightStand,
    Sofa,
    Sofa1,
    TableImg,
} from "../../resources/js/images";
import ElevateYourMood from "./ElevateYourMood";
import ElevateYourSpace from "./ElevateYourSpace";
import Options from "./Options";
import PerfectHarmony from "./PerfectHarmony";
import Products from "./Products";

const ProductPage = () => {
    const furnitureItems = [
        {
            title: "Dining Tables",
            imageUrl: TableImg,
            link: "#",
        },
        {
            title: "Chairs",
            imageUrl: Sofa,
            link: "#",
        },
        {
            title: "Office Desks",
            imageUrl: desk,
            link: "#",
        },
    ];

    const products = [
        {
            id: 1,
            title: "Sofa",
            imageUrl: Sofa1,
            link: "#",
        },
        {
            id: 2,
            title: "Nightstand",
            imageUrl: nightStand,
            link: "#",
        },
        {
            id: 3,
            title: "Bedroom",
            imageUrl: bed,
            link: "#",
        },
    ];
    return (
        <div>
            <PerfectHarmony />
            <Options furnitureItems={furnitureItems} />
            <Products />
            <ElevateYourSpace />
            <Options furnitureItems={products} />
            <ElevateYourMood />
        </div>
    );
};

export default ProductPage;
