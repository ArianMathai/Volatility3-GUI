import React from "react";
import {SelectPlugins} from "../components/plugin/SelectPlugins";
import SystemInfo from "../components/shared/SystemInfo";
import Logo from "../components/shared/Logo";

const SelectPluginsPage = () => {

    return (
        <main>
            <div>
                <Logo/>
            </div>
            <div>
                <h1 className="text-xl font-bold text-themeText-light">Select plugins</h1>
                <div>
                    <SystemInfo/>
                </div>
                <div>
                    <SelectPlugins/>
                </div>
            </div>
        </main>
    );
};

export default SelectPluginsPage;