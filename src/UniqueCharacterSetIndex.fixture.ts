export type IndexableObject = {
  searchAttribute: string
  somethingElse: string
}

export const objectAlphabet: IndexableObject = {
  searchAttribute: 'alphabet',
  somethingElse: 'letters of the alphabet',
}

export const objectBanana: IndexableObject = {
  searchAttribute: 'banana',
  somethingElse: 'information about bananas',
}

export const objectCat: IndexableObject = {
  searchAttribute: 'cat',
  somethingElse: 'a picture of a cat',
}

export const objectDictionary: IndexableObject = {
  searchAttribute: 'dictionary',
  somethingElse: 'a useful dictionary',
}

export const objectsArray: IndexableObject[] = [objectAlphabet, objectBanana, objectCat, objectDictionary]

type ExpectedResultsMapping = {
  [maxCharSetLength: string]: {
    [searchTerm: string]: {
      [minSharedCharacters: string]: Array<{
        sharedCharacters: string
        value: IndexableObject
      }>
    }
  }
}

export const expectedResultsMapping: ExpectedResultsMapping = {
  2: {
    apple: {
      1: [
        { sharedCharacters: 'ae', value: objectAlphabet },
        { sharedCharacters: 'a', value: objectBanana },
        { sharedCharacters: 'a', value: objectCat },
        { sharedCharacters: 'a', value: objectDictionary },
      ],
      2: [{ sharedCharacters: 'ae', value: objectAlphabet }],
    },
    cat: {
      1: [
        { sharedCharacters: 'ac', value: objectCat },
        { sharedCharacters: 'ac', value: objectDictionary },
        { sharedCharacters: 'at', value: objectAlphabet },
        { sharedCharacters: 'a', value: objectBanana },
      ],
      2: [
        { sharedCharacters: 'ac', value: objectCat },
        { sharedCharacters: 'ac', value: objectDictionary },
        { sharedCharacters: 'at', value: objectAlphabet },
      ],
    },
    destroy: {
      1: [
        { sharedCharacters: 'do', value: objectDictionary },
        { sharedCharacters: 'et', value: objectAlphabet },
        { sharedCharacters: 't', value: objectCat },
      ],
      2: [
        { sharedCharacters: 'do', value: objectDictionary },
        { sharedCharacters: 'et', value: objectAlphabet },
      ],
    },
  },
  3: {
    apple: {
      1: [
        { sharedCharacters: 'ael', value: objectAlphabet },
        { sharedCharacters: 'a', value: objectBanana },
        { sharedCharacters: 'a', value: objectCat },
        { sharedCharacters: 'a', value: objectDictionary },
      ],
      2: [{ sharedCharacters: 'ael', value: objectAlphabet }],
      3: [{ sharedCharacters: 'ael', value: objectAlphabet }],
    },
    cat: {
      1: [
        { sharedCharacters: 'act', value: objectCat },
        { sharedCharacters: 'act', value: objectDictionary },
        { sharedCharacters: 'at', value: objectAlphabet },
        { sharedCharacters: 'a', value: objectBanana },
      ],
      2: [
        { sharedCharacters: 'act', value: objectCat },
        { sharedCharacters: 'act', value: objectDictionary },
        { sharedCharacters: 'at', value: objectAlphabet },
      ],
      3: [
        { sharedCharacters: 'act', value: objectCat },
        { sharedCharacters: 'act', value: objectDictionary },
      ],
    },
    destroy: {
      1: [
        { sharedCharacters: 'dor', value: objectDictionary },
        { sharedCharacters: 'et', value: objectAlphabet },
        { sharedCharacters: 't', value: objectCat },
      ],
      2: [
        { sharedCharacters: 'dor', value: objectDictionary },
        { sharedCharacters: 'et', value: objectAlphabet },
      ],
      3: [{ sharedCharacters: 'dor', value: objectDictionary }],
    },
  },
}
