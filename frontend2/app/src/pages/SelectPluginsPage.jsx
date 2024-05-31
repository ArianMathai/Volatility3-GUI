import React, {useEffect, useState} from "react";
import {SelectPlugins} from "../components/plugin/SelectPlugins";

const SelectPluginsPage = () => {

    return (
        <main className="flex justify-center">
            <div className="">
                <div className="m-5">

                </div>
                <div className="flex justify-center gap-20">
                    <div className="w-1/3">

                    </div>
                    <div className="w-1/3">

                    </div>
                </div>
                <div className="mt-10 mb-10">
                    <SelectPlugins/>
                </div>
            </div>
        </main>
    );
};

export default SelectPluginsPage;