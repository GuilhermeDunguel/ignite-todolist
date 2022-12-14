import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';
import ClipboardSVG from '../../assets/clipboard.svg';
import './Main.scss';
import { Task } from './Task/Task';

interface TasksProps {
  content: string;
  isCompleted: boolean;
}

export function Main() {
  
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  const [isTaskCompleted, setIsTaskCompleted] = useState<TasksProps[]>([])

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [isTaskInputFocused, setIsTaskInputFocused] = useState(false);

  function handleCreateNewTask() {
    event?.preventDefault()
    setTasks([...tasks, {content: newTaskTitle, isCompleted: false}])

    setNewTaskTitle('');
  }

  function handleDeletingTask(taskContent: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.content !== taskContent
    })
    setTasks(tasksWithoutDeletedOne)
  }

  function handleCompleteTask(taskContent: string) {

    const taskCompleted = tasks.filter(task => {
        if(task.content === taskContent) {
          return task.isCompleted == true ? task.isCompleted = false : task.isCompleted = true
        }
    })

    const newArrayOfUpdatedTasks = tasks.filter(task => {
      return [taskCompleted[0], task.content !== taskContent]
    })

    setTasks(newArrayOfUpdatedTasks)

    const ArrayUpdated = tasks.filter(task => {
      return task.isCompleted === true
    })

    setIsTaskCompleted(ArrayUpdated)
  }

  return (
    <main>
      <section className='taskCreator'>
        <input 
          className='taskInput'
          onChange={(event) => setNewTaskTitle(event.target.value)}
          value={newTaskTitle}
          placeholder='Adicione uma nova tarefa' 
          type="text" 
        />
        <button 
          className={newTaskTitle.length < 3 ? 'taskCreatorButtonDisabled' : 'taskCreatorButton'}
          onClick={handleCreateNewTask}
        >Criar <PlusCircle size={16} weight="bold"/></button>
        {newTaskTitle.length < 3 ? 
          <span className='taskAdvice'>
            Insira mais {3 - newTaskTitle.length} caracteres
          </span> : null}
      </section>
      <section className='taskDisplaySection'>
        <header className='taskDisplayHeader'>
          <span className='taskDisplayHeaderTasksCreated'>Tarefas criadas <span>{tasks.length}</span></span>
          <span className='taskDisplayHeaderTasksConcluded'>Tarefas conclu??das <span>{isTaskCompleted.length} de {tasks.length}</span></span>
        </header>
        <div className='taskDisplayArea'>
          {tasks.length === 0 ? 
            <div className='taskDisplayAreaEmptyAdvice'>
              <div className='clipboardDiv'>
                <img src={ClipboardSVG} alt="??cone de uma planilha" />
              </div>
              <span className='adviceText firstSpan'>Voc?? ainda n??o tem tarefas cadastradas</span>
              <span className='adviceText'>Crie tarefas e organize seus itens a fazer</span>
            </div>
          : tasks.map(task => {
            return (
              <Task
                key={task.content}
                content={task.content}
                isCompleted={task.isCompleted} 
                deleteTaskFunction={handleDeletingTask} 
                completeTaskFunction={handleCompleteTask}
              />
            ) 
          })}
        </div>
      </section>
    </main>
  )
}
