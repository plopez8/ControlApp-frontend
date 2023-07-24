import PropTypes from 'prop-types';
import React, { useState } from "react";
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


function ModalCreateWorker({ show, onClose, handleCreateWorker }) {
  const [inputValues, setInputValues] = useState({
    nombre: "",
    correo: "",
    contrasenya: "",
    verificarContrasenya: "",
    rol: "treballador"
  });
  function checkPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }
  
  const handleCreate = () => {
    const valuesArray = inputValues;
    handleCreateWorker(valuesArray);
    setInputValues({
        nombre: "",
        correo: "",
        contrasenya: "",
        verificarContrasenya: "",
        rol: "treballador"
      });
    onClose();
  };
  

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
                type="password"
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
                type="password"
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
                <option value="admin">Admin</option>
                <option value="treballador">Treballador</option>
              </select>
            </div>
          </GridContainer>
        </ContentGrid>
      </Modal.Body>
      <Modal.Footer>
      <button
  type="submit"
  style={{ width: '100%', margin: '0px' }}
  className="btn-historial"
  onClick={() => {
    if (checkPasswordsMatch(inputValues.contrasenya, inputValues.verificarContrasenya)) {
      handleCreate();
    } else {
        alert("Las contraseñas no coinciden");
    }
  }}
>
  Crear trabajador
</button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCreateWorker.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCreateWorker: PropTypes.func.isRequired,
};

export default ModalCreateWorker;