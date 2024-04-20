import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { generateId } from "../utils/generateId";

interface NewTaskFormProps {
    addNewTask: (task: Task) => void;
    lists: List[];
}
const newTaskId = generateId("task");

const NewTaskForm = ({ addNewTask, lists }: NewTaskFormProps): JSX.Element => {
    const { register, handleSubmit } = useForm<Task>();

    const onSubmit: SubmitHandler<Task> = (data) => {
        data.id = newTaskId();
        console.log(data);
        addNewTask(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} />
            <textarea {...register("description")} />
            <select {...register("listId")}>
                {lists.map((list) => (
                    <option key={list.id} value={list.id}>{list.title}</option>
                ))}
            </select>
            <input type="submit" value="Add" />
        </form>
    );
};

export default NewTaskForm;
