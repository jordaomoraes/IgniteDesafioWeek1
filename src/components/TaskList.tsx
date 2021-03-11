import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (!newTaskTitle) return;

    const novaTask = {

      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }
    //copia o valor do settask para oldstate, e adiciona a nova
    setTasks(oldState => [...oldState, novaTask])
    setNewTaskTitle('');  
  }

  function handleToggleTaskCompletion(id: number) {

    //mapeia tasks - que é onde está os dados,
    //na que o id for igual, ele vai inverter o valor do IsComplete
    // ... sempre copia valor para um novo objeto, no caso aqui passa o selecionado
    const taskSelecionada = tasks.map(task => task.id === id ? {
        ...task,isComplete : !task.isComplete 
    }: task)

    setTasks(taskSelecionada)
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {

    //aqui seleciona tudo que for diferente do ID e vai passar elas do taskes
    const tasksNaoSelecionadas = tasks.filter(task => task.id !== id)
    setTasks(tasksNaoSelecionadas)
   
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}