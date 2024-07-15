import { useState, useEffect } from "react";
import { List } from "../models/list.model";
import { LIST_URL } from "../urls";
import axios from "axios";

export const useLists = () => {
    const [lists, setLists] = useState<List[]>();

    useEffect(() => {
        axios.get(LIST_URL).then((response) => setLists(response.data)).catch((error) => console.log(error));
    }, []);
    
    return { lists };
};
