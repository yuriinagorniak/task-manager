import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { getContrastColor } from "../utils/getContrastColor";
import { EditList } from "./EditList";
import { DividingLine } from "../shared/ui/DividingLine";
import { TaskListItem } from "./TaskListItem";

interface ListElementProps {
    title: string;
    tasks: Task[];
    listData: List;
    deleteTask: (id: string) => void;
    deleteList: (id: string) => void;
    completeTask: (id: string) => void;
    editList: (list: List) => void;
}

const ListElement = ({
    title,
    tasks,
    listData,
    deleteTask,
    deleteList,
    completeTask,
    editList,
}: ListElementProps): JSX.Element => {
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    return (
        <div
            className={`border-2 mx-2 my-4 text-center rounded-md shadow-lg overflow-hidden appearance-none leading-tight focus:outline-none focus:shadow-outline bg-white`}
            style={{ borderColor: listData.color }}
        >
            <div className="m-0 p-0 pb-2" style={{ backgroundColor: listData.color + "30" }}>
                <div
                    className="relative py-[5px] font-bold text-center"
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
                    <TaskListItem
                        tasks={uncompletedTasks}
                        listColor={listData.color}
                        completeTask={completeTask}
                        deleteTask={deleteTask}
                    />
                )}

                {completedTasks.length > 0 && (
                    <div>
                        {uncompletedTasks.length > 0 && <DividingLine color={listData.color} />}
                        <TaskListItem
                            tasks={completedTasks}
                            listColor={listData.color}
                            completeTask={completeTask}
                            deleteTask={deleteTask}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListElement;
