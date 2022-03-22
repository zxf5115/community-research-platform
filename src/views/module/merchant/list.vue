<template>
  <div class="qingwu">
    <div class="admin_main_block">
      <div class="admin_main_block_top">
        <div class="admin_main_block_right">
          <div>
            <el-button v-if="isAuth('module:merchant:delete')" type="danger" icon="el-icon-delete" @click="deleteHandle()">
              {{ $t('common.batch_delete') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="admin_main_block_top">
        <div class="admin_main_block_left">
          <div>
            <el-input v-model="dataForm.nickname" :placeholder="$t('common.please_input') + $t('merchant.nickname')" clearable>
            </el-input>
          </div>
          <div>
            <el-select v-model="dataForm.certification_type" :placeholder="$t('common.please_select') + $t('merchant.certification_type')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in certificationList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="dataForm.certification_audit_status" :placeholder="$t('common.please_select') + $t('merchant.audit_status')" clearable>
              <el-option :label="$t('common.all')" value=""></el-option>
              <el-option v-for="(v,k) in auditList" :label="v.title" :key="k" :value="v.id"></el-option>
            </el-select>
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

          <el-table-column prop="nickname" :label="$t('merchant.nickname')">
          </el-table-column>

          <el-table-column :label="$t('merchant.certification_type')">
            <template slot-scope="scope" v-if="scope.row.certification">
              {{ scope.row.certification.type.text }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('merchant.audit_status')">
            <template slot-scope="scope" v-if="scope.row.certification">
              {{ scope.row.certification.audit_status.text }}
            </template>
          </el-table-column>

          <el-table-column prop="create_time" :label="$t('common.create_time')">
          </el-table-column>

          <el-table-column :label="$t('common.handle')" fixed="right" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.certification">
                <el-button v-if="isAuth('module:merchant:view') && scope.row.certification && scope.row.certification.audit_status.value != 0" type="info" icon="el-icon-view" @click="$router.push({name: 'module_merchant_view', query: {id: scope.row.id}})">
                  {{ $t('common.view') }}
                </el-button>

                <el-button v-if="isAuth('module:merchant:enable') && scope.row.certification && scope.row.certification.audit_status.value == 1" :type="scope.row.status.value == 2 ? 'danger' : 'success'" :icon="scope.row.status.value == 1 ? 'el-icon-check' : 'el-icon-close'" @click="enableHandle(scope.row.id, scope.row.status.value)">
                  <span v-if="scope.row.status.value == 1">
                    {{ $t('merchant.enable') }}
                  </span>
                  <span v-else>
                    {{ $t('merchant.disable') }}
                  </span>
                </el-button>

                <el-button v-if="isAuth('module:merchant:delete') && scope.row.certification && scope.row.certification.audit_status.value != 0" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)">
                  {{ $t('common.delete') }}
                </el-button>
              </div>
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
        model: 'merchant',
        auditList: [
          {'id': 0, 'title': '待审核'},
          {'id': 1, 'title': '审核通过'},
          {'id': 2, 'title': '审核不通过'},
        ],
        certificationList: [
          {'id': 1, 'title': '个人认证'},
          {'id': 2, 'title': '银行卡认证'},
          {'id': 3, 'title': '车商认证'},
        ],
        dataForm: [
          'nickname',
          'certification_type',
          'certification_audit_status',
        ],
      };
    },
    methods: {
      // 禁用（解禁）车商账户
      enableHandle (id, status) {
        let message = '您确定要解禁当前车商的资产？'

        if(1 == status)
        {
          message = '您确定要禁用当前车商的资产？'
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
