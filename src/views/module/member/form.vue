<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.from') }}</div>
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
        <el-form label-width="100px" ref="dataForm" :model="dataForm" :rules="dataRule">

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.user_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('member.avatar')" prop="avatar">
                    <el-upload class="avatar-uploader" :action="this.$http.adornUrl('/file/picture')" :show-file-list="false" :headers="upload_headers" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                      <img v-if="dataForm.avatar" :src="dataForm.avatar" class="avatar-upload">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('member.nickname')" prop="nickname">
                        <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('member.nickname')"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('common.create_time')">
                        {{ dataForm.create_time }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card mt10">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.address_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('member.address.name')" prop="name">
                <el-input v-model="dataForm.name" :placeholder="$t('common.please_input') + $t('member.address.name')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('member.address.mobile')" prop="mobile">
                <el-input v-model="dataForm.mobile" :placeholder="$t('common.please_input') + $t('member.address.mobile')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('common.province')" prop="province_id">
                <el-input v-model="dataForm.province_id" :placeholder="$t('common.please_input') + $t('common.province')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('common.city')" prop="city_id">
                <el-input v-model="dataForm.city_id" :placeholder="$t('common.please_input') + $t('common.city')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('common.region')" prop="region_id">
                <el-input v-model="dataForm.region_id" :placeholder="$t('common.please_input') + $t('common.region')"></el-input>
              </el-form-item>

              <el-form-item :label="$t('member.address.address')" prop="address">
                <el-input type="textarea" v-model="dataForm.address" :placeholder="$t('common.please_input') + $t('member.address.address')"></el-input>
              </el-form-item>
            </div>
          </el-card>

          <!-- <el-card class="box-card mt10">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.wallet') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('member.asset.cash_money')">
                {{ dataForm.cash_money }}
              </el-form-item>

              <el-form-item :label="$t('member.asset.credit_money')">
                {{ dataForm.credit_money }}
              </el-form-item>
            </div>
          </el-card> -->

          <el-form-item class="mt10 text-center">
            <el-button v-if="isAuth('module:member:handle')" type="primary" @click="dataFormSubmit()">
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
  import formArea from '@/views/common/component/form-area'
  export default {
    extends: common,
    components: {
      formArea
    },
    data() {
      return {
        model: 'member',
        upload_headers:{},
        dataForm:
        {
          id: 0,
          avatar: '',
          username: '',
          nickname: '',
          name: '',
          mobile: '',
          postcode: '',
          province_id : '',
          city_id : '',
          region_id : '',
          address: '',
          create_time: '',

          cash_money: '0.00',
          credit_money: '0.00',
        },
        dataRule:
        {
          username: [
            { required: true, message: this.$t('user.rules.username.require'), trigger: 'blur' },
          ],
          nickname: [
            { required: true, message: this.$t('user.rules.nickname.require'), trigger: 'blur' },
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
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm.avatar      = data.data.avatar
                this.dataForm.username    = data.data.username
                this.dataForm.nickname    = data.data.nickname
                this.dataForm.email       = data.data.email
                this.dataForm.mobile      = data.data.mobile
                this.dataForm.status      = data.data.status.value + ''
                this.dataForm.create_time = data.data.create_time

                if(data.data.address)
                {
                  this.dataForm.name        = data.data.address.name
                  this.dataForm.mobile      = data.data.address.mobile
                  this.dataForm.postcode    = data.data.address.postcode
                  this.dataForm.province_id = data.data.address.province_id
                  this.dataForm.city_id     = data.data.address.city_id
                  this.dataForm.region_id   = data.data.address.region_id
                  this.dataForm.address     = data.data.address.address
                }

                if(data.data.asset)
                {
                  this.dataForm.cash_money   = data.data.asset.cash_money
                  this.dataForm.credit_money = data.data.asset.credit_money
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
              url: this.$http.adornUrl(`/member/handle`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'avatar': this.dataForm.avatar,
                'nickname': this.dataForm.nickname,
                'name': this.dataForm.name,
                'mobile': this.dataForm.mobile,
                'postcode': this.dataForm.postcode,
                'province_id': this.dataForm.province_id,
                'city_id': this.dataForm.city_id,
                'region_id': this.dataForm.region_id,
                'address': this.dataForm.address,
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
      handleAvatarSuccess(res, file) {
        this.dataForm.avatar = res.data;
      },
      beforeAvatarUpload(file) {
        const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPicture) {
          var message = this.$t('common.rules.picture.picture_type');
          this.$message.error(this.$t(data.message))
        }
        if (!isLt2M) {
          var message = this.$t('common.rules.picture.picture_size');
          this.$message.error(this.$t(data.message))
        }

        return isPicture && isLt2M;
      },
    },
    created() {
      this.init();

      // 要保证取到
      this.upload_headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
  };
</script>
