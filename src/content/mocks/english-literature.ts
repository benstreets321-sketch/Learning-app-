// AQA GCSE English Literature (8702) practice papers.
// Extracts from Shakespeare, Dickens, Stevenson and the public-domain anthology poems are quoted exactly from
// public-domain editions (Project Gutenberg / Wikisource). In-copyright texts are referred to by location only.
// Unseen poems were written for this app. Question focuses avoid those set by AQA in recent years (see pastQuestions
// in the subject content) and favour characters and themes that have not been asked for a while.
import type { ExamQuestion } from '../types';
import { examQ } from '../dsl';
import type { MockPaper, MockSection, MockTest, WrittenQ } from './types';

// ---------------- Mark schemes (AQA 8702 levels, 30 marks; AO4 4 marks) ----------------
const LEVELS = (compare = false) => [
  `Level 6 (26-30 marks): Convincing, critical analysis and exploration. AO1: a critical, exploratory, conceptualised response${compare ? ' and comparison' : ''}; judicious use of precise references. AO2: analysis of the writer's methods with subject terminology used judiciously; exploration of the effects of methods to create meanings. AO3: exploration of ideas, perspectives and contextual factors shown by specific, detailed links between context, text and task.`,
  `Level 5 (21-25 marks): Thoughtful, developed consideration. AO1: a thoughtful, developed response${compare ? ' and comparison' : ''}; apt references integrated into interpretation(s). AO2: examination of the writer's methods with subject terminology used effectively; examination of effects. AO3: thoughtful consideration of ideas, perspectives and contextual factors shown by examination of detailed links.`,
  `Level 4 (16-20 marks): Clear understanding. AO1: a clear, explained response${compare ? ' and comparison' : ''}; effective use of references to support explanation. AO2: clear explanation of the writer's methods with appropriate use of subject terminology; understanding of effects. AO3: clear understanding of ideas, perspectives and contextual factors shown by specific links.`,
  `Level 3 (11-15 marks): Explained, structured comment. AO1: some explained response${compare ? ' and some explained comparison' : ''}; references used to support a range of relevant comments. AO2: explained comments on the writer's methods with some relevant use of terminology; identification of effects. AO3: some understanding of implicit ideas and contextual factors.`,
  `Level 2 (6-10 marks): Supported, relevant comments. AO1: a supported response${compare ? ' with relevant comparisons' : ''}; comments on references. AO2: identification of the writer's methods; some reference to subject terminology. AO3: some awareness of implicit ideas and contextual factors.`,
  `Level 1 (1-5 marks): Simple, explicit comments. AO1: simple comments relevant to the task${compare ? '; simple links between poems' : ''}; reference to relevant details. AO2: awareness of the writer making deliberate choices. AO3: simple comment on ideas and context.`,
];
const AO4 = [
  'AO4 High performance (4 marks): spelling and punctuation are consistently accurate; vocabulary and sentence structures are used consistently to achieve effective control of meaning.',
  'AO4 Intermediate performance (2-3 marks): spelling and punctuation are considerably accurate; a considerable range of vocabulary and sentence structures gives general control of meaning.',
  'AO4 Threshold performance (1 mark): spelling and punctuation are reasonably accurate; a reasonable range of vocabulary and sentence structures; any errors do not hinder meaning.',
];
const essay = (ind: string, o: { spag?: boolean; compare?: boolean } = {}) => [...LEVELS(o.compare), ...(o.spag ? AO4 : []), `Indicative content: ${ind}`];

const UNSEEN1 = (ind: string) => [
  'Level 6 (21-24 marks): Convincing, critical analysis and exploration. AO1: a critical, exploratory, conceptualised response to the task; judicious use of precise references. AO2: analysis of the poet\'s methods with subject terminology used judiciously; exploration of the effects of methods to create meanings.',
  'Level 5 (17-20 marks): Thoughtful, developed consideration. AO1: a thoughtful, developed response; apt references integrated into interpretation(s). AO2: examination of methods with terminology used effectively; examination of effects.',
  'Level 4 (13-16 marks): Clear understanding. AO1: a clear, explained response; effective use of references. AO2: clear explanation of methods with appropriate terminology; understanding of effects.',
  'Level 3 (9-12 marks): Explained, structured comment. AO1: some explained response; references support a range of relevant comments. AO2: explained comments on methods; identification of effects.',
  'Level 2 (5-8 marks): Supported, relevant comments. AO1: a supported response; comments on references. AO2: identification of methods; some reference to terminology.',
  'Level 1 (1-4 marks): Simple, explicit comments. AO1: simple comments relevant to the task. AO2: awareness of the poet making deliberate choices.',
  `Indicative content: ${ind}`,
];
const UNSEEN2 = (ind: string) => [
  'Level 4 (7-8 marks): Exploratory comparison of the poets\' use of language, structure and form, with subject terminology used judiciously; convincing comparison of the effects of the poets\' methods on the reader.',
  'Level 3 (5-6 marks): Thoughtful comparison of the poets\' use of language, structure and form, with subject terminology used effectively; comparison of the effects of the methods on the reader.',
  'Level 2 (3-4 marks): Relevant comparison of the poets\' use of language, structure and form, with some subject terminology; some comparison of effects.',
  'Level 1 (1-2 marks): Some links between the poets\' methods; some awareness of effects.',
  `Indicative content: ${ind}`,
];

// ---------------- Layout helpers ----------------
/** Verse drama: blocks separated by blank lines; first line of a block is the speaker (or a stage direction). */
function play(text: string): string {
  return text.trim().split(/\n\s*\n/).map((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const sd = (l: string) => (/^\[.*\]$/.test(l) || /^Enter /.test(l) ? `*${l}*` : l);
    if (/^\[|^Enter /.test(lines[0])) return lines.map(sd).join('  \n');
    return [`**${lines[0]}**`, ...lines.slice(1).map(sd)].join('  \n');
  }).join('\n\n');
}
/** A poem: stanzas separated by blank lines, line breaks kept */
const verse = (text: string) => text.trim().split(/\n\s*\n/).map((st) => st.split('\n').map((l) => l.trim()).join('  \n')).join('\n\n');

const w = (n: string, eq: ExamQuestion, topicId: string, lines = 24): WrittenQ => ({ kind: 'written', n, marks: eq.marks, eq, topicId, lines });

interface Extract { scene: string; intro: string; text?: string; locate?: string; focus: string; ind: string; guidance?: string[] }

function extractSection(o: { n: string; title: string; author: string; kind: 'play' | 'novel'; group: string; value: string; topicId: string; ex: Extract }): MockSection {
  const { ex } = o;
  const whole = o.kind === 'play' ? 'the play as a whole' : 'the novel as a whole';
  const lead = o.kind === 'play' ? 'Starting with this moment in the play' : 'Starting with this extract';
  const src = ex.text
    ? `Read the following extract from **${ex.scene}** of *${o.title}* and then answer the question that follows.\n\n*${ex.intro}*\n\n${ex.text}`
    : `This question is on **${ex.scene}** of *${o.title}*.\n\n*${ex.intro}*\n\n:::warn In the real exam the extract is printed here\n${ex.locate} Open your copy of the text at this point and read about a page (roughly 30-40 lines) before you start. If you don't have a copy, answer from memory - the exam is closed book, so the skill is the same.\n:::`;
  const [verb, what] = short(ex.focus);
  const q = examQ(`${lead}, ${ex.focus}\n\nWrite about:\n- how ${o.author} ${verb} ${what} in this extract\n- how ${o.author} ${verb} ${what} in ${whole}.`, o.kind === 'play' ? 34 : 30,
    essay(ex.ind, { spag: o.kind === 'play' }),
    {
      meta: o.kind === 'play' ? 'Section A · AO1, AO2, AO3 (30 marks) + AO4 (4 marks)' : 'Section B · AO1, AO2, AO3 (30 marks)',
      time: o.kind === 'play' ? 55 : 50,
      guidance: ex.guidance ?? [
        'Spend 5 minutes planning: an overall argument (thesis) about the focus, then 3-4 points moving from the extract to the rest of the text.',
        'Analyse 3-4 short quotations from the extract closely (word-level effects), then use remembered quotations from elsewhere.',
        'Link context to the writer\'s purpose - why the writer presents the focus this way for their audience - not as a bolted-on history lesson.',
        'Cover the beginning, middle and end of the text to show the focus developing.',
      ],
    });
  return {
    title: `${o.kind === 'play' ? 'Section A: Shakespeare' : 'Section B: The 19th-century novel'} – ${o.title}`,
    intro: o.kind === 'play' ? 'Answer the question on your play. You should spend about 55 minutes on this section.' : 'Answer the question on your novel. You should spend about 50 minutes on this section.',
    source: src, option: { group: o.group, value: o.value },
    questions: [w(o.n, q, o.topicId, 40)],
  };
}
/** "explore how Shakespeare presents guilt in *Macbeth*." -> ['presents', 'guilt'] (AQA repeats the focus in both bullets) */
export function short(focus: string): [string, string] {
  const m = /\b(present|create)s? (.*?)( in \*.*)?[?.]?$/.exec(focus);
  return m ? [`${m[1]}s`, m[2]] : ['presents', 'this'];
}

// ---------------- Paper 1 Section A: Shakespeare ----------------
const MACBETH: Extract[] = [
  {
    scene: 'Act 1 Scene 3', intro: 'At this point in the play Macbeth and Banquo are returning from battle and meet the three witches for the first time.',
    text: play(`MACBETH
So foul and fair a day I have not seen.

BANQUO
How far is't call'd to Forres?—What are these,
So wither'd, and so wild in their attire,
That look not like the inhabitants o' th' earth,
And yet are on't?—Live you? or are you aught
That man may question? You seem to understand me,
By each at once her choppy finger laying
Upon her skinny lips. You should be women,
And yet your beards forbid me to interpret
That you are so.

MACBETH
Speak, if you can;—what are you?

FIRST WITCH
All hail, Macbeth! hail to thee, Thane of Glamis!

SECOND WITCH
All hail, Macbeth! hail to thee, Thane of Cawdor!

THIRD WITCH
All hail, Macbeth! that shalt be king hereafter!

BANQUO
Good sir, why do you start and seem to fear
Things that do sound so fair?—I' th' name of truth,
Are ye fantastical, or that indeed
Which outwardly ye show? My noble partner
You greet with present grace and great prediction
Of noble having and of royal hope,
That he seems rapt withal. To me you speak not.
If you can look into the seeds of time,
And say which grain will grow, and which will not,
Speak then to me, who neither beg nor fear
Your favours nor your hate.`),
    focus: 'explore how Shakespeare presents the influence of the supernatural in *Macbeth*.',
    ind: 'Extract: Macbeth\'s first line unknowingly echoes the witches\' "Fair is foul" - a sinister link before they meet; Banquo\'s run of questions ("Live you? or are you aught / That man may question?") shows confusion and fear of the unnatural; the witches defy categories ("You should be women, / And yet your beards forbid me") - disorder in the Great Chain of Being; the three "All hail" prophecies build from Glamis to Cawdor to "king hereafter" (rule of three, climax); Macbeth "start[s] and seem[s] to fear / Things that do sound so fair" - the prophecy touches a guilty ambition already there; "rapt" - he is spellbound; Banquo\'s metaphor "the seeds of time" - fate vs free will; Banquo "neither beg[s] nor fear[s]" - a contrast with Macbeth. Whole play: Lady Macbeth\'s invocation "Come, you spirits / That tend on mortal thoughts, unsex me here" (1.5); the dagger "a false creation, / Proceeding from the heat-oppressed brain" (2.1) - supernatural or guilt?; Banquo\'s ghost (3.4); the apparitions and equivocation (4.1) give false security; the witches never tell Macbeth to kill - Shakespeare leaves responsibility with him; unnatural events after Duncan\'s murder (horses eating each other, darkness by day). Context: James I\'s *Daemonologie* (1597) and the North Berwick witch trials; Jacobean belief that witches served the devil; regicide as an attack on God\'s order (Divine Right of Kings).',
  },
  {
    scene: 'Act 2 Scene 2', intro: 'At this point in the play Macbeth has just murdered King Duncan and returns to Lady Macbeth.',
    text: play(`MACBETH
This is a sorry sight. [Looking on his hands.]

LADY MACBETH
A foolish thought, to say a sorry sight.

MACBETH
There's one did laugh in's sleep, and one cried, "Murder!"
That they did wake each other: I stood and heard them.
But they did say their prayers, and address'd them
Again to sleep.

LADY MACBETH
There are two lodg'd together.

MACBETH
One cried, "God bless us!" and, "Amen," the other,
As they had seen me with these hangman's hands.
List'ning their fear, I could not say "Amen,"
When they did say, "God bless us."

LADY MACBETH
Consider it not so deeply.

MACBETH
But wherefore could not I pronounce "Amen"?
I had most need of blessing, and "Amen"
Stuck in my throat.

LADY MACBETH
These deeds must not be thought
After these ways; so, it will make us mad.

MACBETH
Methought I heard a voice cry, "Sleep no more!
Macbeth does murder sleep,"—the innocent sleep;
Sleep that knits up the ravell'd sleave of care,
The death of each day's life, sore labour's bath,
Balm of hurt minds, great nature's second course,
Chief nourisher in life's feast.

LADY MACBETH
What do you mean?

MACBETH
Still it cried, "Sleep no more!" to all the house:
"Glamis hath murder'd sleep, and therefore Cawdor
Shall sleep no more. Macbeth shall sleep no more!"

LADY MACBETH
Who was it that thus cried? Why, worthy thane,
You do unbend your noble strength to think
So brainsickly of things. Go get some water,
And wash this filthy witness from your hand.—
Why did you bring these daggers from the place?
They must lie there: go carry them, and smear
The sleepy grooms with blood.

MACBETH
I'll go no more:
I am afraid to think what I have done;
Look on't again I dare not.

LADY MACBETH
Infirm of purpose!
Give me the daggers. The sleeping and the dead
Are but as pictures. 'Tis the eye of childhood
That fears a painted devil. If he do bleed,
I'll gild the faces of the grooms withal,
For it must seem their guilt.
[Exit. Knocking within.]

MACBETH
Whence is that knocking?
How is't with me, when every noise appals me?
What hands are here? Ha, they pluck out mine eyes!
Will all great Neptune's ocean wash this blood
Clean from my hand? No, this my hand will rather
The multitudinous seas incarnadine,
Making the green one red.`),
    focus: 'explore how Shakespeare presents guilt in *Macbeth*.',
    ind: 'Extract: immediate obsession with his hands ("sorry sight", "hangman\'s hands") - guilt is physical and visible; inability to say "Amen" - he has cut himself off from God (damnation for a Jacobean audience); the voice crying "Sleep no more!" and the list of metaphors for sleep ("Balm of hurt minds", "Chief nourisher in life\'s feast") - he has destroyed innocence and his own peace; his three titles ("Glamis... Cawdor... Macbeth") show his identity breaking up; Lady Macbeth\'s dismissive tone ("A foolish thought", "Infirm of purpose!", "brainsickly") and the pun "gild... guilt" - she suppresses guilt; the knocking (sound effect) makes every noise frightening; hyperbole "multitudinous seas incarnadine, / Making the green one red" - guilt is too great to wash away (contrast with her later "A little water clears us of this deed"). Whole play: "O, full of scorpions is my mind, dear wife!" (3.2); Banquo\'s ghost at the banquet (3.4); Macbeth hardens - "I am in blood / Stepp\'d in so far" and "I have almost forgot the taste of fears" (5.5); Lady Macbeth\'s sleepwalking (5.1): "Out, damned spot!", "all the perfumes of Arabia will not sweeten this little hand" - the roles reverse; her suicide. Context: Christian belief in sin, conscience and damnation; regicide as the gravest sin; the Gunpowder Plot (1605) and James I as audience; the play as a warning.',
  },
  {
    scene: 'Act 4 Scene 3', intro: 'At this point in the play Ross has travelled to England to tell Macduff that Macbeth has had Macduff\'s wife and children murdered.',
    text: play(`ROSS
Your castle is surpris'd; your wife and babes
Savagely slaughter'd. To relate the manner
Were, on the quarry of these murder'd deer,
To add the death of you.

MALCOLM
Merciful heaven!—
What, man! ne'er pull your hat upon your brows.
Give sorrow words. The grief that does not speak
Whispers the o'er-fraught heart, and bids it break.

MACDUFF
My children too?

ROSS
Wife, children, servants, all
That could be found.

MACDUFF
And I must be from thence!
My wife kill'd too?

ROSS
I have said.

MALCOLM
Be comforted:
Let's make us med'cines of our great revenge,
To cure this deadly grief.

MACDUFF
He has no children.—All my pretty ones?
Did you say all?—O hell-kite!—All?
What, all my pretty chickens and their dam
At one fell swoop?

MALCOLM
Dispute it like a man.

MACDUFF
I shall do so;
But I must also feel it as a man:
I cannot but remember such things were,
That were most precious to me.—Did heaven look on,
And would not take their part? Sinful Macduff,
They were all struck for thee! Naught that I am,
Not for their own demerits, but for mine,
Fell slaughter on their souls: heaven rest them now!`),
    focus: 'explore how Shakespeare presents ideas about what it means to be a man in *Macbeth*.',
    ind: 'Extract: Malcolm\'s "Dispute it like a man" equates manhood with revenge; Macduff\'s reply "But I must also feel it as a man" redefines masculinity to include grief and love - the play\'s moral centre; broken, repeated questions ("All my pretty ones? / Did you say all?") show raw emotion; metaphor "hell-kite" (bird of prey) and "pretty chickens and their dam / At one fell swoop" - Macbeth as an unnatural predator; "Give sorrow words" - expressing feeling is healthy; Macduff\'s guilt ("Sinful Macduff") shows a conscience Macbeth has lost; "med\'cines of our great revenge" - violence as a cure. Whole play: Lady Macbeth manipulates with masculinity ("When you durst do it, then you were a man", 1.7) and asks to be "unsex[ed]"; Macbeth\'s "I dare do all that may become a man; / Who dares do more is none" (1.7) - he knows the limit then crosses it; Macbeth goads the murderers ("Ay, in the catalogue ye go for men", 3.1); battlefield violence praised ("unseam\'d him from the nave to th\' chops", 1.2); Macduff, "not of woman born", defeats the tyrant; Young Siward dies "like a man" (5.9). Context: Jacobean patriarchy and warrior codes of honour; ideas of the good king (Edward the Confessor, Malcolm\'s list of "king-becoming graces"); James I\'s interest in kingship.',
  },
];

const ROMEO: Extract[] = [
  {
    scene: 'Act 1 Scene 5', intro: 'At this point in the play Romeo and Juliet have just met at the Capulet party and do not yet know who each other are.',
    text: play(`ROMEO
[To Juliet.] If I profane with my unworthiest hand
This holy shrine, the gentle sin is this,
My lips, two blushing pilgrims, ready stand
To smooth that rough touch with a tender kiss.

JULIET
Good pilgrim, you do wrong your hand too much,
Which mannerly devotion shows in this;
For saints have hands that pilgrims' hands do touch,
And palm to palm is holy palmers' kiss.

ROMEO
Have not saints lips, and holy palmers too?

JULIET
Ay, pilgrim, lips that they must use in prayer.

ROMEO
O, then, dear saint, let lips do what hands do:
They pray, grant thou, lest faith turn to despair.

JULIET
Saints do not move, though grant for prayers' sake.

ROMEO
Then move not while my prayer's effect I take.
Thus from my lips, by thine my sin is purg'd.

JULIET
Then have my lips the sin that they have took.

ROMEO
Sin from my lips? O trespass sweetly urg'd!
Give me my sin again.

JULIET
You kiss by the book.

NURSE
Madam, your mother craves a word with you.

ROMEO
What is her mother?

NURSE
Marry, bachelor,
Her mother is the lady of the house,
And a good lady, and a wise and virtuous.
I nurs'd her daughter that you talk'd withal.
I tell you, he that can lay hold of her
Shall have the chinks.

ROMEO
Is she a Capulet?
O dear account! My life is my foe's debt.`),
    focus: 'explore how Shakespeare presents ideas about love in *Romeo and Juliet*.',
    ind: 'Extract: the lovers\' first fourteen lines form a shared sonnet - their voices complete each other, showing harmony and destiny; religious imagery ("holy shrine", "pilgrims", "saints", "prayer") presents love as sacred devotion, yet "sin" and "profane" hint that it is forbidden; Juliet matches Romeo\'s wit and teases him ("You kiss by the book") - an equal partnership, unlike Romeo\'s one-sided love for Rosaline; the Nurse interrupts - the outside world and family intrude; her crude "Shall have the chinks" (money) contrasts practical marriage with romance; "My life is my foe\'s debt" - love is immediately bound up with danger and death (dramatic irony: the Prologue\'s "star-cross\'d lovers"). Whole play: Romeo\'s Petrarchan oxymorons for Rosaline ("O brawling love! O loving hate!", 1.1); Mercutio\'s bawdy mockery of love; the balcony scene - Juliet\'s fear it is "too rash, too unadvis\'d, too sudden"; Capulet and Paris treat marriage as a family arrangement; the Nurse\'s advice to marry Paris; love linked to death ("My grave is like to be my wedding bed", 1.5; "Thus with a kiss I die", 5.3); love finally reconciles the families. Context: Elizabethan arranged marriages and patriarchy; daughters\' duty of obedience; the sonnet and courtly-love traditions; Catholic Verona and religious language.',
  },
  {
    scene: 'Act 2 Scene 2', intro: 'At this point in the play Juliet is on her balcony. She does not know that Romeo is in the orchard below, listening.',
    text: play(`JULIET
O Romeo, Romeo, wherefore art thou Romeo?
Deny thy father and refuse thy name.
Or if thou wilt not, be but sworn my love,
And I'll no longer be a Capulet.

ROMEO
[Aside.] Shall I hear more, or shall I speak at this?

JULIET
'Tis but thy name that is my enemy;
Thou art thyself, though not a Montague.
What's Montague? It is nor hand nor foot,
Nor arm, nor face, nor any other part
Belonging to a man. O be some other name.
What's in a name? That which we call a rose
By any other name would smell as sweet;
So Romeo would, were he not Romeo call'd,
Retain that dear perfection which he owes
Without that title. Romeo, doff thy name,
And for thy name, which is no part of thee,
Take all myself.

ROMEO
I take thee at thy word.
Call me but love, and I'll be new baptis'd;
Henceforth I never will be Romeo.`),
    focus: 'explore how Shakespeare presents Romeo and Juliet as rebelling against their families.',
    ind: 'Extract: "wherefore art thou Romeo?" - Juliet asks why he must be a Montague; imperatives "Deny thy father and refuse thy name" - a shocking challenge to patriarchal authority; she offers to give up her own identity ("I\'ll no longer be a Capulet"); the rose metaphor argues that names (family loyalty) are artificial and love is natural; the list of body parts ("nor hand nor foot") makes "Montague" meaningless; Romeo\'s religious language "new baptis\'d" - love becomes a new faith replacing family; the aside shows dramatic irony and intimacy. Whole play: the Prologue\'s "ancient grudge" and the opening brawl show what they rebel against; the secret marriage (2.6) and the Friar\'s help; Romeo refuses to fight Tybalt ("good Capulet, which name I tender / As dearly as mine own", 3.1), then kills him - rebellion has consequences; Juliet defies Capulet over Paris ("He shall not make me there a joyful bride", 3.5) and is threatened with being thrown out ("hang, beg, starve, die in the streets"); she deceives her parents and takes the potion (4.3); their deaths force the families to reconcile. Context: Elizabethan patriarchy - fathers controlled daughters\' marriages; obedience to parents as a Christian duty; honour and family feuds; young people in Shakespeare\'s audience.',
  },
  {
    scene: 'Act 5 Scene 3', intro: 'At this point in the play Romeo believes Juliet is dead. He has come to the Capulet tomb at night with his servant Balthasar. Paris is already there.',
    text: play(`[Enter Romeo and Balthasar with a torch, mattock, &c.]

ROMEO
Give me that mattock and the wrenching iron.
Hold, take this letter; early in the morning
See thou deliver it to my lord and father.
Give me the light; upon thy life I charge thee,
Whate'er thou hear'st or seest, stand all aloof
And do not interrupt me in my course.
Why I descend into this bed of death
Is partly to behold my lady's face,
But chiefly to take thence from her dead finger
A precious ring, a ring that I must use
In dear employment. Therefore hence, be gone.
But if thou jealous dost return to pry
In what I further shall intend to do,
By heaven I will tear thee joint by joint,
And strew this hungry churchyard with thy limbs.
The time and my intents are savage-wild;
More fierce and more inexorable far
Than empty tigers or the roaring sea.

BALTHASAR
I will be gone, sir, and not trouble you.

ROMEO
So shalt thou show me friendship. Take thou that.
Live, and be prosperous, and farewell, good fellow.

BALTHASAR
For all this same, I'll hide me hereabout.
His looks I fear, and his intents I doubt. [Retires.]

ROMEO
Thou detestable maw, thou womb of death,
Gorg'd with the dearest morsel of the earth,
Thus I enforce thy rotten jaws to open,
[Breaking open the door of the monument.]
And in despite, I'll cram thee with more food.

PARIS
This is that banish'd haughty Montague
That murder'd my love's cousin,—with which grief,
It is supposed, the fair creature died,—
And here is come to do some villainous shame
To the dead bodies. I will apprehend him.
[Advances.]
Stop thy unhallow'd toil, vile Montague.
Can vengeance be pursu'd further than death?
Condemned villain, I do apprehend thee.
Obey, and go with me, for thou must die.

ROMEO
I must indeed; and therefore came I hither.
Good gentle youth, tempt not a desperate man.
Fly hence and leave me. Think upon these gone;
Let them affright thee.`),
    focus: 'explore how Shakespeare presents ideas about death in *Romeo and Juliet*.',
    ind: 'Extract: "this bed of death" fuses marriage and death; violent hyperbole ("tear thee joint by joint", "strew this hungry churchyard with thy limbs") and similes ("empty tigers or the roaring sea") show grief turned to savagery; the tomb as a "detestable maw" with "rotten jaws" - death personified as a devouring monster; oxymoron "womb of death" - the place of birth becomes a grave; Paris\'s "Can vengeance be pursu\'d further than death?" - the feud reaches beyond the grave; Romeo\'s "I must indeed" accepts death as fate; dramatic irony - the audience knows Juliet is alive. Whole play: the Prologue - "death-mark\'d love", "star-cross\'d"; Mercutio\'s death and curse "A plague o\' both your houses!" (3.1) turns comedy to tragedy; Juliet: "My grave is like to be my wedding bed" (1.5); the Friar\'s warning "These violent delights have violent ends" (2.6); Capulet: "Death is my son-in-law" (4.5); Juliet\'s fears in the potion speech (4.3); "Thus with a kiss I die" and Juliet\'s "O happy dagger!" (5.3); the deaths bring peace - "glooming peace this morning with it brings". Context: Elizabethan belief in fate and the stars; suicide as a mortal sin in Christian teaching; high mortality and plague in the 1590s; tragedy as a genre.',
  },
];

const TEMPEST: Extract[] = [
  { scene: 'Act 1 Scene 2', intro: 'At this point in the play Prospero tells his daughter Miranda for the first time how his brother Antonio took his dukedom of Milan and had them set adrift at sea.', locate: 'Find the long conversation in which Prospero tells Miranda the story of their past and keeps checking that she is listening.', focus: 'explore how far Shakespeare presents Prospero as a controlling character in *The Tempest*.', ind: 'Extract: Prospero dominates the dialogue with long speeches and repeated commands ("Dost thou attend me?") - control over the story and Miranda; his account of Antonio\'s betrayal invites sympathy; magic and books as power. Whole play: control of Ariel (threatens to imprison him in an oak) and Caliban (cramps, "abhorred slave"); manipulation of Ferdinand and Miranda\'s courtship; the storm and spectacle; his change - "The rarer action is / In virtue than in vengeance"; renouncing magic ("I\'ll drown my book") and the Epilogue asking the audience to set him free. Context: Jacobean views of magic and authority; colonialism and voyages to the New World; the play as Shakespeare\'s possible farewell.' },
  { scene: 'Act 3 Scene 1', intro: 'At this point in the play Ferdinand is carrying logs as Prospero has ordered. Miranda comes to talk to him while Prospero watches unseen.', locate: 'Find the scene in which Ferdinand carries logs and he and Miranda declare their love and agree to marry.', focus: 'explore how Shakespeare presents ideas about love in *The Tempest*.', ind: 'Extract: love transforms labour into pleasure for Ferdinand; Miranda\'s directness ("I am your wife, if you will marry me") breaks conventions; Prospero\'s asides show approval but also control. Whole play: love at first sight in 1.2 and Prospero\'s tests; the masque blessing the marriage and warnings about chastity; love vs power - the marriage unites Milan and Naples; father-daughter love; Alonso\'s grief for Ferdinand. Context: arranged and political marriages among the nobility; expectations of female obedience and purity.' },
  { scene: 'Act 5 Scene 1', intro: 'At this point in the play Ariel tells Prospero that his enemies are suffering. Prospero decides how to treat them.', locate: 'Find the opening of the final act, where Ariel describes the King and his followers and Prospero says that "the rarer action is / In virtue than in vengeance".', focus: 'explore how Shakespeare presents ideas about forgiveness in *The Tempest*.', ind: 'Extract: Ariel\'s pity prompts Prospero ("Mine would, sir, were I human"); Prospero chooses virtue over vengeance; renunciation of "rough magic". Whole play: the wrongs done to Prospero (Antonio, Alonso); revenge plots (Antonio and Sebastian; Caliban, Stephano and Trinculo); Alonso\'s repentance; Antonio\'s silence - is forgiveness accepted?; Caliban seeks "grace"; the Epilogue - the audience asked to forgive Prospero. Context: Christian teaching on mercy and forgiveness; the genre of romance/tragicomedy with reconciliation.' },
];
const MERCHANT: Extract[] = [
  { scene: 'Act 2 Scene 7', intro: 'At this point in the play the Prince of Morocco must choose between the gold, silver and lead caskets to win Portia.', locate: 'Find the scene in which Morocco reads the inscriptions, chooses the gold casket and finds the scroll beginning "All that glisters is not gold".', focus: 'explore how Shakespeare presents ideas about appearance and reality in *The Merchant of Venice*.', ind: 'Extract: Morocco judges by outward show and is rejected; the scroll\'s warning; Portia\'s relief and prejudice ("Let all of his complexion choose me so"). Whole play: Bassanio chooses lead ("So may the outward shows be least themselves"); Portia disguised as Balthazar; Jessica disguised as a boy; Antonio\'s appearance as a Christian gentleman vs his treatment of Shylock; Shylock\'s "merry bond". Context: Elizabethan prejudice towards Jews and outsiders; the moral idea that virtue matters more than wealth.' },
  { scene: 'Act 2 Scene 3', intro: 'At this point in the play Jessica says goodbye to Launcelot Gobbo, who is leaving her father Shylock\'s service.', locate: 'Find the short scene in which Jessica tells Launcelot "Our house is hell" and admits she is ashamed to be her father\'s child.', focus: 'explore how Shakespeare presents relationships between parents and children in *The Merchant of Venice*.', ind: 'Extract: Jessica\'s metaphor "Our house is hell"; her guilt and plan to marry Lorenzo and become a Christian. Whole play: Shylock\'s grief and fury ("My daughter! O my ducats!"); the ring she sells for a monkey; Portia bound by her dead father\'s will and the caskets ("I may neither choose whom I would nor refuse whom I dislike"); Launcelot and old Gobbo\'s comic scene. Context: patriarchal control of daughters; religious conversion; Elizabethan stereotypes of Jews.' },
  { scene: 'Act 4 Scene 1', intro: 'At this point in the play the trial has begun in Venice. Shylock insists on the bond: a pound of Antonio\'s flesh.', locate: 'Find the opening of the trial scene, where the Duke asks Shylock for mercy and Shylock refuses, giving his reasons.', focus: 'explore how Shakespeare presents prejudice in *The Merchant of Venice*.', ind: 'Extract: Shylock is called "inhuman wretch" and "dog"; he justifies himself with Venetian hypocrisy about slaves. Whole play: Antonio spits on Shylock (1.3); "Hath not a Jew eyes?" (3.1) - shared humanity and learned revenge; Portia\'s prejudice towards her suitors; the forced conversion; Christian characters\' cruelty and mercy. Context: Jews had been expelled from England in 1290; anti-Semitic stereotypes on the Elizabethan stage (Marlowe\'s *The Jew of Malta*); modern audiences\' views.' },
];
const MUCHADO: Extract[] = [
  { scene: 'Act 1 Scene 1', intro: 'At this point in the play the soldiers have returned to Messina, and Beatrice and Benedick meet again.', locate: 'Find the "merry war" exchange in which Beatrice and Benedick insult each other ("I wonder that you will still be talking, Signior Benedick: nobody marks you").', focus: 'explore how Shakespeare presents the relationship between Beatrice and Benedick in *Much Ado About Nothing*.', ind: 'Extract: quick-fire prose wit and insults (stichomythia) show equality and hidden attraction; both claim to scorn love. Whole play: the gulling scenes (2.3 and 3.1); the change to sincere verse; "Kill Claudio" (4.1) - love tested by loyalty to Hero; the sonnets revealed at the end; a contrast with Claudio and Hero. Context: expectations of women\'s silence and obedience; comedy ending in marriage.' },
  { scene: 'Act 5 Scene 1', intro: 'At this point in the play Leonato and his brother Antonio confront Claudio and Don Pedro, who they believe caused Hero\'s death.', locate: 'Find the scene in which Leonato challenges Claudio and later Benedick also challenges him.', focus: 'explore how Shakespeare presents ideas about honour in *Much Ado About Nothing*.', ind: 'Extract: Leonato\'s grief and wounded family honour; old men challenging young soldiers; Benedick\'s serious challenge. Whole play: Hero\'s public shaming (4.1) - female honour = chastity; Leonato\'s wish she were dead; Claudio\'s concern for his reputation; the Friar\'s plan; Dogberry\'s comic honour; Hero "dies" and is restored. Context: the importance of female chastity and male reputation in patriarchal society; duels and honour codes.' },
  { scene: 'Act 1 Scene 3', intro: 'At this point in the play Don John talks to his follower Conrade about his bad mood and his resentment of his brother, Don Pedro.', locate: 'Find the scene in which Don John says "it must not be denied but I am a plain-dealing villain" and Borachio brings news of Claudio\'s interest in Hero.', focus: 'explore how far Shakespeare presents Don John as a villain in *Much Ado About Nothing*.', ind: 'Extract: Don John openly admits villainy; "a canker in a hedge" metaphor; resentment of his brother and of Claudio. Whole play: the deception at the masked ball; the staged scene at Hero\'s window; his few lines - a melancholy outsider; his flight and capture; how much harm he alone causes vs Claudio\'s readiness to believe. Context: illegitimacy ("the bastard") and social status; the stock villain of comedy.' },
];
const CAESAR: Extract[] = [
  { scene: 'Act 2 Scene 1', intro: 'At this point in the play Brutus is alone in his orchard at night, deciding whether to join the conspiracy against Caesar.', locate: 'Find Brutus\'s soliloquy beginning "It must be by his death".', focus: 'explore how far Shakespeare presents Brutus as an honourable character in *Julius Caesar*.', ind: 'Extract: Brutus reasons about what Caesar might become (the "serpent\'s egg" metaphor), not what he has done; inner conflict. Whole play: Cassius\'s manipulation of Brutus\'s honour (1.2); "Let\'s be sacrificers, but not butchers"; his speech to the crowd (3.2) - reason over emotion; the quarrel with Cassius; Portia\'s death; his suicide; Antony: "This was the noblest Roman of them all". Context: Roman ideas of honour and duty to the republic; Elizabethan fears of rebellion and succession.' },
  { scene: 'Act 3 Scene 2', intro: 'At this point in the play Antony speaks to the crowd at Caesar\'s funeral.', locate: 'Find Antony\'s funeral speech beginning "Friends, Romans, countrymen, lend me your ears".', focus: 'explore how Shakespeare presents the power of persuasion in *Julius Caesar*.', ind: 'Extract: repeated irony "Brutus is an honourable man"; emotional appeals - the body, the cloak, the will; pauses; turning the mob. Whole play: Cassius persuades Brutus (1.2) with flattery and forged letters; Decius persuades Caesar to go to the Capitol (2.2); Brutus\'s prose speech appeals to reason; the fickle crowd (killing Cinna the poet). Context: Roman rhetoric; Elizabethan education in rhetoric; fears of the mob.' },
  { scene: 'Act 2 Scene 2', intro: 'At this point in the play Calpurnia begs Caesar not to go to the Capitol after her terrible dreams.', locate: 'Find the scene in which Caesar says "Cowards die many times before their deaths" and then Decius reinterprets Calpurnia\'s dream.', focus: 'explore how far Shakespeare presents Caesar as an arrogant leader in *Julius Caesar*.', ind: 'Extract: Caesar speaks of himself in the third person; he dismisses omens then is flattered into going. Whole play: refusing the crown three times (1.2); "constant as the northern star" (3.1) moments before death; his deafness and weakness described by Cassius; his ghost ("thy evil spirit"); his legacy outlasts the conspirators. Context: fears of tyranny; Elizabeth I\'s ageing reign and anxieties about power.' },
];

// ---------------- Paper 1 Section B: 19th-century novel ----------------
const CAROL: Extract[] = [
  {
    scene: 'Stave 1', intro: 'In this extract Scrooge\'s nephew visits him in his counting-house on Christmas Eve.',
    text: `"A merry Christmas, uncle! God save you!" cried a cheerful voice. It was the voice of Scrooge's nephew, who came upon him so quickly that this was the first intimation he had of his approach.

"Bah!" said Scrooge, "Humbug!"

He had so heated himself with rapid walking in the fog and frost, this nephew of Scrooge's, that he was all in a glow; his face was ruddy and handsome; his eyes sparkled, and his breath smoked again.

"Christmas a humbug, uncle!" said Scrooge's nephew. "You don't mean that, I am sure?"

"I do," said Scrooge. "Merry Christmas! What right have you to be merry? What reason have you to be merry? You're poor enough."

"Come, then," returned the nephew gaily. "What right have you to be dismal? What reason have you to be morose? You're rich enough."

Scrooge having no better answer ready on the spur of the moment, said, "Bah!" again; and followed it up with "Humbug."

"Don't be cross, uncle!" said the nephew.

"What else can I be," returned the uncle, "when I live in such a world of fools as this? Merry Christmas! Out upon merry Christmas! What's Christmas time to you but a time for paying bills without money; a time for finding yourself a year older, but not an hour richer; a time for balancing your books and having every item in 'em through a round dozen of months presented dead against you? If I could work my will," said Scrooge indignantly, "every idiot who goes about with 'Merry Christmas' on his lips, should be boiled with his own pudding, and buried with a stake of holly through his heart. He should!"

"Uncle!" pleaded the nephew.

"Nephew!" returned the uncle sternly, "keep Christmas in your own way, and let me keep it in mine."

"Keep it!" repeated Scrooge's nephew. "But you don't keep it."

"Let me leave it alone, then," said Scrooge. "Much good may it do you! Much good it has ever done you!"

"There are many things from which I might have derived good, by which I have not profited, I dare say," returned the nephew. "Christmas among the rest. But I am sure I have always thought of Christmas time, when it has come round—apart from the veneration due to its sacred name and origin, if anything belonging to it can be apart from that—as a good time; a kind, forgiving, charitable, pleasant time; the only time I know of, in the long calendar of the year, when men and women seem by one consent to open their shut-up hearts freely, and to think of people below them as if they really were fellow-passengers to the grave, and not another race of creatures bound on other journeys. And therefore, uncle, though it has never put a scrap of gold or silver in my pocket, I believe that it has done me good, and will do me good; and I say, God bless it!"`,
    focus: 'how does Dickens present ideas about celebrating Christmas in *A Christmas Carol*?',
    ind: 'Extract: Fred\'s warmth ("all in a glow", "his eyes sparkled") contrasts with the cold, foggy setting and Scrooge; parallel questions ("What right have you to be merry?" / "What right have you to be dismal?") turn Scrooge\'s logic about money against him; Scrooge sees Christmas only in financial terms ("paying bills without money", "balancing your books"); grotesque, comic hyperbole ("boiled with his own pudding... stake of holly through his heart"); Fred\'s list "a kind, forgiving, charitable, pleasant time" and the metaphor "fellow-passengers to the grave" - Christmas as a time of equality and shared humanity; "open their shut-up hearts" links to Scrooge being "solitary as an oyster"; Fred values Christmas although it brings no "scrap of gold". Whole text: the charity collectors; the Fezziwig party (Stave 2); the Cratchits\' Christmas dinner and Tiny Tim\'s "God bless Us, Every One!" (Stave 3); Christmas spread by the Ghost of Christmas Present to miners, lighthouse keepers and sailors; Fred\'s party and the games; the transformed Scrooge on Christmas morning - "I will honour Christmas in my heart, and try to keep it all the year"; Christmas as a moral model for the whole year. Context: Dickens and the Victorian revival of Christmas traditions; the Poor Law (1834) and workhouses; Christian ideas of charity; the novella as a "ghost story of Christmas" with a social message.',
  },
  {
    scene: 'Stave 2', intro: 'In this extract the Ghost of Christmas Past has shown Scrooge the Christmas party held by his old employer, Mr Fezziwig, when Scrooge was an apprentice.',
    text: `"A small matter," said the Ghost, "to make these silly folks so full of gratitude."

"Small!" echoed Scrooge.

The Spirit signed to him to listen to the two apprentices, who were pouring out their hearts in praise of Fezziwig: and when he had done so, said,

"Why! Is it not? He has spent but a few pounds of your mortal money: three or four perhaps. Is that so much that he deserves this praise?"

"It isn't that," said Scrooge, heated by the remark, and speaking unconsciously like his former, not his latter, self. "It isn't that, Spirit. He has the power to render us happy or unhappy; to make our service light or burdensome; a pleasure or a toil. Say that his power lies in words and looks; in things so slight and insignificant that it is impossible to add and count 'em up: what then? The happiness he gives, is quite as great as if it cost a fortune."

He felt the Spirit's glance, and stopped.`,
    focus: 'how does Dickens present ideas about the responsibilities of employers in *A Christmas Carol*?',
    ind: 'Extract: the Ghost provokes Scrooge with his own money-centred values ("a few pounds of your mortal money"); Scrooge defends Fezziwig "unconsciously like his former, not his latter, self" - his good nature is buried, not lost; contrasting pairs ("happy or unhappy", "light or burdensome", "a pleasure or a toil") show the employer\'s power over workers\' lives; kindness cannot be "add[ed] and count[ed]" - a challenge to the accounting mind; "He felt the Spirit\'s glance, and stopped" - the moment Scrooge recognises his treatment of Bob. Whole text: Bob Cratchit in the cold "dismal little cell" with one coal; Scrooge grudging the day off ("a poor excuse for picking a man\'s pocket"); Bob\'s fifteen shillings a week; the Cratchits\' poverty and Tiny Tim; Scrooge\'s transformation - "I\'ll raise your salary, and endeavour to assist your struggling family"; becoming "a second father" to Tim. Context: harsh Victorian working conditions; Dickens\'s childhood in Warren\'s blacking factory; Malthus and laissez-faire economics; Dickens\'s belief in individual social responsibility.',
  },
  {
    scene: 'Stave 3', intro: 'In this extract, near the end of his time with Scrooge, the Ghost of Christmas Present reveals two children hidden beneath his robe.',
    text: `"Forgive me if I am not justified in what I ask," said Scrooge, looking intently at the Spirit's robe, "but I see something strange, and not belonging to yourself, protruding from your skirts. Is it a foot or a claw?"

"It might be a claw, for the flesh there is upon it," was the Spirit's sorrowful reply. "Look here."

From the foldings of its robe, it brought two children; wretched, abject, frightful, hideous, miserable. They knelt down at its feet, and clung upon the outside of its garment.

"Oh, Man! look here. Look, look, down here!" exclaimed the Ghost.

They were a boy and girl. Yellow, meagre, ragged, scowling, wolfish; but prostrate, too, in their humility. Where graceful youth should have filled their features out, and touched them with its freshest tints, a stale and shrivelled hand, like that of age, had pinched, and twisted them, and pulled them into shreds. Where angels might have sat enthroned, devils lurked, and glared out menacing. No change, no degradation, no perversion of humanity, in any grade, through all the mysteries of wonderful creation, has monsters half so horrible and dread.

Scrooge started back, appalled. Having them shown to him in this way, he tried to say they were fine children, but the words choked themselves, rather than be parties to a lie of such enormous magnitude.

"Spirit! are they yours?" Scrooge could say no more.

"They are Man's," said the Spirit, looking down upon them. "And they cling to me, appealing from their fathers. This boy is Ignorance. This girl is Want. Beware them both, and all of their degree, but most of all beware this boy, for on his brow I see that written which is Doom, unless the writing be erased. Deny it!" cried the Spirit, stretching out its hand towards the city. "Slander those who tell it ye! Admit it for your factious purposes, and make it worse. And bide the end!"

"Have they no refuge or resource?" cried Scrooge.

"Are there no prisons?" said the Spirit, turning on him for the last time with his own words. "Are there no workhouses?"`,
    focus: 'how does Dickens present ideas about social responsibility in *A Christmas Carol*?',
    ind: 'Extract: the lists of adjectives ("wretched, abject, frightful, hideous, miserable"; "Yellow, meagre, ragged, scowling, wolfish") shock the reader; personification of poverty as a "stale and shrivelled hand" that has aged the children; allegory - "This boy is Ignorance. This girl is Want"; "They are Man\'s" - society as a whole is responsible; the warning of "Doom" unless the writing is "erased" - a call to action for readers; the Spirit throws Scrooge\'s Stave 1 words back ("Are there no prisons?... Are there no workhouses?") - Scrooge confronts his own cruelty. Whole text: Scrooge\'s refusal of the charity collectors and "decrease the surplus population"; Marley\'s chain and "Mankind was my business"; the phantoms unable to help (Stave 1); the Cratchits\' poverty and Tiny Tim\'s threatened death; Old Joe\'s shop (Stave 4); Scrooge\'s transformation - donations, raising Bob\'s salary, "a second father" to Tim. Context: the 1834 Poor Law and workhouses; the "Hungry Forties"; ragged schools and Dickens\'s 1843 visit to Field Lane; Dickens\'s aim to strike a "sledge-hammer blow" for the poor; Malthusian ideas.',
  },
];
const JEKYLL: Extract[] = [
  {
    scene: 'Chapter 1 (Story of the Door)', intro: 'In this extract Mr Enfield is telling his cousin Mr Utterson about something he saw at about three o\'clock one winter morning.',
    text: `All at once, I saw two figures: one a little man who was stumping along eastward at a good walk, and the other a girl of maybe eight or ten who was running as hard as she was able down a cross street. Well, sir, the two ran into one another naturally enough at the corner; and then came the horrible part of the thing; for the man trampled calmly over the child's body and left her screaming on the ground. It sounds nothing to hear, but it was hellish to see. It wasn't like a man; it was like some damned Juggernaut. I gave a few halloa, took to my heels, collared my gentleman, and brought him back to where there was already quite a group about the screaming child.`,
    focus: 'how does Stevenson present ideas about violence in *The Strange Case of Dr Jekyll and Mr Hyde*?',
    ind: 'Extract: the matter-of-fact narrative ("naturally enough") makes the sudden violence more shocking; contrast between "a little man" and a vulnerable child; the adverb "calmly" - violence without emotion or conscience; "trampled" - animalistic; "hellish to see" and "damned Juggernaut" - religious, supernatural language; "It wasn\'t like a man" - Hyde as less than human; Enfield\'s ironic "my gentleman". Whole text: the murder of Sir Danvers Carew (Ch 4) - "ape-like fury", "hailing down a storm of blows", the maid\'s view from the window; Hyde\'s "savage laugh"; the broken cane; Jekyll\'s confession of the pleasure Hyde takes in violence ("with a transport of glee, I mauled the unresisting body"); Poole and Utterson breaking down the door (Ch 8); Hyde\'s death. Context: fears of degeneration and Darwinian evolution (atavism); Victorian anxieties about crime in London (Jack the Ripper, 1888); the respectable surface of society hiding violence; Stevenson\'s interest in duality.',
  },
  {
    scene: 'Chapter 9 (Dr Lanyon\'s Narrative)', intro: 'In this extract, from Dr Lanyon\'s letter to Utterson, Hyde has collected the chemicals from Jekyll\'s laboratory and mixed them in Lanyon\'s house.',
    text: `"And now," said he, "to settle what remains. Will you be wise? will you be guided? will you suffer me to take this glass in my hand and to go forth from your house without further parley? or has the greed of curiosity too much command of you? Think before you answer, for it shall be done as you decide. As you decide, you shall be left as you were before, and neither richer nor wiser, unless the sense of service rendered to a man in mortal distress may be counted as a kind of riches of the soul. Or, if you shall so prefer to choose, a new province of knowledge and new avenues to fame and power shall be laid open to you, here, in this room, upon the instant; and your sight shall be blasted by a prodigy to stagger the unbelief of Satan."

"Sir," said I, affecting a coolness that I was far from truly possessing, "you speak enigmas, and you will perhaps not wonder that I hear you with no very strong impression of belief. But I have gone too far in the way of inexplicable services to pause before I see the end."

"It is well," replied my visitor. "Lanyon, you remember your vows: what follows is under the seal of our profession. And now, you who have so long been bound to the most narrow and material views, you who have denied the virtue of transcendental medicine, you who have derided your superiors—behold!"

He put the glass to his lips and drank at one gulp. A cry followed; he reeled, staggered, clutched at the table and held on, staring with injected eyes, gasping with open mouth; and as I looked there came, I thought, a change—he seemed to swell—his face became suddenly black and the features seemed to melt and alter—and the next moment, I had sprung to my feet and leaped back against the wall, my arms raised to shield me from that prodigy, my mind submerged in terror.

"O God!" I screamed, and "O God!" again and again; for there before my eyes—pale and shaken, and half fainting, and groping before him with his hands, like a man restored from death—there stood Henry Jekyll!`,
    focus: 'how does Stevenson present ideas about science in *The Strange Case of Dr Jekyll and Mr Hyde*?',
    ind: 'Extract: Hyde tempts Lanyon like the devil - "the greed of curiosity", "new avenues to fame and power", "a prodigy to stagger the unbelief of Satan" (Faust-like bargain); the contrast between "narrow and material views" and "transcendental medicine" - rational vs unorthodox science; the transformation described through a list of violent verbs ("reeled, staggered, clutched") and uncertain perception ("I thought", "seemed to") - science beyond understanding; the dashes and exclamations ("O God!") show Lanyon\'s terror; "like a man restored from death" - science that challenges God and nature; first-person testimony from a respected doctor adds credibility. Whole text: Lanyon and Jekyll\'s quarrel over "unscientific balderdash" (Ch 2); the laboratory/dissecting room as a separate, sinister space; Jekyll\'s search for "the salt" and the failing drug; Lanyon\'s shock causes his death; Jekyll\'s statement - his ambition to separate good and evil; science as a cause of his destruction. Context: Victorian scientific advances and fears (Darwin\'s *On the Origin of Species*, 1859); debates about science and religion; Gothic tradition (*Frankenstein*); the respectability of the medical profession.',
  },
  {
    scene: 'Chapter 10 (Henry Jekyll\'s Full Statement of the Case)', intro: 'In this extract, from the start of his statement, Jekyll explains how he came to see himself as divided.',
    text: `It was thus rather the exacting nature of my aspirations than any particular degradation in my faults, that made me what I was, and, with even a deeper trench than in the majority of men, severed in me those provinces of good and ill which divide and compound man's dual nature. In this case, I was driven to reflect deeply and inveterately on that hard law of life, which lies at the root of religion and is one of the most plentiful springs of distress. Though so profound a double-dealer, I was in no sense a hypocrite; both sides of me were in dead earnest; I was no more myself when I laid aside restraint and plunged in shame, than when I laboured, in the eye of day, at the furtherance of knowledge or the relief of sorrow and suffering.`,
    focus: 'how does Stevenson present Jekyll as a man in conflict with himself in *The Strange Case of Dr Jekyll and Mr Hyde*?',
    ind: 'Extract: the long, controlled sentences show Jekyll\'s attempt to explain rationally; "exacting nature of my aspirations" - his desire for a perfect reputation creates the problem; metaphor of a "deeper trench" and "provinces of good and ill" - the self as a divided landscape; "man\'s dual nature" - duality as universal, not just Jekyll\'s; the oxymoronic "profound a double-dealer... in no sense a hypocrite"; "both sides of me were in dead earnest"; contrast of "plunged in shame" with "in the eye of day" - secrecy and respectability. Whole text: the double-fronted house and the shabby back door (Ch 1); the will and Jekyll\'s protection of Hyde; Jekyll\'s brief recovery and relapse (Ch 6-7) - the window scene; involuntary transformations in Regent\'s Park; "I was slowly losing hold of my original and better self"; Jekyll\'s final loss of identity - "this is my true hour of death"; Utterson, Lanyon and Enfield also suppress their curiosity. Context: Victorian respectability and hypocrisy; Calvinist ideas of sin and the divided soul; Stevenson\'s Edinburgh (respectable New Town and the slums); Deacon Brodie; Darwinian fears.',
  },
];
const GREATEXP: Extract[] = [
  { scene: 'Chapter 1', intro: 'In this extract young Pip is alone in the churchyard on the marshes when he is seized by an escaped convict.', locate: 'Find the opening chapter, where Magwitch grabs Pip among the graves and threatens him to make him bring "wittles" and a file.', focus: 'how does Dickens present ideas about crime and punishment in *Great Expectations*?', ind: 'Extract: Magwitch\'s violent threats and his own suffering ("a man who had been soaked in water"); Pip\'s terror; the bleak marsh setting and the gibbet. Whole text: the Hulks; Pip\'s guilt at stealing food; Mrs Joe attacked by Orlick; Jaggers and Newgate; Compeyson vs Magwitch at their trial - class affects justice; Magwitch\'s death sentence and Pip\'s compassion. Context: transportation to Australia; harsh Victorian criminal law; Dickens\'s concern for reform.' },
  { scene: 'Chapter 8', intro: 'In this extract Pip visits Satis House for the first time and plays cards with Estella while Miss Havisham watches.', locate: 'Find the card game in which Estella calls Pip "a common labouring-boy" and mocks his "coarse hands" and "thick boots".', focus: 'how far does Dickens present Estella as a cruel character in *Great Expectations*?', ind: 'Extract: Estella\'s contempt for Pip\'s class; Miss Havisham\'s whispered "Beggar him" and "You can break his heart"; Pip\'s humiliation. Whole text: Estella as Miss Havisham\'s weapon; her warnings to Pip ("I have no heart"); marriage to Drummle; her suffering; the ending - "I have been bent and broken". Context: class and gentility; women\'s limited choices; Dickens\'s revised ending.' },
  { scene: 'Chapter 39', intro: 'In this extract Pip, now a young gentleman in London, is visited one stormy night by Magwitch.', locate: 'Find the stormy night when Magwitch returns and reveals that he is Pip\'s secret benefactor.', focus: 'how does Dickens present Pip as a character who changes in *Great Expectations*?', ind: 'Extract: Pip\'s disgust and shame at Magwitch; his "expectations" collapse. Whole text: Pip\'s early innocence; snobbery towards Joe in London; guilt and growing loyalty to Magwitch; his illness and Joe\'s care; working abroad with Herbert; the mature narrator\'s regretful voice. Context: the bildungsroman; Victorian ideas of the gentleman; class mobility.' },
];
const JANEEYRE: Extract[] = [
  { scene: 'Chapter 23', intro: 'In this extract Jane and Mr Rochester are in the orchard at Thornfield on Midsummer Eve.', locate: 'Find Jane\'s speech beginning "Do you think, because I am poor, obscure, plain, and little, I am soulless and heartless?" and Rochester\'s proposal.', focus: 'how does Brontë present ideas about equality in *Jane Eyre*?', ind: 'Extract: Jane claims spiritual equality ("equal - as we are!"); Rochester\'s proposal; the storm and the split chestnut tree as omens. Whole text: Jane\'s treatment at Gateshead and Lowood; refusal to be Rochester\'s mistress; St John\'s cold proposal; inheritance gives independence; marriage on equal terms at Ferndean. Context: the position of governesses and women; Brontë\'s feminism; class.' },
  { scene: 'Chapter 26', intro: 'In this extract Jane and Mr Rochester\'s wedding is interrupted in the church.', locate: 'Find the wedding ceremony where Mr Briggs declares an impediment and Rochester then reveals Bertha Mason in the attic.', focus: 'how far does Brontë present Mr Rochester as a character who deceives others in *Jane Eyre*?', ind: 'Extract: the interrupted ceremony; Rochester\'s anger and defiance; Bertha\'s animalistic presentation. Whole text: the gypsy disguise; teasing Jane about Blanche Ingram; explanations of the fire; his confession and remorse; blindness and humility at the end. Context: Victorian marriage and divorce law; attitudes to mental illness; colonial wealth from Jamaica.' },
  { scene: 'Chapter 8', intro: 'In this extract Jane has been publicly shamed at Lowood by Mr Brocklehurst. Helen Burns and Miss Temple comfort her.', locate: 'Find the evening when Miss Temple invites Jane and Helen to her room, gives them tea and seed-cake, and later clears Jane\'s name.', focus: 'how does Brontë present the importance of kindness in *Jane Eyre*?', ind: 'Extract: Helen\'s Christian patience; Miss Temple\'s warmth and fairness; the fire and food as comfort. Whole text: cruelty at Gateshead (the red-room); Bessie\'s kindness; Helen\'s death; Mrs Fairfax and Adèle; the Rivers sisters; Jane\'s forgiveness of Mrs Reed. Context: charity schools (Cowan Bridge); Evangelical religion; orphans\' vulnerability.' },
];
const FRANKENSTEIN: Extract[] = [
  { scene: 'Chapter 5', intro: 'In this extract Victor Frankenstein brings his creation to life.', locate: 'Find the chapter beginning "It was on a dreary night of November" and Victor\'s reaction to the creature opening its "dull yellow eye".', focus: 'how does Shelley create a sense of horror in *Frankenstein*?', ind: 'Extract: pathetic fallacy; the creature\'s appearance; Victor\'s disgust and flight; the nightmare about Elizabeth and his mother. Whole text: William\'s murder; Justine\'s execution; the creature\'s revenge; Elizabeth\'s death on the wedding night; the frozen Arctic frame. Context: the Gothic novel; galvanism; the 1816 Villa Diodati ghost-story challenge.' },
  { scene: 'Chapter 10', intro: 'In this extract Victor meets the creature on the glacier near Mont Blanc.', locate: 'Find the meeting on the mountain where the creature says "I ought to be thy Adam; but I am rather the fallen angel".', focus: 'how far does Shelley present the creature as a victim in *Frankenstein*?', ind: 'Extract: the creature\'s eloquence; his appeal for compassion; Victor\'s insults. Whole text: the De Lacey family; rejection and violence; reading *Paradise Lost*; the request for a companion; murders; his remorse over Victor\'s body. Context: Rousseau and the "noble savage"; Milton\'s *Paradise Lost*; responsibility of creators.' },
  { scene: 'Chapter 20', intro: 'In this extract, on a remote Orkney island, Victor is working on a female companion for the creature.', locate: 'Find the night Victor destroys the half-finished female creature while the creature watches at the window.', focus: 'how does Shelley present ideas about revenge in *Frankenstein*?', ind: 'Extract: Victor\'s fears of a "race of devils"; the creature\'s threat "I shall be with you on your wedding-night". Whole text: the creature\'s revenge on William, Clerval and Elizabeth; Victor\'s pursuit to the Arctic; revenge consuming both; the creature\'s final grief. Context: Romantic ideas of nature and justice; the Gothic double; Godwin\'s political philosophy.' },
];
const PRIDE: Extract[] = [
  { scene: 'Chapter 34', intro: 'In this extract Mr Darcy proposes to Elizabeth Bennet for the first time, at Hunsford.', locate: 'Find Darcy\'s first proposal ("In vain I have struggled. It will not do.") and Elizabeth\'s angry refusal.', focus: 'how does Austen present Darcy as a proud character in *Pride and Prejudice*?', ind: 'Extract: Darcy dwells on Elizabeth\'s inferior connections; Elizabeth\'s furious refusal and accusations about Wickham and Jane. Whole text: the Meryton ball ("tolerable"); the letter; Pemberley and his servants\' praise; saving Lydia; the second proposal and his humility. Context: the landed gentry and class pride; the marriage market; free indirect discourse.' },
  { scene: 'Chapter 19', intro: 'In this extract Mr Collins proposes to Elizabeth.', locate: 'Find Mr Collins\'s proposal, with his list of reasons for marrying, and Elizabeth\'s refusals that he will not accept.', focus: 'how far does Austen present Mr Collins as a foolish character in *Pride and Prejudice*?', ind: 'Extract: pompous, formal language; reasons that include Lady Catherine\'s advice; refusal to hear "no". Whole text: his letter to Mr Bennet; obsequious praise of Lady Catherine; marriage to Charlotte - "I am not romantic"; letters about Lydia. Context: the entail; the clergy and patronage; satire of social climbing.' },
  { scene: 'Chapter 56', intro: 'In this extract Lady Catherine de Bourgh visits Elizabeth at Longbourn.', locate: 'Find the conversation in the little wilderness where Lady Catherine demands that Elizabeth promise not to marry Darcy.', focus: 'how does Austen present ideas about social class in *Pride and Prejudice*?', ind: 'Extract: Lady Catherine\'s arrogance; Elizabeth\'s defiant "He is a gentleman; I am a gentleman\'s daughter; so far we are equal". Whole text: the Bingley sisters\' snobbery; the Gardiners in trade; Darcy\'s pride and change; Wickham; Mrs Bennet\'s vulgarity. Context: rank and inheritance in Regency England; marriage and social mobility.' },
];
const SIGNFOUR: Extract[] = [
  { scene: 'Chapter 1 (The Science of Deduction)', intro: 'In this extract Watson watches Holmes inject cocaine and then challenges him to deduce something from a watch.', locate: 'Find the opening of the novel, where Holmes uses a "seven-per-cent solution" and then analyses the watch belonging to Watson\'s brother.', focus: 'how does Conan Doyle present Holmes as an unusual hero in *The Sign of Four*?', ind: 'Extract: Holmes\'s boredom and drug use; brilliant deductions; Watson\'s disapproval and admiration. Whole text: his disguises; dismissal of emotion ("love is an emotional thing"); the chase; his reaction to Watson\'s engagement; returning to the cocaine-bottle. Context: Victorian fascination with science and detection; cocaine\'s legal status; the detective genre.' },
  { scene: 'Chapter 12 (The Strange Story of Jonathan Small)', intro: 'In this extract Jonathan Small tells Holmes the story of the Agra treasure.', locate: 'Find Small\'s account of the Indian Rebellion, the murder of Achmet and the pact of "the four".', focus: 'how does Conan Doyle present ideas about greed in *The Sign of Four*?', ind: 'Extract: Small\'s justification and resentment; the treasure as a cause of murder and betrayal. Whole text: Major Sholto\'s betrayal; Thaddeus and Bartholomew; the empty box; Mary Morstan freed by the treasure\'s loss; Watson\'s relief. Context: the British Empire in India and 1857; imperial wealth and exploitation.' },
  { scene: 'Chapter 10 (The End of the Islander)', intro: 'In this extract the police launch chases the Aurora down the Thames.', locate: 'Find the river chase and the death of Tonga.', focus: 'how does Conan Doyle present ideas about the British Empire in *The Sign of Four*?', ind: 'Extract: racist, dehumanising description of Tonga (a modern reader should critique this); excitement and danger. Whole text: Small\'s story; Major Sholto and Captain Morstan; treasure from India; London as the centre of empire. Context: Victorian imperial attitudes and racism; fears of "the other" returning to England.' },
];

// ---------------- Paper 2 Section A: modern texts (choose one of two) ----------------
type Modern = [string, string, string]; // question focus, indicative content, topicId
const MODERN: Record<string, { title: string; author: string; tests: [Modern, Modern][] }> = {
  aic: {
    title: 'An Inspector Calls', author: 'Priestley',
    tests: [
      [['How does Priestley use the character of Eva Smith to explore ideas about the treatment of the working class?', 'Eva never appears - she represents "millions and millions" of workers; Birling\'s sacking of her over a wage rise ("it\'s my duty to keep labour costs down"); Sheila\'s jealousy at Milwards; Gerald\'s affair (Daisy Renton); Mrs Birling\'s refusal at the charity committee; the Inspector\'s "We are members of one body"; the photograph and possibility of several girls; context: 1912 setting vs 1945 audience, the Welfare State, Priestley\'s socialism.', 'aic-themes'], ['How does Priestley present ideas about family in *An Inspector Calls*?', 'The opening celebration and port; Birling\'s pride in the engagement as a business merger ("Crofts and Birling"); Mrs Birling\'s control and denial over Eric; Sheila and Eric\'s growing criticism of their parents; the family split by age; the ending - the parents relax while the children cannot; dramatic irony; context: Edwardian patriarchal family, class respectability.', 'aic-themes']],
      [['How far does Priestley present Mr Birling as a foolish character?', 'Dramatic irony - "unsinkable", "nobody wants war"; "hard-headed, practical man of business"; capitalist views ("a man has to mind his own business"); worry about his knighthood and scandal; failure to learn; the stage direction "heavy-looking, rather portentous man"; context: Priestley\'s attack on capitalism; 1945 audience who knew about the Titanic and two world wars.', 'aic-characters'], ['How does Priestley present ideas about guilt and responsibility?', 'The Inspector\'s chain of events; each character\'s response; Sheila accepts her share of the blame; Eric\'s guilt and drinking; Mr and Mrs Birling deny responsibility; Gerald\'s mixture; the Inspector\'s final speech "fire and blood and anguish"; the ending\'s phone call; context: collective responsibility and the post-war Labour government.', 'aic-themes']],
      [['How does Priestley use the Inspector as a dramatic device?', 'His name (Goole/ghoul); his "impression of massiveness, solidity and purposefulness"; control of pace - one line of enquiry at a time; the photograph; interruptions; the moral voice of Priestley; the final speech; the mystery of whether he is real; lighting change "pink and intimate" to "brighter and harder"; context: morality play tradition, Priestley\'s socialism.', 'aic-characters'], ['How does Priestley present ideas about change in *An Inspector Calls*?', 'The younger generation changes - Sheila and Eric; the older generation resists; Gerald\'s partial change; the cyclical structure and the second phone call; time plays; the Inspector\'s warning; context: 1945 audience and hope for a fairer society, the Welfare State, women\'s changing role.', 'aic-themes']],
    ],
  },
  blood: {
    title: 'Blood Brothers', author: 'Russell',
    tests: [
      [['How does Russell use the Narrator in *Blood Brothers*?', 'Breaks the fourth wall; reminds audience of the ending from the start ("So did y\' hear the story of the Johnstone twins?"); menacing presence and the "devil\'s got your number" refrain; links to superstition and fate; comments on class; Brechtian device; shifts between roles (milkman, gynaecologist); context: Russell\'s Liverpool, 1980s unemployment.', 'bb-themes'], ['How does Russell present ideas about superstition and fate?', 'Mrs Lyons invents the superstition about twins separated; shoes on the table; the Narrator\'s songs; the ending fulfils the "prophecy"; is it fate or class that kills them? Mrs Johnstone\'s "Marilyn Monroe" motif; context: working-class superstition, the playwright\'s message that class, not fate, decides lives.', 'bb-themes']],
      [['How far does Russell present Mrs Lyons as a villain?', 'Her desperation to have a child; manipulation of Mrs Johnstone with the Bible oath; superstition as control; dismissing Mrs Johnstone; paranoia and attack with a knife; telling Mickey about Edward and Linda; sympathy for her loneliness; context: middle-class respectability, motherhood and class.', 'bb-plot'], ['How does Russell present ideas about growing up in *Blood Brothers*?', 'Childhood games ("Bang bang, you\'re dead"); the "Kids\' Game" song; teenage years and school; adulthood - unemployment, prison, depression; Edward at university; the twins\' innocence lost; context: Thatcher-era unemployment, education and class inequality.', 'bb-themes']],
      [['How does Russell present the character of Sammy?', 'Early mischief and violence (shooting, stealing); the tin plate in his head; the bus conductor robbery; dragging Mickey into crime; a symbol of what poverty and lack of opportunity create; contrast with Edward; context: crime and unemployment in 1970s-80s Liverpool.', 'bb-plot'], ['How does Russell present ideas about education and opportunity?', 'Edward\'s boarding school vs Mickey\'s secondary modern; the suspension scene; Edward goes to university while Mickey works in a factory and is made redundant; "I could have been him"; Linda\'s view; context: the 11-plus and class-divided schooling; Russell\'s own route to education as an adult.', 'bb-themes']],
    ],
  },
  lotf: {
    title: 'Lord of the Flies', author: 'Golding',
    tests: [
      [['How far does Golding present Jack as a frightening character?', 'First appearance marching the choir in black cloaks, demanding to be chief; anger and humiliation at losing the vote; face paint frees him - "liberated from shame and self-consciousness"; "Bollocks to the rules!"; the tribe, feasts and Simon\'s death; Ralph hunted; the naval officer reduces him to "a little boy"; context: post-WW2, totalitarianism, Golding\'s view of human evil.', 'lotf-themes'], ['How does Golding present the importance of the island setting?', 'The island as a paradise (Eden) at first; the scar; the forest and darkness; fire destroying the island; the beast and fear in the jungle; Castle Rock vs the platform; the ending - "the burning wreckage of the island"; context: Ballantyne\'s *The Coral Island* (subverted), Cold War nuclear threat.', 'lotf-themes']],
      [['How does Golding present Roger in *Lord of the Flies*?', 'Throwing stones but missing at first - "the taboo of the old life"; increasing sadism; killing Piggy with the boulder; "a stick sharpened at both ends"; the torturer of Samneric; what happens when civilisation is removed; context: Golding\'s war experience, Nazi atrocities.', 'lotf-themes'], ['How does Golding present ideas about civilisation and savagery?', 'The conch and assemblies; the fire as rescue; Piggy\'s glasses; face paint and chanting; the breakdown of rules; Simon\'s and Piggy\'s deaths; the naval officer - the adult world is also at war; context: British public-school values, WW2, Golding\'s pessimism about humanity.', 'lotf-themes']],
      [['How does Golding present the significance of the ending of *Lord of the Flies*?', 'The naval officer\'s arrival; dramatic contrast with the hunt; his view "Jolly good show. Like the Coral Island"; Ralph weeps for "the end of innocence, the darkness of man\'s heart"; the officer looking at his cruiser - irony; context: nuclear war, the Cold War.', 'lotf-plot'], ['How does Golding present ideas about fear in *Lord of the Flies*?', 'The littlun with the birthmark and the "beastie"; the dead parachutist; the Lord of the Flies speaking to Simon; Jack uses fear to gain power; Simon\'s idea that the beast is "only us"; Piggy\'s rational view; context: post-war fears, propaganda and totalitarian control.', 'lotf-themes']],
    ],
  },
  animal: {
    title: 'Animal Farm', author: 'Orwell',
    tests: [
      [['How does Orwell use the character of Boxer to explore the treatment of the working class?', 'Boxer\'s strength and loyalty; maxims "I will work harder" and "Napoleon is always right"; the windmill; injury and being sold to the knacker; Squealer\'s lies about his death; Benjamin\'s grief; Boxer represents the Stakhanovite proletariat; context: the Russian Revolution, Soviet exploitation of workers.', 'af-themes'], ['How does Orwell present ideas about education and knowledge?', 'The pigs learn to read; the other animals cannot; the Seven Commandments changed; "Four legs good, two legs bad"; Squealer\'s statistics; Napoleon\'s control of the puppies\' education; Benjamin\'s silence; context: Soviet propaganda and censorship.', 'af-themes']],
      [['How does Orwell present Old Major and his ideas in *Animal Farm*?', 'His dream and speech; "All men are enemies. All animals are comrades"; Beasts of England; respect for him; how his ideals are betrayed; the skull displayed later; context: Marx and Lenin; Communist ideals.', 'af-plot'], ['How does Orwell present ideas about violence and fear?', 'The dogs chase Snowball; the show trials and executions; the battles of the Cowshed and the Windmill; fear keeps animals obedient; the sheep\'s bleating; context: Stalin\'s purges, secret police.', 'af-themes']],
      [['How does Orwell present the humans in *Animal Farm*?', 'Mr Jones\'s neglect and drunkenness; Pilkington and Frederick; the human view of the farm; the final card game - "impossible to say which was which"; context: Tsar Nicholas II, Western powers and Hitler, the Tehran Conference.', 'af-plot'], ['How does Orwell present ideas about power and corruption?', 'The pigs taking milk and apples; moving into the farmhouse; changing commandments; walking on two legs; "All animals are equal but some animals are more equal than others"; Napoleon\'s cult of personality; context: Stalin\'s totalitarian rule, Lord Acton\'s idea that power corrupts.', 'af-themes']],
    ],
  },
  dna: { title: 'DNA', author: 'Kelly', tests: [
    [['How far does Kelly present Phil as a powerful leader?', 'Silence and eating as power; takes control from John Tate; the cover-up plan; decision about Adam; isolation at the end; context: youth gangs and peer pressure.', 'dna-overview'], ['How does Kelly present ideas about guilt?', 'Brian\'s breakdown; Leah\'s questions; Jan and Mark; Phil\'s silence; consequences for the postman; context: moral responsibility.', 'dna-overview']],
    [['How does Kelly present Cathy as a character who changes?', 'From follower to ruthless; enjoying fame and danger; her role in Adam\'s fate; context: power and violence among young people.', 'dna-overview'], ['How does Kelly present ideas about fear?', 'Fear of being caught; John Tate\'s threats; fear keeps the group together; Adam\'s trauma; context: gangs and loyalty.', 'dna-overview']],
    [['How does Kelly present Brian?', 'Weak and frightened; forced to identify the "suspect"; his breakdown and medication; scapegoat; context: bullying.', 'dna-overview'], ['How does Kelly present ideas about right and wrong?', 'Leah\'s moral voice; Phil\'s pragmatism; the group\'s choices; Adam\'s fate; context: written for young performers - a moral challenge.', 'dna-overview']],
  ] },
  honey: { title: 'A Taste of Honey', author: 'Delaney', tests: [
    [['How does Delaney present Jo as an independent young woman?', 'Her wit and defiance; relationship with Jimmie; pregnancy; independence from Helen; context: 1950s attitudes to young women.', 'honey-overview'], ['How does Delaney present ideas about motherhood?', 'Helen\'s neglect and return; Jo\'s fears about the baby; Geof\'s caring role; context: stigma of single mothers.', 'honey-overview']],
    [['How does Delaney present Geof and his relationship with Jo?', 'Kindness, domestic care; Jo\'s teasing about his sexuality; Helen drives him out; context: homosexuality illegal until 1967.', 'honey-overview'], ['How does Delaney present ideas about loneliness?', 'Jo alone in the flat; Helen\'s men; Geof\'s isolation; music-hall moments; context: kitchen-sink drama.', 'honey-overview']],
    [['How far does Delaney present Helen as a bad mother?', 'Selfishness and leaving with Peter; sharp humour; returning; sympathy for her past; context: working-class women\'s choices.', 'honey-overview'], ['How does Delaney present ideas about prejudice?', 'Race (Jimmie), sexuality (Geof), class, gender; Helen\'s attitudes; context: 1950s Britain.', 'honey-overview']],
  ] },
  leave: { title: 'Leave Taking', author: 'Pinnock', tests: [
    [['How does Pinnock present Del as a rebellious character?', 'Conflict with Enid; leaves home; pregnancy; staying with Mai; identity; context: second-generation Caribbean British experience.', 'leave-overview'], ['How does Pinnock present ideas about identity and belonging?', 'Enid\'s efforts to fit in; Del and Viv\'s British identities; Brod\'s anger; Jamaica as home; context: Windrush and racism.', 'leave-overview']],
    [['How does Pinnock present Mai?', 'Obeah woman; wisdom and loneliness; her own lost children; guidance for Enid and Del; context: Caribbean spiritual traditions.', 'leave-overview'], ['How does Pinnock present ideas about sacrifice?', 'Enid\'s work and hopes; sending money home; mother\'s death; Viv\'s studies; context: migrant experience.', 'leave-overview']],
    [['How does Pinnock present Viv and the pressure to succeed?', 'Studious daughter; Enid\'s expectations; Viv\'s questions about heritage; context: education as a route to belonging.', 'leave-overview'], ['How does Pinnock present ideas about home?', 'London vs Jamaica; Mai\'s house; Enid\'s homesickness; Brod; the ending; context: diaspora.', 'leave-overview']],
  ] },
  princess: { title: 'Princess & The Hustler', author: 'Odimba', tests: [
    [['How does Odimba present the character of the Hustler?', 'His return and charm; the effect on Mavis and the children; responsibility and family; context: 1960s Bristol.', 'princess-overview'], ['How does Odimba present ideas about racism?', 'The colour bar and the Bus Boycott; everyday prejudice; the family\'s resistance; context: Race Relations Act 1965.', 'princess-overview']],
    [['How does Odimba present Mavis as a strong character?', 'Work and sacrifice; protecting her children; dealing with the Hustler\'s return; context: Black women in 1960s Britain.', 'princess-overview'], ['How does Odimba present ideas about identity and self-worth?', 'Beauty pageant and beauty standards; Princess\'s confidence; family pride; context: Windrush generation children.', 'princess-overview']],
    [['How does Odimba present relationships between brothers and sisters?', 'Princess and her siblings; arguments and loyalty; the effect of the father\'s return; context: family life in 1963.', 'princess-overview'], ['How does Odimba present ideas about hope?', 'Princess\'s dreams; the Bus Boycott\'s success; family rebuilding; context: civil rights movements.', 'princess-overview']],
  ] },
  tales: { title: 'Telling Tales', author: 'the writers', tests: [
    [['How do writers present characters who feel guilty in \'The Darkness Out There\' and in one other story from *Telling Tales*?', 'Mrs Rutter\'s lack of guilt vs Kerry\'s shock; Sandra\'s growing awareness; compare with \'Korea\' (the son\'s view of his father) or \'Chemistry\'; methods: narrative perspective, symbolism, endings.', 'tales-overview'], ['How do writers present relationships between husbands and wives in \'Odour of Chrysanthemums\' and in one other story from *Telling Tales*?', 'Elizabeth and Walter; laying out the body - "she had denied him"; compare with \'A Family Supper\' or \'Chemistry\'; methods: setting, imagery of the chrysanthemums, dialogue.', 'tales-overview']],
    [['How do writers present the effects of the past in \'A Family Supper\' and in one other story from *Telling Tales*?', 'The mother\'s death by fugu; father\'s war and business past; compare with \'The Darkness Out There\'; methods: understatement, ambiguity.', 'tales-overview'], ['How do writers present characters who want to escape in \'Invisible Mass of the Back Row\' and in one other story from *Telling Tales*?', 'Aspiration, imagination; compare with \'Korea\' or \'My Polish Teacher\'s Tie\'; methods: voice, structure.', 'tales-overview']],
    [['How do writers present young people growing up in \'Korea\' and in one other story from *Telling Tales*?', 'The son\'s realisation about his father; compare with \'The Darkness Out There\' or \'Chemistry\'; methods: first-person retrospective narration, symbols (the eels, the war story).', 'tales-overview'], ['How do writers present characters who feel isolated in \'Chemistry\' and in one other story from *Telling Tales*?', 'Grandfather\'s isolation and the boat; compare with \'Odour of Chrysanthemums\'; methods: symbolism, narrator.', 'tales-overview']],
  ] },
  anita: { title: 'Anita and Me', author: 'Syal', tests: [
    [['How does Syal present Meena\'s relationship with her parents?', 'Lies and guilt; Papa\'s singing and Mama\'s homesickness; their values and expectations; Meena\'s growing understanding; context: first- and second-generation migrants.', 'anita-overview'], ['How does Syal present ideas about growing up?', 'Meena\'s lies; her accident and hospital; passing the 11-plus; leaving Tollington; context: 1970s childhood.', 'anita-overview']],
    [['How does Syal present Nanima?', 'Her arrival; storytelling; Meena\'s pride in Punjabi heritage; departure; context: extended families.', 'anita-overview'], ['How does Syal present ideas about belonging?', 'Meena between two cultures; fitting in with Anita; the village community; context: British-Asian identity.', 'anita-overview']],
    [['How does Syal present Sam Lowbridge?', 'Charismatic, frustrated; the racist speech at the fete; the attack on the bank manager; Meena\'s reaction; context: 1970s racism, unemployment.', 'anita-overview'], ['How does Syal present ideas about friendship?', 'Meena and Anita; Robert in hospital; Meena\'s loyalties; context: girlhood and class.', 'anita-overview']],
  ] },
  pigeon: { title: 'Pigeon English', author: 'Kelman', tests: [
    [['How does Kelman use the pigeon in *Pigeon English*?', 'Short italic sections; a guardian figure; perspective on the city; the ending; symbolism of freedom and belonging; context: Harri\'s faith.', 'pigeon-overview'], ['How does Kelman present ideas about family?', 'Mamma and Lydia; missing Papa and Agnes; Auntie Sonia; protection and fear; context: migration from Ghana.', 'pigeon-overview']],
    [['How does Kelman present Harri\'s friendship with Dean?', 'Detective games; loyalty and humour; differences; the investigation; context: childhood friendship on an estate.', 'pigeon-overview'], ['How does Kelman present ideas about innocence?', 'Harri\'s voice and slang; misunderstanding danger; trainers and games; his death; context: the killing of Damilola Taylor.', 'pigeon-overview']],
    [['How does Kelman present the Dell Farm Crew?', 'X-Fire and Killa; initiation; violence and threats; peer pressure; context: knife crime and gangs.', 'pigeon-overview'], ['How does Kelman present ideas about belonging?', 'Harri as a newcomer; language and slang; school; the gang; the pigeon; context: immigrant experience in London.', 'pigeon-overview']],
  ] },
  leon: { title: 'My Name is Leon', author: 'de Waal', tests: [
    [['How does de Waal present Leon\'s relationship with Jake?', 'Leon\'s love and care for his brother; Jake\'s adoption; Leon\'s plans to find him; the ending; context: adoption preferences and race.', 'leon-overview'], ['How does de Waal present ideas about family?', 'Carol, Maureen, Sylvia, Tufty; chosen family; context: the care system.', 'leon-overview']],
    [['How far does de Waal present Tufty as a positive influence?', 'The allotment; Black role model; conflict with Mr Devlin; the riots; context: 1981 Birmingham.', 'leon-overview'], ['How does de Waal present ideas about racism?', 'Adoption choices; police; the riots; everyday prejudice; context: early 1980s Britain.', 'leon-overview']],
    [['How does de Waal present Carol?', 'Depression and inability to cope; Leon\'s loyalty; visits; sympathy; context: mental health and poverty.', 'leon-overview'], ['How does de Waal present ideas about growing up?', 'Leon\'s anger and theft; responsibility; finding identity; context: childhood in care.', 'leon-overview']],
  ] },
};

// ---------------- Paper 2 Section B: anthology poetry ----------------
interface Anthology { poem: string; poet: string; focus: string; text?: string; ind: string }
const CHARGE = `Half a league, half a league,
Half a league onward,
All in the valley of Death
Rode the six hundred.
"Forward, the Light Brigade!
Charge for the guns!" he said:
Into the valley of Death
Rode the six hundred.

"Forward, the Light Brigade!"
Was there a man dismay'd?
Not tho' the soldier knew
Some one had blunder'd:
Theirs not to make reply,
Theirs not to reason why,
Theirs but to do and die:
Into the valley of Death
Rode the six hundred.

Cannon to right of them,
Cannon to left of them,
Cannon in front of them
Volley'd and thunder'd;
Storm'd at with shot and shell,
Boldly they rode and well,
Into the jaws of Death,
Into the mouth of Hell
Rode the six hundred.

Flash'd all their sabres bare,
Flash'd as they turn'd in air
Sabring the gunners there,
Charging an army, while
All the world wonder'd:
Plunged in the battery-smoke
Right thro' the line they broke;
Cossack and Russian
Reel'd from the sabre-stroke
Shatter'd and sunder'd.
Then they rode back, but not
Not the six hundred.

Cannon to right of them,
Cannon to left of them,
Cannon behind them
Volley'd and thunder'd;
Storm'd at with shot and shell,
While horse and hero fell,
They that had fought so well
Came thro' the jaws of Death,
Back from the mouth of Hell,
All that was left of them,
Left of six hundred.

When can their glory fade?
O the wild charge they made!
All the world wonder'd.
Honour the charge they made!
Honour the Light Brigade,
Noble six hundred!`;
const PARTED = `When we two parted
In silence and tears,
Half broken-hearted
To sever for years,
Pale grew thy cheek and cold,
Colder thy kiss;
Truly that hour foretold
Sorrow to this.

The dew of the morning
Sunk chill on my brow—
It felt like the warning
Of what I feel now.
Thy vows are all broken,
And light is thy fame:
I hear thy name spoken,
And share in its shame.

They name thee before me,
A knell to mine ear;
A shudder comes o'er me—
Why wert thou so dear?
They know not I knew thee,
Who knew thee too well:—
Long, long shall I rue thee,
Too deeply to tell.

In secret we met—
In silence I grieve,
That thy heart could forget,
Thy spirit deceive.
If I should meet thee
After long years,
How should I greet thee?—
With silence and tears.`;
const FARMER = `Three Summers since I chose a maid,
Too young maybe—but more's to do
At harvest-time than bide and woo.
When us was wed she turned afraid
Of love and me and all things human;
Like the shut of a winter's day.
Her smile went out, and 'twasn't a woman—
More like a little frightened fay.

One night, in the Fall, she runned away.
"Out 'mong the sheep, her be," they said,
'Should properly have been abed;
But sure enough she wasn't there
Lying awake with her wide brown stare.
So over seven-acre field and up-along across the down
We chased her, flying like a hare
Before our lanterns. To Church-Town
All in a shiver and a scare
We caught her, fetched her home at last
And turned the key upon her, fast.

She does the work about the house
As well as most, but like a mouse:
Happy enough to chat and play
With birds and rabbits and such as they,
So long as men-folk keep away.
"Not near, not near!" her eyes beseech
When one of us comes within reach.
The women say that beasts in stall
Look round like children at her call.
*I've* hardly heard her speak at all.

Shy as a leveret, swift as he,
Straight and slight as a young larch tree,
Sweet as the first wild violets, she,
To her wild self. But what to me?

The short days shorten and the oaks are brown,
The blue smoke rises to the low grey sky,
One leaf in the still air falls slowly down,
A magpie's spotted feathers lie
On the black earth spread white with rime,
The berries redden up to Christmas-time.
What's Christmas-time without there be
Some other in the house than we!

She sleeps up in the attic there
Alone, poor maid. 'Tis but a stair
Betwixt us. Oh! my God! the down,
The soft young down of her, the brown,
The brown of her—her eyes, her hair, her hair!`;
const ENGLAND1819 = `An old, mad, blind, despised, and dying king,—
Princes, the dregs of their dull race, who flow
Through public scorn,—mud from a muddy spring,—
Rulers who neither see, nor feel, nor know,
But leech-like to their fainting country cling,
Till they drop, blind in blood, without a blow,—
A people starved and stabbed in the untilled field,—
An army, which liberticide and prey
Makes as a two-edged sword to all who wield,—
Golden and sanguine laws which tempt and slay;
Religion Christless, Godless—a book sealed;
A Senate,—Time's worst statute unrepealed,—
Are graves, from which a glorious Phantom may
Burst, to illumine our tempestuous day.`;

const ANTHOLOGY: Record<string, { cluster: string; topic: string; tests: Anthology[] }> = {
  'power-conflict': {
    cluster: 'Power and conflict', topic: 'pc-overview',
    tests: [
      { poem: 'The Charge of the Light Brigade', poet: 'Alfred Tennyson', focus: 'ideas about courage', text: CHARGE, ind: 'Charge: dactylic rhythm imitates galloping horses; repetition of "the six hundred" and "valley of Death" (biblical echo, Psalm 23); "Theirs not to reason why" - obedience as honour, though "Some one had blunder\'d" hints at criticism of leaders; personification "jaws of Death", "mouth of Hell"; the shorter return line "not / Not the six hundred"; imperatives "Honour the charge they made!" - celebration and patriotism. Good comparisons: Bayonet Charge (courage stripped back to terror - "King, honour, human dignity, etcetera / Dropped like luxuries"), Exposure (no heroism, only waiting), Remains (courage leaves guilt), Kamikaze (courage questioned by choosing life). Context: the Crimean War (1854), Tennyson as Poet Laureate, newspaper reports by W.H. Russell.' },
      { poem: 'Storm on the Island', poet: 'Seamus Heaney', focus: 'the power of nature', ind: 'Storm: confident opening "We are prepared" turns to fear; blank verse, one stanza - like a fortified house; military metaphors ("exploding comfortably", "strafes", "bombarded"); oxymoron "exploding comfortably"; final line "it is a huge nothing that we fear" - fear of the unseen; possible political reading (the title puns on "Stormont"). Good comparisons: The Prelude (nature\'s sublime power humbling the speaker), Exposure ("the merciless iced east winds that knive us"), Ozymandias (time and nature outlast human power), Kamikaze (nature\'s beauty changes the pilot\'s mind). Context: Heaney\'s rural Northern Ireland, the Troubles.' },
      { poem: 'Poppies', poet: 'Jane Weir', focus: 'the effects of loss', ind: 'Poppies: a mother\'s domestic, tactile memories ("I rounded up as many white cat hairs / as I could"); remembrance imagery (poppies, "Armistice Sunday", war memorial); sewing and textiles imagery ("Sellotape bandaged", "my stomach busy / making tucks, darts, pleats"); free verse and caesurae for fractured emotions; the open ending "hoping to hear / your playground voice catching on the wind" - grief without closure. Good comparisons: Kamikaze (family loss and rejection), The Emigrée (loss of a homeland), War Photographer (distant readers\' indifference to loss), Remains (loss of peace of mind). Context: Weir wrote it in 2009 for contemporary conflicts (Iraq, Afghanistan); the female perspective on war.' },
    ],
  },
  'love-rel': {
    cluster: 'Love and relationships', topic: 'lr-overview',
    tests: [
      { poem: 'When We Two Parted', poet: 'Lord Byron', focus: 'the pain of lost love', text: PARTED, ind: 'When We Two Parted: cyclical structure ("In silence and tears" / "With silence and tears") - the pain never ends; regular rhyme and short lines feel controlled yet bitter; pathetic fallacy "The dew of the morning / Sunk chill on my brow"; "Pale grew thy cheek and cold, / Colder thy kiss" - foreshadowing; secrecy ("In secret we met") and public shame ("I hear thy name spoken, / And share in its shame"); "A knell to mine ear" - love as death; rhetorical question "Why wert thou so dear?". Good comparisons: Neutral Tones (bitter memory, cold imagery), Porphyria\'s Lover (possessive jealousy), Love\'s Philosophy (rejected desire), Winter Swans (relationship in difficulty but reconciled). Context: Byron\'s secret affair (thought to be with Lady Frances Webster); Regency scandal and reputation.' },
      { poem: 'Walking Away', poet: 'Cecil Day-Lewis', focus: 'feelings about separation', ind: 'Walking Away: a father remembers watching his son walk away to his first football match/school; retrospective voice ("It is eighteen years ago, almost to the day"); similes "like a satellite / Wrenched from its orbit" and "like a winged seed loosened from its parent stem"; regular stanzas with an ABACA rhyme - control over emotion; final lines "selfhood begins with a walking away, / And love is proved in the letting go" - painful acceptance. Good comparisons: Mother, any distance (letting go and holding on), Follower (role reversal), Eden Rock (death as separation), Before You Were Mine. Context: written in 1956 about Day-Lewis\'s son Sean.' },
      { poem: 'The Farmer\'s Bride', poet: 'Charlotte Mew', focus: 'difficulties in relationships', text: FARMER, ind: 'Farmer\'s Bride: dramatic monologue in rural dialect ("When us was wed", "runned away"); the farmer "chose a maid" - she had no say; animal imagery ("flying like a hare", "like a mouse", "Shy as a leveret") presents her as wild and hunted; "turned the key upon her, fast" - imprisonment; the seasonal imagery and the empty Christmas; the final stanza\'s caesura and repetition ("Oh! my God! the down, / The soft young down of her, the brown, / The brown of her - her eyes, her hair, her hair!") - desire and frustration, menace or longing. Good comparisons: Porphyria\'s Lover (male possession and control), Sonnet 29 (healthy desire), Singh Song! (happy marriage), Neutral Tones (failed relationship). Context: published 1916; women\'s limited rights in marriage; Mew\'s own isolation.' },
    ],
  },
  'worlds-lives': {
    cluster: 'Worlds and lives', topic: 'wl-overview',
    tests: [
      { poem: 'England in 1819', poet: 'Percy Bysshe Shelley', focus: 'anger about injustice', text: ENGLAND1819, ind: 'England in 1819: an angry sonnet that breaks the love-sonnet tradition; a list of corrupt institutions (king, princes, rulers, army, laws, religion, Senate) builds to a single sentence; harsh adjectives "old, mad, blind, despised, and dying king"; metaphors "mud from a muddy spring", "leech-like"; the Peterloo Massacre - "A people starved and stabbed in the untilled field"; the volta in the final couplet - "a glorious Phantom may / Burst, to illumine our tempestuous day" - hope of revolution. Good comparisons: Lines Written in Early Spring ("what man has made of man"), A Century Later (Malala\'s courage against oppression), Thirteen, In a London Drawingroom. Context: Peterloo (August 1819), George III\'s madness, the Prince Regent; Shelley\'s radical politics - the poem was not published until 1839.' },
      { poem: 'Homing', poet: 'Liz Berry', focus: 'ideas about identity', ind: 'Homing: the speaker\'s mother losing her Black Country accent to fit in; dialect words celebrated; the extended metaphor of pigeons homing - identity as the way back home; the speaker wants to give the accent back to her mother; second-person address; tender, affectionate tone. Good comparisons: Name Journeys (names and heritage), A Portable Paradise (carrying home with you), The Jewellery Maker, In a London Drawingroom (how places shape people). Context: stigma attached to regional accents; class and identity in the West Midlands.' },
      { poem: 'A Century Later', poet: 'Imtiaz Dharker', focus: 'the courage of young people', ind: 'A Century Later: based on Malala Yousafzai, shot by the Taliban in 2012; links schoolgirls today with the young soldiers of WW1 a century earlier; military language presents going to school as stepping into battle; violence and oppression set against books and knowledge; defiant ending - a single girl as an army. Good comparisons: England in 1819 (resistance to oppression), Thirteen (young people at risk), Lines Written in Early Spring. Context: girls\' education under threat; the centenary of WW1 (2014).' },
    ],
  },
};

// ---------------- Paper 2 Section C: unseen poems (written for this app) ----------------
const UNSEEN: { a: [string, string]; b: [string, string]; q1: string; ind1: string; q2: string; ind2: string }[] = [
  {
    a: ['Learning to Swim', `My father held me in the shallow end,
one palm beneath my back, as if I were
a letter he was learning how to send.

"I've got you," said the water, said his voice –
the two of them so close I couldn't tell
which one was holding me. I had no choice

but trust. Above us, rain on panes of glass.
Kick, he said. Kick. And somewhere in the noise
his hand became a rumour, then a ghost,

a warmth that faded slowly from my skin.
I did not know that I was swimming. I
was only listening for him. Looking in

across the bright and chlorine-stinging hall
I saw him on the steps, both empty hands
held up, as if to show me that was all

he had to give – and it was everything.`],
    b: ['Leaving Day', `Your room is boxes now. The posters gone,
four squares of brighter paint where they once hung
like windows to the years you've moved beyond.

I fold the jumpers you have left behind
and put them back. I don't know why. The car
is packed so tight the back seat holds its breath.

You hug me at the gate – too quick, too tall –
and say you'll ring. I say of course you will.
The engine coughs. The neighbour's dog. The road.

And then the street is just a street again.
I stand there with my hand still in the air
like someone who has asked a question

and is waiting for the answer to arrive.`],
    q1: 'In \'Learning to Swim\', how does the poet present the speaker\'s feelings about their father?',
    ind1: 'Simile "as if I were / a letter he was learning how to send" - the father preparing to let go; the merging voices ("said the water, said his voice") show complete trust; enjambment across stanzas ("I had no choice // but trust") enacts the moment of being let go; repetition of the imperative "Kick... Kick"; the hand becoming "a rumour, then a ghost" - the gradual, gentle withdrawal; "I did not know that I was swimming" - independence achieved without noticing; the father\'s "empty hands" - he has given everything; tercets that loosely rhyme (terza rima) carry the reader forward; the isolated final line "he had to give – and it was everything" - gratitude and love; retrospective adult voice.',
    q2: 'In both \'Learning to Swim\' and \'Leaving Day\' the speakers describe a moment when a parent lets a child go. What are the similarities and/or differences between the methods the poets use to present these moments?',
    ind2: 'Perspective: child looking back (Learning to Swim) vs parent at the moment of loss (Leaving Day); both use hands as symbols - the father\'s "empty hands" held up / the parent\'s "hand still in the air"; both use tercets and an isolated last line, but Learning to Swim ends with fulfilment ("everything") while Leaving Day ends with incompleteness ("waiting for the answer to arrive"); Leaving Day\'s short sentences and fragments ("The engine coughs. The neighbour\'s dog. The road.") show numb shock; personification "the back seat holds its breath"; both present letting go as an act of love that leaves an absence.',
  },
  {
    a: ['Night Shift', `At three a.m. the city is a ship
with no one on the deck but me. I mop
the corridor of Ward 9 in long, slow strokes

while monitors keep up their small green talk.
Outside, the motorway's a thread of light
that someone keeps on pulling, never cuts.

Each night I pass the same tired sign: EXIT,
red as an ember, and I never take it.
The coffee machine hums its single note.

I like it here. Nobody needs my name.
The windows hold my face against the dark
like something they have found and want to keep,

and when the first bus groans across the bridge
and daylight comes in, grey and full of people,
I fold the night up small and take it home.`],
    b: ['Urban Fox', `She comes at dusk, a flicker by the bins,
a struck match running low along the fence,
all ribs and rust and sudden, burning eyes.

She does not ask permission of the street.
She owns the car park like a queen in exile,
steps through the takeaway cartons, delicate

as someone crossing ice. The houses watch
with blue TV light flickering in their eyes.
A siren somewhere. She does not look up.

We built all this for us: the roads, the walls,
the neat front gardens with their gravel paths.
She takes it back each night, one bin at a time.`],
    q1: 'In \'Night Shift\', how does the poet present the speaker\'s feelings about working at night?',
    ind1: 'Opening metaphor "the city is a ship / with no one on the deck but me" - solitude, even a sense of being in charge; slow rhythm and long vowels ("long, slow strokes"); personification "monitors keep up their small green talk", "coffee machine hums its single note" - quiet companionship; metaphor of the motorway as a "thread of light"; the EXIT sign "red as an ember" that the speaker "never take[s]" - a choice to stay; short declarative "I like it here. Nobody needs my name." - contentment in anonymity, perhaps loneliness; windows "hold my face... want to keep" - belonging; contrast with the "grey" crowded daylight; final metaphor "I fold the night up small and take it home" - the night as something precious; regular tercets mirror routine.',
    q2: 'In both \'Night Shift\' and \'Urban Fox\' the poets describe life in a city at night. What are the similarities and/or differences between the methods the poets use?',
    ind2: 'Both personify the city (monitors that "talk"; houses that "watch" with TV light for eyes); Night Shift uses first person and a calm, contented tone, Urban Fox uses third person and admiration for a wild outsider; imagery of fire in both ("red as an ember" / "a struck match", "burning eyes"); Urban Fox\'s simile "like a queen in exile" gives the fox dignity and power; both use tercets but Urban Fox ends with a shift to "We" - humans\' ownership challenged ("She takes it back"); Night Shift ends with possession of the night; contrasting attitudes - city as refuge vs city reclaimed by nature.',
  },
  {
    a: ['My Grandmother\'s Coat', `It hangs behind the door still, heavy, brown,
the shape of her inside it, more or less –
the shoulders where the shoulders used to be.

In one pocket: a mint, a bus ticket
from 1998, a button that belongs
to nothing now. In the other, her hands

seem only to have just stepped out. I put
my own in, carefully, the way you'd step
into a room where someone is asleep.

It smells of rain and Sunday and the market,
of every winter she walked me to school.
My mother says we ought to give it away.

We will. But not today. Not while the wool
remembers how to hold her, and the door
still opens on her coming in from the cold.`],
    b: ['Inventory', `Six screwdrivers, a jar of mismatched screws,
a radio that only gets the cricket,
three paint tins with the colours of our walls –

the kitchen yellow, the bathroom's tired blue.
A pencil, sharpened with a knife. A calendar
still on the March he stopped coming down here.

I came to clear it out. I've cleared a shelf.
The rest is how he left it: the vice clamped tight
on nothing, as if holding on to something

that has already gone. The dust has settled
in a fine grey coat on everything he touched.
I write it down. I write it all down. I keep it.`],
    q1: 'In \'My Grandmother\'s Coat\', how does the poet present the speaker\'s feelings about their grandmother?',
    ind1: 'The coat as an extended metaphor for the grandmother\'s absent body ("the shape of her inside it, more or less"); listing the pocket\'s contents - ordinary details made precious; "a button that belongs / to nothing now" - loss of connection, enjambment isolating "to nothing now"; her hands "seem only to have just stepped out" - grief that denies the absence; simile "the way you\'d step / into a room where someone is asleep" - reverence and tenderness; sensory memory "rain and Sunday and the market"; the mother\'s practical voice vs the speaker\'s refusal - short sentences "We will. But not today."; personification "the wool / remembers how to hold her"; the final image of the door opening on "her coming in from the cold" - memory as a kind of return.',
    q2: 'In both \'My Grandmother\'s Coat\' and \'Inventory\' the speakers describe objects that remind them of someone they have lost. What are the similarities and/or differences between the methods the poets use to present these feelings?',
    ind2: 'Both use lists of everyday objects; Inventory\'s title and list form create a detached, factual tone that breaks down at the end, while My Grandmother\'s Coat is tender from the start; both personify objects (the wool "remembers"; the vice "holding on to something / that has already gone"); time markers ("from 1998"; the calendar "still on the March") show the moment of loss frozen; both speakers fail to clear things away ("not today"; "I\'ve cleared a shelf"); repetition in Inventory\'s last line ("I write it down. I write it all down. I keep it.") shows grief turning into preservation; both use tercets with enjambment; the "fine grey coat" of dust links to the coat in the first poem - covering and protecting.',
  },
];

// ---------------- Assembly ----------------
const P1_PLAYS: [string, string, Extract[], string][] = [
  ['romeo', 'Romeo and Juliet', ROMEO, 'rj-themes'],
  ['macbeth', 'Macbeth', MACBETH, 'mac-exam'],
  ['tempest', 'The Tempest', TEMPEST, 'tempest-overview'],
  ['merchant', 'The Merchant of Venice', MERCHANT, 'merchant-overview'],
  ['muchado', 'Much Ado About Nothing', MUCHADO, 'muchado-overview'],
  ['caesar', 'Julius Caesar', CAESAR, 'caesar-overview'],
];
const P1_NOVELS: [string, string, string, Extract[], string][] = [
  ['jekyll', 'The Strange Case of Dr Jekyll and Mr Hyde', 'Stevenson', JEKYLL, 'jh-exam'],
  ['acc', 'A Christmas Carol', 'Dickens', CAROL, 'acc-exam'],
  ['great-exp', 'Great Expectations', 'Dickens', GREATEXP, 'great-exp-overview'],
  ['jane-eyre', 'Jane Eyre', 'Brontë', JANEEYRE, 'jane-eyre-overview'],
  ['frankenstein', 'Frankenstein', 'Shelley', FRANKENSTEIN, 'frankenstein-overview'],
  ['pride', 'Pride and Prejudice', 'Austen', PRIDE, 'pride-overview'],
  ['sign-four', 'The Sign of Four', 'Conan Doyle', SIGNFOUR, 'sign-four-overview'],
];

const pad = (n: number) => String(n).padStart(2, '0');

function p1Test(t: number): MockTest {
  const sections: MockSection[] = [
    ...P1_PLAYS.map(([value, title, ex, topicId], i) => extractSection({ n: pad(i + 1), title, author: 'Shakespeare', kind: 'play', group: 'lit-shakespeare', value, topicId, ex: ex[t] })),
    ...P1_NOVELS.map(([value, title, author, ex, topicId], i) => extractSection({ n: pad(i + 7), title, author, kind: 'novel', group: 'lit-novel', value, topicId, ex: ex[t] })),
  ];
  return {
    id: `english-literature-p1-t${t + 1}`, paperId: 'english-literature-p1', n: (t + 1) as 1 | 2 | 3, title: `Practice paper ${t + 1}`,
    focus: [
      'Predicted focuses for every set text, e.g. Macbeth: the supernatural · Romeo and Juliet: love · A Christmas Carol: celebrating Christmas · Jekyll and Hyde: violence.',
      'Predicted focuses for every set text, e.g. Macbeth: guilt · Romeo and Juliet: rebelling against family · A Christmas Carol: employers\' responsibility · Jekyll and Hyde: science.',
      'Predicted focuses for every set text, e.g. Macbeth: masculinity · Romeo and Juliet: death · A Christmas Carol: social responsibility · Jekyll and Hyde: Jekyll\'s inner conflict.',
    ][t],
    sections,
  };
}

const MODERN_ORDER = ['aic', 'blood', 'lotf', 'animal', 'dna', 'honey', 'leave', 'princess', 'tales', 'anita', 'pigeon', 'leon'];
const POETRY_ORDER = ['love-rel', 'power-conflict', 'worlds-lives'];

function p2Test(t: number): MockTest {
  const modern: MockSection[] = MODERN_ORDER.map((value, i) => {
    const m = MODERN[value];
    const [a, b] = m.tests[t];
    const tales = value === 'tales';
    const ask = (q: string) => (q.includes('*') ? q : `${q.replace(/\?$/, '')} in *${m.title}*?`);
    const mk = (x: Modern, n: string) => w(n, examQ(`${ask(x[0])}\n\nWrite about:\n- ${tales ? 'the ideas in both stories' : 'the characters, events and ideas in the text that are relevant to the question'}\n- how ${m.author} ${tales ? 'present these ideas by the ways they write' : 'presents them by the ways the text is written'}.`, 34, essay(x[1], { spag: true }), { meta: 'Section A · AO1, AO2, AO3 (30 marks) + AO4 (4 marks)', time: 45, guidance: ['There is no extract: plan quotations from across the whole text (beginning, middle, end).', 'Make an argument about the question in your first paragraph and keep returning to it.', 'Analyse the writer\'s methods - stage directions, dramatic devices, structure and language - not just the plot.', 'Link context to the writer\'s purpose and message. Leave 5 minutes to check SPaG (4 marks).'] }), x[2], 40);
    return { title: `Section A: Modern texts – ${m.title}`, intro: 'Answer ONE question from this section on your text. You should spend about 45 minutes on this section.', option: { group: 'lit-modern', value }, chooseOne: true, questions: [mk(a, pad(i * 2 + 1)), mk(b, pad(i * 2 + 2))] };
  });
  const poetry: MockSection[] = POETRY_ORDER.map((value, i) => {
    const c = ANTHOLOGY[value];
    const p = c.tests[t];
    const src = p.text
      ? `**${p.poem}** – ${p.poet}\n\n${verse(p.text)}${p.poem.includes('Light Brigade') ? '\n\n*(Text as published by Tennyson. Your anthology may modernise spellings such as "blunder\'d".)*' : ''}`
      : `:::warn In the real exam '${p.poem}' by ${p.poet} is printed here\nIt is still in copyright, so the app can't reproduce it. Open your AQA anthology at this poem before you start.\n:::`;
    const q = examQ(`Compare how poets present ${p.focus} in '${p.poem}' and in **one** other poem from '${c.cluster}'.`, 30, essay(p.ind, { compare: true }), { meta: 'Section B · AO1, AO2, AO3 (30 marks)', time: 45, guidance: ['Choose your second poem quickly - one with a clear link (or a strong contrast) to the focus.', 'Compare throughout: use "whereas", "similarly", "in contrast" in every paragraph rather than writing about the poems separately.', 'Analyse language, form and structure in both poems; give context for both.', 'Your second poem is from memory - a few short, accurate quotations are enough.'] });
    return { title: `Section B: Poetry – ${c.cluster}`, intro: 'Answer the question on your cluster. You should spend about 45 minutes on this section.', source: src, option: { group: 'lit-poetry', value }, questions: [w(String(25 + i), q, c.topic, 40)] };
  });
  const u = UNSEEN[t];
  const unseen: MockSection = {
    title: 'Section C: Unseen poetry',
    intro: 'Answer both questions in this section. You should spend about 45 minutes on this section: about 30 minutes on 27.1 and 15 minutes on 27.2.',
    source: `**${u.a[0]}**\n\n${verse(u.a[1])}\n\n---\n\n**${u.b[0]}**\n\n${verse(u.b[1])}\n\n*(Both poems were written for this app.)*`,
    questions: [
      w('27.1', examQ(u.q1, 24, UNSEEN1(u.ind1), { meta: 'Section C · AO1, AO2 (24 marks)', time: 30, guidance: ['Read the poem twice. Decide what the speaker feels and how that feeling changes.', 'Write 3-4 paragraphs that each analyse a method (imagery, structure, form, sound) and its effect.', 'Context is not assessed here - focus on language, form and structure.'] }), 'unseen-method', 30),
      w('27.2', examQ(u.q2, 8, UNSEEN2(u.ind2), { meta: 'Section C · AO2 (8 marks)', time: 15, guidance: ['This is about methods only - compare HOW the poets write, not just what they say.', 'Make 2-3 direct comparisons, each with a short quotation from both poems.'] }), 'unseen-method', 14),
    ],
  };
  return {
    id: `english-literature-p2-t${t + 1}`, paperId: 'english-literature-p2', n: (t + 1) as 1 | 2 | 3, title: `Practice paper ${t + 1}`,
    focus: [
      'Two predicted questions on your modern text (e.g. An Inspector Calls: Eva Smith / family) · Poetry: courage, lost love, injustice · Unseen: a parent letting go.',
      'Two predicted questions on your modern text (e.g. An Inspector Calls: Mr Birling / guilt and responsibility) · Poetry: nature, separation, identity · Unseen: the city at night.',
      'Two predicted questions on your modern text (e.g. An Inspector Calls: the Inspector / change) · Poetry: loss, difficult relationships, young people\'s courage · Unseen: objects and memory.',
    ][t],
    sections: [...modern, ...poetry, unseen],
  };
}

export const ENGLISH_LITERATURE_PAPERS: MockPaper[] = [
  {
    id: 'english-literature-p1', subjectId: 'english-literature', title: 'Paper 1: Shakespeare and the 19th-century novel', board: 'AQA 8702/1-style',
    mins: 105, marks: 64, tools: ['working'],
    info: [
      'Time allowed: 1 hour 45 minutes. Total marks: 64.',
      'Answer ONE question from Section A (your Shakespeare play) and ONE question from Section B (your 19th-century novel). The app shows the texts chosen in Settings.',
      'Section A: 30 marks + 4 marks for spelling, punctuation and grammar (AO4). Section B: 30 marks.',
      'This is a closed-book exam: no copies of the texts. You must not use a dictionary.',
      'Spend about 55 minutes on Section A and 50 minutes on Section B.',
    ],
    tests: () => [0, 1, 2].map(p1Test),
  },
  {
    id: 'english-literature-p2', subjectId: 'english-literature', title: 'Paper 2: Modern texts and poetry', board: 'AQA 8702/2-style',
    mins: 135, marks: 96, tools: ['working'],
    info: [
      'Time allowed: 2 hours 15 minutes. Total marks: 96.',
      'Section A: answer ONE question on your modern text (30 marks + 4 marks AO4).',
      'Section B: answer the question on your poetry cluster (30 marks). The named poem is printed; your second poem is from memory.',
      'Section C: answer BOTH unseen poetry questions (24 + 8 marks).',
      'Closed book: no copies of the texts. You must not use a dictionary. Spend about 45 minutes on each section.',
    ],
    tests: () => [0, 1, 2].map(p2Test),
  },
];
