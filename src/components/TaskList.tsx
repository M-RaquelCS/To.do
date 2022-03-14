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
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    const hasTitle = Boolean(newTaskTitle); 
    // criando uma variável constante para receber o valor em boolean da verificação do estado 'setNewTaskTitle'

    // verificando se a constante 'hasTitle' se ele for false retornará um alerta, 
    //se for true criará uma nova task, pegando seus dados e 'setando' - adicionando no array de task, finalizando com o retorno do title vazio
    if(hasTitle === false) {
      alert('Person, you have to write a title for the task.')
    }else{
      const newTask = {
        id: Math.random(), // criação de um número aleatório para servir como um identificador, a chave única, da Task
        title: newTaskTitle,
        isComplete: false // verificação se a Task foi completada - se a tarefa foi feita, iniciada como false
      }

      setTasks([...tasks, newTask]) // setando - adicionando a nova tarefa no array de tasks
      setNewTaskTitle('') // retornando a label do titulo para vazio
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // mapear o array de Tasks em busca da task especifica com o id 
    // (comparação do id recebida com os ids do array para encontrar a task que tem o id igual ao id recebido)
    // se encontrar a task modificará o valor do 'isComplete', negando o valor que estava armazenado, de true para false, de false para true
    // se não encontrar ele retorna a task selecionada sem modificações
    const finishedTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    }: task)

    setTasks(finishedTask) // setando a task com o valor modificado
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // ao ler a array e achar o task do id recebido, será retornado o array sem a task selecionada, setando o novo array
    setTasks(tasks.filter(task => task.id !== id))
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
            <FiCheckSquare size={16} color="#fff"/>
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
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}