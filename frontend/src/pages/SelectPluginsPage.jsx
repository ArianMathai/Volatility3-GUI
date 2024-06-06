import React, {useState} from 'react';
import { SelectPlugins } from '../components/plugin/SelectPlugins';
import SystemInfo from '../components/shared/SystemInfo';
import Logo from '../components/shared/Logo';
import HomeButton from '../components/shared/HomeButton';
import Loader from '../components/shared/Loader';
import ProjectInfo from "../components/shared/ProjectInfo";

const SelectPluginsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <main className="overflow-clip">
            <div className="flex flex-row justify-between">
                <div>
                    <Logo />
                </div>
                <div>
                    <HomeButton />
                </div>
            </div>
            <div>
                <div className="m-5 ms-3">
                    <ProjectInfo/>
                </div>
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-3">
                        <div className="w-full ms-5 mt-3 rounded-r-lg mt-10">
                            <SystemInfo />
                        </div>
                    </div>
                    <div className="col-span-8 p-5">
                        <SelectPlugins setIsLoading={setIsLoading} />
                        <div className="flex justify-center">
                            <Loader isLoading={isLoading} />
                        </div>
                    </div>
                    <div className="col-span-1">
                        {/* Placeholder div for å skape plass */}
                    </div>
                </div>
                <div>
                    {error?`<span>${error}</span>`: ""}
                </div>
            </div>
        </main>
    );
};

export default SelectPluginsPage;
