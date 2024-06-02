import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/Context";
import '../../css/AnalysisLayout.css'; // Import custom CSS

export const AnalysisLayout = () => {

    const {plugins} = useAppContext();

    const { processList } = useAppContext();
    const [navItems, setNavItems] = useState([]);
    const navigate = useNavigate();
    const currentLocation = useLocation();

    useEffect(() => {
        if(plugins){
            setNavItems(plugins);
        }
    }, [plugins]);

    useEffect(() => {
        console.log("processList:");
        console.log(processList);

        // Update navItems based on processList or any other logic
    }, [processList]);

    return (
        <div className="p-4">
            <div className="flex space-x-2 bg-gray-200 p-2 rounded-t-md shadow-md">
                {navItems.map((item, index) => {
                    const isActive = currentLocation.pathname.includes(item);
                    return (
                        <div
                            key={index}
                            className={`tab-item relative px-4 py-2 cursor-pointer transition-all ${
                                isActive ? 'active-tab text-black shadow-md' : 'inactive-tab text-gray-700'
                            }`}
                            onClick={() => navigate(`/analysis/${item}`)}
                        >
                            <span className="relative z-10">{item}</span>
                        </div>
                    );
                })}
            </div>
            <div className="p-4 bg-white shadow-md rounded-b-md">
                <Outlet />
            </div>
        </div>
    );
};
