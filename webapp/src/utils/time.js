/**
 * Exemplo:
 *   secondsToStr(15) => 00:15
 *   secondsToStr(75) => 01:15
 * @param seconds
 */
export const secondsToStr = (seconds) => `${(~~(seconds / 60)).padLeft(2)}:${(seconds % 60).padLeft(2)}`;

/**
 * Exemplo:
 *   ytDurationParse('1:20') => 01:20
 *   ytDurationParse('1:2') => 01:02
 * @param value
 */
export const ytDurationParse = value => value
  .split(':')
  .map(v => parseInt(v).padLeft(2))
  .join(':');
