import { useEffect, useRef, useState } from "react";
import './App.css'
import ThemeSwitch from "./components/ThemeSwitch/";


export default function App() {
  const [theme, setTheme] = useState('')
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')
  const [operation, setOperation] = useState('none')

  const taskContainerRef = useRef(null)

  function addTask(e) {
    e.preventDefault()

    if (text !== '') {
      setTasks([...tasks, {
        id: Date.now(),
        text,
        completed: false
      }])
      setText('')
      setOperation('task-added')
    }
  }

  function removeTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
    setOperation('task-deleted')
  }

  function loadSettings() {
    const mind = JSON.parse(localStorage.getItem('vera-mind')) || { theme: 'light', tasks: []}
    setTheme(mind.theme)
    setTasks(mind.tasks)
  }

  function saveSettings() {
    localStorage.setItem('vera-mind', JSON.stringify({ theme, tasks }))
  }

  function handleInputChange(e) {
    setText(e.target.value)
  }

  function handleToggleCompleted(id) {
    setTasks(tasks.map(task =>
      task.id === id ?
        { ...task, completed: !task.completed }
        : task
    ))
  }

  function handleThemeChange(theme){
    setTheme(theme)
  }

  useEffect(() => {
    if (operation == 'task-added')
      taskContainerRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    setOperation('none')
  }, [operation])

  useEffect(loadSettings, [])
  useEffect(saveSettings, [tasks, theme])

  return (
    <div className="mind" data-theme={theme}>
      <div className="wrapper">
        <header>
          <h1>mind.</h1>
        </header>
        <main>
          <ul className="tasks" ref={taskContainerRef}>
            {
              tasks.map(task => (
                <li className={`task${task.completed ? ' completed' : ''}`} key={task.id}>
                  <p className="task-description" onClick={() => handleToggleCompleted(task.id)}>
                    <span>{task.text}</span>
                  </p>
                  <button className="task-delete" onClick={() => removeTask(task.id)}>+</button>
                </li>
              ))
            }
          </ul>
        </main>
        <footer>
          <form onSubmit={addTask} className="tasks-form">
            <input type="text" value={text} onChange={handleInputChange} placeholder="Become a hero..." autoFocus={true} />
            <button type="submit">Add</button>
          </form>
        </footer>

        <ThemeSwitch theme={theme} onChangeTheme={handleThemeChange}/>    
      </div>
    </div>
  )

}