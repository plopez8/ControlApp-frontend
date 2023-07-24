/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, {useState} from "react";
import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


const Label = styled.label`
    font-weight: bold;
    color: #3472f7;
`;


const Notificar = styled.div`
    width: 100%;

    input{
        margin-left: 1rem;
        margin-right: 4rem;
    }
    .custom-checkbox:checked{
        color: #3472f7;
    }
    label{
        color: #95BDFD;
    }

`;

const ModificarHores = styled.button`
    background-color: #3472f7;
    width: 100%;
    color: white;
    border-radius: 1rem;
    margin-bottom: 1rem;
    border: none;
    p{
        margin-bottom: 0px;
    }
    button{
        background-color: #3472f7;
        width: 100%;
        color: white;
        border-radius: 1rem;
        margin-bottom: 0px;
        border: none;
    }
    }
`;

const Title = styled.h1`
    font-weight: bold;
    color: #3472f7;
    font-size: 2rem;
`;

function ModalAlarma({ show, onClose }) {
    const [editing, setEditing] = useState(false);
    const [hora1, setHora1] = useState('9:00');
    const [hora2, setHora2] = useState('9:00');
    const [hora3, setHora3] = useState('9:00');
    const [hora4, setHora4] = useState('9:00');
    const handleEditClick = () => {
        setEditing(true);
      };
      const handleConfirmClick = () => {
        setEditing(false);
      };
                
    return (
        <Modal
            animation={false}
            show={show}
            backdrop
            size="l"
            onHide={() => onClose()}
        >
            <Modal.Body>
                <button
                    aria-hidden
                    className="close"
                    type="button"
                    onClick={() => onClose()}
                >
                    <AiOutlineClose style={{ color: '#3472f7' }} />
                    {/* <i className="nc-icon nc-simple-remove" style={{fontWeight: 'bold', color:'#3472f7'}}></i> */}
                </button>
                <div>
                <Title>Configuracio d&apos;alarma</Title>
                    <div>
                        <div>
                            <br></br>
  <Label>Hores a notificar</Label>
  <br />
  {editing ? (
    <Notificar>
      <input type="time" value={hora1} onChange={(e) => setHora1(e.target.value)} />
      <input type="checkbox" className="custom-checkbox"></input>
      <input type="time" value={hora2} onChange={(e) => setHora2(e.target.value)} />
      <input type="checkbox" className="custom-checkbox"></input>
      <br></br>
      <input type="time" value={hora3} onChange={(e) => setHora3(e.target.value)} />
      <input type="checkbox" className="custom-checkbox"></input>
      <input type="time" value={hora4} onChange={(e) => setHora4(e.target.value)} />
      <input type="checkbox" className="custom-checkbox"></input>
    </Notificar>
  ) : (
    <Notificar>
      <label>{hora1}</label>
      <input type="checkbox" className="custom-checkbox"></input>
      <label>{hora2}</label>
      <input type="checkbox" className="custom-checkbox"></input>
      <br></br>
      <label>{hora3}</label>
      <input type="checkbox" className="custom-checkbox"></input>
      <label>{hora4}</label>
      <input type="checkbox" className="custom-checkbox"></input>
    </Notificar>
  )}
  <ModificarHores>
    {editing ? (
      <button type="button" onClick={handleConfirmClick}>Confirmar</button>
    ) : (
      <button type="button" onClick={handleEditClick}>Modificar les hores</button>
    )}
  </ModificarHores>
  <br></br>
</div>

                        <br></br>
                        <div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                style={{ width: '100%', margin: '0px' }}
                                className="btn-historial"
                                onClick={() => onClose()}
                            >
                                Desar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

ModalAlarma.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

export default ModalAlarma;
