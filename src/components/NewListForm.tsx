import { useForm, SubmitHandler } from "react-hook-form";
import { List } from "../models/list.model";
import { generateId } from "../utils/generateId";

interface NewListFormProps {
    addNewList: (list: List) => void;
};

const newListId = generateId("list");

const NewListForm = ({ addNewList }: NewListFormProps): JSX.Element => {
    const { register, handleSubmit } = useForm<List>();

    const onSubmit: SubmitHandler<List> = (data) => {
        data.id = newListId();
        console.log(data.color);
        addNewList(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} />
            <input type="color" {...register("color")} />
            <input type="submit" value="Add" />
        </form>
    );
};

export default NewListForm;
