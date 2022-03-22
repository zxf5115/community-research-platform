<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_questionnaire_category_form', query: {questionnaire_id: dataForm.questionnaire_id}}">
              <el-button v-if="isAuth('module:questionnaire:category:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:questionnaire:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.push({name: 'module_questionnaire_list'})">
              {{ $t('common.return') }}
            </el-button>
          </div>
        </div>
      </div>

      <div class="admin_table_main color">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">

          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" label="#" width="70px">
          </el-table-column>

          <el-table-column :label="$t('questionnaire.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.questionnaire">
                {{ scope.row.questionnaire.title }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('questionnaire.category.title')">
          </el-table-column>

          <el-table-column :label="$t('questionnaire.category.is_red')" width="80">
            <template slot-scope="scope">
              <span :class="1 == scope.row.is_red.value ? 'red' : ''">
                {{ scope.row.is_red.text }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="sort" :label="$t('common.sort')" width="80">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="320">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:questionnaire:category:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_questionnaire_category_form', query: {id : scope.row.id, questionnaire_id: dataForm.questionnaire_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:questionnaire:question:list')" icon="el-icon-price-tag" @click="$router.push({name: 'module_questionnaire_question_list', query: {questionnaire_id: dataForm.questionnaire_id, category_id: scope.row.id}})">
                {{ $t('questionnaire.question_info') }}
              </el-button>

              <el-button v-if="isAuth('module:questionnaire:category:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
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
        model: 'questionnaire/category',
        dataForm: [
          'questionnaire_id'
        ]
      };
    },
    created() {
      this.dataForm.questionnaire_id = this.$route.query.questionnaire_id;

      this.getDataList()
    }
  };
</script>
