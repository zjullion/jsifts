type ExpectedResultsMapping = {
  [inputString: string]: {
    [maxLength: number]: string[]
  }
}

export const expectedResultsMapping: ExpectedResultsMapping = {
  test: {
    0: [],
    1: ['e', 's', 't'],
    2: ['e', 's', 't', 'es', 'et', 'st', 'tt'],
    3: ['e', 's', 't', 'es', 'et', 'st', 'tt', 'est', 'ett', 'stt'],
    4: ['e', 's', 't', 'es', 'et', 'st', 'tt', 'est', 'ett', 'stt', 'estt'],
    5: ['e', 's', 't', 'es', 'et', 'st', 'tt', 'est', 'ett', 'stt', 'estt'],
  },
  aaarrgh: {
    0: [],
    1: ['a', 'g', 'h', 'r'],
    2: ['a', 'g', 'h', 'r', 'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr'],
    // prettier-ignore
    3: [
      'a', 'g', 'h', 'r',
      'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr',
      'aaa', 'aag', 'aah', 'aar', 'agh', 'agr', 'ahr', 'arr', 'ghr', 'grr', 'hrr',
    ],
    // prettier-ignore
    4: [
      'a', 'g', 'h', 'r',
      'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr',
      'aaa', 'aag', 'aah', 'aar', 'agh', 'agr', 'ahr', 'arr', 'ghr', 'grr', 'hrr',
      'aaag', 'aaah', 'aaar', 'aagh', 'aagr', 'aahr', 'aarr', 'aghr', 'agrr', 'ahrr', 'ghrr',
    ],
    // prettier-ignore
    5: [
      'a', 'g', 'h', 'r',
      'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr',
      'aaa', 'aag', 'aah', 'aar', 'agh', 'agr', 'ahr', 'arr', 'ghr', 'grr', 'hrr',
      'aaag', 'aaah', 'aaar', 'aagh', 'aagr', 'aahr', 'aarr', 'aghr', 'agrr', 'ahrr', 'ghrr',
      'aaagh', 'aaagr', 'aaahr', 'aaarr', 'aaghr', 'aagrr', 'aahrr', 'aghrr',
    ],
    // prettier-ignore
    6: [
      'a', 'g', 'h', 'r',
      'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr',
      'aaa', 'aag', 'aah', 'aar', 'agh', 'agr', 'ahr', 'arr', 'ghr', 'grr', 'hrr',
      'aaag', 'aaah', 'aaar', 'aagh', 'aagr', 'aahr', 'aarr', 'aghr', 'agrr', 'ahrr', 'ghrr',
      'aaagh', 'aaagr', 'aaahr', 'aaarr', 'aaghr', 'aagrr', 'aahrr', 'aghrr',
      'aaaghr', 'aaagrr', 'aaahrr', 'aaghrr',
    ],
    // prettier-ignore
    7: [
      'a', 'g', 'h', 'r',
      'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr',
      'aaa', 'aag', 'aah', 'aar', 'agh', 'agr', 'ahr', 'arr', 'ghr', 'grr', 'hrr',
      'aaag', 'aaah', 'aaar', 'aagh', 'aagr', 'aahr', 'aarr', 'aghr', 'agrr', 'ahrr', 'ghrr',
      'aaagh', 'aaagr', 'aaahr', 'aaarr', 'aaghr', 'aagrr', 'aahrr', 'aghrr',
      'aaaghr', 'aaagrr', 'aaahrr', 'aaghrr',
      'aaaghrr',
    ],
    // prettier-ignore
    8: [
      'a', 'g', 'h', 'r',
      'aa', 'ag', 'ah', 'ar', 'gh', 'gr', 'hr', 'rr',
      'aaa', 'aag', 'aah', 'aar', 'agh', 'agr', 'ahr', 'arr', 'ghr', 'grr', 'hrr',
      'aaag', 'aaah', 'aaar', 'aagh', 'aagr', 'aahr', 'aarr', 'aghr', 'agrr', 'ahrr', 'ghrr',
      'aaagh', 'aaagr', 'aaahr', 'aaarr', 'aaghr', 'aagrr', 'aahrr', 'aghrr',
      'aaaghr', 'aaagrr', 'aaahrr', 'aaghrr',
      'aaaghrr',
    ],
  },
}
