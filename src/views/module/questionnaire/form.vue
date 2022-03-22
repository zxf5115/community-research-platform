<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('questionnaire.from') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div>
            <el-button icon="el-icon-back" @click="$router.go(-1)">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main color">
        <el-form label-width="120px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-form-item :label="$t('questionnaire.title')" prop="title">
            <el-input :placeholder="$t('common.please_input')+$t('questionnaire.title')" v-model="dataForm.title"></el-input>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.header')" prop="header">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('questionnaire.header')" v-model="dataForm.header"></el-input>
          </el-form-item>

          <el-form-item :label="$t('questionnaire.footer')" prop="footer">
            <el-input type="textarea" :placeholder="$t('common.please_input')+$t('questionnaire.footer')" v-model="dataForm.footer"></el-input>
          </el-form-item>

          <el-form-item :label="$t('common.sort')" prop="sort">
            <el-input-number :placeholder="$t('common.please_input')+$t('common.sort')" v-model="dataForm.sort"></el-input-number>
          </el-form-item>

          <el-form-item>
            <el-button v-if="isAuth('module:questionnaire:handle')" type="primary" @click="dataFormSubmit()">
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
  export default {
    extends: common,
    data() {
      return {
        model: 'questionnaire',
        dataForm:
        {
          id: 0,
          title: '',
          header: '',
          footer: '',
          sort: 0,
        },
        dataRule:
        {
          title: [
            { required: true, message: this.$t('questionnaire.rules.title.require'), trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/questionnaire/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.title = data.data.title
                this.dataForm.header = data.data.header
                this.dataForm.footer = data.data.footer
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
              url: this.$http.adornUrl(`/questionnaire/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'title': this.dataForm.title,
                'header': this.dataForm.header,
                'footer': this.dataForm.footer,
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
    },
    created() {
      this.init();
    }
  };
</script>
