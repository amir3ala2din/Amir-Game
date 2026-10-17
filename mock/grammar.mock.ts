import type { BankKey, McRow, Pair } from "@/types";

export const comparativesMock: Pair[] = [
  [
    "tall",
    "taller",
  ],
  [
    "short",
    "shorter",
  ],
  [
    "big",
    "bigger",
  ],
  [
    "small",
    "smaller",
  ],
  [
    "fast",
    "faster",
  ],
  [
    "slow",
    "slower",
  ],
  [
    "old",
    "older",
  ],
  [
    "young",
    "younger",
  ],
  [
    "heavy",
    "heavier",
  ],
  [
    "happy",
    "happier",
  ],
  [
    "easy",
    "easier",
  ],
  [
    "good",
    "better",
  ],
  [
    "bad",
    "worse",
  ],
  [
    "beautiful",
    "more beautiful",
  ],
  [
    "interesting",
    "more interesting",
  ],
  [
    "expensive",
    "more expensive",
  ],
  [
    "difficult",
    "more difficult",
  ],
  [
    "dangerous",
    "more dangerous",
  ],
];

export const pluralsMock: Pair[] = [
  [
    "book",
    "books",
  ],
  [
    "day",
    "days",
  ],
  [
    "box",
    "boxes",
  ],
  [
    "bus",
    "buses",
  ],
  [
    "watch",
    "watches",
  ],
  [
    "city",
    "cities",
  ],
  [
    "baby",
    "babies",
  ],
  [
    "child",
    "children",
  ],
  [
    "man",
    "men",
  ],
  [
    "woman",
    "women",
  ],
  [
    "foot",
    "feet",
  ],
  [
    "tooth",
    "teeth",
  ],
  [
    "mouse",
    "mice",
  ],
  [
    "person",
    "people",
  ],
  [
    "knife",
    "knives",
  ],
  [
    "leaf",
    "leaves",
  ],
  [
    "sheep",
    "sheep",
  ],
  [
    "fish",
    "fish",
  ],
];

export const timeMarkersMock: Pair[] = [
  [
    "I visited my grandparents ___.",
    "last summer",
  ],
  [
    "We watched a film ___.",
    "last night",
  ],
  [
    "She called me ___.",
    "yesterday",
  ],
  [
    "They moved to Oran ___.",
    "two years ago",
  ],
  [
    "He travelled to Algiers ___.",
    "last week",
  ],
  [
    "I was ill ___.",
    "last month",
  ],
  [
    "My father bought a car ___.",
    "last year",
  ],
  [
    "We played football ___.",
    "yesterday",
  ],
];

export const prepositionsMock: [string, string, string][] = [
  [
    "The book is ___ the desk. (on top)",
    "on",
    "على",
  ],
  [
    "The cat is ___ the box. (inside)",
    "in",
    "في",
  ],
  [
    "The ball is ___ the table. (below)",
    "under",
    "تحت",
  ],
  [
    "The school is ___ the mosque and the library. (in the middle)",
    "between",
    "بين",
  ],
  [
    "The bank is ___ the post office. (beside it)",
    "next to",
    "بجانب",
  ],
  [
    "The park is ___ the school. (face to face)",
    "opposite",
    "مقابل",
  ],
  [
    "The dog is ___ the house. (at the back)",
    "behind",
    "خلف",
  ],
  [
    "The teacher is ___ the class. (at the front)",
    "in front of",
    "أمام",
  ],
];

export const modalHintsMock: Record<string, Pair> = {
  "prohibition": ["mustn't = prohibition (not allowed)","mustn't للمنع"],
  "obligation": ["must = obligation (a rule or duty)","must للإلزام"],
  "advice": ["should / shouldn't = advice","should / shouldn't للنصيحة"],
  "ability": ["can / can't = ability","can / can't للقدرة"],
};

export const linkHintsMock: Record<string, Pair> = {
  "because": ["a reason","سبب"],
  "so": ["a result","نتيجة"],
  "therefore": ["a result","نتيجة"],
  "but": ["contrast","تعارض"],
  "although": ["contrast","تعارض"],
  "despite": ["contrast","تعارض"],
  "whereas": ["contrast","تعارض"],
  "however": ["contrast","تعارض"],
  "while": ["two actions at the same time","حدثان في نفس الوقت"],
};

export const causeHintsMock: Record<string, Pair> = {
  "because": ["a reason","سبب"],
  "since": ["a reason","سبب"],
  "as": ["a reason","سبب"],
  "therefore": ["a result","نتيجة"],
  "so": ["a result","نتيجة"],
  "as a result": ["a result","نتيجة"],
  "because of": ["a reason (+ noun)","سبب (+ اسم)"],
};

/** Multiple-choice question banks: [question, answer, wrong options, hint key]. */
export const banksMock: Record<BankKey, McRow[]> = {
  "modal": [
    ["We ___ throw rubbish in the street.","mustn't",["must","should","can"],"prohibition"],
    ["Pupils ___ keep the school clean.","must",["mustn't","can't","shouldn't"],"obligation"],
    ["You ___ recycle plastic bottles.","should",["shouldn't","mustn't","can't"],"advice"],
    ["We ___ waste water. It is precious.","shouldn't",["should","must","can"],"advice"],
    ["Visitors ___ pick the flowers in the park.","mustn't",["must","should","can"],"prohibition"],
    ["I ___ ride a bike. I learned at five.","can",["can't","mustn't","shouldn't"],"ability"],
    ["You ___ switch off the lights when you leave the room.","should",["shouldn't","mustn't","can't"],"advice"],
    ["He is only two. He ___ walk yet.","can't",["can","must","should"],"ability"],
    ["Smoking is forbidden here. You ___ smoke.","mustn't",["must","should","can"],"prohibition"],
    ["Students ___ wear the uniform. It is a school rule.","must",["mustn't","can't","shouldn't"],"obligation"],
    ["She ___ speak three languages.","can",["mustn't","shouldn't","must"],"ability"],
    ["It is dangerous! Children ___ play with fire.","mustn't",["must","should","can"],"prohibition"],
    ["You have a bad cough. You ___ see a doctor.","should",["shouldn't","mustn't","can't"],"advice"],
    ["We ___ protect nature. It is our duty.","must",["mustn't","can't","shouldn't"],"obligation"],
    ["___ I borrow your pen, please?","Can",["Mustn't","Shouldn't","Don't"],"ability"],
  ],
  "link": [
    ["I stayed at home ___ I was ill.","because",["but","so","however"]],
    ["He was tired, ___ he went to bed early.","so",["because","but","whereas"]],
    ["She is clever, ___ she is lazy.","but",["because","so","therefore"]],
    ["___ it was cold, we went swimming.","Although",["Because","So","Therefore"]],
    ["He studied hard; ___, he passed the exam.","therefore",["although","but","because"]],
    ["The road was closed; ___, we took another route.","therefore",["despite","because","whereas"]],
    ["___ the rain, the match continued.","Despite",["Because","Therefore","So"]],
    ["Some prefer cities, ___ others prefer villages.","whereas",["therefore","because","so"]],
    ["I was reading ___ my sister was cooking.","while",["because","despite","therefore"]],
    ["The task was difficult; ___, we finished it.","however",["because","while","whereas"]],
  ],
  "cond": [
    ["If it rains tomorrow, we ___ at home.","will stay",["stayed","stay","have stayed"]],
    ["If I ___ rich, I would travel the world.","were",["am","will be","have been"]],
    ["If you study hard, you ___ the exam.","will pass",["passed","would passed","pass"]],
    ["If she exercised more, she ___ healthier.","would be",["will be","is","was being"]],
    ["If we recycle, we ___ the environment.","will protect",["protected","protecting","would protected"]],
    ["If he were taller, he ___ basketball.","would play",["will play","played","plays"]],
    ["If you heat ice, it ___.","melts",["will melted","melting","melted"]],
    ["If I ___ you, I would apologise.","were",["am","will be","was being"]],
  ],
  "passive": [
    ["English ___ all over the world.","is spoken",["speaks","is speaking","spoke"]],
    ["The window ___ yesterday.","was broken",["broke","is broken","has broke"]],
    ["The homework ___ by the pupils every day.","is done",["does","is doing","did"]],
    ["The Eiffel Tower ___ in 1889.","was built",["built","is built","builds"]],
    ["Many trees ___ every year.","are planted",["plant","planted","are planting"]],
    ["The letter ___ tomorrow.","will be sent",["will send","sent","is sent"]],
    ["The thief ___ by the police last night.","was arrested",["arrested","is arrested","arrests"]],
    ["Cars ___ in this factory.","are made",["make","made","are making"]],
  ],
  "usedTo": [
    ["When I was a child, I ___ in a small village.","used to live",["use to live","am living","live"]],
    ["People ___ letters, but now they send emails.","used to write",["use to write","write","are writing"]],
    ["My grandfather ___ a farmer, but he is retired now.","used to be",["use to be","is used to","uses to be"]],
    ["We ___ play football every day when we were kids.","used to",["use to","are used to","used"]],
    ["She didn't ___ like vegetables, but now she loves them.","use to",["used to","using to","uses to"]],
    ["Children ___ walk to school in the past.","used to",["use to","are used to","would used to"]],
  ],
  "equality": [
    ["This bridge is as ___ as that one. (both are 200 m long)","long",["longer","longest","length"]],
    ["The fortress is not as ___ as the castle. (the castle is older)","old",["older","oldest","age"]],
    ["My brother is ___ tall as my father.","as",["more","than","much"]],
    ["Is the museum as ___ as the library? (same size)","big",["bigger","biggest","size"]],
    ["The first tower is not as high ___ the second.","as",["than","like","so"]],
    ["Ali is as ___ as Omar. (they both run at the same speed)","fast",["faster","fastest","speed"]],
    ["This text is as interesting ___ that one.","as",["than","then","like"]],
  ],
  "passivePast": [
    ["The Great Mosque ___ in the last century.","was built",["built","is built","were built"]],
    ["These walls ___ by the Romans.","were built",["was built","built","are build"]],
    ["The minaret ___ by a famous architect.","was designed",["designed","were designed","is designing"]],
    ["The ruins ___ in 1950.","were discovered",["was discovered","discovered","discover"]],
    ["The book ___ by a young writer.","was written",["wrote","were written","is wrote"]],
    ["Many monuments ___ during the war.","were destroyed",["was destroyed","destroyed","are destroy"]],
    ["The fortress ___ in the sixteenth century.","was constructed",["constructed","were constructed","is constructed"]],
  ],
  "whenWhile": [
    ["She was walking home when she ___ an old friend.","met",["was meeting","meets","has met"]],
    ["We were having lunch when the phone ___.","rang",["rings","will ring","has rung"]],
    ["I was sleeping when the alarm ___.","rang",["rings","will ring","has rung"]],
    ["He ___ his leg while he was playing football.","broke",["was breaking","breaks","has broken"]],
    ["They were swimming ___ the storm began. (a sudden event)","when",["while","during","since"]],
  ],
  "cause": [
    ["He was late ___ the bus broke down.","because",["so","therefore","as a result"]],
    ["It was raining, ___ we stayed at home.","so",["because","since","as"]],
    ["He studied hard. ___, he passed the exam.","Therefore",["Because","Since","As"]],
    ["___ you are tired, you should rest.","Since",["Therefore","So","As a result"]],
    ["The factory closed down. ___, many workers lost their jobs.","As a result",["Because","Since","As"]],
    ["The match was cancelled ___ the heavy rain.","because of",["because","so","therefore"]],
  ],
  "presentPerfectAdv": [
    ["I have ___ been to Paris. It is my first time.","never",["ever","just","yet"]],
    ["She hasn't finished her homework ___.","yet",["ever","already","never"]],
    ["He has ___ left. He is not here now.","just",["yet","ever","never"]],
    ["No, thanks. I have ___ eaten.","already",["yet","ever","never"]],
    ["This is the best film I have ___ seen.","ever",["yet","already","never"]],
    ["They haven't visited the museum ___.","yet",["ever","already","just"]],
  ],
  "prefix": [
    ["The opposite of 'happy' is ___.","unhappy",["dishappy","imhappy","happyless"]],
    ["The opposite of 'honest' is ___.","dishonest",["unhonest","imhonest","honestless"]],
    ["The opposite of 'possible' is ___.","impossible",["unpossible","dispossible","possibleless"]],
    ["The opposite of 'polite' is ___.","impolite",["unpolite","dispolite","politeless"]],
    ["A person without hope is ___.","hopeless",["hopeful","hopeness","unhope"]],
    ["A person full of care is ___.","careful",["careless","uncare","caredis"]],
    ["The opposite of 'agree' is ___.","disagree",["unagree","imagree","agreeless"]],
    ["Something without use is ___.","useless",["useful","unuse","disuse"]],
  ],
  "imperative": [
    ["___ quiet in the library!","Be",["Are","Is","Being"]],
    ["___ run in the corridor!","Don't",["Not","No","Doesn't"]],
    ["___ your hands before eating.","Wash",["Washing","Washes","To wash"]],
    ["___ the door, please. It's cold.","Close",["Closing","Closes","To close"]],
    ["Please ___ late for school.","don't be",["not be","aren't","don't being"]],
    ["___ to the teacher carefully.","Listen",["Listening","Listens","To listen"]],
  ],
  "cond1": [
    ["If you ___ hard, you will pass the exam.","study",["studied","will study","would study"]],
    ["If I see him, I ___ him the news.","will tell",["told","would tell","am telling"]],
    ["If we recycle more, we ___ the planet.","will protect",["protected","would protect","protecting"]],
    ["She will be happy if you ___ her.","help",["will help","helped","would help"]],
    ["If they ___ the match, they will celebrate.","win",["won","will win","would win"]],
    ["If it ___ tomorrow, we will cancel the trip.","rains",["will rain","rained","would rain"]],
    ["If you don't hurry, you ___ the bus.","will miss",["missed","would miss","have missed"]],
  ],
  "obligation": [
    ["You look very ill. You ___ see a doctor. (advice)","should",["must not","don't have to","can't"]],
    ["Students ___ be on time. It is a school rule.","must",["should not","don't have to","can't"]],
    ["It's Sunday. I ___ get up early.","don't have to",["must","have to","ought to"]],
    ["We ___ protect the environment. (advice)","ought to",["must not","don't have to","can't"]],
    ["You ___ cross the street when the light is red. It's dangerous.","must not",["don't have to","ought to","have to"]],
    ["Soldiers ___ obey orders. It's their duty.","have to",["don't have to","should not","must not"]],
  ],
  "punctuation": [
    ["my friend ali lives in oran","My friend Ali lives in Oran.",["my friend Ali lives in oran.","My friend ali lives in Oran","My Friend Ali Lives In Oran."]],
    ["where is the museum","Where is the museum?",["Where is the museum.","where is the museum?","Where is the Museum"]],
    ["we visited algiers last summer and it was great","We visited Algiers last summer and it was great.",["we visited algiers last summer and it was great.","We visited algiers last summer, and it was great","We visited Algiers Last Summer and it was great."]],
    ["emir abdelkader was a great leader","Emir Abdelkader was a great leader.",["emir abdelkader was a great leader.","Emir abdelkader was a great leader","Emir Abdelkader Was a Great Leader."]],
  ],
  "wordForm": [
    ["Good ___ is a right for every child. (educate)","education",["educate","educational","educator"]],
    ["She works as an ___ in a primary school. (educate)","educator",["education","educate","educational"]],
    ["We saw an ___ programme about animals. (educate)","educational",["education","educate","educator"]],
    ["I saw a funny ___ on TV. (advertise)","advertisement",["advertise","advertiser","advertised"]],
    ["The company spends a lot of money on ___. (advertise)","advertising",["advertise","advertiser","advertisable"]],
    ["Fast food ___ has increased in my country. (consume)","consumption",["consume","consumer","consumable"]],
    ["Every ___ has the right to know what is in the product. (consume)","consumer",["consume","consumption","consumable"]],
    ["___ of nature is everybody's duty. (protect)","Protection",["Protect","Protective","Protector"]],
    ["She worked hard and became very ___. (succeed)","successful",["success","succeed","successfully"]],
    ["He answered the question ___. (succeed)","successfully",["success","successful","succeed"]],
    ["There is a strong ___ between the two teams. (compete)","competition",["compete","competitor","competitive"]],
    ["The ___ of technology has changed our lives. (develop)","development",["develop","developing","developed"]],
    ["The river is ___ because of the factory. (pollute)","polluted",["pollution","pollute","pollutant"]],
    ["Edison was a famous ___. (invent)","inventor",["invention","invent","inventive"]],
    ["The telephone is a great ___. (invent)","invention",["invent","inventor","inventive"]],
    ["There is a big ___ between the two cities. (differ)","difference",["differ","different","differently"]],
    ["The two brothers are very ___. (differ)","different",["difference","differ","differently"]],
  ],
};

/** Grammar topic labels: [english, arabic, emoji]. */
export const topicNamesMock: Record<string, [string, string, string]> = {
  "wf": ["Word Formation","اشتقاق الكلمات","🧬"],
  "eq": ["Comparatives of Equality","المقارنة بالتساوي","⚖️"],
  "pasp": ["Passive Voice (Past)","المبني للمجهول (الماضي)","🔃"],
  "wh": ["Past Simple vs Past Continuous","الماضي البسيط والمستمر","🕰️"],
  "cau": ["Cause & Effect","السبب والنتيجة","➡️"],
  "ppw": ["ever, never, just, already, yet","ever و never و just و already و yet","⏳"],
  "sup": ["Superlatives","صيغة التفضيل","🏆"],
  "pfx": ["Prefixes & Suffixes","السوابق واللواحق","🧩"],
  "imp": ["The Imperative","الأمر","📢"],
  "c1": ["Conditional Type 1","الشرط من النوع الأول","🔀"],
  "ob": ["Obligation & Advice","الإلزام والنصيحة","🚦"],
  "ut": ["Used to","used to","⏳"],
  "link": ["Linking Words","أدوات الربط","🔗"],
  "cond": ["Conditionals","الجمل الشرطية","🔀"],
  "pas": ["Passive Voice","المبني للمجهول","🔃"],
  "comp": ["Comparatives","المقارنة","⚖️"],
  "plur": ["Plurals","الجمع","📚"],
  "mod": ["Can / Should / Must","can و should و must","🚦"],
  "tm": ["Time Markers","علامات الزمن","🕒"],
  "prep": ["Prepositions of Place","حروف الجر للمكان","📍"],
  "be": ["To Be","الفعل to be","🧍"],
  "pres": ["Present Simple","المضارع البسيط","⏰"],
  "pc": ["Present Continuous","المضارع المستمر","🔄"],
  "past": ["Past Simple","الماضي البسيط","⏪"],
  "pastc": ["Past Continuous","الماضي المستمر","🕰️"],
  "pp": ["Present Perfect","المضارع التام","✅"],
  "fut": ["Future Simple","المستقبل البسيط","🔮"],
};
