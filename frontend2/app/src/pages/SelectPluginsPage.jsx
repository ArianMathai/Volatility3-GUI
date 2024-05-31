import React from "react";
import {SelectPlugins} from "../components/plugin/SelectPlugins";
import SystemInfo from "../components/shared/SystemInfo";
import Logo from "../components/shared/Logo";
import HomeButton from "../components/shared/HomeButton";

const SelectPluginsPage = () => {

    return (
        <main>
            <div className="flex flex-row justify-between">
                <div>
                    <Logo/>
                </div>
                <div>
                    <HomeButton/>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-1">
                        <SystemInfo/>
                    </div>
                    <div className="col-span-4">
                        <h1 className="text-xl font-bold text-themeText-light">Select plugins</h1>
                        <SelectPlugins/>
                    </div>
                    <div className="col-span-1">
                        {/*Placeholder div for å skape plass*/}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SelectPluginsPage;