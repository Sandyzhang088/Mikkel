/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum StudyPhase {
  MEMORIZE = 'memorize',
  TEST = 'test',
  EXPAND = 'expand',
  REVIEW = 'review',
}

export interface Word {
  id: string;
  word: string;
  phonetic: string;
  inflections?: string[]; // e.g., ['does', 'did', 'done']
  partOfSpeech: string;
  meanings: string[];
  examPoint: {
    format: string[]; // ['单选', '完形', '写作', '听力']
    highFreqMeaning: string;
    description: string;
    phrases?: { phrase: string; meaning: string }[];
  };
  realSentences: {
    sentence: string;
    translation: string;
    source: string; // e.g., '2023 北京中考'
    analysis: string;
  }[];
  corePatterns: {
    pattern: string;
    example: string;
    audioUrl?: string;
  }[];
  differentiation?: {
    title: string;
    compareWith: string;
    difference: string;
    table?: { header: string[]; rows: string[][] };
    examples: { sentence: string; translation: string }[];
  };
  expansion: {
    derivatives: { word: string; pos: string; meaning: string }[];
    synonyms: string[];
    scenario: {
      title: string;
      usage: string;
      example: string;
    };
  };
  masteryStatus: 'mastered' | 'to_review' | 'focus';
}

export interface StudySession {
  id: string;
  date: string;
  words: Word[];
  startTime: number;
  duration: number; // in seconds
  score: number;
  totalQuestions: number;
}
