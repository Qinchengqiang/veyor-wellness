
// a string checked with resExp
/**
 * @param string        string     -- the string for being tested
 * @param regExp        string     -- a string with only all characters for regExp
 * @returns     boolean
 */
const testString = (string, regExp) => {
    const regex = new RegExp(regExp);
    return regex.test(string);
}


/**
 *                              =============================
 *                              'Is the string ...' checking
 *                              =============================
 *
 * @fist_param string   string  -- the string needed to be test
 *
 * @second_param [option]   string
 *
 * @returns {boolean}
 *
 */
// string includes Characters or subStr
export const isIncludeCharacters = (string, characters) => testString(string, `[${characters}]`);
export const isIncludeSubString = (string, subStr) => string.includes(subStr);

// string is Letter or Digital
export const isOnlyLetterDigital = (string) => testString(string, `^[0-9a-zA-Z]*$`);
export const isOnlyLetter = (string) => testString(string, `^[a-zA-Z]*$`);
export const isOnlyDigital = (string) => testString(string, `^[0-9]*$`);


// string starts/ends with ...
export const isStartWithLetter = (string) => testString(string, `^[a-zA-Z]`);
export const isStartWithUpperLetter = (string) => testString(string, `^[A-Z]`);
export const isStartWith = (string, start) => string.startsWith(start);
export const isEndWith = (string, end) => string.endsWith(end);

// string includes at least one SPECIAL Characters:  !@#$%^&*()-+
export const isIncludeSpecial = (string) => testString(string, `[!@#$%^&*()-+]`);


/**
 *                              =============================
 *                                  string manipulation
 *                              =============================
 *
 * @fist_param string   string      -- the origin string
 *
 * @second_param [option]   string/integer      -- integer is index
 *
 * @returns result  string/list
 *
 */
// string to letter list
// return []
export const transformStringToList = (string) => string.split('');
export const transformStringToListBy = (string, splitChar) => string.split(splitChar);    // splitChar is a string

// erase space
export const eraseSpaceStartEnd = (string) => string.trim();
export const eraseSpace = (string) => string.replace(' ', '');

// get a character by index
export const getCharByIndex = (string, index) => string[index];

// get index of a character in a string
export const getIndex = (string, char) => string.indexOf(char);     // return -1 if not find this char

// get substring
export const getSubstringByIndex = (string, beginIndex, endIndex=null) => {
    if (endIndex) return string.slice(beginIndex);
    return string.slice(beginIndex, endIndex);
}

// replace a specific substring
export const replaceSubstring = (string, oldSub, newSub) => string.replace(oldSub, newSub);
export const replaceSubstringByRegExp = (string, regExp, newSub) => string.replace(regExp, newSub);

// concat strings
export const concatTwoString = (str1, str2) => str1.concat(str2);
export const concatRepeatWithNum = (string, num) => string.repeat(num);

// get integer substring from a string
export const getIntegerSubstringList = (str) => str.match(/\d+/g);   // return [ subStr1, subStr2, ... ]
export const getIntegerSubstring = (str) => str.match(/\d+/)[0];    // return subStr1

// integer string (no +/- at beginning) --> integer
export const stringToInteger = (str) => parseInt(str);

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(String(email));
