import { Spinner } from "../assets/Spinner";

export const Loader = () => {
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Spinner />
        </div>
    );
};
