import React, { useState } from 'react';
import styled from 'styled-components';
import '../../assets/scss/lbd/_requestView.scss';
import { FaRegUserCircle, FaChevronDown } from 'react-icons/fa';
import ModalDescription from 'components/ModalDocuments/modalDescription';
import { BsPencilSquare, BsFillExclamationCircleFill } from 'react-icons/bs';
import ModalEditMaintenance from 'components/modalsTasks/modalEditMaintenance';
import { format } from 'date-fns';


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
const User = styled.div`
  width: 140px;
  height: 30px;
  border-radius: 5px;
  background: #3472f720;
  color: #3472f7;
  margin: 15px auto;

  display: flex !important;
  align-items: center !important;
  justify-content: space-around !important;

  svg {
    margin: auto;
    margin-right: 0.5em;
    font-size: 1.2em;
  }
  p {
    margin: auto;
    margin-left: 0;
    font-size: small;
    font-weight: 600;
  }
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
const Element = styled.p`
  width: 120px;
  height: 30px;
  border-radius: 30px;
  background: #ff7803;
  color: ${(props) => props.fontColor};
  background: ${(props) => props.color};
  margin: 15px auto;

  display: flex;
  justify-content: center;
  align-items: center;
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

function complexTd({ info }) {
  return (
    <td key={info.color}>
      {info.map((subelement) =>
        subelement.type === 'user' ? (
          <User key={subelement.element}>
            <FaRegUserCircle></FaRegUserCircle>
            <p>{subelement.element}</p>
          </User>
        ) : (
          <Element
            key={1}
            color={subelement.color}
            fontColor={
              subelement.fontColor ? subelement.fontColor : '#151515'
            }
          >
            {subelement.element}
          </Element>
        )
      )}
    </td>
  );
}

function simpleTd({ info }) {
  return info.type === 'user' ? (
    <td>
      <User>
        <FaRegUserCircle></FaRegUserCircle>
        <p>{info.element}</p>
      </User>
    </td>
  ) : (
    <td key={info.color}>
      <Element
        color={info.color}
        fontColor={info.fontColor ? info.fontColor : '#151515'}
      >
        {info.element}
      </Element>
    </td>
  );
}

function TableRow({ data, handleCheckboxChange, handleEditTasca, handleDeleteTasca }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showEditMaintenance, setShowEditMaintenance] = useState(false);
  const [selectedMaintenanceData, setSelectedMaintenanceData] = useState(null);
  const handleDescriptionClick = () => {
    setShowDescription(true);

  };

  const onEditMaintenance = (maintenanceInfo) => {
    setSelectedMaintenanceData(maintenanceInfo);
    setShowEditMaintenance(true);
  };

  return (
    <DataRow>
      {data.header ? (
        <RowName>
          <p>{data.header}</p>
        </RowName>
      ) : (
        ''
      )}
      {data.info.map((info) =>
        Array.isArray(info) ? (
          complexTd({ info })
        ) : (
          simpleTd({ info })
        )
      )}
      <td>
        <button 
        type='submit'
        onClick={handleDescriptionClick}>
          <BsFillExclamationCircleFill />
        </button>

        <ModalDescription
          show={showDescription}
          text= {data.description}
          onClose={() => {
            setShowDescription(false);
          }}
        />

      </td>
      <td>
        <BsPencilSquare onClick={() => onEditMaintenance(data)} />

                    <ModalEditMaintenance
  show={showEditMaintenance}
  onClose={() => setShowEditMaintenance(false)}
  data={[selectedMaintenanceData]}
  handleEditTasca={handleEditTasca}
  handleDeleteTasca={handleDeleteTasca}
/>
      </td>
      <td>
        <input
          type="checkbox"
          onChange={(event) => handleCheckboxChange(event, data)}
          style={{ margin: 'auto' }}
          checked={data.completed}
        />
      </td>
    </DataRow>
  );
}

export function Tabla({ header, data, updateData }) {
  const handleCheckboxChange = (event, worker) => {
    const updatedData = data.map((task) => {
      if (task === worker) {
        return { ...task, completed: event.target.checked };
      }
      return task;
    });
    updateData(updatedData);
  };
  const handleDeleteTasca = (editedData) => {
    const updatedData = data.filter((task) => task.id !== editedData.id);
    updateData(updatedData);
  };
  
  const handleEditTasca = (editedData) => {
    const updatedData = data.map((task) => {
      let fecha;
      let fechas;
      let trabajadores
      try {
        fecha = format(editedData.datePicker1, 'MMM dd yyyy');
      } catch {
        fecha = editedData.datePicker1
      }

      try {
        fechas = editedData.datePicker2.map(date => format(date, 'MMM dd yyyy'));
      } catch {
        fechas = editedData.datePicker2;
      }
      try{
        trabajadores = editedData.trabajador.split(',');
      } catch{
        trabajadores = editedData.trabajador
      }


      if (task.id === editedData.id) {
        return {
          ...task,
          header: editedData.titulo,
          info: [
            { element: editedData.cliente, type: 'user' },
            { element: fecha, color: '#ccddf8' },
            { element: editedData.time, color: '#ccddf8' },
          ],
          description: editedData.descripcion,
          worker: trabajadores,
          dataalarm: fechas,
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
            handleCheckboxChange={handleCheckboxChange}
            handleEditTasca={handleEditTasca}
            handleDeleteTasca={handleDeleteTasca}
          />
        ))}
      </tbody>
    </Table>
  );
}
