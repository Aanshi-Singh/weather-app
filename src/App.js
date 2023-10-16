// import './App.css';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TiLocationArrow } from "react-icons/ti";
import { useState } from "react";
import { RiCompass2Line } from "react-icons/ri";


function App() {
  const [location, setLocation] = useState("");
  const [addLocation, setAddLocation] = useState("");

  const fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${addLocation}&units=metric&APPID=211158a74590af681a5f6a978c12427e`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setLocation(responseJson);
  };

  const handleInputChange = (e) => {
    setAddLocation(e.target.value);
  };


  const bgColor = (val) => {
    if(val<=-10)
    return "bg-gradient-to-br from-sky-600 to-black text-white";
    else if (val <= 0) {
      return "bg-gradient-to-br from-sky-500 bg-blue-950 text-white";
    } 
    else if(val<= 15) {
      return "bg-gradient-to-br from-sky-200 to-blue-900 text-white";
    }
    else if(val<= 25) {
      return "bg-gradient-to-br from-orange-500 to-blue-100 text-white";
    }
    else if(val<=40) {
      return "bg-gradient-to-br from-orange-500 to-amber-100";
    }
    else return "bg-gradient-to-br from-yellow-200 to-blue-500"
    
  }

  const dateTimeStr = (val) => {
    const strDate = new Date().toLocaleString("en-US", { val});
    return strDate; }
  
    var iconurl = "http://openweathermap.org/img/w/" + location?.weather?.[0]?.icon + ".png";

  return (
    <div className={bgColor(location?.main?.temp)}>
  

      <div className=" flex flex-col items-center justify-evenly h-screen text-lg">
        <div className="text-black w-7/12 drop-shadow-xl bg-white p-4 border-1 border-slate-400 rounded-lg flex justify-between">
          <input
            className="w-full px-2"
            onChange={(event) => handleInputChange(event)}
          />
          <button onClick={fetchApi}><AiOutlinePlusCircle size="1.5rem" /></button>
        </div>
        {(!location || location?.message === "city not found")? (
          <p>No Data</p>
        ) : (

          <div className="w-1/2">
            <p className="text-xl text-red-700 drop-shadow-lg shadow-black">{dateTimeStr(location?.timezone)}</p>
            <h2 className="font-bold text-7xl"> {location?.sys?.country}, {location?.name}</h2>
            <p>{location?.main?.temp} &deg; Celcius</p>
            <p>Feels like {location?.main?.feels_like} &deg; Celcius</p>
            <div className="flex">
            <img src = {iconurl} alt={location?.weather?.[0]?.main}/>
            <div className="w-max px-2 rounded-lg  text-white bg-red-700 shadow-lg shadow-red-500/50 mt-3 mb-3">{location?.weather?.[0]?.main}</div>
            </div>
            
            <div className="border-x-4 border-gray-500 px-2 flex flex-wrap justify-between">
            {/* <p>Minmum Temperature <span className="float-right">{Math.ceil(location?.main?.temp_min)} &deg; Celcius</span></p>
            <p>Maximum Temperature <span className="float-right">{location?.main?.temp_max}</span></p> */}

            <p className="flex items-center"> <icon rotate={location?.wind?.deg}><TiLocationArrow/></icon>Speed  &nbsp; <span>{location?.wind?.speed}  m/s</span></p>

            <p className="flex items-center"> <icon ><RiCompass2Line/></icon>Pressure &nbsp; <span className="">{location?.main?.pressure}</span></p>
            <p>Humidity &nbsp; <span>{location?.main?.humidity} %</span></p>
            <p>Visibility &nbsp; <span >{location?.visibility/1000} K</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
