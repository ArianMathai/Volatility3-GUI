import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAppContext} from "../../context/Context";
import axios from "axios";

const PluginList = () => {
    const [selectedPlugin, setSelectedPlugin] = useState("")
    const { osName, filePath, setProcessList } = useAppContext()
    const navigate = useNavigate()

    const handlePluginChange = (event) => {
        setSelectedPlugin(event.target.value)
    }

    const handleRunClick = async () => {
        try {
            const response = await window.electronAPI.fetchSystemInfo(filePath, osName, selectedPlugin);
            setProcessList(response)
            console.log("plugin output: ", response)
        } catch (error) {
            console.log("Error running plugin ", error)
        }
        navigate("/analysis")
    }

    return (
        <>
            <label htmlFor="PsListCheck">
                <input onChange={handlePluginChange} type="checkbox" id="PsListCheck"/>
                PsList
            </label>
            <button onClick={handleRunClick}>Run</button>
        </>
    )
}

export default PluginList;