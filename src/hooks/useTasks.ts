import { useState, useEffect } from "react";
import { AppData } from "../models/appData.model";
import { TASK_URL } from "../urls";
import axios from "axios";

export const useTasks = () => {
    const [data, setData] = useState<AppData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    
    useEffect(() => {
      axios.get(TASK_URL).then((response) => console.log(response)).catch((error) => console.log(error));
    }, []);
  
    return { data, loading, error };
  };
  