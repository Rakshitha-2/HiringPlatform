import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
        filterType: "Technology",
        array: ["React.js", "Java", "DevOps", "Swift", "Flutter", "AWS"],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: [],
        Industry: [],
        Technology: [],
    });

    const dispatch = useDispatch();

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => {
            const currentSelections = prevFilters[filterType];
            const newSelections = currentSelections.includes(value)
                ? currentSelections.filter((item) => item !== value)
                : [...currentSelections, value];

            return {
                ...prevFilters,
                [filterType]: newSelections,
            };
        });
    };

    useEffect(() => {
        const searchQuery = Object.values(selectedFilters)
            .flat()
            .join(' ')
            .trim();
        dispatch(setSearchedQuery(searchQuery));
    }, [selectedFilters, dispatch]);

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-r from-[#00040A] to-[#001636]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="bg-[#0f172a] rounded-lg shadow-md p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-2xl font-bold text-blue-400 mb-6">Filter Jobs</h1>
                    {filterData.map((data, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-lg font-semibold text-white mb-2">{data.filterType}</h2>
                            <div className="flex flex-wrap gap-4">
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    const isChecked = selectedFilters[data.filterType].includes(item);

                                    return (
                                        <div key={itemId} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={itemId}
                                                checked={isChecked}
                                                onChange={() => handleFilterChange(data.filterType, item)}
                                                className="accent-blue-500 w-4 h-4"
                                            />
                                            <label htmlFor={itemId} className="text-gray-300">{item}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default FilterCard;