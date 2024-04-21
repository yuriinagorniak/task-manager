import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { generateId } from "../utils/generateId";
import { useState } from "react";

interface NewTaskFormProps {
    addNewTask: (task: Task) => void;
    lists: List[];
}
const newTaskId = generateId("task");

const NewTaskForm = ({ addNewTask, lists }: NewTaskFormProps): JSX.Element => {
    const { register, handleSubmit } = useForm<Task>();

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} />
            <textarea {...register("description")} />
            {lists.length >= 1 ? (
                <div style={{ display: "flex" }}>
                    <p>List:</p>
                    {lists.length === 1 ? (
                        <span>{lists[0].title}</span>
                    ) : (
                        <select {...register("listId")} title="Choose the list">
                            <option style={{ display: "none" }} value="" selected disabled>
                                Choose the list
                            </option>
                            {lists.map((list) => (
                                <option key={list.id} value={list.id}>
                                    {list.title}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ) : (
                <p>There are no lists</p>
            )}
            <input type="submit" value="Add" />
        </form>
    );
};

export default NewTaskForm;
