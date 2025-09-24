import React, { useEffect, useState } from 'react'
import { useTasks } from '../Hooks'
import { useNotes } from '../Hooks/notes';
import TaskCard from '../components/cards/TaskCard';
import NotesCard from '../components/cards/NotesCard';
import TaskForm from '../components/forms/TaskForm';
import NotesForm from '../components/forms/NotesForm';
import { Modal } from 'reactstrap';


const Home = () => {
    const { tasks, addTask, removeTask, editTask } = useTasks();
    const { notes, addNotes, removeNote, editNotes } = useNotes();
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [notesToEdit, setNotesToEdit] = useState(null);

    return (
        <div className="home-container">
            
            <div className="section-divider">
                <h2 className="section-title">
                    <i className="fas fa-tasks"></i>
                    Task Section
                </h2>
            </div>
            
            <div className='task-container'>
                <div className='input-section'>
                    <div className="form-card">
                        <TaskForm
                            prevState={{}}
                            onSubmit={addTask}
                            taskArray={tasks}
                            title={"Create New Task"}
                        />
                    </div>
                </div>

                <div className='task-card'>
                    <div className="card-header">
                        <h3>Current Tasks</h3>
                        <span className="badge">{tasks?.length || 0}</span>
                    </div>
                    <div className='tasks'>
                        {tasks?.length > 0 ? (
                            tasks.map((task, index) => (
                                <TaskCard
                                    key={`tasks-${index}`}
                                    title={task?.title}
                                    onEdit={(obj) => setTaskToEdit(obj)}
                                    createdAt={task?.createdAt}
                                    description={task?.description}
                                    onDelete={removeTask}
                                    taskObj={task}
                                />
                            ))
                        ) : (
                            <div className="empty-state">
                                <i className="fas fa-clipboard-list"></i>
                                <p>No tasks yet. Create your first task!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="section-divider">
                <h2 className="section-title">
                    <i className="fas fa-sticky-note"></i>
                    Notes Section
                </h2>
            </div>

            <div className='task-container'>
                <div className='input-section'>
                    <div className="form-card">
                        <NotesForm
                            prevState={{}}
                            onSubmit={addNotes}
                            taskArray={notes}
                            title={"Create New Note"}
                        />
                    </div>
                </div>
                
                <div className='task-card'>
                    <div className="card-header">
                        <h3>Current Notes</h3>
                        <span className="badge">{notes?.length || 0}</span>
                    </div>
                    <div className='notes'>
                        {notes?.length > 0 ? (
                            notes.map((note, index) => (
                                <NotesCard
                                    key={`notes-${index}`}
                                    title={note?.title}
                                    onEdit={(obj) => setNotesToEdit(obj)}
                                    createdAt={note?.createdAt}
                                    noted={note?.noted}
                                    onDelete={removeNote}
                                    noteObj={note}
                                />
                            ))
                        ) : (
                            <div className="empty-state">
                                <i className="fas fa-sticky-note"></i>
                                <p>No notes yet. Create your first note!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal centered isOpen={taskToEdit} toggle={()=>setTaskToEdit(null)} className="custom-modal">
                <div className='modal-card'>
                    <div className='modal-header'>
                        <h3>Edit Task</h3>
                        <button className="close-btn" onClick={()=>setTaskToEdit(null)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className='modal-body'>
                         <TaskForm
                            prevState={taskToEdit}
                            onSubmit={editTask}
                            taskArray={tasks}
                            title={"Edit Task"}
                        />
                    </div>
                </div>
            </Modal>

            <Modal centered isOpen={notesToEdit} toggle={()=>setNotesToEdit(null)} className="custom-modal">
                <div className='modal-card'>
                    <div className='modal-header'>
                        <h3>Edit Note</h3>
                        <button className="close-btn" onClick={()=>setNotesToEdit(null)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className='modal-body'>
                       <NotesForm
                            prevState={notesToEdit}
                            onSubmit={editNotes}
                            taskArray={notes}
                            title={"Edit Note"}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home