
import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, onDateFilter, onTagFilter, onBlur, availableTags }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        onDateFilter(date);
    };

    const handleTagChange = (e) => {
        const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedTags(selectedTags);
        onTagFilter(selectedTags);
    };

    const clearTags = () => {
        // Clear selected tags
        setSelectedTags([]);
        // Trigger filter update with an empty array to show all postings
        onTagFilter([]);
    };

    return (
        <div>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search job postings"
                    value={searchQuery}
                    onChange={handleSearch}
                    onBlur={onBlur}
                />
                <input
                    className="date-input"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div className="tag-select">
                <select
                    className="tag-select"
                    value={selectedTags}
                    onChange={handleTagChange}
                    style={tagselect}
                >
                    <option value="">Filter by tag</option>
                    {availableTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
                <button onClick={clearTags} style={clearButtonStyle}>
                    Clear Tags filter
                </button>
            </div>
        </div>
    );
}

const tagselect = {
    margin: '20px',
    padding: '10px',
    backgroundColor: '#030303',
    borderRadius: '5px',
    marginLeft: '20%',
};

const clearButtonStyle = {
    marginLeft: '10px',
};

export default SearchBar;
