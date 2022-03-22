export const questionnaire = {
  list: '调查问卷列表',
  from: '操作调查问卷',
  category_info: '信息类别',
  question_info: '调研列项',

  title: '调查问卷标题',
  header: '调查问卷表头',
  footer: '调查问卷表表尾',

  rules: {
    title: {
      require: '调查问卷标题不能为空',
    }
  },


  // 调研评分
  score: {
    list: '调研评分列表',
    from: '调研评分操作',

    title: '指标要求',
    score: '分值区间',
    standard: '评分标准',
    is_auto: '是否自动计算',

    rules: {
      title: {
        require: '指标要求不能为空',
      },
      score: {
        require: '分值区间不能为空',
      },
    },
  },


  // 信息类别
  category: {
    list: '信息类别列表',
    from: '信息类别操作',

    title: '信息类别标题',
    is_red: '是否有红点',

    rules: {
      title: {
        require: '信息类别标题不能为空',
      }
    },
  },


  // 调研列项
  question: {
    list: '调研列项列表',
    from: '调研列项操作',

    parent_id: '上级调研列项标题',
    type: '调研列项类型',
    title: '调研列项标题',
    params: '调研列项参数',
    is_red: '是否有红点',

    rules: {
      title: {
        require: '调研列项标题不能为空',
      }
    },
  },
}
