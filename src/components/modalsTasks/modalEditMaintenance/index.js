import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import MultipleDatePicker from "react-multiple-datepicker";
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

function ModalEditMaintenance({ show, onClose, data, handleEditTasca, handleDeleteTasca }) {
  const [formData, setFormData] = useState(data);
  const [inputValues, setInputValues] = useState({
    id: data.id || "",
    header: data.header || "",
    cliente: data.header || "",
    descripcion: data.description || "",
    time: data.header || "",
    datePicker1: data.header || new Date(),
    datePicker2: data.datePicker2 || [],
    trabajador: data.worker || []
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
        id: data[0].id || "",
        titulo: data[0].header || "",
        cliente: data[0].info[0].element || "",
        descripcion: data[0].description || "",
        time: data[0].info[2].element || "",
        datePicker1: data[0].info[1].element || new Date(),
        datePicker2: data[0].dataalarm || [],
        trabajador: data[0].worker || []
      });
    }
    setFormData(data);
  }, [data]);


  const handleDelete = () => {
    const valuesArray = inputValues;
    handleDeleteTasca(valuesArray);
    onClose();
  };

  const handleEdit = () => {
    const valuesArray = inputValues;
    handleEditTasca(valuesArray);
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
        <Title>Editar Tasca</Title>
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
                placeholder={formData.header}
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
                placeholder={formData.header}
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
                placeholder={formData.header}
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
            handleEdit();
          }}
        >
          Editar tasca
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ModalEditMaintenance.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ModalEditMaintenance;
