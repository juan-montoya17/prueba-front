import React from 'react'
import Swal from 'sweetalert2'
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";


export const Card = ({ tarea,deleteTask,update }) => {

    const deleteItem = (e) => {

        e.stopPropagation();
        Swal.fire({
            title: 'Quieres eliminar esta tarea?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    deleteTask(tarea.id);
                }
                catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al eliminar la tarea',
                        icon: 'error',
                    });
                }
            };
        })

    }

    const onStatus = (status) => {
        update(tarea.id,{status})
    }

  



    return (
        <div className={`bg-white rounded p-3 card  mt-3 mx-4`} style={{minWidth:"350px",maxWidth:"500px"}}>
            <div className="card-body">
                <span className='fw-bolder card-title'>{tarea.title}</span> <br />
                
              
                    <FaRegTrashAlt fontSize={20} style={{cursor:"pointer",position:"absolute",right:"15px",top:"7%"}} onClick={deleteItem}/>
                  
                <div className='d-flex mt-3 justify-content-center'>
                  
                    {
                    tarea.status == "pending" ?
                    <button type="button" className="btn btn-danger ms-4 w-75" onClick={()=>onStatus("done")}>Pendiente</button>
                    :
                    <button type="button" className="btn btn-success ms-4 w-75"  onClick={()=>onStatus("pending")}>Done</button>
                }
                </div>
            </div>
        </div>
    )
}
