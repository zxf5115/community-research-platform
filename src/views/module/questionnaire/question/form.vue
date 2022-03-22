<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('questionnaire.question.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form label-width="140px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('questionnaire.question.parent_id')" prop="parent_id">
            <el-select v-model="dataForm.parent_id" :placeholder="$t('common.please_select')+$t('questionnaire.question.parent_id')">
              <el-option v-for="(v,k) in parentList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.question.type')" prop="type">
            <el-radio-group v-model="dataForm.type">
              <el-radio-button v-for="(v,k) in typeList" :key="k" :label="v.value">
                {{ v.title }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.question.title')" prop="title">
            <el-input type="textarea" :placeholder="$t('questionnaire.question.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.question.params')" prop="params">
            <el-input type="textarea" :placeholder="$t('questionnaire.question.title')" v-model="dataForm.params"></el-input>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.question.is_red')" prop="is_red">
            <el-radio-group v-model="dataForm.is_red">
              <el-radio-button v-for="(v,k) in dataList" :key="k" :label="v.value">
                {{ v.title }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:questionnaire:question:handle')" type="primary" @click="dataFormSubmit()">
              {{ $t('common.confirm') }}
            </el-button>
            <el-button @click="resetForm()">
              {{ $t('common.reset') }}
            </el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import common from '@/views/common/base'
  export default
  {
    extends: common,
    data()
    {
      return {
        model: 'questionnaire/question',
        parentList: [],
        dataList: [
          {'title': '是', 'value': 1},
          {'title': '否', 'value': 0},
        ],
        typeList: [
          {'title': '填空', 'value': 1},
          {'title': '单选', 'value': 2},
          {'title': '多选', 'value': 3},
          {'title': '选填', 'value': 4},
          {'title': '标题', 'value': 5},
          {'title': '三项', 'value': 6},
        ],
        dataForm:
        {
          id: 0,
          questionnaire_id: 0,
          question_id: 0,
          parent_id: '',
          type: 1,
          title: '',
          params: '',
          is_red: 0,
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('questionnaire.question.rules.title.require'), trigger: 'blur' },
          ]
        }
      };
    },
    methods:
    {
      init ()
      {
        let id = this.$route.query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/questionnaire/question/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.questionnaire_id = data.data.questionnaire_id
                this.dataForm.question_id = data.data.category_id
                this.dataForm.parent_id = data.data.parent_id
                this.dataForm.type = data.data.type.value
                this.dataForm.title = data.data.title
                this.dataForm.params = data.data.params
                this.dataForm.is_red = data.data.is_red.value
                this.dataForm.sort = data.data.sort
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/questionnaire/question/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'questionnaire_id': this.dataForm.questionnaire_id,
                'category_id': this.dataForm.category_id,
                'parent_id': this.dataForm.parent_id,
                'type': this.dataForm.type,
                'title': this.dataForm.title,
                'params': this.dataForm.params,
                'is_red': this.dataForm.is_red,
                'sort': this.dataForm.sort,
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
      resetForm:function()
      {
        this.$refs['dataForm'].resetFields();
      },
      loadParentList () {
        this.$http({
          url: this.$http.adornUrl('/questionnaire/question/select'),
          method: 'get',
          params: this.$http.adornParams({
            'questionnaire_id': this.dataForm.questionnaire_id,
            'category_id': this.dataForm.category_id,
            'parent_id': 0
          })
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.parentList = data.data
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      },
    },
    created(request)
    {
      this.dataForm.questionnaire_id = this.$route.query.questionnaire_id;

      this.dataForm.category_id = this.$route.query.category_id;

      this.init();

      this.loadParentList();
    }
  };
</script>
