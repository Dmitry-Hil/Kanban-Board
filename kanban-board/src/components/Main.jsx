import React, { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage"; 
import TaskBlock from "./TaskBlock";

export default function Main() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const tasksLength = tasks.length;

  const addTask = useCallback(
    (task, column) => {
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...task, status: column }
      ]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((el) => el.id !== taskId));
    },
    [setTasks]
  );

  const columnData = useMemo(() => {
    const groupedTasks = {
      backlog: [],
      ready: [],
      inProgress: [],
      finished: [],
    };

    tasks.forEach((task) => {
      if (groupedTasks[task.status]) {
        groupedTasks[task.status].push(task);
      }
    });

    return Object.entries(groupedTasks).map(([name, taskArray]) => ({
      name,
      tasks: taskArray,
    }));
  }, [tasks]);


  return (
    <div className="main">
      <div className="container">
        {columnData.map((column) => (
          <TaskBlock
            key={column.name}
            name={column.name}
            tasks={column.tasks}
            select={tasks.filter((t) => t.status !== column.name)}
            addTask={addTask}
            deleteTask={deleteTask}
            tasksLength={tasksLength}
          />
        ))}
      </div>
    </div>
  );
}