import React from 'react';
import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';
import Layout from '../components/Layout';


class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Card className="container">
          <CardText>OKa</CardText>
        </Card>
      </Layout>
    );
  }
}

export default Home;
