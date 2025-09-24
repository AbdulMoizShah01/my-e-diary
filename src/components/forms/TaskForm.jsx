import { useEffect, useState } from "react"
import NormalInput from "../inputs/NormalInput";
import moment from "moment";


const TaskForm = ({title,onSubmit,prevState,taskArray}) => {
const [taskObj,setTaskObj]=useState({
    title:"",
    description:"",
    date:new Date(),
    status:"PENDING"
});

const taskStatuses=[
"PENDING",
"IN-PROGRESS",
"COMPLETED",
"BACKLOG"
]

const [isHovered, setIsHovered] = useState(false);

useEffect(()=>{
    setTaskObj({...prevState});
},[prevState])

  return (
    <div className="task-form-container">
        <h5 className="task-form-title">{title}</h5>
        <NormalInput 
            type={"text"} 
            label={"Task Title"} 
            placeholder={"Write title"} 
            value={taskObj?.title}
            setValue={(v)=>setTaskObj((prev)=>({...prev,title:v}))}
        />
        <NormalInput 
            type={"textarea"} 
            label={"Task description"}
            value={taskObj?.description}
            setValue={(v)=>setTaskObj((prev)=>({...prev,description:v}))}
        />
        <NormalInput
        placeholder={"Select status"}
        label={'Status'}
        type={'select'}
        options={taskStatuses}
        value={taskObj?.status}
        setValue={(v)=>setTaskObj((prev)=>({...prev,status:v}))}
        
        />
        <NormalInput
        label={"Target Date"}
        id={""}
        value={taskObj?.date}
        setValue={(v)=>setTaskObj((prev)=>({...prev,date:v}))}
        placeholder={'Select date'}
        type={'date'}
        />
        <button
            className={`task-form-button ${isHovered ? 'task-form-button:hover' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>onSubmit({
                ...taskObj,
                createdAt: Date.parse(new Date()),
                _id: prevState?._id ? prevState._id : `task-${taskArray?.length+1}`
            })}
        >
            {prevState?._id?"Save Changes":"Add Task"}
        </button>
    </div>
  )
}

export default TaskForm