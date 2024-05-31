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
            <div className="">
                <div className="m-5">

                </div>
                <div className="">
                    <SystemInfo/>
                </div>
                <div className="mt-10 mb-10">
                    <SelectPlugins/>
                </div>
            </div>
        </main>
    );
};

export default SelectPluginsPage;