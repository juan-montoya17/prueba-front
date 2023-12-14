import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'

const FloatinActionButton = ({create}) => {

    const addTaskAction = () => {
        Swal.fire({
            title: "Ingresa el nombre de la nueva tarea",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Agregar",
            showLoaderOnConfirm: true,
            preConfirm: async (text) => {
              try {
                const result = create(text);

                if (!result) {
                  throw new Error("No se pudo agregar la tarea");
                }

                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Agregada con exito"
                  });


              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          });

    }

  return (
    <div style={{ position: 'fixed', zIndex: 100 }} onClick={addTaskAction}>
      <div className="position-fixed bottom-0 end-0 p-3">
        <button
          type="button"
          className="btn btn-primary btn-lg rounded-circle "
          onClick={() => console.log('FAB Clicked')}
        >+
        </button>
      </div>
    </div>
  );
};

export default FloatinActionButton;