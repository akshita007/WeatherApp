import React, { Component } from 'react';
import { Col, Container, FormControl, InputGroup, Row} from 'react-bootstrap';
import './App.css';
import Axios from "axios";
const APIKey=process.env.REACT_APP_WEATHER_API_KEY; 
const baseUrl='https://api.openweathermap.org/data/2.5/';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      location:'',
      weather:{},
    }
  }

  search(e){
    const loc=this.state.location;
    if(e.key==="Enter"&& loc!==""){
      Axios.get(`${baseUrl}weather?q=${loc}&units=metric&&appid=${APIKey}`)
      .then(response=>response)
      .then(result=>{this.setState({
        weather:result.data,
        location:'',
      })})
    .catch(error=>{
      alert("Enter valid city name!! ")
      this.setState({
        location:'',
      })
    })
    }
  }

  updateLocation(value){
    this.setState({
      location:value,
    });
  }
  changeBg(){
    const time= new Date();
    const hr=time.getHours();
    if (hr>=5 && hr<=18){
      return "App";
    }
    else{
      return "App-night";
    }
  }
  setDateTime(){
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d=new Date();
    const date=d.getDate();
    const month=months[d.getMonth()];
    const year=d.getFullYear();
    const day=days[d.getDay()];
    return day+",  "+date+"/"+month+"/"+year;
}
  render() {
    return (
      <div className={this.changeBg()} > 
      <Container className="App-container">
        <Row className="title">
          WEATHER APP
        </Row>
        <Row className="form">
          <Col md={6} offset={3}>
          <InputGroup className="mb-4">
          <FormControl
          placeholder="Enter your location"
          size='lg'
          value={this.state.location}
          onKeyPress={e=>this.search(e)}
          onChange={name=>this.updateLocation(name.target.value)}/>
        </InputGroup>
        </Col>
        </Row>
        <div className="Details">
               <Container>
                    {(typeof(this.state.weather.main)!=="undefined")?(
                      <div>
                        <Row className="Name">
                       {`${this.state.weather.name}, ${this.state.weather.sys.country}`}
                    </Row>
                    <Row className="time">
                       {this.setDateTime()}
                    </Row>
                      <Row className="temp">
                      {`${this.state.weather.main.temp} C`}
                    </Row>
                    <Row className="Name" style={{
                        fontStyle:"italic",
                    }}>
                       {this.state.weather.weather[0].description}
                    </Row>
                    <Row className="Name" style={{
                        fontStyle:"italic",
                    }}>
                       {`${this.state.weather.main.temp_min}/${this.state.weather.main.temp_max}`}
                    </Row>
                    </div>
                    ):(
                      <div className="Name">
                        {`Hello!! search your city's weather forecast here.`}
                      </div>
                    )}
                    
               </Container>
            </div>
      </Container>
      </div>
    );
  }
}

export default App;
