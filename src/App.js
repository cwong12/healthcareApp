import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

import HospitalSearch from './hospitalSearch.jsx';



class App extends Component {
  constructor(props: Props) {
    super(props);

    document.title = "HealthCare Matching";

}
  render() {

  return (
    <div className="App">


      <div className="mapwrapper">
        <HospitalSearch  />
        </div>
    </div>

    );
  }
}

export default App;
