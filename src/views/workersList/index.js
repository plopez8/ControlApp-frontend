import React, {useState} from 'react';
import { TablaWorkers } from 'components/TablaWorkers/TablaWorkers';
import { PagesIndex } from 'components/PagesIndex/PagesIndex';
import '../../assets/scss/lbd/_workerMarkingHistory.scss';
import styled from 'styled-components';
import ModalCreateWorker from 'components/modalsWorkers/modalCreateWorker';
import { AiOutlinePlusCircle } from 'react-icons/ai';


const TaskTypeBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    
`;
const CreateDiv = styled.div`
float: right;

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





function WorkersList() {
  const [showCreateWorker, setShowCreateWorker] = useState(false);
    const header = [
        { name: 'Nom', drop: false },
        { name: 'Correu', drop: false },
        { name: 'Rol', drop: false },
        { name: 'Editar', drop: false },
    ];



    const [data, setData] = useState([
    {
      name: 'Alvaro',
      mail: 'alvaro@gmail.com',
      password: "patata",
      rol: "user",
    },
    {
      name: 'Paco',
      mail: 'paco@gmail.com',
      password: "patata",
      rol: "admin",
    },
  ]);

  const handleCreateWorker = (newData) => {
    console.log(newData);
  };


const updateData = (updatedData) => {
  setData(updatedData);

}


    return (
        <div className="home">
            <CreateDiv>
                <TaskTypeBox><DivAbs>
                                
                                <button
                                    className="btn-task "
                                    type="submit"
                                    onClick={() => {
                                        setShowCreateWorker(true);
                                    }}
                                >
                                    <AiOutlinePlusCircle
                                        style={{
                                            fontSize: '20px',
                                        }}
                                    />{' '}
                                    Crear tasca
                                </button>
                                <ModalCreateWorker
                                    show={showCreateWorker}
                                    onClose={() => {
                                        setShowCreateWorker(false);
                                    }}
                                    handleCreateWorker={handleCreateWorker}
                                />
                                
                            </DivAbs>
                </TaskTypeBox>
            </CreateDiv>

            <div className="filterInfo">
                <div className="dateType">
                    <h1>Treballadors</h1>
                </div>
            </div>
            <TablaWorkers header={header} data={data} updateData={updateData} />
                        <PagesIndex num={4} />
        </div>
    );
}

export default WorkersList;
