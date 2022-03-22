<template>
  <div class="qingwu color">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>控制台</span>
      </div>
      <div class="text item text-center">
        欢迎您，登录本系统。
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
