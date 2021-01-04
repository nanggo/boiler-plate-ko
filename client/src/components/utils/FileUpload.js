import React from 'react';
import Dropzone from 'react-dropzone';
import {PlusOutlined} from '@ant-design/icons';
import axios from 'axios';

function FileUpload() {
  const fileDropHandler = files => {
    const formData = new FormData();
    formData.append('file', files[0]);
    const config = {
      header: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/api/product/image', formData, config)
      .then(res => {
        if (res.data.success) {
        } else {
          alert('파일 업로드 실패');
        }
      })
      .catch(err => alert(err.message));
  };
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={fileDropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div
              style={{
                width: 300,
                height: 240,
                border: '1px solid lightgrey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <PlusOutlined type="plus" style={{fontSize: '3rem'}} />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
