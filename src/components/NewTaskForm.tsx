import { useForm, SubmitHandler } from "react-hook-form";
import { Task } from "../models/task.model";
import { newId } from "../utils/generateId";


const NewTaskForm = (): JSX.Element => {
    const {
        register,
        handleSubmit
    } = useForm<Task>();

    const onSubmit: SubmitHandler<Task> = (data) => {
      data.id = newId();
      console.log(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("title", { required: true })} />
        <input type="text" {...register("description")} />
        <input type="submit" />
      </form>
    );
}

export default NewTaskForm;
