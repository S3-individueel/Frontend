import axios from "axios";

export default axios.create({
    baseURL: "https://volksmondapi-app-20230601005726.delightfulpond-1e26431f.northeurope.azurecontainerapps.io/api",
    headers: {
        "Content-type": "application/json"
    }
});