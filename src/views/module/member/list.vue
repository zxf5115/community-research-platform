<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:member:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('member.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-input v-model="dataForm.address_address" :placeholder="$t('common.please_input') + $t('member.address_info')" clearable>
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

          <el-table-column prop="nickname" :label="$t('member.nickname')">
          </el-table-column>

          <el-table-column :label="$t('member.archive.sex')">
            <template slot-scope="scope" v-if="scope.row.archive">
              {{ scope.row.archive.sex.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('member.address_info')">
            <template slot-scope="scope" v-if="scope.row.address">
              {{ scope.row.address.address }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="560">
            <template slot-scope="scope">
              <el-button v-if="isAuth('module:member:view')" type="info" icon="el-icon-view" @click="$router.push({name: 'module_member_view', query: {id: scope.row.id}})">
                {{ $t('common.view') }}
              </el-button>

              <el-button v-if="isAuth('module:member:form')" type="primary" icon="el-icon-edit" @click="$router.push({name: 'module_member_form', query: {id: scope.row.id}})">
                {{ $t('common.update') }}
              </el-button>

              <el-button v-if="isAuth('module:merchant:form') && scope.row.certification && 0 == scope.row.certification.audit_status.value" :type="1 == scope.row.certification.audit_status.value ? 'primary' : 'warning'" icon="el-icon-edit" @click="$router.push({name: 'module_merchant_form', query: {id: scope.row.id}})">
                {{ $t('common.audit') }}
              </el-button>

              <el-button v-if="isAuth('module:member:enable')" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                <span v-if="scope.row.status.value == 1">
                  {{ $t('member.enable') }}
                </span>
                <span v-else>
                  {{ $t('member.disable') }}
                </span>
              </el-button>

              <el-button v-if="isAuth('module:inviter:list')" type="success" icon="el-icon-user" @click="$router.push({name: 'module_inviter_list', query: {inviter_id: scope.row.id}})">
                {{ $t('member.inviter') }}
              </el-button>

              <el-button v-if="isAuth('module:member:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
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
        model: 'member',
        dataForm: [
          'username',
          'nickname',
          'address_address',
        ],
      };
    },
    methods: {
      // 禁用（解禁）消费者账户
      enableHandle (id, status) {
        let message = '您确定要解禁当前消费者的资产？'

        if(1 == status)
        {
          message = '您确定要禁用当前消费者的资产？'
        }

        this.$confirm(message, this.$t('common.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/'+this.model+'/enable'),
            method: 'post',
            data: {id: id}
          }).then(({data}) => {
            if (data && data.status === 200) {
              this.$message({
                message: this.$t('common.handle_success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(this.$t(data.message))
            }
          })
        }).catch(() => {})
      }
    },
    created() {
      this.getDataList()
    }
  };
</script>
