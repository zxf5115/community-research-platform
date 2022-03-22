<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>{{ $t('member.archive_info') }}</div>
        </div>

        <div class="admin_main_block_right">
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_member_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_form_main">
        <el-form :model="dataForm" label-position="right" label-width="140px">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.user_info') }}</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="6">
                  <el-avatar :size="120" :src="dataForm.avatar">
                    <img src="@/assets/images/default/circle.png"/>
                  </el-avatar>
                </el-col>
                <el-col :span="18">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('member.nickname')">
                        {{ dataForm.nickname }}
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
          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.address_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('member.address.name')">
                <span v-if="dataForm.address">
                  {{ dataForm.address.name  }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.address.mobile')">
                <span v-if="dataForm.address">
                  {{ dataForm.address.mobile }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.archive.area')">
                <span v-if="dataForm.address">
                  {{ dataForm.address.province_id || '' }} {{ dataForm.address.city_id || '' }} {{ dataForm.address.region_id || '' }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.address.address')">
                <span v-if="dataForm.address">
                  {{ dataForm.address.address  || '' }}
                </span>
              </el-form-item>
            </div>
          </el-card>
          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.personal_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('member.archive.realname')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.realname  }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.archive.certificate_no')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.certificate_no }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.archive.phone')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.phone }}
                </span>
              </el-form-item>
            </div>
          </el-card>
          <el-card class="box-card mt10" shadow="never">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.bank_info') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('member.archive.account')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.account  }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.archive.bank_card_no')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.bank_card_no }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.archive.id_card_no')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.id_card_no }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.archive.mobile')">
                <span v-if="dataForm.archive">
                  {{ dataForm.archive.mobile }}
                </span>
              </el-form-item>
            </div>
          </el-card>
          <!-- <el-card class="box-card mt10">
            <div slot="header" class="clearfix">
              <span>{{ $t('member.wallet') }}</span>
            </div>
            <div class="text item">
              <el-form-item :label="$t('member.asset.cash_money')">
                <span v-if="dataForm.asset">
                  {{ dataForm.asset.cash_money || '0.00' }}
                </span>
              </el-form-item>

              <el-form-item :label="$t('member.asset.credit_money')">
                <span v-if="dataForm.asset">
                  {{ dataForm.asset.credit_money || '0.00' }}
                </span>
              </el-form-item>
            </div>
          </el-card> -->
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
        model: 'member',
        dataForm:
        {
          id: 0
        },
        dataRule: {}
      };
    },
    methods:
    {
      init ()
      {
        let query = this.$route.query
        let id = query.id

        this.dataForm.id = id || 0
        this.$nextTick(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/member/view/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.status === 200) {
                this.dataForm   = data.data
              }
            })
          }
        })
      }
    },
    created(request)
    {
      this.init();
    }
  };
</script>


<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .vertical >>> .el-form-item__label {
    float: none;
  }
</style>
