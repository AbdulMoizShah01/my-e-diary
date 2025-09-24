import { useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setNotes } from "../redux/actions";
import { createUniqueId, deleteData, saveData } from "../utils";

export const useNotes=()=>{
const notes=useSelector((a)=>a?.notes, shallowEqual);
const dispatch = useDispatch();
const [newNotes,setNewNotes]=useState("");
const [isLoading, setisLoading]=useState(false);
const reduxUser = useSelector((s)=>s?.user,shallowEqual);




const addNotes= async (notesObj)=>{
setisLoading(true);
 try {

      let obj = { ...notesObj, _id: createUniqueId(), userId: reduxUser?._id};
      await saveData("Notes", obj);
      let array = [...notes];
      array.push(obj);
      dispatch(setNotes(array));
      setisLoading(false);

    } catch (e) {
      setisLoading(false);
      console.error(e);
      return e;
    }



  }


const removeNote= async (notesToRemove,index)=>{
  await deleteData("Notes",notesToRemove)
    let array=[...notes]?.filter((n)=>n?._id!==notesToRemove?._id);
     dispatch(setNotes(array));
}


const editNotes= async(noteObj)=>{
  await saveData("Notes", noteObj)
  let array=[...notes];
  let index=array?.findIndex((notes)=>notes?._id===noteObj?._id);
   array[index]=noteObj;
    dispatch(setNotes(array));


}


return {notes,newNotes,setNewNotes,addNotes,removeNote, editNotes}

}