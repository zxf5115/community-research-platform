export const house = {
  list: '楼宇列表',
  from: '楼宇编辑',
  house_import: '楼宇导入',
  company_import: '企业导入',
  level_import: '等级评估导入',
  question_info: '调研列项',
  business_info: '商务',
  level_info: '等级',
  score_info: '评分',

  code: '楼宇序号',
  title: '楼宇名称',
  address: '楼宇地址',
  street: '楼宇街道',

  rules: {
    code: {
      require: '楼宇序号不能为空',
    },
    title: {
      require: '楼宇名称不能为空',
    },
  },

  business: {
    from: '商务楼宇调研编辑',
  },

  level: {
    from: '楼宇等级调研编辑',
  },

  level: {
    from: '楼宇调研评分编辑',
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
