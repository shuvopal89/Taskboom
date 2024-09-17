import React from 'react'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import NewTasks from './pages/NewTasks';
import RunningTasks from './pages/RunningTasks';
import CompletedTasks from './pages/CompletedTasks';
import CanceledTasks from './pages/CanceledTasks';
import Labels from './pages/Labels';
import LabelTasks from './pages/LabelTasks';
import Register from './pages/Register';
import Login from './pages/Login';
import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}>
          <Route path='' Component={Dashboard} />
          <Route path='/create-task' Component={CreateTask} />
          <Route path='/new-tasks' Component={NewTasks} />
          <Route path='/running-tasks' Component={RunningTasks} />
          <Route path='/completed-tasks' Component={CompletedTasks} />
          <Route path='/canceled-tasks' Component={CanceledTasks} />
          <Route path='/labels' Component={Labels} />
          <Route path='/labels/:label' Component={LabelTasks} />
          <Route path='/edit-task/:id' Component={EditTask} />
        </Route>
        <Route path='/auth/register' Component={Register} />
        <Route path='/auth/login' Component={Login} />
        <Route path='*' Component={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
