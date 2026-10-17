import type { BemText, ReadingText, Stage, Pair } from "@/types";

export const dialoguesMock: [string, string, string[]][] = [
  [
    "What's your name?",
    "My name is Sara.",
    ["I am ten.","It's red.","Yes, please."],
  ],
  [
    "How old are you?",
    "I am ten years old.",
    ["I am a teacher.","It is Monday.","Fine, thanks."],
  ],
  [
    "How are you?",
    "I'm fine, thank you.",
    ["I'm twelve.","It's a pen.","At school."],
  ],
  [
    "Where do you live?",
    "I live in Setif.",
    ["I like pizza.","He is my brother.","Yes, I can."],
  ],
  [
    "What time is it?",
    "It's half past two.",
    ["It's Monday.","I'm fine.","I like tea."],
  ],
  [
    "Can you swim?",
    "Yes, I can.",
    ["Yes, it is.","No, he isn't.","I'm ten."],
  ],
  [
    "What do you do?",
    "I am a teacher.",
    ["It is blue.","At seven o'clock.","Yes, I do."],
  ],
  [
    "Where is the bank?",
    "It's next to the post office.",
    ["It's seven o'clock.","I like it.","Yes, I am."],
  ],
  [
    "What's the weather like?",
    "It's sunny and warm.",
    ["I'm fine.","It's a book.","At home."],
  ],
  [
    "Would you like some tea?",
    "Yes, please.",
    ["It's Sunday.","I'm a student.","In the kitchen."],
  ],
  [
    "Thank you very much!",
    "You're welcome.",
    ["I'm sorry.","Goodbye.","It's cold."],
  ],
  [
    "Excuse me, where is the library?",
    "Go straight and turn left.",
    ["I like reading.","It is ten dinars.","Yes, it is."],
  ],
];

export const readingMock: Record<Stage, ReadingText[]> = {
  "P": [
    ["Sara is ten. She lives in Setif. She has a cat. The cat is white.",[["How old is Sara?","Ten",["Nine","Twelve"]],["Where does she live?","In Setif",["In Oran","In Algiers"]],["What colour is the cat?","White",["Black","Brown"]]]],
    ["Ali likes sports. He plays football on Fridays. He wants to be a pilot.",[["What does Ali like?","Sports",["Music","Cooking"]],["When does he play football?","On Fridays",["On Mondays","On Sundays"]],["What does he want to be?","A pilot",["A doctor","A baker"]]]],
  ],
  "M": [
    ["Last summer, my family visited Oran. We stayed in a small hotel near the beach. We swam every morning and ate fresh fish in the evening. It was the best holiday of my life.",[["Where did the family go?","Oran",["Algiers","Annaba"]],["Where did they stay?","In a small hotel",["In a tent","At a friend's house"]],["What did they eat in the evening?","Fresh fish",["Pizza","Couscous"]]]],
    ["Our school started a recycling project. Pupils put paper, plastic and glass in different bins. Now the school produces less rubbish and the yard is cleaner.",[["What did the school start?","A recycling project",["A sports club","A garden"]],["What do pupils put in different bins?","Paper, plastic and glass",["Food and water","Books and pens"]],["What is the result?","Less rubbish and a cleaner yard",["More rubbish","A bigger school"]]]],
  ],
  "S": [
    ["Many teenagers spend more than four hours a day on their phones. Experts say that this habit can affect sleep and concentration. However, technology also helps students to learn and communicate. The key is balance.",[["What can this habit affect?","Sleep and concentration",["Hearing and sight","Money and time"]],["What helps students to learn?","Technology",["Sleep","Rumours"]],["What is the key?","Balance",["Speed","Silence"]]]],
    ["Corruption damages the economy of a nation. When officials accept bribes, honest companies lose opportunities and ordinary citizens pay higher prices. Therefore, transparency and strong laws are essential.",[["What does corruption damage?","The economy",["The weather","The roads"]],["Who loses opportunities?","Honest companies",["Corrupt officials","Tourists"]],["What is essential?","Transparency and strong laws",["Higher prices","More bribes"]]]],
  ],
};

export const bemReadingMock: BemText[] = [
  [
    "Timgad is an ancient Roman city in the Aures Mountains. It was built in the first century and is a World Heritage Site. Every year, thousands of tourists visit its ruins and its famous arch.",
    [["Timgad is a modern city.","False","The text says: it is an ancient Roman city."],["It was built in the first century.","True","The text says: it was built in the first century."],["Timgad has a famous airport.","Not mentioned","The text does not talk about an airport."],["Tourists visit the ruins.","True","The text says: thousands of tourists visit its ruins."]],
  ],
  [
    "Hanane is fifteen. She volunteers in a local charity every weekend. She helps orphans with their homework and organises small parties for them. She says that helping others makes her proud.",
    [["Hanane is a volunteer.","True","The text says: she volunteers in a local charity."],["She works in a hospital.","False","The text says: she works in a local charity."],["She plays football with the orphans.","Not mentioned","The text does not talk about football."],["Helping others makes her proud.","True","The text says: helping others makes her proud."]],
  ],
];

export const edSoundsMock: Pair[] = [
  [
    "worked",
    "/t/",
  ],
  [
    "played",
    "/d/",
  ],
  [
    "wanted",
    "/ɪd/",
  ],
  [
    "helped",
    "/t/",
  ],
  [
    "called",
    "/d/",
  ],
  [
    "needed",
    "/ɪd/",
  ],
  [
    "washed",
    "/t/",
  ],
  [
    "opened",
    "/d/",
  ],
  [
    "visited",
    "/ɪd/",
  ],
  [
    "stopped",
    "/t/",
  ],
  [
    "cleaned",
    "/d/",
  ],
  [
    "decided",
    "/ɪd/",
  ],
];

export const sSoundsMock: Pair[] = [
  [
    "books",
    "/s/",
  ],
  [
    "dogs",
    "/z/",
  ],
  [
    "watches",
    "/ɪz/",
  ],
  [
    "cats",
    "/s/",
  ],
  [
    "days",
    "/z/",
  ],
  [
    "boxes",
    "/ɪz/",
  ],
  [
    "cups",
    "/s/",
  ],
  [
    "bags",
    "/z/",
  ],
  [
    "buses",
    "/ɪz/",
  ],
  [
    "roofs",
    "/s/",
  ],
  [
    "friends",
    "/z/",
  ],
  [
    "churches",
    "/ɪz/",
  ],
];

export const primSentencesMock: string[] = [
  "I am a student.",
  "This is my mother.",
  "My father is tall.",
  "The cat is under the table.",
  "I like red apples.",
  "We play in the garden.",
  "She has a small bag.",
  "The ball is in the box.",
  "He can run fast.",
  "My friend is happy.",
  "The dog is big.",
  "I have a blue pen.",
];

export const midSentencesMock: string[] = [
  "The scientist invented a useful machine.",
  "We should protect the environment.",
  "My brother is taller than me.",
  "She is a polite and generous girl.",
  "The museum is next to the library.",
  "I can speak three languages.",
];

export const secSentencesMock: string[] = [
  "Technology has changed our lives.",
  "Students must respect the rules.",
  "Many species are in danger.",
  "The government should protect the environment.",
  "Scientists have discovered a new planet.",
  "Pollution affects our health.",
  "Education is a fundamental right.",
  "The company increased its profit.",
];

export const bemSentencesMock: string[] = [
  "The minaret was designed by a famous architect.",
  "The fortress was constructed in the sixteenth century.",
  "She has never visited a museum.",
  "He is as tall as his father.",
  "If you study hard, you will pass the exam.",
  "We ought to protect the environment.",
];
