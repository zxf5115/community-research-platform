<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <span v-if="dataForm.certification_type == 1">
              {{ $t('merchant.people') }}
            </span>
            <span v-else-if="dataForm.certification_type == 2">
              {{ $t('merchant.bank_card') }}
            </span>
            <span v-else>
              {{ $t('merchant.company') }}
            </span>
          </div>
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

          <div v-if="dataForm.certification_type == 1">
            <el-form-item :label="$t('merchant.certification.people_realname')" prop="realname">
              <el-input v-model="dataForm.realname" :placeholder="$t('common.please_input')+$t('merchant.certification.people_realname')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.mobile')" prop="mobile">
              <el-input v-model="dataForm.mobile" :placeholder="$t('common.please_input')+$t('merchant.certification.mobile')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.people_certificate_no')" prop="certificate_no">
              <el-input v-model="dataForm.certificate_no" :placeholder="$t('common.please_input')+$t('merchant.certification.people_certificate_no')"></el-input>
            </el-form-item>

            <el-form-item class="mavon" :label="$t('merchant.certification.picture')" prop="picture">
              <el-upload :action="this.$http.adornUrl('/file/picture')" list-type="picture-card" :headers="upload_headers" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :on-success="handlePictureSuccess" :before-upload="beforePictureUpload" :file-list="pictureList" :limit="2">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </div>
          <div v-else-if="dataForm.certification_type == 2">
            <el-form-item :label="$t('merchant.certification.card_realname')" prop="realname">
              <el-input v-model="dataForm.realname" :placeholder="$t('common.please_input')+$t('merchant.certification.card_realname')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.card_mobile')" prop="mobile">
              <el-input v-model="dataForm.mobile" :placeholder="$t('common.please_input')+$t('merchant.certification.card_mobile')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.bank_card_no')" prop="bank_card_no">
              <el-input v-model="dataForm.bank_card_no" :placeholder="$t('common.please_input')+$t('merchant.certification.bank_card_no')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.card_certificate_no')" prop="certificate_no">
              <el-input v-model="dataForm.certificate_no" :placeholder="$t('common.please_input')+$t('merchant.certification.card_certificate_no')"></el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item :label="$t('merchant.certification.company_realname')" prop="realname">
              <el-input v-model="dataForm.realname" :placeholder="$t('common.please_input')+$t('merchant.certification.company_realname')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.mobile')" prop="mobile">
              <el-input v-model="dataForm.mobile" :placeholder="$t('common.please_input')+$t('merchant.certification.mobile')"></el-input>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.company_certificate_no')" prop="certificate_no">
              <el-input v-model="dataForm.certificate_no" :placeholder="$t('common.please_input')+$t('merchant.certification.company_certificate_no')"></el-input>
            </el-form-item>

            <!-- <el-form-item class="mavon" :label="$t('merchant.certification.picture')" prop="picture">
              <el-upload :action="this.$http.adornUrl('/file/picture')" list-type="picture-card" :headers="upload_headers" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"  :on-success="handlePictureSuccess" :before-upload="beforePictureUpload" :file-list="pictureList" :limit="2">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item> -->
          </div>

          <div v-if="audit_status != 1">
            <el-form-item :label="$t('merchant.certification.audit_status')" prop="audit_status">
              <el-switch v-model="dataForm.audit_status" :active-value="1" :active-text="$t('merchant.audit_pass')" :inactive-value="2" :inactive-text="$t('merchant.audit_unpass')">
              </el-switch>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.audit_content')" prop="audit_content">
              <el-input type="textarea" v-model="dataForm.audit_content" :placeholder="$t('common.please_input')+$t('merchant.certification.audit_content')"></el-input>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button v-if="isAuth('module:merchant:handle')" type="primary" @click="dataFormSubmit()">
              <span v-if="1 == dataForm.audit_status">
                {{ $t('common.confirm') }}
              </span>
              <span v-else>
                {{ $t('common.audit') }}
              </span>
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
        model: 'merchant',
        upload_headers:{},
        dialogImageUrl: '',
        dialogVisible: false,
        pictureList: [],
        certificateList: [
          {'id': '1', 'title': '中华共和国居民身份证'},
          {'id': '2', 'title': '营业执照'},
        ],
        audit_status: 0,
        dataForm:
        {
          id: 0,
          realname: '',
          mobile: '',
          certificate_type: '',
          certificate_no: '',
          bank_card_no: '',
          picture: [],
          certification_type: '',
          audit_status: 1,
          audit_content: '',
        },
        dataRule:
        {
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
              url: this.$http.adornUrl(`/merchant/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {

                if(data.data.certification)
                {
                  this.dataForm.realname           = data.data.certification.realname
                  this.dataForm.mobile             = data.data.certification.mobile
                  this.dataForm.certificate_type   = data.data.certification.certificate_type.value
                  this.dataForm.certificate_no     = data.data.certification.certificate_no
                  this.dataForm.bank_card_no       = data.data.certification.bank_card_no
                  this.dataForm.certification_type = data.data.certification.type.value
                  this.dataForm.audit_status       = data.data.certification.audit_status.value || 1
                  this.dataForm.audit_content      = data.data.certification.audit_content

                  this.audit_status       = data.data.certification.audit_status.value
                }

                if(data.data.pictureData && data.data.pictureData[0])
                {
                  this.dataForm.picture = data.data.pictureData
                  this.pictureList      = data.data.pictureList
                }
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
              url: this.$http.adornUrl(`/merchant/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'certification_type': this.dataForm.certification_type,
                'realname': this.dataForm.realname,
                'mobile': this.dataForm.mobile,
                'certificate_type': this.dataForm.certificate_type,
                'certificate_no': this.dataForm.certificate_no,
                'bank_card_no': this.dataForm.bank_card_no,
                'picture': this.dataForm.picture,
                'audit_status': this.dataForm.audit_status,
                'audit_content': this.dataForm.audit_content,
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureSuccess(res, file) {
        this.dataForm.picture.push(res.data);
      },
      handleRemove(file, fileList) {

        let url = []

        fileList.forEach(res => {
          url.push(res.url);
        });

        this.dataForm.picture = url
      }
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>

<style lang="scss" scoped>
  .mavon {
    width: 95% !important;
  }
</style>
