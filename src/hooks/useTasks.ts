import { useState, useEffect } from "react";
import { AppData } from "../models/appData.model";

export const useTasks = () => {
    const [data, setData] = useState<AppData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    
    useEffect(() => {
      
    }, []);
  
    return { data, loading, error };
  };
  