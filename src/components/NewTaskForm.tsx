import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { generateId } from "../utils/generateId";
import { useState } from "react";
import { InputWithLabel } from "../shared/ui/InputWithLabel";
import { Input } from "../shared/ui/Input";

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
        formState: { isSubmitSuccessful },
    } = useForm<Task>();

    const onSubmit: SubmitHandler<Task> = (data) => {
        if (lists.length >= 1) {
            if (lists.length === 1) {
                data.listId = lists[0].id;
            }
            data.id = newTaskId();
            console.log(data);
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
                {/* <input type="text" {...register("title", { required: true })} /> */}
                <InputWithLabel className="pb-4" htmlFor="title" label="Title:">
                    <Input
                        type="text"
                        placeholder="Text"
                        id="title"
                        {...register("title", { required: true })}
                    />
                </InputWithLabel>
                <textarea
                    rows={3}
                    className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("description")}
                />
                <div className="flex justify-between">
                    <div className="flex w-full h-10 border-2 border-green-200">
                        {lists.length >= 1 ? (
                            lists.length === 1 ? (
                                <span>{lists[0].title}</span>
                            ) : (
                                <select
                                    {...register("listId")}
                                    title="Choose the list"
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
                    <button type="submit" className="w-full">Add</button>
                </div>
            </form>
        </div>
    );
};

export default NewTaskForm;
