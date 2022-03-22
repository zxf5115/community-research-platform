<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_questionnaire_question_form', query: {questionnaire_id: dataForm.questionnaire_id, category_id: dataForm.category_id}}">
              <el-button v-if="isAuth('module:questionnaire:question:form')" type="success" icon="el-icon-plus">
                {{ $t('common.create') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:questionnaire:question:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
          <div class="mr10">
            <el-button icon="el-icon-back" @click="$router.go(-1)">
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

          <el-table-column :label="$t('questionnaire.category.title')">
            <template slot-scope="scope">
              <span v-if="scope.row.category">
                {{ scope.row.category.title }}
              </span>
              <span v-else>
                {{ $t('common.empty') }}
              </span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('questionnaire.question.type')" width="100">
            <template slot-scope="scope">
              {{ scope.row.type.text }}
            </template>
          </el-table-column>

          <el-table-column prop="title" :label="$t('questionnaire.question.title')">
          </el-table-column>

          <el-table-column :label="$t('questionnaire.question.is_red')" width="80">
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

          <el-table-column :label="$t('common.handle')" fixed="right" width="200">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:questionnaire:question:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_questionnaire_question_form', query: {id : scope.row.id, questionnaire_id: dataForm.questionnaire_id, category_id: dataForm.category_id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:questionnaire:question:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'questionnaire/question',
        dataForm: [
          'questionnaire_id',
          'category_id',
        ]
      };
    },
    created() {
      this.dataForm.questionnaire_id = this.$route.query.questionnaire_id;
      this.dataForm.category_id = this.$route.query.category_id;

      this.getDataList()
    }
  };
</script>
