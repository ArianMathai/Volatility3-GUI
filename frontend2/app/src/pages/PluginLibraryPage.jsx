import React from "react";
import Logo from "../components/shared/Logo";
import HomeButton from "../components/shared/HomeButton";
import PluginList from "../components/library/PluginList";

const PluginLibraryPage = () => {

    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
                    <Logo/>
                </div>
                <div>
                    <HomeButton/>
                </div>
            </div>
            <PluginList/>
        </>
    );
};

export default PluginLibraryPage;
