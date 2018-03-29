import React, { Component } from 'react';


class roosterSearch extends Component {
  constructor() {
    super();

    this.state = {
      text: ''
    }

    this.changeInput = this.changeInput.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  changeInput = (e) => {
    const { value } = e.target;

    this.setState({
      search: value,
    })
  }


  render() {
    return(
      <Paper className={classes.paper} elevation={4}>
        <form onSubmit={this.onSearch}>
            <Toolbar>
              <Input
                className={classes.search}
                value={search}
                onChange={this.changeInput}
              />
            </Toolbar>
        </form>
      </Paper>
      
    )
  }
  
}