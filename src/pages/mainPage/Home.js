import { Link, useParams } from "react-router-dom";
import Footer from "../../UI/Footer";
import Headar from "../../UI/Header";
import Layout from "../../UI/Layout";
import "../mainPage/Home.css";

//cOMMIT
const Home = (props) => {
  const data = [
    {
      id: 1,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 2,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 3,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 4,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 5,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 6,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 7,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 8,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 9,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
    {
      id: 10,
      idol_ko_name: "갓세븐",
      idol_en_name: "GOT",
      idol_image:
        "https://image.blip.kr/v1/file/9de421cbe5d01b2747c76424ce50d9a4",
      idal_eventTime: "12:00",
      idal_eventDay: "Blackpink 6th Month",
    },
  ];

  const mainImage = data.slice(0, 4);

  return (
    <Layout>
      <div className="home">
        <div className="homeContainer">
          <div className="home_mainBanner"></div>
          <div className="slider">
            <div className="slideBox">
              {data?.map((data) => (
                <div className="slide" key={data.id}>
                  <div className="slideInner">
                    <div className="slideContent">
                      <div className="slideTop">
                        <span>{data.idal_eventTime}</span>
                      </div>
                      <div className="slideMid">
                        <span>{data.idal_eventDay}</span>
                      </div>
                      <div className="slideBot">
                        <span>{data.idol_en_name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="artistSection">
            <article>
              <div className="artistFontWrapper">
                <div className="mainTitle">
                  <p>60팀의 아티스트를</p>
                  <p>최애인에서 만나볼 수 있어요</p>
                </div>
                <div className="subTitle">
                  <p>지금 인기있는 아티스트들을 선택하고</p>
                  <p>스케줄을 확인해서 나만의 스케줄을 만들어보세요</p>
                </div>
              </div>
              <ul className="artistImageWrapper">
                {mainImage?.map((data) => (
                  <li className="artistThumnail" key={data.id}>
                    <Link to={`/${data.id}`}>
                      <img
                        className="artistImage"
                        src={data.idol_image}
                        alt="아티스트 이미지"
                      ></img>
                      <h3 className="artistName">{data.idol_ko_name}</h3>
                      <p className="artistFont">{data.idol_en_name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
