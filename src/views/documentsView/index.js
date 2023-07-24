/* eslint-disable no-console */
import '../../assets/scss/lbd/_workerMarkingHistory.scss';
import React, { useState, useRef } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { Container } from './components';

function DocumentsView() {
  const [fileInfo, setFileInfo] = useState({ title: '', description: '', files: [] });

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFileInfo((prevInfo) => ({ ...prevInfo, files: selectedFiles }));
  };

  const handleSubmit = () => {
    const newData = {
      title: fileInfo.title,
      description: fileInfo.description,
      files: fileInfo.files,
    };
    handleCreateTasca(newData);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleCreateTasca = (newData) => {
    console.log('Nuevo dato:', newData);
  };


  return (
    <div>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Container>
              <div className="upload">
                <div className="wrapperp">
                  <div className="file-upload">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                    <BsCloudUpload onClick={handleFileInputClick} />
                  </div>
                </div>
                <div style={{ display: 'grid' }}>
                  <input
                    type="button"
                    id="selected"
                    value={
                      fileInfo.files.length > 0
                        ? `${fileInfo.files.length} archivos seleccionados`
                        : 'Seleccionar archivos'
                    }
                    onClick={handleFileInputClick}
                  />
                  <text>Puja els teus arxius aquí</text>
                </div>
              </div>
              <div className="popup-content">
                <p>Titol</p>
                <input
                  type="text"
                  name="title"
                  placeholder="Título"
                  value={fileInfo.title}
                  onChange={(event) =>
                    setFileInfo((prevInfo) => ({ ...prevInfo, title: event.target.value }))
                  }
                />
                <p>Descripció</p>
                <textarea
                  name="description"
                  placeholder="Descripció"
                  value={fileInfo.description}
                  onChange={(event) =>
                    setFileInfo((prevInfo) => ({ ...prevInfo, description: event.target.value }))
                  }
                />
                <button className="btn-up" type="submit" onClick={handleSubmit}>
                  Pujar
                </button>
              </div>
            </Container>
          </div>
        </div>
    </div>
  );
}

export default DocumentsView;
