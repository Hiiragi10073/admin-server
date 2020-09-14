function unFlatArray(arr) {

  arr.forEach(item => item.children = []);

  const newArr = arr.filter((item) => item.level === 1);

  function loopArr(item, arr) {
    if (arr && arr.length) {
      arr.some(data => {
        if (data.id === item['father-menu']) {
          data.children.push(item);
          return true;
        } else if (data.children.length) {
          loopArr(item, arr.children)
        } else {
          return false;
        }
      })
    }
  }

  function selectArr(arr, level) {
    const levelArr = arr.filter(item => item.level === level);

    if (!levelArr.length) return;

    levelArr.forEach(item => {
      loopArr(item, newArr);
    })

    selectArr(arr, level + 1);
  }



  selectArr(arr, 2);

  return newArr;
}

module.exports.unFlatArray = unFlatArray;