import React, {useState} from 'react';
import {Typography, Form, Input, Button} from 'antd';
import FileUpload from '../../utils/FileUpload';

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

function UploadProductPage() {
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const nameChangeHandler = event => setName(event.currentTarget.value);

  const descriptionChangeHandler = event =>
    setDescription(event.currentTarget.value);

  const priceChangeHandler = event => setPrice(event.currentTarget.value);

  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>
      <Form>
        {/* dropzone */}
        <FileUpload />
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
        <select>
          {Continents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit">확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
