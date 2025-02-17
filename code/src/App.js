/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TaskList from 'components/TaskList';
import TaskForm from 'components/TaskForm';
import './reset.css';
import './index';

  const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [loading]);

  const fetchTasks = () => {
    setLoading(true);
    fetch('https://project-happy-thoughts-api-b7tcqolsoq-lz.a.run.app/info')
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value)
  }
  // const onLikes = (_id) => {
  //   fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${_id}/like`, {
      const onLikes = (_id) => {
        fetch(`https://project-happy-thoughts-api-b7tcqolsoq-lz.a.run.app/info/${_id}/like`, {
      method: 'PATCH'
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(() => fetchTasks());
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newTodo
      })
    }
    fetch('https://project-happy-thoughts-api-b7tcqolsoq-lz.a.run.app/info', options)
      .then((res) => res.json())
      .then((updatedThought) => {
        setNewTodo((previousThoughts) => [updatedThought, ...previousThoughts])
      })
      .finally(() => {
        setNewTodo('')
        fetchTasks()
      })
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
        <TaskForm
          newTodo={newTodo}
          onNewTodoChange={handleNewTodoChange}
          onFormSubmit={onFormSubmit} />
        <TaskList
          taskList={taskList}
          setTaskList={setTaskList}
          onLikes={onLikes} />
      </div>
    </div>
  )
}
export default App;
