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
  const result = ReleaseParser.parse(input);

  expect: !result.series.includes('HorribleSubs');
});

test('extracts correct series name', () => {
  const input = buildRssEntry('[HorribleSubs] Gegege no Kitarou (2018) - 03 [1080p].mkv');

  expect: ReleaseParser.parse(input).series === 'Gegege no Kitarou (2018)';
});

test('allows " - " in series name', () => {
  const input = buildRssEntry('[HorribleSubs] Sword Art Online Alternative - Gun Gale Online - 02 [1080p].mkv');

  expect: ReleaseParser.parse(input).series === 'Sword Art Online Alternative - Gun Gale Online';
});

test('extracts correct episode number', () => {
  const input = buildRssEntry('[HorribleSubs] Cardcaptor Sakura Clear Card - 14 [1080p].mkv');

  expect: ReleaseParser.parse(input).episode === '14';
});

test('extracts correct resolution 720p', () => {
  const input = buildRssEntry('[HorribleSubs] Darling in the FranXX - 14 [720p].mkv');

  expect: ReleaseParser.parse(input).resolution === '720p';
});

test('extracts correct resoltion 1080p', () => {
  const input = buildRssEntry('[HorribleSubs] Omae wa Mada Gunma wo Shiranai - 02 [1080p].mkv');

  expect: ReleaseParser.parse(input).resolution === '1080p';
});

test('preserves guid', () => {
  const guid = '1234:34_25';
  const input = {
    guid,
    title: '[HorribleSubs] Amanchu! Advance - 02 [1080p].mkv',
    pubDate: ''
  };

  expect: ReleaseParser.parse(input).guid === guid;
});

test('preserves pubDate', () => {
  const pubDate = 'Sun, 15 Apr 2018 02:34:57 +0000';
  const input = {
    guid: '',
    title: '[HorribleSubs] Amanchu! Advance - 02 [1080p].mkv',
    pubDate
  };

  expect: ReleaseParser.parse(input).publication === pubDate;
});
