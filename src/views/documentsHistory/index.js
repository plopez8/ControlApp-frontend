import React from 'react';
import { TablaDocuments } from 'components/TablaDocuments/TablaDocuments';
import { PagesIndex } from 'components/PagesIndex/PagesIndex';
import { Calendar } from 'components/CalendarFilter/Calendar';
import '../../assets/scss/lbd/_workerMarkingHistory.scss';

function documentsHistory() {

  const header = [
    { name: 'Titol', drop: false },
    { name: 'Treballador', drop: false },
    { name: 'Data', drop: true },
    { name: 'Hora', drop: true },
    { name: 'Descripcio', drop: false },
    { name: 'Arxiu', drop: false },
  ];

  const data = [
    {
      header: 'Caldera',
      info: [
        { element: 'Joan Camps', type: 'user' },
        { element: '17/01/2023', color: '#ccddf8' },
        { element: '09:35h', color: '#ccddf8' },
      ],
      description: "DEscripcio 1 asdj`fpakekfpàfpkdmvlñnfkkgf k`kdfak `sdkfp ksad`kfas`dfasdjojasfd",
    },
  ];

  return (
    <div className="home">
      <div className="filterBox">
        <Calendar />
      </div>

      <div className="filterInfo">
        <div className="dateType">
          <h1>Historial de documents</h1>
        </div>
      </div>
      <TablaDocuments header={header} data={data}></TablaDocuments>
      <PagesIndex num={4} />
    </div>
  );
}

export default documentsHistory;
