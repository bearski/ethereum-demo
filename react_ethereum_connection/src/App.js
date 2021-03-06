import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props){
    super (props);

    const myContract = window.web3.eth.contract (
      [
        {
          "constant": true,
          "inputs": [],
          "name": "you_awesome",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getState",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getSecret",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "kill",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "newState",
              "type": "string"
            }
          ],
          "name": "setState",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "payable": true,
          "stateMutability": "payable",
          "type": "fallback"
        }
      ]     
    );

    this.state = {
      ContractInstance: myContract.at ('0x2c2f765d43f50e99763dc658600a0b14bd573c99'),
      contractState: ''
    }

    this.querySecret = this.querySecret.bind (this);
    this.queryState = this.queryState.bind (this);
    this.handleContractStateSubmit = this.handleContractStateSubmit.bind (this);
  }

  querySecret () {
    const { getSecret } = this.state.ContractInstance;

    getSecret ((err, secret) => {
      if (err) console.log('error getting secret: ', err);
      console.log ('secret:  ', secret)
    })
  }

  queryState () {
    const { getState } = this.state.ContractInstance;

    getState ((err, state) => {
      if (err) console.log('error getting state: ', err);
      console.log ('state:  ', state)
    })
  }

  handleContractStateSubmit (event) {
    event.preventDefault ();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    setState (
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract state is changing.');
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React & Ethereum Application</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <br />
        <br />
        <button onClick={ this.querySecret }> Get Secret </button>
        <br />
        <br />
        <button onClick={ this.queryState }> Get State </button>
        <br />
        <br />

        <form onSubmit={ this.handleContractStateSubmit } >
          <input
            type="text"
            name="state-change"
            placeholder="Enter new state"
            value={ this.state.contractState }
            onChange= { event => this.setState ({ contractState: event.target.value }) } />
          <button type="submit"> Submit </button>
        </form>

      </div>
    );
  }
}

export default App;
