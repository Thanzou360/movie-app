import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";


function useFetchData(apiEndpoint){
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initiaload, setInitiaload] = useState(true);


    useEffect(() => {
        if (initiaload) {
            setInitiaload(false);
            setLoading(false);
            return;
        }

        setLoading(true);

        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false);
            } catch (error) {
                console.error("error fetching movie data:", error);
                setLoading(false);
            }
        };

        if (apiEndpoint) {
            fetchAllData();
        }

    }, [initiaload, apiEndpoint]);

    return {alldata, loading};
}

export default useFetchData;