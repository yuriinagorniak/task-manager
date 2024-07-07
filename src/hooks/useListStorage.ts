import { useLocalStorage } from "./useStorage";
import { List } from "../models/list.model";

export const useListStorage = () => {
    const { getFromStorage, setToStorage } = useLocalStorage();

    return {
        getListFromStorage: (): List[] | undefined => {
            const list = getFromStorage("LISTS");
            return list ? JSON.parse(list) : undefined;
        },
        setListToStorage: (value: List[]) => {
            return setToStorage("LISTS", JSON.stringify(value));
        },
    };
};
