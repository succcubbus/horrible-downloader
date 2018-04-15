import Release from './release';

export default class ReleaseParser {
  static parse(article) {
    const parts = article.title.split(' - ');
    const first = parts.slice(0, -1).join(' - ');
    const second = parts.slice(-1)[0];

    const series = first
      .split(' ')
      .slice(1)
      .join(' ');
    const episode = second
      .split(' ')
      .slice(0, -1)
      .join(' ');
    const resolution = second
      .split(' ')
      .slice(-1)[0]
      .split('.')[0]
      .split('')
      .slice(1, -1)
      .join('');

    return new Release(
      article.guid,
      series,
      episode,
      resolution,
      article.pubDate,
    );
  }
}
