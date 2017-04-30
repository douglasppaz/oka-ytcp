import React from 'react';
import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField/TextField';
import FontIcon from 'material-ui/FontIcon/FontIcon';

const style = {
  paper: {
    padding: '0 8px'
  },
  searchIcon: {
    margin: '0 8px 0 0'
  }
};

class YTSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { icon: 'search' };
    this.timeout = null;
  }

  onChange(value) {
    const { onChange } = this.props;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.setState({ icon: 'keyboard' });
    this.timeout = setTimeout(() => {
      onChange(value);
      this.setState({ icon: 'search' });
    }, 750);
  }

  render () {
    const { icon } = this.state;

    return (
      <div className="container">
        <Paper
          style={style.paper}
          zDepth={1}
          data-flex
          data-layout="row"
          data-layout-align="start center"
        >
          <FontIcon
            className="material-icons"
            style={style.searchIcon}
          >{icon}</FontIcon>
          <TextField
            hintText="Buscar por vídeo"
            fullWidth={true}
            onChange={(e, newValue) => this.onChange(newValue)}
          />
        </Paper>
      </div>
    );
  }
}

YTSearch.propTypes = { onChange: React.PropTypes.func };

export default YTSearch;
