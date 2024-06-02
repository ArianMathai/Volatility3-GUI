import React, { useState } from 'react';
import { SelectPlugins } from '../components/plugin/SelectPlugins';
import SystemInfo from '../components/shared/SystemInfo';
import Logo from '../components/shared/Logo';
import HomeButton from '../components/shared/HomeButton';
import Loader from '../components/Loader';

const SelectPluginsPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main>
            <div className="flex flex-row justify-between">
                <div>
                    <Logo />
                </div>
                <div>
                    <HomeButton />
                </div>
            </div>
            <div>
                <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-1">
                        <SystemInfo />
                    </div>
                    <div className="col-span-4">
                        <h1 className="text-xl text-center font-bold text-themeText-light">Select plugins</h1>
                        <SelectPlugins setIsLoading={setIsLoading} />
                    </div>
                    <div className="col-span-1">
                        {/* Placeholder div for å skape plass */}
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <Loader isLoading={isLoading} />
                </div>
            </div>
        </main>
    );
};

export default SelectPluginsPage;
