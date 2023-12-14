import React from 'react';
import { Card } from './components/cards/Card';
import useTareas from './hooks/useTareas';
import FloatinActionButton from './components/FloatingActionButton';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

function App() {

  const {error,loading,tareas, create,deleteTask,update} =  useTareas();

  return (
    <>
      {loading ?
        <div className="w-100 d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
          <div className="spinner-border" role="status" style={{ color: "#5FA9C4" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        : (
      <div className="mx-0">
        <FloatinActionButton  create={create}/>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
          <div className='bg-dark row' style={{minHeight:"100vh",width:"100%"}}>
            <div className='d-flex flex-column align-items-center col'>
              <div className='d-flex flex-row justify-content-center mt-5'>
                <IoMdCloseCircleOutline   fontSize={70} color='red'/>
              </div>
              {tareas?.length ? (
                   tareas.map((tarea) => tarea.status == "pending" &&
                   <Card tarea={tarea} key={tarea.id} deleteTask={deleteTask} update={update} />
                   )
               ) : null}
            </div>
            <div className='d-flex flex-column align-items-center col'>
              <div className='d-flex flex-row justify-content-center mt-5 mb-2'>
                <FaRegCheckCircle  fontSize={55} color='green'/>
              </div>
              {tareas?.length ? (
                   tareas.map((tarea) => tarea.status == "done" &&
                   <Card tarea={tarea} key={tarea.id} deleteTask={deleteTask} update={update} />
                   )
               ) : null}
            </div>
          </div>
          </>
        )}
      </div>
    )}
    </>
  )
}

export default App
