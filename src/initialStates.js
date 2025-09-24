import { setNotes, setTasks } from "./redux/actions"
import { getAllOfCollection, getDocsWhere } from "./utils";

const initialFetches = [

    {
        name: "tasks", fetcher: async (userId) => {
            if(!userId)return;
            console.log("user-id",userId)
            let tasks = await getDocsWhere("Tasks","userId",userId);
            console.log("tasks",tasks)
            return tasks;


        }
        , reduxAction: setTasks
    },

     {
        name: "notes", fetcher: async (userId) => {
            if(!userId)return;
            console.log("user-id",userId)
            let tasks = await getDocsWhere("Notes","userId",userId);
            console.log("tasks",tasks)
            return tasks;


        }
        , reduxAction: setNotes
    }



]





export default async function getInitialStates(reduxDispatchHook,user) {
    initialFetches?.forEach((obj) => {
        obj?.fetcher(user?._id)?.then((data) => reduxDispatchHook(obj?.reduxAction(data)));
    })
}