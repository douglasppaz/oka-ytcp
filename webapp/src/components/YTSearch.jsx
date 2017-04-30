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
  render () {
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
          >search</FontIcon>
          <TextField
            hintText="Buscar por vídeo"
            fullWidth={true}
          />
        </Paper>
      </div>
    );
  }
}

export default YTSearch;
