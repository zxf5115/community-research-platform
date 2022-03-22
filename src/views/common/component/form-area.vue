<template>
  <el-form-item :label="$t('common.area')" prop="mobile" class="area">
    <div class="area">
      <div>
        <el-select v-model="province" filterable size="small" value-key="id" @change="selectProvince" placeholder="请选择省份">
          <el-option value="" label="请选择省份"></el-option>
          <el-option :key="index" :value="item.id" :label="item.title" v-for="(item, index) in provinceList"></el-option>
        </el-select>
      </div>

      <div>
        <el-select v-model="city" filterable size="small" value-key="id" @change="selectCity" placeholder="请选择城市">
          <el-option value="" label="请选择城市"></el-option>
          <el-option :key="index" :value="item.id" :label="item.title" v-for="(item, index) in cityList"></el-option>
        </el-select>
      </div>

      <div>
        <el-select v-model="region" filterable size="small" value-key="id" placeholder="请选择区县">
          <el-option value="" label="请选择区县"></el-option>
          <el-option :key="index" :value="item.id" :label="item.title" v-for="(item, index) in areaList"></el-option>
        </el-select>
      </div>
    </div>
  </el-form-item>
</template>

<script>
  export default {
    data () {
      return {
        // 整个省市县数据
        provinceList: [],
        cityList: [],
        areaList: [],

        province: '',
        city: '',
        region: '',
      }
    },
    props: {
      province_id: [String, Number],
      city_id: [String, Number],
      region_id: [String, Number],
    },
    methods: {
      init ()
      {
        this.$http({
          url: this.$http.adornUrl(`/common/area/list`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.provinceList = data.data
          }
        })
      },
      selectProvince (event)
      {
        if (event)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: event
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.city = ''
              this.region = ''

              this.cityList = data.data
            }
          })
        }
        else
        {
          this.city = ''
          this.region = ''

          this.cityList = []
        }
      },
      selectCity (event)
      {
        if (event)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: event
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.region = ''

              this.areaList = data.data
            }
          })
        }
        else
        {
          this.region = ''

          this.areaList = []
        }
      }
    },
    watch: {
      province_id: function(val) {
        this.province = val;
      },
      city_id: function(val) {
        this.city = val;

        if(this.province > 0)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: this.province
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.cityList = data.data
            }
          })
        }
      },
      region_id: function(val) {
        this.region = val;

        if(this.city > 0)
        {
          this.$http({
            url: this.$http.adornUrl(`/common/area/list`),
            method: 'get',
            params: {
              parent_id: this.city
            }
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.areaList = data.data
            }
          })
        }
      },
    },
    created () {
      this.init();
    }
  }
</script>
<style lang="scss" scoped>
  .area {
    div {
      width: 140px;
      display: flex;
      margin-right: 5px;
    }
  }
</style>
