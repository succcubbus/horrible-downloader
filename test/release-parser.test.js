import ReleaseParser from '../app/release-parser';

function buildRssEntry(title) {
  return {
    guid: '',
    title,
    pubDate: '',
  };
}

test('removes horriblesubs prefix', () => {
  const input = buildRssEntry('[HorribleSubs] Spiritpact S2 - 08 [1080p].mkv');

  expect(ReleaseParser.parse(input).series).not.toContain('HorribleSubs');
});
