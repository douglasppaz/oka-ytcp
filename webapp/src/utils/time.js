/**
 * Exemplo:
 *   secondsToStr(15) => 00:15
 *   secondsToStr(75) => 01:15
 * @param seconds
 */
export const secondsToStr = (seconds) => `${(~~(seconds / 60)).padLeft(2)}:${(seconds % 60).padLeft(2)}`;
