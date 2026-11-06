import { describe, expect, it } from 'vitest';
import { ensureDictionary, spellingNotes } from '../src/lib/spelling';

describe('spelling is pointed out after answering - accurately', () => {
  it('catches common misspellings and key terms, with the right correction', async () => {
    await ensureDictionary();
    const bad = 'Prestley uses the Inspecter to challange the Birlings. Sheila definately changes, wich shows responsability. Photosythesis happens in the cloroplasts. Shakespear presents Macbeth as ambitous - he should of stopped. I recieved a letter. It was beautifull and peacefull.';
    const fixes = Object.fromEntries(spellingNotes(bad, 50).map((n) => [n.word.toLowerCase(), n.suggestion.toLowerCase()]));
    expect(fixes).toMatchObject({
      prestley: 'priestley', inspecter: 'inspector', challange: 'challenge', definately: 'definitely', wich: 'which', responsability: 'responsibility',
      photosythesis: 'photosynthesis', cloroplasts: 'chloroplasts', shakespear: 'shakespeare', ambitous: 'ambitious', 'should of': 'should have',
      recieved: 'received', beautifull: 'beautiful', peacefull: 'peaceful',
    });
  });

  it('never flags correct everyday or creative-writing words', async () => {
    await ensureDictionary();
    const good = `The rain hammered against the windows as I stumbled through the crowded street. Puddles glistened under the flickering lamps, and a bitter wind howled. My trainers were soaked and squelching. Cupboards creaked, the clock ticked, sirens wailed and helicopter blades chopped the smoky air while the kids were laughing and shouting. Teenagers spend too long scrolling; hobbies like skateboarding, gardening and volunteering help. Priestley's Inspector challenges the Birlings' selfish attitudes, and Sheila's guilt grows. The enzyme's active site is denatured. The colour of the sky was beautiful; we realised we'd travelled to the centre.`;
    expect(spellingNotes(good, 50)).toEqual([]);
  });
});
