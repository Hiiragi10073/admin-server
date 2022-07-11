function isDef(e) {
  return e !== null && e !== undefined;
}

function isUndef() {
  return e === null || e === undefined;
}

module.exports = {
  isDef,
  isUndef
};
