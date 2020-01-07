
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './style.scss';

import { Netmask } from 'netmask';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Header, Footer, IPAddress } from './components'

const App = () => (
  <React.Fragment>
    <Header />
    <div className='container'>
      <p>
        <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing">CIDR</a>&nbsp;
        is a notation for describing blocks of IP addresses and is used heavily in various networking configurations. IP addresses contain 4 octets, each consisting of 8 bits giving values between 0 and 255. The decimal value that comes after the slash is the number of bits consisting of the routing prefix. This in turn can be translated into a netmask, and also designates how many available addresses are in the block.
      </p>

      <IPAddress />
    </div>
    <Footer />
  </React.Fragment>
)

ReactDOM.render(<App />, document.getElementById('app'));
