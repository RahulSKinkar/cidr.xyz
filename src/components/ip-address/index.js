import { Netmask } from 'netmask';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class IPAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octets: [10, 88, 135, 144],
      cidr: 28
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    var octets = this.state.octets;
    var val = +event.target.value.replace(/[^0-9]/g, '');
    var octet = event.target.attributes['data-octet'].value;
    if (octet == 'cidr') {
      if (val <= 32) {
        this.setState({
          cidr: val
        });
      }
    } else {
      if (val <= 255) {
        octets[+octet] = val;
        this.setState({
          octets: octets
        });
      }
    }
  }

  handleKeyDown(event) {
    var lowerOctetValue = 0;
    var higherOctetValue = event.target.dataset.octet === 'cidr' ? 32 : 255;
    if (event.key === 'ArrowDown' && event.target.value > lowerOctetValue) {
      event.target.value = +event.target.value - 1;
      this.handleChange(event);
    }
    if (event.key === 'ArrowUp' && event.target.value < higherOctetValue) {
      event.target.value = +event.target.value + 1;
      this.handleChange(event);
    }
  }

  getPretty() {
    return this.state.octets.join('.') + '/' + this.state.cidr;
  }

  render() {
    var details = new Netmask(this.getPretty());

    return (
      <div className='row'>
        <div className="col-12 ip-address">
          <div className="address">
            {[...Array(4)].map((x, octet) => (
              <span className="octet">
                <input
                  className="octet"
                  type="text"
                  data-octet={octet}
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDown}
                  value={this.state.octets[octet]}
                />
                <span className="dot">{octet == '3' ? '/' : '.'}</span>
              </span>
            ))}
            <input
              className="cidr"
              type="text"
              data-octet="cidr"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={this.state.cidr}
            />
          </div>

          <div className="bits">
            <ol>
                <li className="octet">
                  <ol>
                    {[...Array(8)].map((x, bit) => (
                      <li
                        className={
                          0 * 8 + bit > this.state.cidr - 1
                            ? 'bit masked'
                            : 'bit unmasked'
                        }
                      >
                        {(this.state.octets[0] & (1 << (7 - bit))) >>
                          (7 - bit)}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <span className="netmask">
                      <span className="value">{details.mask}</span>
                      <span className="label">Netmask</span>
                    </span>
                  </div>
                </li>

                <li className="octet">
                  <ol>
                    {[...Array(8)].map((x, bit) => (
                      <li
                        className={
                          1 * 8 + bit > this.state.cidr - 1
                            ? 'bit masked'
                            : 'bit unmasked'
                        }
                      >
                        {(this.state.octets[1] & (1 << (7 - bit))) >>
                          (7 - bit)}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <span className="netmask">
                      <span className="value">{details.first}</span>
                      <span className="label">First IP</span>
                    </span>
                  </div>
                </li>

                <li className="octet">
                  <ol>
                    {[...Array(8)].map((x, bit) => (
                      <li
                        className={
                          2 * 8 + bit > this.state.cidr - 1
                            ? 'bit masked'
                            : 'bit unmasked'
                        }
                      >
                        {(this.state.octets[2] & (1 << (7 - bit))) >>
                          (7 - bit)}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <span className="netmask">
                      <span className="value">{details.last}</span>
                      <span className="label">Last IP</span>
                    </span>
                  </div>
                </li>

                <li className="octet">
                  <ol>
                    {[...Array(8)].map((x, bit) => (
                      <li
                        className={
                          3 * 8 + bit > this.state.cidr - 1
                            ? 'bit masked'
                            : 'bit unmasked'
                        }
                      >
                        {(this.state.octets[3] & (1 << (7 - bit))) >>
                          (7 - bit)}
                      </li>
                    ))}
                  </ol>
                  <div>
                    <span className="netmask">
                      <span className="value">{details.size.toLocaleString()}</span>
                      <span className="label">Count</span>
                    </span>
                  </div>
                </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default IPAddress