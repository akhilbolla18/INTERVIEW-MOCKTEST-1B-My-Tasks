import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const App = () => {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [tagInput, setTagInput] = useState(tagsList[0].displayText)

  const handleTaskInputChange = event => {
    setTaskInput(event.target.value)
  }

  const handleTagInputChange = event => {
    setTagInput(event.target.value)
  }

  const handleAddTask = () => {
    if (taskInput && tagInput) {
      const newTask = {
        id: uuidv4(),
        task: taskInput,
        tag: tagInput,
      }
      setTasks([...tasks, newTask])
      setTaskInput('')
      setTagInput(tagsList[0].optionId)
    }
    console.log(tasks)
  }

  const handleTagClick = clickedTag => {
    const filteredTasks = tasks.filter(task => task.tag === clickedTag)
    setTagInput(clickedTag)
    setTasks(filteredTasks)
  }

  return (
    <div className="app-container">
      <div className="create-task-container">
        <form className="form-con">
          <h1 className="form-heading">Create a Task!</h1>
          <label htmlFor="taskInput" className="label">
            Task
          </label>
          <input
            className="input"
            type="text"
            id="taskInput"
            value={taskInput}
            onChange={handleTaskInputChange}
            placeholder="Enter the task here"
          />
          <label htmlFor="tagSelect" className="label">
            Tags
          </label>
          <select
            id="tagSelect"
            className="input"
            value={tagInput}
            onChange={handleTagInputChange}
          >
            {tagsList.map(tag => (
              <option key={tag.optionId} value={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
          <button type="button" className="add-button" onClick={handleAddTask}>
            Add Task
          </button>
        </form>
      </div>
      <div className="show-tasks-con">
        <h1 className="label">Tags</h1>
        <ul className="tags-section">
          {tagsList.map(tag => (
            <li
              key={tag.optionId}
              className={tagInput === tag.optionId ? 'active' : 'in-active'}
              onClick={() => handleTagClick(tag.optionId)}
            >
              <button className="button" type="button">
                {tag.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="label">Tasks</h1>
        {tasks.length === 0 ? (
          <p className="">No Tasks Added Yet</p>
        ) : (
          <ul className="tasks-section">
            {tasks.map(task => (
              <li key={task.id} className="task">
                <p>{task.task}</p>
                <p>{task.tag}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
