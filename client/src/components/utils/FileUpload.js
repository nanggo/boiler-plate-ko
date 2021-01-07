import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import {PlusOutlined} from '@ant-design/icons';
import axios from 'axios';
import {url} from '../../Config';

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const fileDropHandler = files => {
    const formData = new FormData();
    formData.append('file', files[0]);
    const config = {
      header: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(`${url}/api/product/image`, formData, config)
      .then(res => {
        if (res.data.success) {
          setImages([...Images, res.data.filepath]);
          props.syncImagesFunc([...Images, res.data.filepath]);
        } else {
          alert('파일 업로드 실패');
        }
      })
      .catch(err => alert(err.message));
  };
  const deleteImageHandler = image => {
    const images = [...Images];
    const index = Images.indexOf(image);
    images.splice(index, 1);

    setImages(images);
    props.syncImagesFunc(images);
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
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {Images.map((image, index) => {
          return (
            <img
              key={index}
              style={{minWidth: '300px', width: '300px', height: '240px'}}
              src={`${url}/${image}`}
              alt={image.filename}
              onClick={() => deleteImageHandler(image)}
            ></img>
          );
        })}
      </div>
    </div>
  );
}

export default FileUpload;
