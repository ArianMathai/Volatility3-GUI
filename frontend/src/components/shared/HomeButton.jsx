import {useLocation, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

const HomeButton = () => {
    const { setStep1Completed, setStep2Completed, setPlugins, setHeaders } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const returnHome = async () => {

        if (location.pathname === "/pluginlibrary" || location.pathname === "/uploadfile") {
            setStep1Completed(false);
            setStep2Completed(false);
            navigate("/");
            return;
        }

        if (location.pathname === "/") {
            return;
        }

        const response = await window.electronAPI.showDialog({
            type: 'warning',
            buttons: ['Cancel', 'Yes'],
            defaultId: 0,
            title: 'Confirm',
            message: 'All progress will be lost. Do you want to continue?',
        });

        if (response === 1) {
            setStep1Completed(false);
            setStep2Completed(false);
            setPlugins([])
            navigate("/");
        }
    };

    return (
        <>
            <img
                className="m-3 w-1/2 mb-10 cursor-pointer"
                onClick={returnHome}
                src="../public/img/homeicon.png"
                alt="Home"
            />
        </>
    );
};

export default HomeButton;