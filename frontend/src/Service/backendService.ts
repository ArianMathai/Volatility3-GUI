import axios from "axios";

const backendService = (() => {
    const detectOsController = "http://127.0.0.1:8000/api/detectos"

    const getOs = async (filepath: string) => {
        try {
            const result = await axios.post(
                detectOsController,
                { filepath },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (result.status !== 200) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }
            return result.data[0].os;

        } catch (error){
            console.log("Error fetching OS" + error)
        }
    }
    return {
        getOs,
    };
})();
export default backendService;
