import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import MultipleDatePicker from "react-multiple-datepicker";
import { AiOutlineClose } from 'react-icons/ai';
import { format } from 'date-fns';


const Label = styled.label`
  font-weight: bold;
  color: #3472f7;
`;

const Title = styled.h1`
    font-weight: bold;
    color: #3472f7;
    font-size: 2rem;
`;

const DatePickerContainer = styled.div`
  color: #95BDFD;
  background-color: #F1F6FE;
  border-radius: 1rem;
  border: none;
  padding-left: 1rem;
`;

const Textarea = styled.textarea`
  background-color: #F1F6FE;
  border-radius: 1rem;
  border: none;
  padding-left: 1rem;
  padding-right: 1rem;
  color: #95BDFD;
  width: 100%;
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
const DatePickerInput = styled.input`
  background-color: #F1F6FE;
  border-radius: 1rem;
  border: none;
  padding-left: 1rem;
  color: #95BDFD;
`;

function ModalCreateTask({ show, onClose, handleCreateTasca }) {
  const [inputValues, setInputValues] = useState({
    titulo: "",
    cliente: "",
    descripcion: "",
    time: "",
    datePicker1: new Date(),
    datePicker2: [],
    trabajador: []
  });

  const handleCreate = () => {
    const valuesArray = inputValues;
    valuesArray.trabajador = inputValues.trabajador.split(',');
    try {
      valuesArray.datePicker1 = format(inputValues.datePicker1, 'MMM dd yyyy');
    } catch {
      valuesArray.datePicker1 = inputValues.datePicker1
    }

    try {
      valuesArray.datePicker2 = inputValues.datePicker2.map(date => format(date, 'MMM dd yyyy'));
    } catch {
      valuesArray.datePicker2 = inputValues.datePicker2;
    }
    handleCreateTasca(valuesArray);
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
        <Title>Crear Tasca</Title>
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
              <Label>Titol</Label>
              <input
                value={inputValues.titulo}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    titulo: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Treballador:</Label>
              <input
                value={inputValues.trabajador}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    trabajador: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Client:</Label>
              <input
                value={inputValues.cliente}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    cliente: event.target.value,
                  }))
                }
              />
            </div>
          </GridContainer>
          <div>
            <Label>Descripción</Label>
            <Textarea
              placeholder="Introduce una descripción"
              value={inputValues.descripcion}
              onChange={(event) =>
                setInputValues((prevInputValues) => ({
                  ...prevInputValues,
                  descripcion: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <Label>Data i hora</Label>
            <DatePickerContainer>
              <DatePickerInput
                type="time"
                value={inputValues.time}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    time: event.target.value,
                  }))
                }
              />
              <DatePicker
                onChange={(value) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    datePicker1: value,
                  }))
                }
                value={inputValues.datePicker1}
                locale="es-ES"
                showTimeSelect
                dateFormat="dd/mm/yyyy"
                className="custom-datepicker"
              />
            </DatePickerContainer>
          </div>
          <ContentGrid>
            <Label>Dies a notificar</Label>
            <MultipleDatePicker
              onSubmit={(dates) =>
                setInputValues((prevInputValues) => ({
                  ...prevInputValues,
                  datePicker2: dates,
                }))
              }
              value={inputValues.datePicker2}
            />
          </ContentGrid>
        </ContentGrid>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          style={{ width: '100%', margin: '0px' }}
          className="btn-historial"
          onClick={() => {
            handleCreate();
          }}
        >
          Crear tasca
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ModalCreateTask.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCreateTasca: PropTypes.func.isRequired,
};

export default ModalCreateTask;
