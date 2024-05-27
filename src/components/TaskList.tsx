import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { TaskElement } from "../shared/ui/TaskIElement";
import { getContrastColor } from "../utils/getContrastColor";
import { EditList } from "./TaskEdit";
import { DividingLine } from "../shared/ui/DividingLine";

interface TaskListProps {
    title: string;
    tasks: Task[];
    listData: List;
    deleteTask: (id: string) => void;
    deleteList: (id: string) => void;
    completeTask: (id: string) => void;
    editList: (list: List) => void;
}

const TaskList = ({
    title,
    tasks,
    listData,
    deleteTask,
    deleteList,
    completeTask,
    editList,
}: TaskListProps): JSX.Element => {
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    return (
        <div
            className={`border-2 mx-2 my-4 text-center rounded-md shadow-lg overflow-hidden appearance-none leading-tight focus:outline-none focus:shadow-outline`}
            style={{ borderColor: listData.color, backgroundColor: listData.color + "30" }}
        >
            <div
                className="relative py-1 font-bold text-center"
                style={{ backgroundColor: listData.color }}
            >
                <h2 className="w-full" style={{ color: getContrastColor(listData.color) }}>
                    {listData.title}
                </h2>

                <EditList
                    listData={listData}
                    listEmpty={tasks.length <= 0}
                    editList={editList}
                    deleteList={deleteList}
                />
            </div>

            {uncompletedTasks.length > 0 && (
                <ul className="my-2 flex flex-col items-center">
                    {uncompletedTasks.map((task) => (
                        <TaskElement
                            task={task}
                            listColor={listData.color}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </ul>
            )}

            {completedTasks.length > 0 && (
                <div>
                    {uncompletedTasks.length > 0 && <DividingLine color={listData.color} />}
                    <ul className="my-2 flex flex-col items-center">
                        {completedTasks.map((task) => (
                            <TaskElement
                                task={task}
                                listColor={listData.color}
                                completeTask={completeTask}
                                deleteTask={deleteTask}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskList;
