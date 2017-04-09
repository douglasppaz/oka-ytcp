import React from 'react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import Layout from '../components/Layout';


class NoMatch extends React.Component {
  render() {
    return (
      <Layout>
        <Card className="container">
          <CardText>Página não encontrada</CardText>
        </Card>
      </Layout>
    );
  }
}

export default NoMatch;
