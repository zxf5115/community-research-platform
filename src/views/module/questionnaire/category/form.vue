<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('questionnaire.category.from') }}</div>
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
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('questionnaire.category.title')" prop="title">
            <el-input :placeholder="$t('questionnaire.category.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.category.is_red')" prop="is_red">
            <el-radio-group v-model="dataForm.is_red">
              <el-radio-button v-for="(v,k) in redList" :key="k" :label="v.value">
                {{ v.title }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:questionnaire:category:handle')" type="primary" @click="dataFormSubmit()">
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
        model: 'questionnaire/category',
        courseList: [],
        redList: [
          {'title': '是', 'value': 1},
          {'title': '否', 'value': 0},
        ],
        dataForm:
        {
          id: 0,
          questionnaire_id: 0,
          title: '',
          is_red: 0,
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('questionnaire.category.rules.title.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/questionnaire/category/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.questionnaire_id = data.data.questionnaire_id
                this.dataForm.title = data.data.title
                this.dataForm.is_red = data.data.is_red.value
                this.dataForm.sort = data.data.sort
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {console.log(1);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/questionnaire/category/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'questionnaire_id': this.dataForm.questionnaire_id,
                'title': this.dataForm.title,
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
      }
    },
    created(request)
    {
      this.init();

      this.dataForm.questionnaire_id = this.$route.query.questionnaire_id;
    }
  };
</script>
