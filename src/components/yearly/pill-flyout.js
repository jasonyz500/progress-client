import React, { Component } from 'react';
import { Box, Flyout, Text, Touchable } from 'gestalt';

class PillFlyout extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleClick = this._handleClick.bind(this);
    this.handleDismiss = this._handleDismiss.bind(this);
  }

  _handleClick() {
    console.log('asdf');
    this.setState(() => ({ open: !this.state.open }));
  }
  _handleDismiss() {
    this.setState(() => ({ open: false }));
  }

  fillPillText(pill) {
    
  }

	render() {
    const { pill } = this.props;
		return (
      <Box>
        <div
          style={{ display: "inline-block" }}
          ref={c => {
            this.anchor = c;
          }}
        >
          <Touchable
            onTouch={this.handleClick}
          >
            <Box shape="pill" color={pill.name ? "lightGray" : "transparent"} marginTop={1} padding={1}>
                <Text align="center" onClick={this.handleClick}>{pill.name}</Text>
            </Box>
          </Touchable>
        </div>
        {this.state.open &&
          <Flyout
            anchor={this.anchor}
            idealDirection="up"
            onDismiss={this.handleDismiss}
          >
            <Text>{pill.name}</Text>
          </Flyout>
        }
      </Box>
    );
	}
}

export default PillFlyout;