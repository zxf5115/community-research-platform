<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <router-link :to="{name: 'module_house_view'}">
              <el-button v-if="isAuth('module:house:view')" type="success" icon="el-icon-plus">
                {{ $t('house.house_import') }}
              </el-button>
            </router-link>
          </div>
          <div>
            <router-link :to="{name: 'module_house_company_view'}">
              <el-button v-if="isAuth('module:house:company:view')" type="success" icon="el-icon-plus">
                {{ $t('house.company_import') }}
              </el-button>
            </router-link>
          </div>
          <div>
            <router-link :to="{name: 'module_house_level_view'}">
              <el-button v-if="isAuth('module:house:level:view')" type="success" icon="el-icon-plus">
                {{ $t('house.level_import') }}
              </el-button>
            </router-link>
          </div>
        </div>
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:house:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.code" :placeholder="$t('common.please_input') + $t('house.code')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.title" :placeholder="$t('common.please_input') + $t('house.title')" clearable>
            </el-input>
          </div>
          <div>
            <el-button icon="el-icon-search" @click="getDataList(true)">
              {{ $t('common.search') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_table_main">
        <el-table :data="dataList" v-loading="dataListLoading" @selection-change="selectionChangeHandle">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>

          <el-table-column prop="id" :label="$t('common.id')" width="70">
          </el-table-column>

          <el-table-column prop="code" :label="$t('house.code')" width="100">
          </el-table-column>

          <el-table-column prop="title" :label="$t('house.title')">
          </el-table-column>

          <el-table-column prop="street" :label="$t('house.street')">
          </el-table-column>

          <el-table-column prop="address" :label="$t('house.address')">
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')" width="140">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="480">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:house:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_house_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:inviter:list')" type="success" icon="el-icon-user" @click="$router.push({name: 'module_inviter_list', query: {inviter_id: scope.row.id}})">
                {{ $t('house.inviter') }}
              </el-button>

              <el-button v-if="isAuth('module:house:business:form')" icon="el-icon-s-claim" @click="$router.push({name: 'module_house_business_form', query: {id: scope.row.id}})">
                {{ $t('house.business_info') }}
              </el-button>

              <el-button v-if="isAuth('module:house:level:form')" icon="el-icon-s-data" @click="$router.push({name: 'module_house_level_form', query: {id: scope.row.id}})">
                {{ $t('house.level_info') }}
              </el-button>

              <el-button v-if="isAuth('module:house:score:form')" icon="el-icon-s-order" @click="$router.push({name: 'module_house_score_form', query: {id: scope.row.id}})">
                {{ $t('house.score_info') }}
              </el-button>

              <el-button v-if="isAuth('module:house:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="admin_table_main_pagination">
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :page-sizes="[10, 50, 100, 500]"
            :page-size="pageSize"
            :total="totalPage"
            :current-page="pageIndex"
            background layout="prev, pager, next, jumper, total, sizes">
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
        model: 'house',
        dataForm: [
          'code',
          'title',
        ],
      };
    },
    created() {
      this.getDataList()
    }
  };
</script>
