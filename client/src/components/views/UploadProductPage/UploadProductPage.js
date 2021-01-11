import React, {useState} from 'react';
import {Typography, Form, Input, Button} from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import {url} from '../../../Config';

const {Title} = Typography;
const {TextArea} = Input;
const Continents = [
  'Africa',
  'South America',
  'North America',
  'Asia',
  'Europe',
  'Antarctica',
  'Australia',
];

function UploadProductPage(props) {
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(Continents[0]);
  const [Images, setImages] = useState([]);

  const nameChangeHandler = event => setName(event.currentTarget.value);

  const descriptionChangeHandler = event =>
    setDescription(event.currentTarget.value);

  const priceChangeHandler = event => setPrice(event.currentTarget.value);
  const continentChangeHandler = event =>
    setContinent(event.currentTarget.value);
  const syncImage = images => setImages(images);
  const submitHandler = event => {
    event.preventDefault();

    if (!Name || !Description || !Price || !Continent || Images.length < 1) {
      return alert('모든 값을 입력해 주세요.');
    }
    const data = {
      writer: props.user.userData.id,
      title: Name,
      description: Description,
      price: Price,
      continents: Continent,
      images: Images,
    };
    console.log(data.writer);
    axios.post(`${url}/api/product`, data).then(res => {
      if (res.data.success) {
        alert('상품 등록 성공!');
      } else {
        alert('상품 등록 실패');
      }
    });
  };

  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>
      <Form onSubmitCapture={submitHandler}>
        {/* dropzone */}
        <FileUpload syncImagesFunc={syncImage} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={nameChangeHandler} value={Name}></Input>
        <br />
        <br />
        <label>설명</label>
        <TextArea
          onChange={descriptionChangeHandler}
          value={Description}
        ></TextArea>
        <br />
        <br />
        <label>가격($)</label>
        <Input
          type="number"
          onChange={priceChangeHandler}
          value={Price}
        ></Input>
        <br />
        <br />
        <select onChange={continentChangeHandler}>
          {Continents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
