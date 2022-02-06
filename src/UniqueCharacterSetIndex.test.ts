import UniqueCharacterSetIndex from './UniqueCharacterSetIndex'
import { IndexableObject, expectedResultsMapping, objectsArray } from './UniqueCharacterSetIndex.fixture'

describe('UniqueCharacterSetIndex', () => {
  const maxCharSetLengths = Object.keys(expectedResultsMapping)
  describe.each(maxCharSetLengths)('With maxCharSetLength=%s', (maxCharSetLength) => {
    const index = new UniqueCharacterSetIndex<IndexableObject>('searchAttribute', Number(maxCharSetLength))
    index.load(objectsArray)

    const searchTerms = Object.keys(expectedResultsMapping[maxCharSetLength])
    describe.each(searchTerms)('With search term "%s"', (searchTerm) => {
      const minSharedCharacters = Object.keys(expectedResultsMapping[maxCharSetLength][searchTerm])
      describe.each(minSharedCharacters)('With minSharedCharacters=%s', (minSharedCharacters) => {
        const actualResults = index.findValues(searchTerm, Number(minSharedCharacters))
        const expectedResults = expectedResultsMapping[maxCharSetLength][searchTerm][minSharedCharacters]

        it('Returns the expected results', () => {
          expect(actualResults).toMatchObject(expectedResults)
        })
      })
    })
  })

  it('Throws an error if loaded with values with an indvalid indexable attribute', () => {
    const badObject: IndexableObject = {
      // @ts-expect-error testing invalid input
      searchAttribute: 47548,
      somethingElse: 'Some value',
    }
    const index = new UniqueCharacterSetIndex<IndexableObject>('searchAttribute', 3)

    expect(() => index.load([badObject])).toThrow(
      new TypeError('One or more values do not have a string attribute searchAttribute.')
    )
  })
})
