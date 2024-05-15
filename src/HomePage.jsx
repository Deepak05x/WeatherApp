import "./HomePage.css"
import axios from "axios"

import searching_png from './assets/searching.png'
import image_png from "./assets/image.png"
import windnew_png from "./assets/windnew.png"
import humiditynew_png from "./assets/humiditynew.png"
import cloud_png from "./assets/cloud.png"
import clear_png from "./assets/clear.png"
import rain_png from "./assets/rain.png"
import drizzle_png from "./assets/drizzle.png"
import snow_png from "./assets/snow.png"
import { useState } from "react"

 export default function HomePage(){

    const [data,setData] = useState({
        celcius : null,
        location : 'Chennai',
        speed : null,
        humidity : null,
        image: cloud_png
    }
    )

    const [name, setName] = useState("")

    const handleClick = ()=>{
        if(name !== ""){
            let api_key = "a24871c892f02d3d11b33921cee83e0a";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=Metric&appid=${api_key}`
            axios.get(url)
            .then(res => {
                let imagePath = ''
                if(res.data.weather[0].main == 'Clouds'){
                    imagePath = cloud_png
                }
                else if(res.data.weather[0].main == 'Clear'){
                    imagePath = clear_png   
                }
                else if(res.data.weather[0].main == 'Rain'){
                    imagePath = rain_png
                }
                else if(res.data.weather[0].main == 'Drizzle'){
                    imagePath = drizzle_png
                }
                else if(res.data.weather[0].main == 'Mist'){
                    imagePath = snow_png
                }
                else{
                    imagePath = image_png
                }
                console.log(res.data)
                setData({
                    ...data, celcius: res.data.main.temp, 
                    location: res.data.name, 
                    speed: res.data.wind.speed, 
                    humidity: res.data.main.humidity, 
                    image: imagePath
                })
            })
            .catch(err => {
                if(err.response.status === 404){
                    alert("Invalid Input \nPlease Enter A Valid City/State")
                }
            })
        }
    }

    const handleChange = (e) => {
        setName(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("button clicked");
      }


    return(
        
            <div className="container">
                <div className="container_mini">
                    <form className="header" onSubmit={handleSubmit}>
                        <input type="text" id="search" className="input"  onChange={handleChange} />
                        <div className="search_div">
                            <button className="search_button" type="submit" >
                                <img src={searching_png} alt="" className="search" onClick={handleClick}/>
                            </button>
                        </div>
                    </form>
                
                    <div className="middle">
                        <div>
                            <img src={data.image} alt="" className="season" />
                            <div className="middle_section">
                                <h1 className="degree">{Math.round(data.celcius)}&deg;c</h1>
                                <h2 className="place">{data.location}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="footer_container_1">
                            <img src={humiditynew_png} alt="" className="footer_img" />
                            <div className="last">
                                <p className="size">{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>  
                            </div>
                        </div>
                        <div className="footer_container_2">
                            <img src={windnew_png} alt="" className="footer_img" />
                            <div className="last">
                                <p className="size">{(data.speed)} Km/h</p>
                                <p>Wind Speed</p>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )

 }