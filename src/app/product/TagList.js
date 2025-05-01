// TagList.js
import { Chip } from "@mui/material";
import React from "react";

const tags = [
    { label: "Best Seller", variant: "outlined" },
    { label: "Chair" },
    { label: "Table" },
    { label: "Bed" },
    { label: "Closet" },
];

const TagList = () => {
    const handleTagClick = (tag) => {
        console.log(`You clicked on: ${tag}`);
    };

    return (
        <div style={{ marginBottom: 16 }}>
            {tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag.label}
                    variant={tag.variant || "filled"}
                    onClick={() => handleTagClick(tag.label)}
                    style={{ marginRight: 8, marginBottom: 8 }} // Spacing between tags
                />
            ))}
        </div>
    );
};

export default TagList;
