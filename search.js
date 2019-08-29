/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search (grid, wordlist) {
  // Search for one word at a time.

    // Search the grid for the starting letter.

      // Search in each direction around the starting letter for the second letter.

        // If the second letter is found continue in that same direction.

        // If the edge is hit, or if the next letter doesn't match, go back to the starting letter.

        // If the full word is found, add it to the list of found words and move to the next word.

      // If no second letter is found, continue searching the rest of the grid.

    // If the end of the grid is reached, move on to the next word.

  // Return the list of found words.
}

// Possible optimizations:
// - If the word is longer than the length and width of the grid, skip it.
// - Explore recursive vs procedural.
