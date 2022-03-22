<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <!-- <router-link :to="{name: 'module_questionnaire_form'}">
              <el-button v-if="isAuth('module:questionnaire:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link> -->
          </div>
        </div>
      </div>

      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#" width="70">
          </el-table-column>

          <el-table-column prop="title" :label="$t('questionnaire.title')">
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')" width="80">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="220">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:questionnaire:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_questionnaire_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:questionnaire:category:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_questionnaire_category_list', query: {questionnaire_id: scope.row.id}})">
                {{ $t('questionnaire.category_info') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next,jumper,total">
          </el-pagination>
        </div>
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
        dataForm: []
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
