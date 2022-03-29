import generateUniqueCharacterSubsets from './generateUniqueCharacterSubsets'
import { expectedResultsMapping } from './generateUniqueCharacterSubsets.fixture'

describe('generateUniqueCharacterSubsets', () => {
  const inputStrings = Object.keys(expectedResultsMapping)
  describe.each(inputStrings)('With inputString=%s', (inputString) => {
    const maxSetLengths = Object.keys(expectedResultsMapping[inputString])
    describe.each(maxSetLengths)('With max set length "%s"', (maxSetLengthString) => {
      const maxSetLength = Number(maxSetLengthString)

      const actualResults = generateUniqueCharacterSubsets(inputString, maxSetLength)
      const expectedResults = expectedResultsMapping[inputString][maxSetLength]

      it('Returns the expected results', () => {
        expect(actualResults.length).toBe(expectedResults.length)
        for (const actualResult of actualResults) {
          expect(expectedResults).toContain(actualResult)
        }
      })
    })
  })
})
