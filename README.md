INDO CHINESE GLYPHCAM — Project Documentation // I hope i did these languages justice //
Overview
Ts a real-time webcam ASCII art converter that renders live video feeds using characters from multiple writing systems. The application captures webcam input and translates pixel brightness values into typographic Indian language characters, creating a continuously representation of the video feed.
________________________________________
Development Process
Initial Concept
The project began with a basic p5.js sketch that converted webcam input to ASCII art using ASCII characters. The original implementation featured:

•	A hardcoded ASCII character set: "($@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'. "

•	Simple RGB averaging for brightness calculation

•	No user interface for language selection

•	Basic HTML structure with empty CSS


Evolution & Feature Development
Phase 1: Language Selection System
The first major enhancement was implementing a multi-language selector. This required:

Data Structure Design: Created a languages array containing objects with:
	
o	id: unique identifier

o	label: display name for UI

o	group: linguistic/regional classification

o	sample: preview characters for button display

o	chars: the full character set ordered from dense to sparse

Dynamic UI Generation: Built buildLangButtons() to programmatically create language selection buttons from the data structure

State Management: Implemented selectLanguage() to handle language switching with visual feedback


Phase 2: Language Curation
The following language datasets the code uses were personally optimised by myself to reduce the random noise effect on the visuals and create visual clarity for the users. The languages are sourced from the entirety of the Indo Chinese sub-continent and were selected in a certain manner to emphasize the concept of diversity within India. The uniqueness of the multiple scripts present within India and its neighbouring countries is very beautiful and a lovely aspect of the country and I hope I did it justice within this project. Languages were selected based on:

Visual Density & Complexity:

•	Chinese (龘晶森林木本十一· ): Extremely high stroke density in characters like 龘 (48 strokes), providing excellent tonal range.

•	Devanagari (ॐझ्र्ध्रृश्व्रम्भक्ष्रह्णकखगचटठ): Complex conjunct consonants create varied visual weight

•	Tamil (உகலநபமஹஸஷ): Curved character forms with varying density, distinct from angular scripts

•	Kannada (ಷಣಘಢಭಮತದನಲವಕಅಇ): Similar structural complexity to Tamil but with different aesthetic

•	Bengali (ঘঢভমষণতনলরকঅই): Horizontal headline and varying character density

Geometric Variation:

•	Arabic/Urdu (اَُِّٰٖبپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلم): Right-to-left connected script with diacritical marks creating fine detail

•	Lepcha (ᰁᰀᰋᰎᰐᰑᰓᰔᰖᰗᰘᰛᰍ): Tibetan-derived script with distinctive rounded forms

•	Meitei/Manipuri (ꯏꯑꯀꯔꯂꯋꯄꯅꯇꯊꯗꯕꯃꯐꯍꯘꯙꯖ): Rare Southeast Asian script with unique glyph shapes

Functional/Abstract:

•	ASCII ($@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,^`'.): Traditional ASCII art character set ordered by visual density

•	Blocks (█▓▒░): Pure geometric forms for abstract representation

•	Balinese (ꦓꦝꦩꦯꦡꦤꦭꦫꦏꦄꦆꦈ): Javanese script characters repurposed for visual variety


Phase 3: Visual Perception Enhancement
Luminance Formula Implementation:
const bright = 0.299 * r + 0.587 * g + 0.114 * b;

This replaced the simple average (r + g + b) / 3 for critical reasons:

Scientific Basis: The human eye has different sensitivities to different wavelengths of light:

•	Green (0.587): Highest sensitivity — our eyes have more green-detecting cones

•	Red (0.299): Moderate sensitivity

•	Blue (0.114): Lowest sensitivity — fewest blue-detecting cones

They represent the relative luminous efficiency function of human photopic vision.

Practical Impact:
•	Better contrast: Mid-tones (skin, fabric, common surfaces) render with more detail
•	Perceptual accuracy: The glyph representation matches how the scene appears to viewers, not just mathematical averaging
•	Improved facial recognition: Human features become more distinguishable
Example Comparison: For a green pixel (0, 255, 0):

•	Simple average: (0 + 255 + 0) / 3 = 85

•	Luminance: 0.299×0 + 0.587×255 + 0.114×0 = 149.685

Green appears much brighter to human perception than the simple average suggests.

Usage Instructions
Running Locally
Use and download the VS Code Live Server for locallly running th code. 
1.	Install "Live Server" extension
2.	Right-click index.html → "Open with Live Server"
3.	Automatically opens at http://localhost:5500



<img width="1880" height="892" alt="image" src="https://github.com/user-attachments/assets/1155dfea-c0fd-4ad5-988a-44edc2f88e9d" />

---> website interface :/


