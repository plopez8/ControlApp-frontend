import React, {useState} from 'react';
import { Tabla } from 'components/Tabla/Tabla';
import { PagesIndex } from 'components/PagesIndex/PagesIndex';
import { Calendar } from 'components/CalendarFilter/Calendar';
import '../../assets/scss/lbd/_workerMarkingHistory.scss';
import {  BsAlarm } from 'react-icons/bs';
import styled from 'styled-components';
import ModalAlarma from 'components/modalsTasks/modalAlarma';
import ModalCreateTask from 'components/modalsTasks/modalCreateTask';
import { AiOutlinePlusCircle } from 'react-icons/ai';


const TaskTypeBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
`;
const DivAbs = styled.div`
    font-size: 15px;

    @media (max-width: 1335px) {
        display: contents;
        margin-bottom: 20px;

        .div-sep {
            display: contents;
        }
    }
`;

const DivAlarma = styled.div`
    display: flex;
    div{
        background-color: #3472f7;
        height:2rem;
        width: 2rem;
        display: flex;
        justify-content:center;
        align-items: center;
        border-radius: 0.4rem;
        margin-left: 1rem;
        color: white;
    }
    label{
        color: #2B7BFC;
        font-weight: bold;
    }
`;



function TaskHistory() {
  const [checkedWorkers, setCheckedWorkers] = useState([]);
  const [showAlarma, setShowAlarma] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
    const header = [
        { name: 'Tasca', drop: false },
        { name: 'Client', drop: false },
        { name: 'Data', drop: true },
        { name: 'Hora', drop: true },
        { name: 'Descripcio', drop: true },
        { name: 'Editar', drop: false },
        { name: 'Completat', drop: false },

    ];



    const [data, setData] = useState([
    {
      header: 'Reperar Caldera',
      id: '1',
      info: [
        { element: 'Client1', type: 'user' },
        { element: 'Jun 19 2023', color: '#ccddf8' },
        { element: '10:30', color: '#ccddf8' },
      ],
      description: "DEscripcio 1 asdj`fpakekfpàfpkdmvlñnfkkgf k`kdfak `sdkfp ksad`kfas`dfasdjojasfd",
      dataalarm: [],
      completed: false,
      worker: [
                "alvaro@gmail.com",
                "paco@gmail.com"
              ]
    },
    {
      header: 'Bomba',
      id: '2',
      info: [
        { element: 'Client1', type: 'user' },
        { element: 'Jun 26 2023', color: '#ccddf8' },
        { element: '12:00', color: '#ccddf8' },
      ],
      description: "Descripcio 2 asdj`fpakekfpàfpkdmvlñnfkkgf k`kdfak `sdkfp ksad`kfas`dfasdjojasfd",
      dataalarm: [],
      completed: true,
      worker: [
        "alvaro@gmail.com",
        "paco@gmail.com"
      ]
    },
  ]);
  const handleCheckboxChange = (event, worker) => {
    if (event.target.checked) {
      setCheckedWorkers([...checkedWorkers, worker]);
    } else {
      setCheckedWorkers(checkedWorkers.filter((w) => w !== worker));
    }
  };

  const handleCreateTasca = (newData) => {
    console.log(newData);
  };


const updateData = (updatedData) => {
  setData(updatedData);

}

    return (
        <div className="home">
            <div className="filterBox">
                <Calendar />
                <TaskTypeBox>
                <DivAlarma>
    <br />
    <lable>Alarma</lable>
    <div>
      <button
        className="btn-task"
        type="submit"
        onClick={() => {
          setShowAlarma(true);
        }}
      >
        <BsAlarm style={{ fontSize: '20px' }} />{' '}
      </button>
      <ModalAlarma
        show={showAlarma}
        onClose={() => {
          setShowAlarma(false);
        }}
      />
    </div>
  </DivAlarma><DivAbs>
                                
                                <button
                                    className="btn-task "
                                    type="submit"
                                    onClick={() => {
                                        setShowCreateTask(true);
                                    }}
                                >
                                    <AiOutlinePlusCircle
                                        style={{
                                            fontSize: '20px',
                                        }}
                                    />{' '}
                                    Crear tasca
                                </button>
                                <ModalCreateTask
                                    show={showCreateTask}
                                    onClose={() => {
                                        setShowCreateTask(false);
                                    }}
                                    handleCreateTasca={handleCreateTasca}
                                />
                                
                            </DivAbs>
                </TaskTypeBox>
            </div>

            <div className="filterInfo">
                <div className="dateType">
                    <h1>Historial de tasques</h1>
                </div>
            </div>
            <Tabla header={header} data={data} handleCheckboxChange={handleCheckboxChange} updateData={updateData} />
                        <PagesIndex num={4} />
        </div>
    );
}

export default TaskHistory;
