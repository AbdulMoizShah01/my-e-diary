import { useState, useEffect } from "react"
import NormalInput from "../inputs/NormalInput"
const NotesForm = ({title, onSubmit, prevState, notesArray}) => {

const [notesObj,setNotesObj] = useState({
    title: "",
    noted: "",
});

const [isHovered, setIsHovered] = useState(false);


useEffect(()=>{
    setNotesObj({...prevState});    
},[prevState])

  return (
    <div className="task-form-container">
        <h5 className="task-form-title">{title}</h5>
        <NormalInput 
            type={"text"} 
            label={"Task Title"} 
            placeholder={"Write title"} 
            value={notesObj?.title}
            setValue={(v)=>setNotesObj((prev)=>({...prev,title:v}))}
        />
        <NormalInput 
            type={"textarea"} 
            label={"Task description"}
            value={notesObj?.noted}
            setValue={(v)=>setNotesObj((prev)=>({...prev,noted:v}))}
        />
        <button
            className={`task-form-button ${isHovered ? 'task-form-button:hover' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={()=>onSubmit({
                ...notesObj,
                createdAt: Date.parse(new Date()),
                _id: prevState?._id ? prevState._id : `task-${notesArray?.length+1}`
            })}
        >
            {prevState?._id?"Save Changes":"Add Task"}
        </button>
    </div>
  )
}

export default NotesForm