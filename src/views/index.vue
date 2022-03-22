<template>
  <div class="qingwu color">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>统计</span>
      </div>
      <div class="text item text-center">
        <el-row :gutter="20">
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-user-solid"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    用户总数
                    <span class="blue">
                      {{ statistical.member_total }}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-user"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    新增用户
                    <span class="blue">
                      {{ statistical.today_member_total }}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="default_block_col">
            <el-card shadow="never">
              <el-row>
                <el-col :span="12">
                  <i class="icon el-icon-s-custom"></i>
                </el-col>
                <el-col :span="12">
                  <div class="default_day_sale">
                    车商新增
                    <span class="blue">
                      {{ statistical.merchant_total }}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        statistical: {
          member_total: 0,
          today_member_total: 0,
          merchant_total: 0,
        }
      };
    },
    methods: {

    },
    created(request)
    {

    }
  };
</script>
<style lang="scss" scoped>
  .text-center {
    text-align: center;
  }
  .type {
    float: right;
    padding: 3px 0
  }
  .icon {
    font-size: 36px;
    padding-top: 20px;
  }
  .unline {
    margin: 15px 0;
  }
  .default_block_col {
    margin-bottom: 20px;
  }
  .default_total:after {
    clear: both;
    content: "";
    display: block;
  }
  .default_day_sale {
    margin-top: 30px;
    margin-bottom: 45px;
  }
  .el-button--mini, .el-button--small {
    font-size: 15px;
  }
</style>
