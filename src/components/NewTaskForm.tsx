import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { generateId } from "../utils/generateId";
import { InputWithLabel } from "../shared/ui/InputWithLabel";
import { Input } from "../shared/ui/Input";
import { SubmitButton } from "../shared/ui/SubmitButton";

interface NewTaskFormProps {
    addNewTask: (task: Task) => void;
    lists: List[];
}
const newTaskId = generateId("task");

const NewTaskForm = ({ addNewTask, lists }: NewTaskFormProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: {errors}
    } = useForm<Task>();

    const onSubmit: SubmitHandler<Task> = (data) => {
        if (lists.length >= 1) {
            if (lists.length === 1) {
                data.listId = lists[0].id;
            }
            data.id = newTaskId();
            data.completed = false;
            addNewTask(data);
        }
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset]);

    return (
        <div className="w-full m-2 p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWithLabel className="pb-4" htmlFor="title" label="Title:">
                    <Input
                        type="text"
                        placeholder="Text"
                        id="title"
                        {...register("title", { required: "Please enter a title" })}
                    />
                </InputWithLabel>
                <p>{errors?.title?.message}</p>
                <textarea
                    rows={3}
                    className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("description")}
                />
                <div className="flex justify-between mt-2 gap-2">
                    <div className="flex w-full h-10">
                        {lists.length >= 1 ? (
                            lists.length === 1 ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span >{lists[0].title}</span>
                                </div>
                            ) : (
                                <select
                                    {...register("listId")}
                                    title="Choose the list"
                                    defaultValue={"Choose the list"}
                                    className="shadow hover:border-gray-500 border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option style={{ display: "none" }} value="" selected disabled>
                                        Choose the list
                                    </option>
                                    {lists.map((list) => (
                                        <option key={list.id} value={list.id}>
                                            {list.title}
                                        </option>
                                    ))}
                                </select>
                            )
                        ) : (
                            <p>There are no lists</p>
                        )}
                    </div>
                    <SubmitButton type="submit">Add</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default NewTaskForm;
