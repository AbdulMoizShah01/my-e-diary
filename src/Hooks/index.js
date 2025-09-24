import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/actions";
import { createUniqueId, deleteData, saveData } from "../utils";

export const useTasks = () => {
  const tasks = useSelector((s) => s?.tasks, shallowEqual);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const reduxUser = useSelector((s) => s?.user, shallowEqual);
  console.log("redux-user", reduxUser);

  const addTask = async (taskObj) => {
    setisLoading(true);
    console.log("status....",taskObj?.status)
    
    try {
      let obj = {
        ...taskObj,
        _id: createUniqueId(),
        userId: reduxUser?._id,
        date: Date.parse(new Date(taskObj?.date)),
      };
      await saveData("Tasks", obj);
      let array = [...tasks];
      array.push(obj);
      dispatch(setTasks(array));
      setisLoading(false);
    } catch (e) {
      setisLoading(false);
      console.error(e);
      return e;
    }
  };
  const removeTask = async (taskToRemove, index) => {
    await deleteData("Tasks", taskToRemove);
    let array = [...tasks]?.filter((t) => t?._id !== taskToRemove?._id);
    dispatch(setTasks(array));
  };

  const editTask = async (taskObj) => {
    let obj={...taskObj,date:Date.parse(new Date(taskObj?.date))}
    await saveData("Tasks", obj);
    let array = [...tasks];
    let index = array?.findIndex((task) => task?._id === taskObj?._id);
    array[index] = obj;
    dispatch(setTasks(array));
  };

  return { tasks, newTask, setNewTask, addTask, removeTask, editTask };
};
