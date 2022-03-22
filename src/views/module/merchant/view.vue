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
              <span v-if="dataForm">
                {{ dataForm.realname }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.mobile')" prop="mobile">
              <span v-if="dataForm">
                {{ dataForm.mobile }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.people_certificate_no')" prop="certificate_no">
              <span v-if="dataForm">
                {{ dataForm.certificate_no }}
              </span>
            </el-form-item>

          </div>
          <div v-else-if="dataForm.certification_type == 2">
            <el-form-item :label="$t('merchant.certification.card_realname')" prop="realname">
              <span v-if="dataForm">
                {{ dataForm.realname }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.card_mobile')" prop="mobile">
              <span v-if="dataForm">
                {{ dataForm.mobile }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.bank_card_no')" prop="bank_card_no">
              <span v-if="dataForm">
                {{ dataForm.bank_card_no }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.card_certificate_no')" prop="certificate_no">
              <span v-if="dataForm">
                {{ dataForm.certificate_no }}
              </span>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item :label="$t('merchant.certification.company_realname')" prop="realname">
              <span v-if="dataForm">
                {{ dataForm.realname }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.mobile')" prop="mobile">
              <span v-if="dataForm">
                {{ dataForm.mobile }}
              </span>
            </el-form-item>

            <el-form-item :label="$t('merchant.certification.company_certificate_no')">
              <span v-if="dataForm">
                {{ dataForm.certificate_no }}
              </span>
            </el-form-item>

            <!-- <el-form-item :label="$t('merchant.certification.picture')">
              <span v-if="dataForm">

                <el-image style="width: 100px;" :src="dataForm.cerificate_front_picture" :preview-src-list="cerificate_front_picture">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>

                <el-image style="width: 100px;" :src="dataForm.cerificate_behind_picture" :preview-src-list="cerificate_behind_picture">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </span>
            </el-form-item> -->
          </div>

          <el-form-item :label="$t('merchant.certification.audit_status')">
            <span v-if="dataForm">
              {{ dataForm.audit_status }}
            </span>
          </el-form-item>

          <el-form-item :label="$t('merchant.certification.audit_content')">
            <span v-if="dataForm">
              {{ dataForm.audit_content }}
            </span>
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
        cerificate_front_picture: [],
        cerificate_behind_picture: [],
        dataForm:
        {
          id: 0,
          realname: '',
          mobile: '',
          certificate_type: '',
          certificate_no: '',
          bank_card_no: '',
          cerificate_front_picture: '',
          cerificate_behind_picture: '',
          certification_type: '',
          audit_status: '',
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
                  this.dataForm.certification_type           = data.data.certification.type.value
                  this.dataForm.realname           = data.data.certification.realname
                  this.dataForm.mobile             = data.data.certification.mobile
                  this.dataForm.certificate_type   = data.data.certification.certificate_type.value
                  this.dataForm.certificate_no     = data.data.certification.certificate_no
                  this.dataForm.bank_card_no       = data.data.certification.bank_card_no
                  this.dataForm.cerificate_behind_picture       = data.data.certification.cerificate_behind_picture
                  this.dataForm.cerificate_front_picture       = data.data.certification.cerificate_front_picture
                  this.dataForm_type = data.data.certification.type.value
                  this.dataForm.audit_status       = data.data.certification.audit_status.text
                  this.dataForm.audit_content      = data.data.certification.audit_content

                  this.cerificate_front_picture.push(data.data.certification.cerificate_front_picture);
                  this.cerificate_behind_picture.push(data.data.certification.cerificate_behind_picture);
                }
              }
            })
          }
        })
      }
    },
    created() {
      this.init();
    }
  };
</script>
