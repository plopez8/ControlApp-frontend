import React, { useState } from 'react';
import styled from 'styled-components';
import '../../assets/scss/lbd/_requestView.scss';
import { FaChevronDown } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import ModalEditWorker from 'components/modalsWorkers/modalEditWorker';


const HeaderRow = styled.tr`
  background-color: #d3e1f9;
  line-height: 5vh;
  th {
    color: #656565 !important;
    font-size: 1em !important;
    font-weight: 600 !important;
    text-transform: unset !important;

    svg {
      font-size: x-small;
      margin-left: 10px;
    }
  }
`;

const DataRow = styled.tr`
  background-color: #eff3f8 !important;
`;

const RowName = styled.td`
  p {
    margin: 15px auto;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #2b7bfc;
    font-weight: 600;
  }
`;

const Table = styled.table`
  width: calc(100% - 5vw);
  margin-left: 5vw !important;
`;

function TableHeader({ columnNames }) {
  return (
    <HeaderRow>
      {columnNames.map((columnNames) => (
        <th key={columnNames}>
          {columnNames.name}
          {columnNames.drop ? <FaChevronDown></FaChevronDown> : null}
        </th>
      ))}
    </HeaderRow>
  );
}



function TableRow({ data, handleEditWorker, handleDeleteWorker }) {
  const [showEditWorker, setShowEditWorker] = useState(false);
  const [selectedMaintenanceData, setSelectedMaintenanceData] = useState(null);

  const onEditWorker = (maintenanceInfo) => {
    setSelectedMaintenanceData(maintenanceInfo); 
    setShowEditWorker(true);
  };

  return (
    <DataRow>
      {data.name ? (
        <RowName>
          <p>{data.name}</p>
        </RowName>
      ) : (
        ''
      )}
      {data.mail ? (
        <RowName>
          <p>{data.mail}</p>
        </RowName>
      ) : (
        ''
      )}
        {data.rol ? (
        <RowName>
          <p>{data.rol}</p>
        </RowName>
      ) : (
        ''
      )}
      <td>
        <BsPencilSquare onClick={() => onEditWorker(data)} />

                    <ModalEditWorker
  show={showEditWorker}
  onClose={() => setShowEditWorker(false)}
  data={[selectedMaintenanceData]}
  handleEditWorker={handleEditWorker}
  handleDeleteWorker={handleDeleteWorker}
/>
      </td>
    </DataRow>
  );
}

export function TablaWorkers({ header, data, updateData }) {
  const handleDeleteWorker = (editedData) => {
    const updatedData = data.filter((task) => task.mail !== editedData.correo);
    updateData(updatedData);
  };
  
  const handleEditWorker = (editedData) => {
    const updatedData = data.map((task) => {


      if (task.mail === editedData.correo) {
        return {
          ...task,
          name: editedData.nombre,
          mail: editedData.correo,
          password: editedData.contrasenya,
          rol: editedData.rol,
        };
      }
      return task;
    });
    updateData(updatedData);
  };




  return (
    <Table>
      <thead>
        <TableHeader columnNames={header} />
      </thead>
      <tbody>
        {data.map((treballador) => (
          <TableRow
            key={treballador.id}
            data={treballador}
            handleEditWorker={handleEditWorker}
            handleDeleteWorker={handleDeleteWorker}
          />
        ))}
      </tbody>
    </Table>
  );
}
