import { useForm, SubmitHandler } from "react-hook-form";
import { List } from "../../models/list.model";
import { generateId } from "../../utils/generateId";
import { Input } from "../../shared/ui/Input";
import { InputWithLabel } from "../../shared/ui/InputWithLabel";
import { SubmitButton } from "../../shared/ui/SubmitButton";
import { useEffect } from "react";

interface NewListFormProps {
    addNewList: (list: List) => void;
}

const newListId = generateId("list");

const NewListForm = ({ addNewList }: NewListFormProps): JSX.Element => {
    const { register, handleSubmit, reset, formState, formState: { errors } } = useForm<List>();

    const onSubmit: SubmitHandler<List> = (data) => {
        data.id = newListId();
        if (data.color === "#ffffff") {
            data.color = "#e5e7eb";
        }
        addNewList(data);
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset]);

    return (
        <div className="w-full m-2 p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWithLabel htmlFor="list-title" label="Title:">
                    <Input
                        type="text"
                        placeholder="Title"
                        id="list-title"
                        {...register("title", { required: "Please enter a title" })}
                    />
                </InputWithLabel>
                <p className="text-red-600">{errors?.title?.message}</p>
                <div className="flex gap-2 mt-2">
                    <div className="relative w-full h-10 shadow rounded overflow-hidden">
                        <input
                            type="color"
                            defaultValue="#FFF2C2"
                            className="absolute top-[-20%] left-[-20%] w-[200%] h-[150%] appearance-none bg-transparent border-none outline-none cursor-pointer"
                            {...register("color")}
                        />
                    </div>
                    <SubmitButton type="submit">Add</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default NewListForm;
