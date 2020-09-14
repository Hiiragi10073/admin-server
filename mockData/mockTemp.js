const Mock = require('mockjs');

let tempData = Mock.mock({
  'status': 200,
  'dataSource|9': [
    {
      'key|+1': 1,
      'mockTitle|1': ['肆无忌惮'],
      'mockContent|1': ['xxxx', 'yyyy', 'zzzz'],
      'mockAction|1': ['download', 'love', 'listen'],
    }
  ]
})

module.exports = tempData;