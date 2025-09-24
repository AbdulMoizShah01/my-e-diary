import Home from "./Pages/Home"
import SignUp from "./Pages/auth/SignUp"
import SignIn from "./Pages/auth/SignIn"
import KanbanBoard from "./Pages/Kanban"
import TaskDetails from "./Pages/TaskDetails"
import NoteDetails from "./Pages/NotesDetails"

export const routes=[
    {path:"/",Component:Home},
    {path:"/home",Component:Home},
    {path:"/tasks/:id",Component:TaskDetails},
    {path:"/notes/:id",Component: NoteDetails},
    {path:"/kanban",Component:KanbanBoard},
    

]

export const authRoutes =[
    {path: "/sign-in", Component: SignIn},
    {path: "/sign-up", Component: SignUp},
    
]