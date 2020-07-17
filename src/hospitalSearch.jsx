import React, { Component } from 'react';
import './hospitalSearch.css';

import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class hospitalSearch extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      zip: 63141,
      radius: 5,
      showing: false,
      hospMatches: []
    }

    this.getHospitals = this.getHospitals.bind(this);
    this.chooseRadius = this.chooseRadius.bind(this);
  }


  getHospitals(e){

    let radius = this.state.radius * 1;

    fetch('http://localhost:8080/results', {
      headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json"
          },
      method: 'POST',
      body: JSON.stringify({
          zipCode: this.state.zip,
          rad: radius
      })

    })
    .then(res => res.json())
    .then(data => {

      console.log(data);

      const showing = this.state.showing;
      this.setState({showing: true});
      console.log(data[244]);
      var matchList = []
      for (let i in data){
        let curMatch = data[i];
        let curName = curMatch["Hospital Name"]
        let curAddress = curMatch["Street"]
        console.log(curName);
        matchList.push([curName, curAddress])
      }

      this.setState({hospMatches: matchList});
      console.log(this.state.hospMatches);


    }).catch(err => {
      console.log(err);
    })
    e.preventDefault();
  }

  //handle dropdown menu changing
  chooseRadius(val){
    console.log(val);
    this.setState({radius :val})

  }

  render() {
    return(
      <div className = "admin">



        <Form id = "btn" onSubmit = {this.getHospitals}>
          <InputGroup id="admin-form">
            <Form.Group id="admin-add-form" >
              <Form.Label>Enter Zip Code:</Form.Label>
              <Form.Control onChange={e => this.setState({zip :e.target.value})} type="email" placeholder="Zip Code" />
            </Form.Group>
          </InputGroup>

          <Dropdown  onSelect={this.chooseRadius}>
            <Dropdown.Toggle   variant="success" id="dropdown-basic">
              Radius
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey='5'>5 miles</Dropdown.Item>
              <Dropdown.Item eventKey='10'>10 miles</Dropdown.Item>
              <Dropdown.Item eventKey='50'>50 miles</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button  variant="success"  onClick={this.getHospitals}>Enter</Button>
        </Form>



        <div>
        { this.state.showing ?
          <div>
          {this.state.hospMatches.map((item, index) => (
            <div className = "resultBox">
              <div className = "resultText">
              {item[0]}
              </div>

              <div>
              Address: {item[1]}
              </div>
            </div>
      ))}
        </div>
          : null }
             </div>
      </div>


    );
  }
}
