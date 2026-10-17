import type { Content } from "@/types";
import { banksMock, causeHintsMock, comparativesMock, linkHintsMock, modalHintsMock, pluralsMock, prepositionsMock, timeMarkersMock, topicNamesMock } from "./grammar.mock";
import { bemReadingMock, bemSentencesMock, dialoguesMock, edSoundsMock, midSentencesMock, primSentencesMock, readingMock, secSentencesMock, sSoundsMock } from "./practice.mock";
import { generalLevelsMock, generalToGradesMock, schoolLevelsMock, sequencesMock } from "./programme.mock";
import { adjPairsMock, badVerbsMock, gradeVerbsMock, grammarPlanMock, posWordsMock, stageOfGradeMock, verbsMock } from "./verbs.mock";
import { extraWordsMock, groupsMock, oppositesMock, vocabMock } from "./vocab.mock";
import { adjDocsMock, adjTopicsMock, jobTopicWordsMock, sentencesMock, synonymsMock } from "./words.mock";

export const contentMock: Content = {
  vocab: vocabMock,
  extraWords: extraWordsMock,
  opposites: oppositesMock,
  groups: groupsMock,
  grammarPlan: grammarPlanMock,
  gradeVerbs: gradeVerbsMock,
  stageOfGrade: stageOfGradeMock,
  verbs: verbsMock,
  adjPairs: adjPairsMock,
  posWords: posWordsMock,
  synonyms: synonymsMock,
  adjDocs: adjDocsMock,
  adjTopics: adjTopicsMock,
  jobTopicWords: jobTopicWordsMock,
  sentences: sentencesMock,
  comparatives: comparativesMock,
  plurals: pluralsMock,
  modalHints: modalHintsMock,
  linkHints: linkHintsMock,
  causeHints: causeHintsMock,
  badVerbs: badVerbsMock,
  timeMarkers: timeMarkersMock,
  prepositions: prepositionsMock,
  banks: banksMock,
  dialogues: dialoguesMock,
  reading: readingMock,
  bemReading: bemReadingMock,
  edSounds: edSoundsMock,
  sSounds: sSoundsMock,
  primSentences: primSentencesMock,
  midSentences: midSentencesMock,
  secSentences: secSentencesMock,
  bemSentences: bemSentencesMock,
  topicNames: topicNamesMock,
  schoolLevels: schoolLevelsMock,
  generalLevels: generalLevelsMock,
  generalToGrades: generalToGradesMock,
  sequences: sequencesMock,
};
