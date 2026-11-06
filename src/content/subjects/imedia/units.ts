import type { Unit } from '../../types';
import { cards, mc, multi, tf, num, topic, examQ, ord, match } from '../../dsl';

const EXT = (points: string[]) => [
  'Top band: detailed, well-developed discussion applied throughout to the scenario; accurate terminology',
  'Middle band: sound explanation with some application to the scenario',
  'Lower band: basic, generic points',
  ...points,
];

export const r093Units: Unit[] = [
  {
    id: 'im-ta1', title: 'R093 Topic area 1: The media industry', description: 'Sectors, products and job roles.',
    topics: [
      topic({
        id: 'im-sectors', title: 'Media sectors and products', summary: 'Traditional and new media, and the products they make.',
        notes: `
## Sectors
| Traditional media | New media |
|---|---|
| Film | Digital games |
| Television | Interactive media (apps, kiosks) |
| Radio | Internet (websites, social media, streaming) |
| Print publishing (newspapers, magazines, books, comics) | Digital publishing (eBooks, online magazines) |

**Convergence**: sectors increasingly overlap (newspapers publish video online; TV is streamed; games include film-quality cut-scenes).

## Products
Video, audio, music, **animation**, **special effects (SFX - physical, on set)**, **visual effects (VFX - added digitally in post-production)**, digital imaging and graphics, social media, digital games, comics and graphic novels, websites, multimedia, **apps** and eBooks, **AR** (augmented reality: digital overlaid on the real world) and **VR** (virtual reality: fully simulated).

:::exam Typical question
"Identify **two** products that are created in the new media sector." → e.g. a mobile app; a website.
:::
`,
        keyPoints: ['Traditional: film, TV, radio, print', 'New: games, interactive, internet, digital publishing', 'SFX = physical/on set; VFX = digital/post-production', 'AR overlays; VR replaces the real world', 'Convergence of sectors'],
        flashcards: cards([['Four traditional media sectors?', 'Film, television, radio, print publishing.'], ['Four new media sectors?', 'Digital games, interactive media, internet, digital publishing.'], ['SFX vs VFX?', 'SFX are physical effects created on set (explosions, make-up); VFX are added digitally in post-production (CGI).'], ['What is AR?', 'Augmented reality - digital content overlaid on a view of the real world (e.g. phone filters).'], ['What is media convergence?', 'When different media sectors and technologies combine (e.g. newspapers producing video online).']]),
        questions: [
          mc('Which is a NEW media sector?', ['Digital games', 'Radio', 'Print publishing', 'Film'], 'Digital games are new media.', { d: 1 }),
          mc('An explosion created on set with pyrotechnics is an example of...', ['SFX (special effects)', 'VFX (visual effects)', 'CGI (computer-generated imagery)', 'Green-screen compositing'], 'Physical effects on set = SFX.', { d: 2 }),
          tf('Virtual reality overlays digital images onto the real world.', false, 'That\'s AR. VR creates a fully simulated environment.', { d: 2 }),
        ],
      }),
      topic({
        id: 'im-roles', title: 'Job roles in the media industry', summary: 'Creative, technical and senior roles and what they do.',
        notes: `
| Creative / artistic | Technical | Senior |
|---|---|---|
| **Animator** - creates moving images | **Camera operator** - films shots | **Campaign manager** - plans marketing campaigns |
| **Content creator** - makes content (e.g. for social media) | **Games programmer / developer** - codes games | **Creative director** - leads the creative vision |
| **Copywriter** - writes text for adverts/marketing | **Sound editor** - edits/mixes audio | **Director** - controls the artistic and dramatic aspects of a production |
| **Graphic designer** - designs visual products | **Special effects technician** - creates SFX | **Editor** - decides final content (e.g. of a magazine) |
| **Illustrator / graphic artist** - draws images | **Video editor** - edits footage in post-production | **Production manager** - manages budgets, schedules, resources |
| **Photographer** | **Web designer / developer** - designs/builds websites | |
| **Script writer** - writes scripts | | |

Roles work across the phases: **pre-production** (planning: script writer, director), **production** (making: camera operator, animator), **post-production** (editing: video editor, sound editor).
`,
        keyPoints: ['Creative, technical and senior role categories', 'Director leads artistic vision of a production', 'Production manager handles budget/schedule', 'Copywriter writes marketing text', 'Roles map to pre-production, production, post-production'],
        flashcards: cards([['What does a copywriter do?', 'Writes the text (copy) for adverts and marketing materials.'], ['What does a production manager do?', 'Manages budgets, schedules and resources so the production runs on time and on budget.'], ['What does a video editor do?', 'Assembles and edits footage in post-production (cuts, transitions, effects).'], ['What does a creative director do?', 'Leads and approves the overall creative vision of a project.']]),
        questions: [
          match('Match the job role to its responsibility.', [['Copywriter', 'Writes text for adverts'], ['Camera operator', 'Films the shots'], ['Production manager', 'Manages budget and schedule'], ['Web developer', 'Builds websites']], 'Know what each role does.', { d: 2 }),
          mc('Which role works mainly in post-production?', ['Video editor', 'Script writer', 'Camera operator', 'Location scout'], 'Editing happens after filming.', { d: 1 }),
          mc('Which is a SENIOR role?', ['Creative director', 'Illustrator', 'Sound editor', 'Photographer'], 'Senior roles lead and manage.', { d: 1 }),
        ],
      }),
    ],
  },
  {
    id: 'im-ta2', title: 'R093 Topic area 2: Factors influencing product design', description: 'Purpose, client requirements, audiences, research and media codes.',
    topics: [
      topic({
        id: 'im-purpose', title: 'Purpose, style, content, layout and client requirements', summary: 'Linking design choices to purpose; client briefs and requirements.',
        notes: `
## Purposes of media products
**Advertise/promote · educate · entertain · inform · influence** (e.g. a charity campaign influencing behaviour).
**Style, content and layout** must match the purpose and **genre** (e.g. horror: dark colours, distressed fonts).

## Client briefs
| Format | Description |
|---|---|
| **Commission** | Client asks a creative to make a product (often with creative freedom) |
| **Formal** | Detailed written brief with clear requirements |
| **Informal** | Verbal or casual - less detail, may change |
| **Negotiated** | Client and creative discuss and agree requirements |
| **Contract** | Legally binding agreement on deliverables, deadlines and payment |

## Client requirements
Purpose, **target audience**, theme, style, genre, content, **timescale/deadline**, budget, constraints (e.g. file size, platform).

:::tip Exam technique
When asked how a feature meets the client's requirements, quote the requirement and explain the link: "*The bright colours meet the client's requirement to appeal to children aged 5-8 because...*"
:::
`,
        keyPoints: ['Five purposes: advertise, educate, entertain, inform, influence', 'Style/content/layout must match purpose and genre', 'Brief formats: commission, formal, informal, negotiated, contract', 'Client requirements include audience, deadline, constraints'],
        flashcards: cards([['Five purposes of media products?', 'Advertise/promote, educate, entertain, inform, influence.'], ['What is a negotiated brief?', 'One where the client and creative discuss and agree the requirements together.'], ['What is a contract brief?', 'A legally binding agreement setting out the work, deadlines and payment.'], ['Give four client requirements', 'Purpose, target audience, style/genre, content, timescale.']]),
        questions: [
          mc('A brief is agreed through discussion between client and designer. This is a...', ['Negotiated brief', 'Formal brief', 'Commission', 'Contract'], 'Negotiated = discussed and agreed.', { d: 1 }),
          multi('Which are purposes of media products?', ['Inform', 'Entertain', 'Influence', 'Educate'], ['Compress', 'Distribute'], 'Plus advertise/promote.', { d: 1 }),
        ],
      }),
      topic({
        id: 'im-audience', title: 'Audiences and research', summary: 'Audience demographics and segmentation; primary and secondary research; qualitative and quantitative data.',
        notes: `
## Audience segmentation
Divide the audience by **demographics**: **age, gender, ethnicity, income, location, occupation, education, interests, lifestyle**. Products are designed to appeal to a specific segment.

## Research
| Primary (you collect it) | Secondary (someone else collected it) |
|---|---|
| Focus groups, interviews, online surveys, questionnaires, observation | Books, internet, journals, magazines, newspapers, existing reports |
| ✓ Specific, up to date, you own it | ✓ Quick, cheap, large data sets |
| ✗ Time-consuming, can be expensive | ✗ May be out of date, less relevant, possibly unreliable |

## Data types
- **Quantitative**: numerical, measurable (e.g. "65% of 12-15 year olds play mobile games") - easy to analyse/graph.
- **Qualitative**: opinions and descriptions (e.g. "I like the bright colours") - detailed reasons but harder to analyse.
`,
        keyPoints: ['Demographics: age, gender, ethnicity, income, location, occupation, education, interests, lifestyle', 'Primary research: surveys, interviews, focus groups', 'Secondary: books, internet, journals', 'Quantitative = numbers; qualitative = opinions'],
        flashcards: cards([['What is primary research?', 'Research you carry out yourself (surveys, interviews, focus groups).'], ['What is secondary research?', 'Using existing information collected by others (books, websites, reports).'], ['Qualitative vs quantitative data?', 'Qualitative = opinions/descriptions; quantitative = numerical data.'], ['What is a focus group?', 'A small group discussing a product to give detailed (qualitative) feedback.']]),
        questions: [
          mc('"72% of respondents preferred design B." This is...', ['Quantitative data', 'Qualitative data', 'Secondary research', 'Anecdotal evidence'], 'Numerical = quantitative.', { d: 1 }),
          mc('Which is a disadvantage of primary research?', ['It can be time-consuming and expensive', 'It may be out of date', 'It may not be specific to your product', 'It may be biased by the original author'], 'You have to design and carry it out yourself.', { d: 2 }),
          tf('A focus group usually produces qualitative data.', true, 'Discussions give opinions and reasons.', { d: 2 }),
        ],
        examQuestions: [examQ('A games company wants to research whether teenagers would play its new puzzle game. Explain **one** primary and **one** secondary research method it could use.', 4, ['Primary: e.g. online survey of 13-18 year olds', 'Explanation: gives up-to-date, specific opinions from the target audience', 'Secondary: e.g. industry reports on teenage gaming habits', 'Explanation: quick/cheap, large data set showing trends'], { time: 4 })],
      }),
      topic({
        id: 'im-codes', title: 'Media codes: camera, lighting, editing, audio and design', summary: 'How technical, symbolic, written and audio codes create meaning and engage audiences.',
        notes: `
## Types of media codes
- **Technical**: camera shots, angles, movement, lighting, editing.
- **Symbolic**: colour, objects, setting, costume, body language (mise-en-scène) - what they represent.
- **Written**: typography, font style/size, language, headlines, slogans.
- **Audio**: dialogue, music, sound effects, voiceover, ambient sound; **diegetic** (in the scene) vs **non-diegetic** (added, e.g. soundtrack).

## Camera shots
| Shot | Use |
|---|---|
| **Establishing / extreme long shot** | Shows location at the start of a scene |
| **Long shot** | Whole body + surroundings |
| **Mid shot** | Waist up - conversation |
| **Close-up** | Face - emotion |
| **Extreme close-up** | Detail (eyes, an object) - tension |
| **Over-the-shoulder** | Conversation, viewpoint |
| **Point of view (POV)** | Through a character's eyes |

## Angles and movement
- **High angle** (looking down) → subject seems small/vulnerable. **Low angle** → powerful. **Bird's-eye** (from directly above). **Canted/Dutch** → unease.
- Movement: **pan** (left-right), **tilt** (up-down), **track/dolly** (camera moves alongside), **zoom** (lens), crane, handheld (realism).

## Lighting
High-key (bright, few shadows - comedy, adverts) vs **low-key** (dark, strong shadows - horror/thriller); **three-point lighting** (key, fill, back light).

## Editing
Cuts, **transitions** (fade, dissolve, wipe), **pace** (fast cuts = excitement), continuity editing, montage.

## Design (print/digital)
**Colour** associations (red = danger/passion, green = nature, blue = trust), typography (serif = traditional/formal; sans-serif = modern/clean), layout, white space, alignment, imagery.
`,
        keyPoints: ['Technical, symbolic, written and audio codes', 'Close-up = emotion; establishing shot = location', 'High angle = vulnerable; low angle = powerful', 'Pan, tilt, track, zoom', 'Low-key lighting for horror/thriller', 'Diegetic vs non-diegetic sound', 'Colour and typography carry meaning'],
        flashcards: cards([['What does an establishing shot do?', 'Shows the location/setting at the start of a scene.'], ['Effect of a low-angle shot?', 'Makes the subject look powerful or threatening.'], ['What is a pan?', 'The camera turns horizontally (left/right) from a fixed position.'], ['Diegetic sound?', 'Sound that exists within the world of the scene (dialogue, footsteps).'], ['What is low-key lighting?', 'Dark lighting with strong shadows - often used in horror and thrillers.'], ['Serif vs sans-serif fonts?', 'Serif fonts have small strokes (traditional/formal); sans-serif are plain (modern/clean).']]),
        questions: [
          mc('Which shot is best to show a character\'s emotion?', ['Close-up', 'Establishing shot', 'Long shot', 'Bird\'s-eye view'], 'Close-ups show facial expression.', { d: 1 }),
          mc('A villain is filmed from below. What effect does this low angle create?', ['The villain appears powerful and threatening', 'The villain appears weak and vulnerable', 'We see events from the villain\'s point of view', 'The villain appears distant and unimportant'], 'Low angle = power.', { d: 1 }),
          match('Match the camera movement to its description.', [['Pan', 'Turns left or right on a fixed point'], ['Tilt', 'Turns up or down on a fixed point'], ['Track', 'Camera moves alongside the action'], ['Zoom', 'Lens magnifies without moving the camera']], 'Camera movements.', { d: 2 }),
          tf('A soundtrack added in post-production is diegetic sound.', false, 'It is non-diegetic - the characters can\'t hear it.', { d: 2 }),
        ],
        examQuestions: [examQ('A director is filming a trailer for a horror film aimed at 15-25 year olds. Discuss how they could use camera shots, lighting and sound to create tension.', 9, EXT(['Low-key lighting / shadows hide threats', 'Extreme close-ups on eyes/objects build suspense', 'POV or handheld shots make the audience feel present', 'Canted angles create unease', 'Non-diegetic music building, silence before a jump scare', 'Fast-paced editing near the climax', 'Linked to the target audience\'s expectations of the genre']), { meta: 'Extended response', time: 12 })],
      }),
    ],
  },
  {
    id: 'im-ta3', title: 'R093 Topic area 3: Pre-production planning', description: 'Work plans, ideas documents, planning documents and legal issues.',
    topics: [
      topic({
        id: 'im-workplans', title: 'Work planning', summary: 'Phases of production, tasks, workflow, milestones and contingencies.',
        notes: `
## Phases
1. **Pre-production** - planning: research, scripts, storyboards, recces, risk assessments.
2. **Production** - creating: filming, recording, creating assets.
3. **Post-production** - editing, effects, sound mixing, reviewing, exporting.

## Components of a work plan
- **Tasks and activities** (what needs doing), **workflow** (the order), **timescales** (how long), **resources** (people, equipment, software, locations), **milestones** (key checkpoints), **contingencies** (extra time/back-up plans in case things go wrong).
- Often shown as a **Gantt chart** (tasks against time) or a table.

**Why plan?** Keeps to deadlines and budget, allocates resources, identifies risks early, helps a team coordinate.
`,
        keyPoints: ['Pre-production, production, post-production', 'Tasks, workflow, timescales, resources, milestones, contingencies', 'Gantt charts show tasks over time', 'Contingency = time/plans for problems'],
        flashcards: cards([['Three phases of production?', 'Pre-production, production, post-production.'], ['What is a milestone?', 'A key checkpoint in a project (e.g. storyboard approved).'], ['What is a contingency?', 'Spare time or a back-up plan in case something goes wrong.'], ['What is a Gantt chart?', 'A chart showing tasks against time - their start, end and overlap.']]),
        questions: [
          ord('Put these in production order.', ['Write the script', 'Film the scenes', 'Edit the footage', 'Export the final video'], 'Pre-production → production → post-production.', { d: 1 }),
          mc('Why should a work plan include contingencies?', ['To allow for problems such as bad weather or equipment failure', 'To make the plan look longer and more detailed for the client', 'To list the target audience and what they want from the product', 'To show the budget for each stage of the production'], 'Contingencies protect the deadline.', { d: 2 }),
        ],
      }),
      topic({
        id: 'im-ideas', title: 'Mind maps and mood boards', summary: 'Documents used to generate ideas.',
        notes: `
| Document | Purpose | Conventions |
|---|---|---|
| **Mind map / spider diagram** | Generate and organise **ideas** quickly | Central idea, branches/nodes, sub-branches, keywords, colour/images |
| **Mood board** | Show the **look and feel** (style, colours, textures, fonts) | Collage of images, colours, fabrics, typography, annotations; physical or digital |

- Mind maps: ✓ fast, show links ✗ can get messy, not a design.
- Mood boards: ✓ communicate style to the client visually ✗ can use others' images (copyright - mood boards are usually for internal use).
`,
        keyPoints: ['Mind map = generate and link ideas', 'Mood board = look, feel and style', 'Mind map: central node, branches, sub-branches', 'Mood board: images, colours, textures, fonts, annotation'],
        flashcards: cards([['Purpose of a mind map?', 'To generate and organise ideas around a central theme.'], ['Purpose of a mood board?', 'To show the intended look, feel and style of a product.'], ['Conventions of a mind map?', 'Central idea, branches, sub-branches, keywords (colour, images).']]),
        questions: [
          mc('Which document best shows a client the intended colour scheme and style?', ['Mood board', 'Mind map', 'Script', 'Asset log'], 'Mood boards communicate look and feel.', { d: 1 }),
          tf('A mind map shows the exact final layout of a poster.', false, 'That would be a visualisation diagram.', { d: 1 }),
        ],
      }),
      topic({
        id: 'im-planning', title: 'Planning documents: scripts, storyboards, visualisations, flow charts, wireframes, asset logs', summary: 'Purpose, content and conventions of each planning document.',
        notes: `
| Document | Purpose | Key content / conventions |
|---|---|---|
| **Visualisation diagram** | Plan the **layout of a still image** (poster, cover) | Sketch with annotations: fonts, colours, image positions, sizes, text |
| **Storyboard** | Plan a **sequence** of shots (video, animation, game cut-scene) | Numbered frames/panels, shot type, camera angle/movement, timing, transitions, audio, action notes |
| **Script** | Plan **words and directions** for video/audio | Scene headings (INT./EXT.), character names, dialogue, stage/camera directions, sound cues |
| **Flow chart** | Plan the **navigation/structure** of an interactive product or a process | Symbols: start/end (rounded), process (rectangle), decision (diamond), arrows |
| **Wireframe** | Plan the **layout of a web page/app screen** | Boxes for navigation bar, images, text, buttons; no detailed design |
| **Asset log** | Record **all assets** used | Asset name, type, source/location, copyright/permission status, use, file properties |

:::exam Typical question
"Explain **two** benefits of using a storyboard when planning a TV advert." → shows the sequence of shots so the crew know what to film (saves time on set); can be shown to the client for approval before expensive filming.
:::
`,
        keyPoints: ['Visualisation diagram = still layout', 'Storyboard = sequence of shots with timings, angles, audio', 'Script = dialogue and directions', 'Flow chart = navigation/process (diamond = decision)', 'Wireframe = web/app screen layout', 'Asset log = sources and permissions'],
        flashcards: cards([['Purpose of a storyboard?', 'To plan the sequence of shots/scenes in a moving-image product.'], ['What is on a visualisation diagram?', 'A sketched layout of a still image with annotations (fonts, colours, positions).'], ['Flow chart symbol for a decision?', 'A diamond.'], ['What is a wireframe?', 'A basic layout plan of a web page or app screen.'], ['What is recorded in an asset log?', 'Each asset\'s name, type, source, copyright/permission and how it will be used.'], ['What does INT. mean in a script?', 'Interior - the scene takes place indoors.']]),
        questions: [
          match('Match the product to the most useful planning document.', [['Magazine cover', 'Visualisation diagram'], ['TV advert', 'Storyboard'], ['Website navigation', 'Flow chart'], ['Radio drama', 'Script']], 'Choose the document by product type.', { d: 2 }),
          multi('Which would you expect on a storyboard?', ['Shot type', 'Camera movement', 'Timing of each shot', 'Audio notes'], ['Copyright status of fonts', 'Budget breakdown'], 'Storyboards plan visual sequence and sound.', { d: 2 }),
          mc('Why is an asset log important?', ['It records sources and permissions so copyright isn\'t breached', 'It plans the camera angles and shot types for each scene', 'It shows the colour scheme and fonts for the product', 'It sets out the dialogue and directions for the actors'], 'Legal protection and organisation.', { d: 2 }),
        ],
        examQuestions: [examQ('A client wants an interactive museum kiosk for children aged 7-11. Explain how a flow chart and a wireframe would help plan the product.', 6, EXT(['Flow chart shows navigation/structure - how screens link', 'Decision points (e.g. user chooses a gallery) shown with diamonds', 'Helps check every route works before building', 'Wireframe shows the layout of each screen - button positions, images, text', 'Can test layout suits children (large buttons, little text)', 'Both can be shown to the client for approval, saving time']), { meta: 'Applied explanation', time: 7 })],
      }),
      topic({
        id: 'im-legal', title: 'Legal issues: copyright, privacy, defamation, regulation and safety', summary: 'Laws and regulations that affect media production.',
        notes: `
## Protecting individuals
- **Privacy and permissions**: get written permission (release forms) to film/photograph people and locations.
- **Defamation**: false statements damaging someone's reputation - **libel** (written/published) and **slander** (spoken).
- **Data protection** (Data Protection Act 2018 / UK GDPR): personal data must be collected lawfully, kept secure, used only for its stated purpose.

## Intellectual property
- **Copyright**: automatically protects original creative work (images, music, video, text) - you need permission or a licence to use it. Lasts 70 years after the creator's death (for most works).
- **Trademarks**: protect brand names, logos, slogans (™ / ® registered).
- **Patents**: protect inventions.
- Using others' work: **licences** (e.g. royalty-free, **Creative Commons** with conditions like attribution), **fair dealing** (limited use for criticism, review, education, news), paying royalties/fees.

## Certification, classification and regulation
- **BBFC**: classifies films and videos (U, PG, 12A/12, 15, 18, R18).
- **PEGI**: age ratings for video games (3, 7, 12, 16, 18) + content descriptors.
- **Ofcom**: regulates TV, radio, video-on-demand and communications (e.g. the watershed at 9 pm).
- **ASA**: Advertising Standards Authority - adverts must be legal, decent, honest and truthful.
- **IPSO**: regulates most newspapers/magazines.

## Health and safety
**Risk assessments** (identify hazards, who is at risk, control measures) and **location recces** (visit beforehand: access, power, lighting, noise, permissions, safety).
`,
        keyPoints: ['Release forms for people and locations', 'Defamation: libel (written) and slander (spoken)', 'Copyright is automatic; trademarks protect brands', 'Creative Commons, fair dealing, royalties', 'BBFC films; PEGI games; Ofcom broadcast; ASA adverts', 'Risk assessment and location recce'],
        flashcards: cards([['What is libel?', 'Defamation in written or published form.'], ['What is slander?', 'Spoken defamation.'], ['Who classifies films in the UK?', 'The BBFC (British Board of Film Classification).'], ['Who gives age ratings to games?', 'PEGI.'], ['What does the ASA do?', 'Regulates advertising - ads must be legal, decent, honest and truthful.'], ['What is a location recce?', 'A visit to a filming location beforehand to check suitability, access, hazards and permissions.'], ['What is Creative Commons?', 'A licence allowing others to use work under stated conditions (e.g. with attribution, non-commercial).']]),
        questions: [
          mc('A newspaper prints a false story that damages a celebrity\'s reputation. This is...', ['Libel', 'Slander', 'Copyright infringement', 'Trademark'], 'Written defamation = libel.', { d: 1 }),
          mc('Which organisation rates video games?', ['PEGI', 'BBFC', 'ASA', 'IPSO'], 'PEGI = Pan European Game Information.', { d: 1 }),
          tf('You must register a piece of work before it is protected by copyright.', false, 'Copyright is automatic on creation.', { d: 2 }),
          multi('Which should be done before filming on location?', ['A location recce', 'A risk assessment', 'Gaining permission from the owner'], ['Exporting the final video', 'Choosing a codec'], 'Pre-production planning for safety and legality.', { d: 1 }),
        ],
        examQuestions: [examQ('A student film crew want to use a popular song and film in a shopping centre for a short film to be uploaded online. Discuss the legal issues they must consider.', 9, EXT(['Copyright: the song is protected - need a licence/permission or use royalty-free/Creative Commons music', 'Fees/royalties may apply', 'Location permission from the shopping centre owner', 'Release forms from identifiable members of the public / privacy', 'Risk assessment and recce for public safety', 'Data protection if collecting personal information', 'Possible age classification/platform rules']), { meta: 'Extended response', time: 12 })],
      }),
    ],
  },
  {
    id: 'im-ta4', title: 'R093 Topic area 4: Distribution considerations', description: 'Platforms and media file formats/properties.',
    topics: [
      topic({
        id: 'im-distribution', title: 'Distribution platforms', summary: 'Online and physical ways of getting products to audiences.',
        notes: `
| Online | Physical |
|---|---|
| Websites, apps, social media, streaming services, download stores, email | CD, DVD, Blu-ray, USB, print (magazines, posters, leaflets), kiosks, cinema, broadcast TV/radio |
| ✓ Global reach, instant, cheap to distribute, easy to update, analytics | ✓ Collectable, no internet needed, tangible |
| ✗ Needs internet/devices, file size limits, piracy | ✗ Production and shipping costs, limited reach, can\'t update |

Choose by: **audience** (age, access to devices), **product** type, **cost**, **file size/compatibility**, **interactivity** needed.
`,
        keyPoints: ['Online: websites, apps, social, streaming', 'Physical: discs, print, kiosks, broadcast', 'Online: global, cheap, updatable', 'Physical: no internet needed, tangible', 'Choose by audience, product, cost, compatibility'],
        flashcards: cards([['Two advantages of online distribution?', 'Global reach and low distribution cost (also easy updates and analytics).'], ['Two advantages of physical distribution?', 'No internet needed; tangible/collectable product.']]),
        questions: [
          mc('Why might a museum choose a physical kiosk for an interactive guide?', ['Visitors can use it without their own device or internet', 'It reaches a global audience through the internet', 'It is cheaper to update than a mobile app', 'Visitors can keep using it after they leave'], 'Kiosks are on-site and accessible.', { d: 2 }),
        ],
      }),
      topic({
        id: 'im-files', title: 'File formats, properties and compression', summary: 'Image, audio and video formats; resolution, DPI, colour depth, sample rate, bit depth, frame rate; lossy vs lossless.',
        notes: `
## Bitmap (raster) vs vector
- **Bitmap**: made of **pixels**; detailed photos; **pixelates** when enlarged; larger files.
- **Vector**: made of **mathematical paths/shapes**; scales infinitely without losing quality; ideal for **logos**; smaller files.

## Image formats
| Format | Type | Compression | Use |
|---|---|---|---|
| **JPEG/JPG** | Bitmap | **Lossy** | Photos on the web |
| **PNG** | Bitmap | Lossless; **transparency** | Web graphics, logos with transparent backgrounds |
| **GIF** | Bitmap | Lossless; 256 colours; **animation** | Simple animations, icons |
| **TIFF** | Bitmap | Lossless | High-quality print |
| **BMP** | Bitmap | Uncompressed | Basic Windows images |
| **PSD** | Bitmap | Layers (Photoshop) | Editing - not for final distribution |
| **SVG / AI / EPS** | Vector | - | Logos, scalable graphics |
| **PDF** | Document | - | Print-ready documents |

## Image properties
**Resolution / pixel dimensions** (e.g. 1920 × 1080), **DPI/PPI** (dots/pixels per inch: **72 for screen**, **300 for print**), **colour depth** (bits per pixel: 24-bit = 16.7 million colours), **colour mode** (RGB for screen, CMYK for print).

## Audio
| Format | Compression | Use |
|---|---|---|
| **WAV / AIFF** | Uncompressed | High-quality editing/recording |
| **MP3 / AAC** | **Lossy** | Streaming, portable music |
| **FLAC** | **Lossless** | High-quality archive |
Properties: **sample rate** (e.g. 44.1 kHz), **bit depth** (16/24-bit), **bit rate** (kbps), **channels** (mono/stereo).

## Video
**MP4** (H.264 - widely compatible, web), **MOV** (Apple), **AVI**, **WMV**. Properties: **frame rate** (24/25/30/60 fps), **resolution** (HD 1280×720, Full HD 1920×1080, 4K 3840×2160), **aspect ratio** (16:9), **codec**, bit rate.

## Compression
- **Lossy**: permanently removes data → much smaller files, lower quality (JPEG, MP3, MP4).
- **Lossless**: reduces size without losing data → original can be restored (PNG, FLAC, ZIP).
`,
        keyPoints: ['Bitmap = pixels (pixelates); vector = paths (scales)', 'JPEG lossy photos; PNG lossless + transparency; GIF animation', 'SVG vector for logos', '72 DPI screen, 300 DPI print', 'RGB screen; CMYK print', 'WAV uncompressed; MP3 lossy; FLAC lossless', 'MP4 widely compatible video'],
        generators: ['im-image-size', 'im-audio-size', 'im-colours', 'im-print', 'im-duration'],
        flashcards: cards([['Bitmap vs vector?', 'Bitmap images are made of pixels and pixelate when enlarged; vector images are made of paths and scale without quality loss.'], ['Which image format supports transparency and is lossless?', 'PNG'], ['Which image format supports simple animation?', 'GIF'], ['Standard DPI for print?', '300 DPI'], ['Lossy vs lossless compression?', 'Lossy permanently removes data (smaller, lower quality); lossless reduces size without losing data.'], ['Which colour mode is used for print?', 'CMYK'], ['What is sample rate?', 'The number of audio samples taken per second (e.g. 44 100 Hz).'], ['What is frame rate?', 'The number of frames shown per second (fps).']]),
        questions: [
          mc('Which format is best for a company logo that must be printed on a billboard and a business card?', ['SVG (vector)', 'JPEG', 'GIF', 'BMP'], 'Vectors scale to any size without pixelating.', { d: 2 }),
          mc('Which compression permanently removes data?', ['Lossy', 'Lossless', 'Run-length encoding', 'ZIP compression'], 'JPEG and MP3 are lossy.', { d: 1 }),
          num('How many colours can a 4-bit image show?', 16, '2⁴ = 16.', { d: 2 }),
          match('Match the file format to its best use.', [['JPEG', 'Photos on a website'], ['PNG', 'Web graphic with transparent background'], ['WAV', 'High-quality audio editing'], ['MP4', 'Video for web streaming']], 'Format choice depends on purpose.', { d: 2 }),
          tf('A 72 DPI image is ideal for high-quality printing.', false, '72 DPI is screen resolution; print needs ~300 DPI.', { d: 1 }),
        ],
        examQuestions: [examQ('A photographer is sending images to a client for a website and for a printed brochure. Recommend suitable file formats and properties for each, justifying your choices.', 6, EXT(['Website: JPEG (lossy, small file - fast loading) or PNG if transparency needed', 'Website: 72 PPI, RGB colour, pixel dimensions suited to screen', 'Brochure: TIFF or high-quality PDF (lossless)', 'Brochure: 300 DPI, CMYK colour mode', 'Justifies trade-off between quality and file size']), { meta: 'Applied justification', time: 7 })],
      }),
    ],
  },
];

export const neaUnits: Unit[] = [
  {
    id: 'im-r094', title: 'R094: Visual identity and digital graphics (NEA)', description: 'Non-exam assessment worth 25%.',
    topics: [
      topic({
        id: 'im-r094-guide', title: 'R094 guide: visual identity and digital graphics', summary: 'What the NEA involves, what moderators look for and how to plan your time.',
        notes: `
You respond to an OCR **assignment brief** for a client: develop a **visual identity** and create a **digital graphic**.

## Topic areas
1. **Develop visual identity** - purpose (brand recognition, values, loyalty), **elements**: name, logo, slogan/strapline; **design style**: colour palette, typography, layout, graphics; how it meets the client's requirements and audience.
2. **Plan digital graphics** - graphic design conventions (layout, alignment, white space, typography, colour theory), properties (dimensions, resolution, DPI/PPI, file formats), **work plan**, **visualisation diagrams**, **asset log** (sources, legal permissions), test plan.
3. **Create visual identity and digital graphics** - use software tools and techniques (layers, selection, transformation, filters, typography, colour adjustment), prepare and edit assets, **save and export** in appropriate formats and properties.

## What earns marks
- Clear links between **every design decision and the client brief/target audience**.
- Detailed, annotated **plans** (visualisation diagrams with colours, fonts, sizes; work plan with timings).
- A complete **asset log** with legal considerations.
- Evidence of **technical skills** (screenshots of tools used, layer structure).
- Appropriate **file formats** for the final product (e.g. PNG/JPEG for screen, vector/PDF for print) and correctly named files.
- Honest **review**: strengths, weaknesses, improvements against the brief.

:::warn Rules
NEA work must be your own. Teachers can give general feedback but not detailed corrections. Reference all sources. Don't use generative AI to create content unless your centre's rules and OCR guidance allow it - undeclared AI use is malpractice.
:::
`,
        keyPoints: ['Respond to the OCR brief and client requirements', 'Visual identity: name, logo, slogan; colour, typography, layout', 'Plan with visualisation diagrams, work plan, asset log', 'Show tools and techniques used', 'Export in appropriate formats and properties', 'Work must be your own; reference sources'],
        flashcards: cards([['Three elements of a visual identity?', 'Name, logo, slogan/strapline (with colour palette, typography and style).'], ['Why keep an asset log in R094?', 'To show the source and legal permission for every asset used.'], ['Purpose of a visual identity?', 'To make a brand recognisable and communicate its values to its audience.']]),
        questions: [
          multi('Which are elements of a visual identity?', ['Logo', 'Name', 'Slogan', 'Colour palette'], ['A storyboard', 'A sample rate'], 'Plus typography and design style.', { d: 1 }),
          tf('Your teacher can correct your R094 work in detail before submission.', false, 'Only general guidance is allowed for NEA.', { d: 2 }),
        ],
      }),
    ],
  },
  {
    id: 'im-r097', title: 'R097: Interactive digital media (NEA)', option: { group: 'imedia-optional', value: 'r097' }, description: 'Optional NEA unit worth 35%.',
    topics: [
      topic({
        id: 'im-r097-guide', title: 'R097 guide: interactive digital media', summary: 'Planning, creating and reviewing an interactive product (website, kiosk, app, presentation).',
        notes: `
## Topic areas
1. **Plan interactive digital media (IDM)**: types (websites, apps, kiosks, games, interactive presentations); features and conventions (**navigation** - menus, buttons, hyperlinks, hotspots; **interactivity** - rollovers, forms, quizzes, video controls; consistent layout, accessibility); client requirements and audience; **work plan**, **flow chart** (navigation structure), **wireframes/visualisation diagrams** for each screen, asset log, test plan.
2. **Create interactive digital media**: source and prepare assets (optimise images, audio, video - file formats/compression), build pages/screens, implement navigation and interactive elements, use software tools/techniques, **test** (functionality: every link/button works; usability with users) and **repair**, export/publish in a suitable format.
3. **Review**: evaluate against the brief and user feedback - strengths, weaknesses, improvements.

## Navigation structures
- **Linear** (one route, e.g. a tutorial), **hierarchical** (menu → sub-pages), **non-linear/web** (links anywhere).

## Testing
A **test table**: test number, what is tested (e.g. "Home button on page 3"), expected result, actual result, action taken. Test with real users from the target audience.

:::tip Easy wins
Consistent navigation on every screen, clear labels, readable fonts and contrast, optimised file sizes so it loads quickly, and evidence of testing and fixing.
:::
`,
        keyPoints: ['IDM types: websites, apps, kiosks, games, presentations', 'Navigation: menus, buttons, hyperlinks, hotspots', 'Plan with flow chart + wireframes', 'Optimise assets (formats, compression)', 'Test table: expected vs actual result', 'Review against the brief'],
        flashcards: cards([['Three navigation structures?', 'Linear, hierarchical, non-linear (web).'], ['What is a hotspot?', 'An area of an image/screen that is interactive when clicked or hovered.'], ['What goes in a test table?', 'Test, expected result, actual result, action taken.'], ['Why optimise assets in IDM?', 'Smaller file sizes load faster and work on more devices.']]),
        questions: [
          mc('A tutorial that must be followed step by step uses which structure?', ['Linear', 'Hierarchical', 'Non-linear', 'Hybrid'], 'One route through the content.', { d: 1 }),
          mc('Which planning document best shows how all the screens of an app link together?', ['Flow chart', 'Mood board', 'Script', 'Asset log'], 'Flow charts map navigation.', { d: 1 }),
        ],
      }),
    ],
  },
  ...[
    { v: 'r095', t: 'R095: Characters and comics (NEA)', d: 'Plan, create and review original characters and a comic: character design (physical features, personality, clothing), comic conventions (panels, gutters, speech bubbles, captions, onomatopoeia), planning (mood boards, visualisation diagrams, scripts/thumbnails), creation with digital tools, review.' },
    { v: 'r096', t: 'R096: Animation with audio (NEA)', d: 'Plan, create and review an animation with audio: animation types (stop motion, cel, 2D/3D, rotoscoping), frame rate and timing, storyboards, audio (dialogue, music, SFX - sourcing and syncing), editing and exporting, review.' },
    { v: 'r098', t: 'R098: Visual imaging (NEA)', d: 'Plan, create and review a photographic/visual imaging portfolio: camera settings (aperture, shutter speed, ISO, white balance), composition (rule of thirds, leading lines, framing), lighting, editing and enhancing images, presentation formats, review.' },
    { v: 'r099', t: 'R099: Digital games (NEA)', d: 'Plan, create and review a digital game: genres and conventions, game mechanics and rules, levels, characters, assets, user interface, game engines, testing and debugging, review.' },
  ].map((u): Unit => ({
    id: `im-${u.v}`, title: u.t, option: { group: 'imedia-optional', value: u.v }, description: 'Optional NEA unit worth 35% (overview).',
    topics: [topic({
      id: `im-${u.v}-guide`, title: `${u.t.split(' (')[0]}: overview`, summary: 'What the unit covers and how to succeed in the NEA.',
      notes: `
${u.d}

## How every optional unit is structured
1. **Plan**: respond to the OCR brief - client requirements, target audience, research, planning documents, work plan, asset log, legal issues.
2. **Create**: use appropriate software tools and techniques, keep evidence (screenshots), save/export in suitable formats.
3. **Review**: evaluate your product against the brief, with strengths and improvements.

:::warn
NEA must be your own work; reference all assets; follow your centre's rules on AI tools.
:::
`,
      keyPoints: ['Plan → create → review', 'Link every decision to the client and audience', 'Keep an asset log', 'Evidence your tools and techniques'],
      questions: [mc('What are the three stages of every Creative iMedia NEA unit?', ['Plan, create, review', 'Research, design, test', 'Plan, design, publish', 'Pitch, produce, present'], 'All optional units follow plan → create → review.', { d: 1 })],
      flashcards: cards([['Three stages of a Creative iMedia NEA?', 'Plan, create, review.']]),
      tags: ['Overview'],
    })],
  })),
];
