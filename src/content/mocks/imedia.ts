// Creative iMedia R093 mock material: client scenarios and extra written questions (OCR style).
import type { ExamQuestion } from '../types';
import { examQ } from '../dsl';

const L9 = (indicative: string): string[] => [
  'Level 3 (7-9 marks): A thorough discussion with detailed, accurate knowledge applied well to the scenario. Advantages and disadvantages are weighed up and a supported judgement is reached. Subject terminology is used accurately.',
  'Level 2 (4-6 marks): A sound discussion with some application to the scenario. Some points are developed; some terminology is used.',
  'Level 1 (1-3 marks): Basic, mostly listed points with little application to the scenario.',
  `Indicative content: ${indicative}`,
];

export const IMEDIA_SCENARIOS = [
  `**Client brief: Wild Valley Zoo**\n\nWild Valley Zoo is a medium-sized family zoo. It wants to attract more visitors aged 11-16 during the summer holidays. The zoo has asked a small media studio to produce:\n\n- an **interactive website page** where visitors can explore animal facts and book tickets\n- a **30-second promotional video** to be shown on social media\n\nThe zoo has a budget of £6000 and needs the products in **eight weeks**. The zoo wants its brand colours (dark green and orange) and its logo used throughout. Some footage will be filmed at the zoo, including members of the public.`,
  `**Client brief: Northside Gaming Festival**\n\nNorthside Gaming Festival is a new two-day event for gamers aged 16-25. The organisers want:\n\n- a **digital poster** to be displayed online and on screens in local colleges\n- a short **audio advert** for local radio and streaming platforms\n\nThe festival takes place in **six weeks**. The organisers want a bold, energetic style. They would like to use music from a popular game soundtrack and images of game characters in the poster.`,
  `**Client brief: Riverside Library**\n\nRiverside Library wants to encourage more young children (aged 5-8) and their parents to borrow books. The library has asked for:\n\n- a short **animated character** to appear on its website and in the library\n- a **printed and digital leaflet** explaining how to join\n\nThe library is run by the local council and has a small budget. Products must be accessible to people with visual impairments and must be ready in **ten weeks**.`,
];

export const IMEDIA_WRITTEN: Record<string, ExamQuestion[]> = {
  'im-sectors': [
    examQ('Explain one way that new technology has changed how audiences access media products such as the ones in the scenario.', 2, ['Identifies a change, e.g. products can be streamed or downloaded on demand on smartphones (1)', 'Explains the effect, e.g. so audiences can view the product at any time and anywhere, rather than at a scheduled time (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-roles': [
    examQ('Describe the role of a camera operator and a video editor during the production of the promotional video.', 4, ['Camera operator: sets up and operates the camera (1)', 'Films the shots needed, following the director\'s instructions / shot list / storyboard (1)', 'Video editor: imports and assembles the footage in post-production (1)', 'Cuts, sequences and adds transitions, titles and sound to create the final video (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-purpose': [
    examQ('The client wants its brand colours and logo used throughout. Explain why it is important to meet the client\'s requirements in a media product.', 3, ['Meeting the brief means the product will be accepted / signed off by the client (1)', 'Consistent brand colours and logo make the product recognisable and build brand identity (1)', 'If requirements are not met the work may need to be redone, costing time and money (1)'], { meta: 'OCR R093 Section B' }),
    examQ('Discuss how the studio should design the products in the scenario to appeal to the target audience.', 9, L9('age-appropriate content and language; colours (bright for young audiences, bold for gamers); fonts that are clear/readable or stylised to suit the genre; layout with a clear visual hierarchy; images and characters the audience relates to; interactivity on websites; audio/music style; accessibility (large text, alt text, captions, high contrast); conventions of the media type; balance with client requirements and budget.'), { meta: 'OCR R093 Section B · extended response*' }),
  ],
  'im-audience': [
    examQ('Identify two methods of primary research the studio could use to find out what the target audience wants, and give one advantage of each.', 4, ['Method, e.g. questionnaire / survey (1)', 'Advantage, e.g. can reach many people quickly and give data that is easy to analyse (1)', 'Method, e.g. focus group / interview (1)', 'Advantage, e.g. gives detailed opinions and reasons (qualitative data) (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-codes': [
    examQ('Explain how camera shots and lighting could be used in the promotional video to create excitement.', 4, ['Shot type, e.g. close-ups of animals / faces to show emotion and detail (1)', 'Explained effect, e.g. makes the audience feel involved (1)', 'Camera movement or editing, e.g. fast cuts / tracking shots to create pace and energy (1)', 'Lighting, e.g. bright high-key natural lighting to create a positive, fun mood (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-workplans': [
    examQ('The client needs the products in a set number of weeks. Explain two reasons why a work plan would help the studio to meet the deadline.', 4, ['Shows all the tasks and activities needed in order / workflow (1)', 'so nothing is missed and tasks that depend on each other are done in the right order (1)', 'Sets timescales and milestones for each phase (1)', 'so progress can be monitored and contingency time used if something goes wrong (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-planning': [
    examQ('Describe what should be included in a storyboard for the promotional video.', 4, ['A sketch/image of each scene or shot in order (1)', 'Camera shot types, angles and movement (1)', 'Timings / duration of each scene (1)', 'Notes on sound, dialogue, lighting, locations or transitions (1)'], { meta: 'OCR R093 Section B' }),
    examQ('Explain why a script is needed before recording the audio advert.', 2, ['It sets out exactly what will be said and in what order, with directions for tone (1)', 'so the recording is quicker, fits the time limit and the client can approve the wording first (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-legal': [
    examQ('The studio wants to film members of the public and use music and images from other sources. Discuss the legal issues it must consider.', 9, L9('privacy and permission: consent/release forms for identifiable members of the public, signs informing visitors of filming; Data Protection Act / UK GDPR for personal data collected (e.g. ticket bookings); copyright on music, images and game characters – permission or a licence needed, or use royalty-free / Creative Commons with attribution; trademarks/logos; consequences of breaking the law (removal, fines, legal action, damage to reputation); health and safety when filming (risk assessment, location recce).'), { meta: 'OCR R093 Section B · extended response*' }),
    examQ('Explain why a risk assessment should be carried out before filming on location.', 2, ['To identify hazards on location, e.g. animals, cables, public crowds (1)', 'so steps can be taken to reduce the risk of injury to the crew and the public (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-distribution': [
    examQ('Explain one advantage and one disadvantage of distributing the promotional video on social media rather than on television.', 4, ['Advantage: reaches the target audience who use social media / cheaper / can be shared (1)', 'Explained, e.g. so it can spread quickly at little cost (1)', 'Disadvantage: competes with lots of other content / may be ignored or skipped (1)', 'Explained, e.g. so fewer people may watch it all, or negative comments may be posted (1)'], { meta: 'OCR R093 Section B' }),
  ],
  'im-files': [
    examQ('Identify a suitable file format for the digital poster and explain why it is suitable.', 3, ['Suitable format, e.g. JPG / PNG (1)', 'Explanation, e.g. JPG is compressed so it loads quickly online / PNG supports transparency and is lossless (1)', 'Widely compatible / can be opened on most devices and browsers (1)'], { meta: 'OCR R093 Section B' }),
    examQ('A 1920 × 1080 pixel image uses 24-bit colour. Calculate the file size in megabytes (MB) before compression. Show your working. (1 MB = 1 000 000 bytes)', 3, ['1920 × 1080 × 24 = 49 766 400 bits (1)', '÷ 8 = 6 220 800 bytes (1)', '= 6.2 MB (1)'], { meta: 'OCR R093 Section B' }),
  ],
};
