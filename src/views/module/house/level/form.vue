<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('house.level.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:house:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="0" ref="dataForm" :model="dataForm" :rules="dataRule">

          <table class="gridtable" border>
            <tbody>
              <tr>
                <td>{{ questionnaire.header }}</td>
              </tr>
            </tbody>
          </table>
          <table class="gridtable center" border>
            <tbody>
              <tr>
                <th width="50%">楼宇名称</th>
                <td>{{ record.name}}</td>
              </tr>
            </tbody>
          </table>
          <table class="gridtable" border>
            <thead>
              <tr>
                <th class="w20">信息类别</th>
                <th class="w50" colspan="2">具体列项</th>
                <th>填报内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v,k) in questionList" :key="k">
                <td class="center" v-if="v.show" :rowspan="v.rowspan">
                  {{ v.category.title }}
                </td>

                <td class="center" v-if="0 != v.parent_id && v.show2" :colspan="0 != v.parent_id ? 1 : 2" :rowspan="v.rowspan2">
                  {{ v.parent.title }}
                </td>

                <td :colspan="0 != v.parent_id ? 1 : 2">
                  {{ v.title }}
                </td>

                <td>
                  <el-form-item prop="name">

                    <el-input v-if="1 == v.type.value" v-model="dataForm.result[v.id]" :placeholder="$t('common.please_input')"></el-input>

                    <el-select v-if="2 == v.type.value" v-model="dataForm.result[v.id]" :placeholder="$t('common.please_select')">
                      <el-option v-for="(vv,kk) in v.params" :key="kk" :label="vv" :value="vv">{{vv}}
                      </el-option>
                    </el-select>

                    <el-select v-if="3 == v.type.value" v-model="dataForm.result[v.id]" multiple collapse-tags :placeholder="$t('common.please_select')">
                      <el-option v-for="(vv,kk) in v.params" :key="kk" :label="vv" :value="vv">
                      </el-option>
                    </el-select>

                    <el-select v-if="4 == v.type.value" :class="display ? 'display' : ''" v-model="dataForm.result[v.id]" :placeholder="$t('common.please_select')" @change="handleWrite">
                      <el-option v-for="(vv,kk) in v.params" :key="kk" :label="vv" :value="vv">
                      </el-option>
                    </el-select>

                    <el-input v-if="4 == v.type.value" :class="display ? '' : 'display'" v-model="dataForm.result[v.id]" :placeholder="$t('common.please_input')"></el-input>

                    <el-select v-if="6 == v.type.value" v-model="dataForm.result[v.id]"  multiple :multiple-limit="3" :placeholder="$t('common.please_select')">
                      <el-option v-for="(vv,kk) in v.params" :key="kk" :label="vv" :value="vv">
                      </el-option>
                    </el-select>

                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>

          <el-form-item class="mt10">
            <el-button v-if="isAuth('module:house:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  import formArea from '@/views/common/component/form-area'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'house',
        display: false,
        questionnaire: [],
        questionList: [],
        record: {
          name: '',
        },
        dataForm:
        {
          id: 0,
          result: []
        },
        dataRule:{}
      };
    },
    methods: {
      init ()
      {
        let id = this.$route.query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/house/level/result/select`),
              method: 'get',
              params: this.$http.adornParams({
                'house_id': this.dataForm.id
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                data.data.forEach(item => {
                  this.$set(this.dataForm.result, item.question_id, item.result);
                });
              }
            })
          }
        })
      },
      loadQuestionList () {
        this.$http({
          url: this.$http.adornUrl('/questionnaire/question/select'),
          method: 'get',
          params: this.$http.adornParams({
            'questionnaire_id': 4
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.questionList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadRecordList () {
        this.$http({
          url: this.$http.adornUrl(`/house/level/record/data`),
          method: 'get',
          params: this.$http.adornParams({
            'house_id': this.dataForm.id
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.record.name = data.data.name
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      loadQuestionnaireList () {
        this.$http({
          url: this.$http.adornUrl('/questionnaire/view/4'),
          method: 'get',
          params: this.$http.adornParams({})
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.questionnaire = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/house/level/result/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'result': this.dataForm.result
              })
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.$message.success(this.$t('common.handle_success'));
                this.$router.go(-1);
              } else {
                this.$message.error(this.$t(data.message))
              }
            })
          }
        })
      },
      handleWrite(value) {
        if(value.indexOf("()") !== -1 || value.indexOf("（）") !== -1)
        {
          this.display = true;
        }
        else
        {
          this.display = false;
        }
      }
    },
    created() {
      this.init();

      this.loadQuestionnaireList();

      this.loadRecordList();

      this.loadQuestionList();
    }
  };
</script>

<style lang="scss" scoped>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 0;
  }
  .w20{
    width: 20%;
  }
  .w50{
    width: 50%;
  }
  .center{
    text-align: center;
  }
  .gridtable{
    border-collapse:collapse;
    width: 100%;
    thead>tr{
      background:#5B9BD5;
      height: 40px;
      line-height: 40px
    }
    th,td {
      border: 1px solid #dfe6ec;
      font-size: 14px;
      font-weight: normal;
    }
    tbody>tr{
      height: 50px;
      line-height: 50px;
      &:hover{
        background:#eef1f6;
      }
      td{
        padding:0 10px;
      }

    }

  }
</style>
