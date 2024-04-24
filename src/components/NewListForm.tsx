import { useForm, SubmitHandler } from "react-hook-form";
import { List } from "../models/list.model";
import { generateId } from "../utils/generateId";
import { Input } from "../shared/ui/Input";
import { InputWithLabel } from "../shared/ui/InputWithLabel";

interface NewListFormProps {
    addNewList: (list: List) => void;
}

const newListId = generateId("list");

const NewListForm = ({ addNewList }: NewListFormProps): JSX.Element => {
    const { register, handleSubmit } = useForm<List>();

    const onSubmit: SubmitHandler<List> = (data) => {
        data.id = newListId();
        console.log(data.color);
        addNewList(data);
    };

    return (
        <div className="w-full m-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input type="text" {...register("title", { required: true })}/> */}
                <InputWithLabel htmlFor="list-name" label="List name:">
                    <Input
                        type="text"
                        placeholder="Text"
                        id="list-name"
                        {...register("title", { required: true })}
                    />
                </InputWithLabel>
                <div className="flex gap-2 mt-2">
                    {/* <input type="color" className="w-full h-10 p-0.5 shadow appearance-none border-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register("color")} /> */}
                    <input type="color" className="w-full h-10 p-0.5 appearance-none bg-transparent border-none outline-none " {...register("color")} />

                    <button type="submit" className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Add</button>
                </div>
            </form>
        </div>
    );
};

export default NewListForm;
