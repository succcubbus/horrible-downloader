import React, { Component } from 'react';
import FeedParser from 'feedparser';

export default class Feed extends Component {
  constructor() {
    super();
    this.data = [];
    this.fetchData();
  }

  data;

  fetchData() {
    const parser = new FeedParser([{}]);

    parser.on('data', data => this.data.push(data));

    fetch('/feed')
      .then(res => res.text())
      .then(t => parser.write(t, undefined, () => this.forceUpdate()));
  }

  render() {
    return (
      <ul id="feed">
        {this.data.map(article => <li key={article.guid}>{article.title}</li>)}
      </ul>
    );
  }
}
