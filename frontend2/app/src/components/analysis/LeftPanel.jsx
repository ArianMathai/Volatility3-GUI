import { useState } from "react";

const LeftPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setIsOpen(false)
        }
    };

    return (
        <div className="relative h-full">

            <div
                className={`absolute top-0 left-0 h-full transition-transform duration-300 ${
                    isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
                }`}
                style={{width: '250px', zIndex: 40}}
            >
                <div className="mt-5 p-4 h-full bg-themeBlue-default">
                    <h2 className="text-lg font-bold">Menu</h2>
                    <ul>
                        <li className="py-2">Item 1</li>
                        <li className="py-2">Item 2</li>
                        <li className="py-2">Item 3</li>
                    </ul>
                </div>
            </div>
            <img
                src="../public/img/arrow.png"
                alt="arrow"
                onClick={toggleMenu}
                className="text-white relative rounded z-50"
            />
        </div>
    );
};

export default LeftPanel;
