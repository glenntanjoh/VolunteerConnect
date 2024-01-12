

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext.jsx";
import axios from "axios";
import SearchBar from "./SearchBar";
import "./Postings.css";

function Postings() {
    const { user } = useContext(UserContext);
    const [allPostings, setAllPostings] = useState([]);
    const [filteredPostings, setFilteredPostings] = useState([]);
    const [selectedDateFilter, setSelectedDateFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]); // New state for available tags

    useEffect(() => {
        if (user) {
            axios.get("/postings").then((response) => {
                // Filter postings based on the date not being past
                const filteredPostings = response.data.filter(posting => {
                    const postingDate = new Date(posting.date);
                    const currentDate = new Date();
                    console.log(postingDate)
                    return postingDate >= currentDate;
                });

                setAllPostings(filteredPostings);

                console.log(filteredPostings);

                const tags = extractAvailableTags(filteredPostings);
                setAvailableTags(tags);
            });
        }
    }, [user]);

    useEffect(() => {
        const filteredByName = allPostings.filter((posting) => {
            const title = posting.title.toLowerCase();
            const description = posting.description.toLowerCase();
            return (
                title.includes(searchQuery.toLowerCase()) ||
                description.includes(searchQuery.toLowerCase())
            );
        });

        const filteredByDate = selectedDateFilter
            ? allPostings.filter((posting) => {
                const postingDate = new Date(posting.date);
                const selectedDate = new Date(selectedDateFilter);
                return (
                    postingDate.toDateString() === selectedDate.toDateString()
                );
            })
            : allPostings;

        const filteredByTags = selectedTags.length > 0
            ? allPostings.filter((posting) =>
                posting.tags.some((tag) => selectedTags.includes(tag))
            )
            : allPostings;

        const combinedFilter = (filteredByName, filteredByDate, filteredByTags) => {
            const filteredSet = new Set(filteredByName);
            return filteredByDate.filter(
                (posting) => filteredSet.has(posting) && filteredByTags.includes(posting)
            );
        };

        setFilteredPostings(combinedFilter(filteredByName, filteredByDate, filteredByTags));
    }, [selectedDateFilter, searchQuery, selectedTags, allPostings]);

    return (
        <div>
            <div>
                <div>
                    <SearchBar
                        onSearch={setSearchQuery}
                        onDateFilter={setSelectedDateFilter}
                        onTagFilter={setSelectedTags}
                        availableTags={availableTags}
                    />
                </div>
            </div>
            <div className="postings-container">
                <div className="search-results">
                    {filteredPostings.length === 0 ? (
                        <p className={"no-post"}>no postings available</p>
                    ) : (
                        filteredPostings.map((posting, index) => (
                            <div className="posting" key={index}>
                                <Link
                                    to={`/post/${posting.title}`}
                                    state={posting}
                                >
                                    <button className="Postbutton">
                                        {posting.title}
                                        <br />
                                        <p></p>
                                        <br />
                                        {posting.description}
                                    </button>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Postings;

// Helper function to extract available tags from posts
const extractAvailableTags = (posts) => {
    const allTags = posts.reduce((tags, post) => {
        return tags.concat(post.tags);
    }, []);

    // Use Set to remove duplicates, and then convert back to an array
    return Array.from(new Set(allTags));
};
