import React from 'react';
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';

export default class LinkButton extends React.Component {
  state = { redirect: false };
  handleOnClick() {
    this.setState({redirect: true});
  }
  render() {
    return (
      <>
        {this.state.redirect ?
          <Redirect push to={this.props.to} />
        :
          <></>
        }
        <Button
          {...this.props}
          onClick={(e) => {
            if(typeof this.props.onClick === 'function') {
              this.props.onClick(e);
            }
            this.setState({redirect: true});
          }}
        >
          {this.props.children}
        </Button>
      </>
    );
  }
}
