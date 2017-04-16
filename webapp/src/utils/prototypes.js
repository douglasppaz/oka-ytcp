/**
 * Exemplo:
 *   (2).padLeft(4) => '0002'
 * @param n
 * @param str
 */
Number.prototype.padLeft = function (n, str) {
  return new Array(n - String(this).length + 1).join(str || '0') + this;
};
