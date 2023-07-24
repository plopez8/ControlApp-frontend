import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineClose } from 'react-icons/ai';

const Label = styled.label`
  font-weight: bold;
  color: #3472f7;
`;

const Title = styled.h1`
    font-weight: bold;
    color: #3472f7;
    font-size: 2rem;
`;



const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto  auto;
  column-gap: 1rem;
  row-gap: 1rem;
  input {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
  }
  button {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
  }
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;

  button {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
  }
  textarea {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #95BDFD;
  }
  label {
    color: #2B7BFC;
    font-weight: bold;
  }
`;


function ModalEditWorker({ show, onClose, data, handleEditWorker, handleDeleteWorker }) {
  const [formData, setFormData] = useState(data);

  const [inputValues, setInputValues] = useState({
    nombre: "",
    correo: "",
    contrasenya: "",
    verificarContrasenya: "",
    rol: "treballador"
  });

  useEffect(() => {
    
    if (typeof data.header === 'undefined') {
      const { header } = "null";
      setFormData((prevFormData) => ({
        ...prevFormData,
        header,
      }));
    } else {
      const { header } = data[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        header,
      }));
    }
  }, [data]);

  useEffect(() => {

    if(data[0]){
      setInputValues({
        nombre: data[0].name || "",
        correo: data[0].mail || "",
        contrasenya: data[0].password || "",
        verificarContrasenya: "",
        rol: data[0].rol || "",
      });
    }
    setFormData(data);
  }, [data]);


  const handleDelete = () => {
    const valuesArray = inputValues;
    handleDeleteWorker(valuesArray);
    onClose();
  };

  const handleEdit = () => {
    const valuesArray = inputValues;
    handleEditWorker(valuesArray);
    onClose();
  };
  function checkPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }


  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Title>Crear Trabajador</Title>
        <button
          aria-hidden
          className="close"
          type="button"
          onClick={() => onClose()}
        >
          <AiOutlineClose style={{ color: '#3472f7' }} />
        </button>
      </Modal.Header>
      <Modal.Body>
        <ContentGrid>
          <GridContainer>
            <div>
              <Label>Nombre</Label>
              <input
                placeholder={formData.nombre}
                value={inputValues.nombre}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    nombre: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Correo</Label>
              <input
                placeholder={formData.correo}
                value={inputValues.correo}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    correo: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Contraseña</Label>
              <input
                type="text"
                placeholder={formData.contrasenya}
                value={inputValues.contrasenya}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    contrasenya: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Verificar Contraseña</Label>
              <input
                type="text"
                placeholder={formData.verificarContrasenya}
                value={inputValues.verificarContrasenya}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    verificarContrasenya: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Rol</Label>
              <select
                value={inputValues.rol}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    rol: event.target.value,
                  }))
                }
              >
                <option value="treballador">Treballador</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </GridContainer>
        </ContentGrid>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          style={{ width: '100%', margin: '0px', backgroundColor: 'red' }}
          className="btn-historial"
          onClick={() => {
            handleDelete();
          }}
        >
          Eliminar tasca
        </button>
        <br></br>
        <button
          type="submit"
          style={{ width: '100%', margin: '0px' }}
          className="btn-historial"
          onClick={() => {
            if (checkPasswordsMatch(inputValues.contrasenya, inputValues.verificarContrasenya)) {
              handleEdit();
            } else {
                alert("Las contraseñas no coinciden");
            }
          }}
        >
          Editar tasca
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ModalEditWorker.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ModalEditWorker;