import {useNavigate} from "react-router-dom";

const HomeButton = () => {

    const navigate = useNavigate()

    const returnHome = () => {
        navigate("/")
    }

    return (
        <>
            <img className="m-5 mb-10 cursor-pointer" onClick={returnHome} src="../public/img/homeicon.png"/>
        </>
    )
}

export default HomeButton;