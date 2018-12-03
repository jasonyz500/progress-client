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
    this.setState(() => ({ open: !this.state.open }));
  }
  _handleDismiss() {
    this.setState(() => ({ open: false }));
  }

  fillPillText(pill) {
    const size = 8*(pill.end - pill.start) + 5;
    const len = pill.name.length;
    if (size >= len) {
      return pill.name;
    }
    return `${pill.name.slice(0, size)}...`;
  }

	render() {
    const { pill } = this.props;
		return (
      <Box>
        <div
          ref={c => {
            this.anchor = c;
          }}
        >
        {pill.name &&
          <Touchable
            onTouch={this.handleClick}
          >
            <Box flex="grow" shape="pill" color="lightGray" marginTop={1} padding={1}>
                <Text align="center">{this.fillPillText(pill)}</Text>
            </Box>
          </Touchable>
        }
        </div>
        {this.state.open && pill.name && 
          <Flyout
            anchor={this.anchor}
            idealDirection="up"
            onDismiss={this.handleDismiss}
          >
            <Box padding={2}>
              <Text>{pill.name}</Text>
            </Box>
          </Flyout>
        }
      </Box>
    );
	}
}

export default PillFlyout;