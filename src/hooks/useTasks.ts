import { useState, useEffect } from "react";

export const useTasks = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    
    useEffect(() => {
      
    }, []);
  
    return { data, loading, error };
  };
  