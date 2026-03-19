import { Word } from '../types';

export const SPARK_VOCABULARY: Word[] = [
  {
    id: '1',
    word: 'do',
    phonetic: '/duː/',
    inflections: ['does', 'did', 'done'],
    partOfSpeech: 'v. & aux.',
    meanings: ['做，干', '进行，从事', '（助动词）用于构成疑问句或否定句'],
    examPoint: {
      format: ['单选', '完形', '写作'],
      highFreqMeaning: '做，干',
      description: '常考短语：do with, do one\'s best, do well in.',
      phrases: [
        { phrase: 'do with', meaning: '处理，安置（常与 what 连用）' },
        { phrase: 'do one\'s best', meaning: '尽某人最大努力' },
        { phrase: 'do well in', meaning: '在...方面做得好' },
      ],
    },
    realSentences: [
      {
        sentence: 'I don\'t know what to do with the old clothes.',
        translation: '我不知道该如何处理这些旧衣服。',
        source: '2023 北京中考',
        analysis: '考查 do with 的固定搭配，常与 what 引导的宾语从句结合。',
      },
    ],
    corePatterns: [
      {
        pattern: 'When in Rome, do as the Romans do.',
        example: '入乡随俗。',
      },
    ],
    differentiation: {
      title: 'do with vs. deal with',
      compareWith: 'deal with',
      difference: 'do with 常与 what 连用；deal with 常与 how 连用。',
      table: {
        header: ['短语', '搭配疑问词', '侧重点'],
        rows: [
          ['do with', 'what', '侧重于“处置”'],
          ['deal with', 'how', '侧重于“处理/解决”'],
        ],
      },
      examples: [
        { sentence: 'What did you do with the book?', translation: '你把那本书怎么处理了？' },
        { sentence: 'How did you deal with the problem?', translation: '你是如何解决那个问题的？' },
      ],
    },
    expansion: {
      derivatives: [
        { word: 'doer', pos: 'n.', meaning: '行为者' },
        { word: 'DIY', pos: 'abbr.', meaning: 'do-it-yourself (自己动手做)' },
      ],
      synonyms: ['perform', 'act'],
      scenario: {
        title: '校园生活',
        usage: '描述日常活动或作业完成情况。',
        example: 'I have a lot of homework to do today.',
      },
    },
    masteryStatus: 'focus',
  },
  {
    id: '2',
    word: 'make',
    phonetic: '/meɪk/',
    inflections: ['makes', 'made', 'made'],
    partOfSpeech: 'v.',
    meanings: ['制造，做', '使，让', '成为'],
    examPoint: {
      format: ['单选', '完形', '写作'],
      highFreqMeaning: '制造，使...',
      description: '常考句型：make sb. do sth. (使某人做某事)，被动语态需还原 to。',
      phrases: [
        { phrase: 'make friends with', meaning: '与...交朋友' },
        { phrase: 'make a decision', meaning: '做决定' },
        { phrase: 'make up one\'s mind', meaning: '下定决心' },
      ],
    },
    realSentences: [
      {
        sentence: 'The sad movie made me cry.',
        translation: '那部悲伤的电影让我哭了。',
        source: '2022 广东中考',
        analysis: '考查 make sb. do sth. 结构，make 为使役动词。',
      },
    ],
    corePatterns: [
      {
        pattern: 'make sb. do sth.',
        example: 'Loud music makes me energetic.',
      },
    ],
    differentiation: {
      title: 'be made of vs. be made from',
      compareWith: 'be made from',
      difference: 'be made of 看得出原材料（物理变化）；be made from 看不出原材料（化学变化）。',
      examples: [
        { sentence: 'The table is made of wood.', translation: '这张桌子是木头做的。（看得出木头）' },
        { sentence: 'Paper is made from wood.', translation: '纸是木头做的。（看不出木头）' },
      ],
    },
    expansion: {
      derivatives: [
        { word: 'maker', pos: 'n.', meaning: '制造者' },
      ],
      synonyms: ['produce', 'create'],
      scenario: {
        title: '写作场景',
        usage: '在描述物品制作或表达情感影响时使用。',
        example: 'Reading books makes me happy.',
      },
    },
    masteryStatus: 'to_review',
  },
  {
    id: '3',
    word: 'go',
    phonetic: '/ɡəʊ/',
    inflections: ['goes', 'went', 'gone'],
    partOfSpeech: 'v.',
    meanings: ['去，走', '变得', '进行'],
    examPoint: {
      format: ['单选', '完形'],
      highFreqMeaning: '去',
      description: '常考辨析：have been to vs. have gone to.',
    },
    realSentences: [
      {
        sentence: 'Where have you been? I\'ve been to the library.',
        translation: '你刚才去哪了？我刚才去图书馆了。',
        source: '2024 上海中考',
        analysis: '考查 have been to 表示“去过已回”。',
      },
    ],
    corePatterns: [
      {
        pattern: 'go shopping / swimming',
        example: 'Let\'s go swimming this afternoon.',
      },
    ],
    differentiation: {
      title: 'have been to vs. have gone to',
      compareWith: 'have gone to',
      difference: 'have been to 去过已回（人在此地）；have gone to 去了未回（人在彼地或途中）。',
      table: {
        header: ['短语', '含义', '状态'],
        rows: [
          ['have been to', '去过某地', '已经回来'],
          ['have gone to', '去了某地', '还没回来'],
        ],
      },
      examples: [
        { sentence: 'He has been to Beijing.', translation: '他去过北京。（现在不一定在北京）' },
        { sentence: 'He has gone to Beijing.', translation: '他去北京了。（现在不在说话地）' },
      ],
    },
    expansion: {
      derivatives: [
        { word: 'ongoing', pos: 'adj.', meaning: '进行中的' },
      ],
      synonyms: ['leave', 'move'],
      scenario: {
        title: '生活场景',
        usage: '询问他人行踪或描述过去经历。',
        example: 'Have you ever been to the Great Wall?',
      },
    },
    masteryStatus: 'to_review',
  },
];
