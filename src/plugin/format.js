function nround(n, precision) {
  var prec = Math.pow(10, precision);
  return Math.round(n * prec) / prec;
}

function format(n) {
  if (n == "") return "";
  var abbrev = "kmb";
  var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
  var suffix = abbrev[Math.min(2, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? nround(n / Math.pow(1000, base), 2) + suffix : "" + n;
}

export default format;
