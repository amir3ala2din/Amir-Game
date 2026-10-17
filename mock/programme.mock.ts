import type { CefrLevel, Grade, LevelDef, Pair } from "@/types";

export const schoolLevelsMock: LevelDef[] = [
  [
    "3 Primary",
    "3 ابتدائي",
    "3AP",
    "🐣",
  ],
  [
    "4 Primary",
    "4 ابتدائي",
    "4AP",
    "🐥",
  ],
  [
    "5 Primary",
    "5 ابتدائي",
    "5AP",
    "🦋",
  ],
  [
    "1 Middle (1AM)",
    "1 متوسط",
    "1AM",
    "🚀",
  ],
  [
    "2 Middle (2AM)",
    "2 متوسط",
    "2AM",
    "🎨",
  ],
  [
    "3 Middle (3AM)",
    "3 متوسط",
    "3AM",
    "🧠",
  ],
  [
    "4 Middle (BEM)",
    "4 متوسط (شهادة التعليم المتوسط)",
    "4AM",
    "🏅",
  ],
  [
    "1 Secondary (1AS)",
    "1 ثانوي",
    "1AS",
    "🔬",
  ],
  [
    "2 Secondary (2AS)",
    "2 ثانوي",
    "2AS",
    "💡",
  ],
  [
    "3 Secondary (BAC)",
    "3 ثانوي (باكالوريا)",
    "3AS",
    "🎓",
  ],
];

export const generalLevelsMock: LevelDef[] = [
  [
    "A1 – Beginner",
    "المبتدئ",
    "A1",
    "🌱",
  ],
  [
    "A2 – Elementary",
    "الأساسي",
    "A2",
    "🌿",
  ],
  [
    "B1 – Intermediate",
    "المتوسط",
    "B1",
    "🌳",
  ],
  [
    "B2 – Upper-Intermediate",
    "فوق المتوسط",
    "B2",
    "🏔️",
  ],
];

export const generalToGradesMock: Record<CefrLevel, Grade[]> = {
  "A1": ["3AP","4AP","5AP"],
  "A2": ["1AM","2AM"],
  "B1": ["3AM","4AM","1AS"],
  "B2": ["2AS","3AS"],
};

/** National programme sequences (term titles) for 2AM and 4AM. */
export const sequencesMock: Partial<Record<Grade, Pair[]>> = {
  "2AM": [
    ["Sequence 1 · Teens' Past Experiences","المقطع 1 · تجارب المراهقين في الماضي"],
    ["Sequence 2 · Appearance & Personality","المقطع 2 · المظهر والشخصية"],
    ["Sequence 3 · Protecting the Environment","المقطع 3 · حماية البيئة"],
  ],
  "4AM": [
    ["Sequence 1 · Me, Universal Landmarks and Outstanding Figures","المقطع 1 · المعالم العالمية والشخصيات البارزة"],
    ["Sequence 2 · Me, My Personality and Life Experiences","المقطع 2 · شخصيتي وتجاربي"],
    ["Sequence 3 · Me, My Community and Citizenship","المقطع 3 · مجتمعي والمواطنة"],
  ],
};
