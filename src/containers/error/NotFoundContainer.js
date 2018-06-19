import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    textAlign: 'center',
  },
});

class NotFoundContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          404 Page not found
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(NotFoundContainer);