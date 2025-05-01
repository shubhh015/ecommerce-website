import { Chip } from "@mui/material";
import React from "react";

const tags = [
    { label: "Best Seller" },
    { label: "Chair" },
    { label: "Table" },
    { label: "Bed" },
    { label: "Closet" },
];

const TagList = ({ selectedTag, onTagSelect }) => {
    return (
        <div style={{ marginBottom: 16 }}>
            {tags.map((tag, index) => {
                const isSelected = selectedTag === tag.label;
                return (
                    <Chip
                        key={index}
                        label={tag.label}
                        variant={isSelected ? "outlined" : "filled"}
                        color={isSelected ? "primary" : "default"}
                        onClick={() => onTagSelect(tag.label)}
                        style={{
                            marginRight: 8,
                            marginBottom: 8,
                            cursor: "pointer",
                        }}
                    />
                );
            })}
        </div>
    );
};

export default TagList;
