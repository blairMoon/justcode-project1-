import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Home.scss';
import Nav from '../../components/Nav/Nav';
import SliderImages from '../../components/SliderImages/SliderImages';
import Footer from '../../components/Footer/Footer';
import CardList from '../../components/Maincontent/CardList';
import Dropdown from '../../components/Filter/Dropdown';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const filterList = ['카테고리', '가격', '이름순', '해택']; //대장카테고리
  const mockData = `http://localhost:3000/data/mockData.json`;
  // const queryData=`http://localhost:3000?all=${search}`
  //mock데이터 들고오기
  useEffect(() => {
    fetch(mockData)
      .then(res => res.json())
      .then(json => setData(json.data));
  }, []);

  //검색창 활성화 구현
  const filterTitle = data.filter(item =>
    item.title
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase().replace(' ', ''))
  );

  return (
    <div className="mainPages">
      <Nav setSearch={setSearch} />
      <Header />
      <SliderImages />

      <div className="wrap">
        <div>
          <div className="filter">필터</div>
          {filterList.map(list => (
            <Dropdown key={list} list={list} data={data} setData={setData} />
          ))}
        </div>

        <div className="MaincontentWrap">
          <div className="MainContentBox">
            <div className="MainContentTitle">
              <span>제목 들어오는 자리</span>
            </div>
            <div className="productInformation">
              {filterTitle.map(values => {
                const { id, title, price } = values;
                return (
                  <CardList data={data} key={id} title={title} price={price} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
