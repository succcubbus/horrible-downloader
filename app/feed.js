import React, { Component } from 'react';
import FeedParser from 'feedparser';
import ReleaseParser from './release-parser';

export default class Feed extends Component {
  constructor() {
    super();
    this.data = [];
    this.fetchData();
  }

  data;

  fetchData() {
    const parser = new FeedParser([{}]);

    parser.on('data', data => {
      const release = ReleaseParser.parse(data);

      const containsEpisode =
        this.data.filter(
          e => e.series === release.series && e.episode == release.episode,
        ).length !== 0;

      if (!containsEpisode) this.data.push(release);
    });

    fetch('/feed')
      .then(res => res.text())
      .then(t => parser.write(t, undefined, () => this.forceUpdate()));
  }

  render() {
    return (
      <ul id="feed">
        {this.data.map(release => (
          <li key={release.guid}>
            <strong>{release.series}</strong> - {release.episode}
          </li>
        ))}
      </ul>
    );
  }
}
