import React, { Component, Fragment } from 'react';
import FetchData from './FetchData.js';
import IssueItem from './issue-item.js';
import logo from './logo.svg';

export default class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  GetApiData() {
    FetchData().then(response => {
      let newRez = response.filter(data => data.assignee == null);
      const data = newRez.reduce(
        (acc, issue) => {
          const label =
            issue.labels.length > 0 ? issue.labels[0].name : 'Unlabeled';

          if (!acc.hasOwnProperty(label)) {
            acc[label] = [];
          }

          acc[label].push(issue);
          return acc;
        },
        { Unlabeled: [] }
      );
      this.setState({
        data
      });
    });
  }

  renderIssuesList = () => {
    const { data } = this.state;

    const labels = Object.keys(data);

    return labels.map(label => {
      return (
        <Fragment key={label}>
          <h2>{label}</h2>
          <ul className="list-group">
            {data[label].map(issue => (
              <IssueItem issue={issue} key={issue.id} />
            ))}
          </ul>
        </Fragment>
      );
    });
  };

  componentWillMount() {
    this.GetApiData();
  }

  render() {
    console.log(this.state);
    return (
      <div className="col-md-12">
        {Object.keys(this.state.data).filter(label => label !== 'Unlabeled')
          .length > 0
          ? this.renderIssuesList()
          : 'Looks like we are good for right now, but please check back soon!'}
      </div>
    );
  }
}
