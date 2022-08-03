<!--单位管理-收集企业列表 详情-->
<template>
  <div class="detail_content">
    <MyBread :titleList="titleList"></MyBread>
    <div class="group_cell">
      <triggerBar
        title="基本信息"
        type="checkBtn"
        editIcon="el-icon-edit-outline"
        saveIcon="el-icon-document-add"
        :iconStatus="checkBaseMsgStatus"
        @handIconClick="checkIconStatus"
      ></triggerBar>
      <el-form :model="formValue" label-width="100px" size="mini">
        <div class="basic_msg_from">
          <div v-for="(cell, idx) of formModel" :key="idx">
            <editableItems
              :formModel="cell"
              :formValue="formValue"
              @addressSelect="addressSelect"
              @uploadPicChange="uploadPicChange"
            ></editableItems>
          </div>
        </div>
      </el-form>
    </div>
    <div class="group_cell">
      <triggerBar title="载具信息" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData"
        :pageNum="pageNum" :pageSize="pageSize"
        :tableConfig="carrierInformationTable"
      >
        <template #data_licensePictures="{ data }">
          <div class="pic_cell">
            <img
              v-if="data.licensePictures"
              @click="openDialog('openPic', data)"
              :src="data.licensePictures"
              class="pic"
              alt=""
            />
            <span v-else>无</span>
          </div>
        </template>
      </MyTable>
      <MyPagination
        v-model="pageNum"
        :size="pageSize"
        :total="total"
        @pageChange="getCarrierInformationList"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell">
      <triggerBar title="污染物入仓记录" type="text"></triggerBar>
      <MyTable
        ref="intoTable"
        isExpand="expandEnd"
        :isIndexBoo="true"
        :data="tableData2"
        :pageNum="pageNum2" :pageSize="pageSize2"
        :tableConfig="pollutantIntoTable"
      >
        <template #data_Operate="{ data }">
          <el-button type="text" @click="toggleExpand(data)">
            {{ data.ability }}
          </el-button>
        </template>
        <template #expandEnd>
          <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <el-table :data="props.row.tableData">
                <el-table-column type="index" label="序号" width="60px">
                </el-table-column>
                <el-table-column label="联单编号" prop="recordNo">
                </el-table-column>
                <el-table-column align="center" label="船名" prop="shipName">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="收集企业"
                  prop="collectionCompanyName"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="收集员"
                  prop="collectionUserName"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="污染物种类"
                  prop="wasteTypeStr"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="污染物数量(kg)"
                  prop="wasteWeight"
                >
                </el-table-column>
                <el-table-column align="center" label="地点" prop="workAddress">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="开始时间"
                  prop="startTime"
                >
                </el-table-column>
                <el-table-column align="center" label="结束时间" prop="endTime">
                </el-table-column>
                <el-table-column align="center" label="状态" prop="statusStr">
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <div class="btn_group">
                      <span
                        class="btn red"
                        @click="openDialog('view', scope.row)"
                        >视图</span
                      >
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </template>
      </MyTable>
      <MyPagination
        v-model="pageNum2"
        :size="pageSize2"
        :total="total2"
        @pageChange="getPollutantIntoList"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <MyDialog
      :dialogVisible="dialogVisible"
      title="查看图片"
      @cancel="openDialog('close')"
    >
      <template v-slot:content>
        <div class="dialog_pic_area">
          <img class="pic" :src="licensePictures" alt="" />
        </div>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import triggerBar from "@/components/base/triggerBar";
import editableItems from "@/components/base/editableItems";
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyDialog from "@/components/base/myDialog";
import {
  collectCompaniesDetail,
  collectCompaniesEdit,
  carrierInformation,
  pollutantInto,
  collectGasRecord
} from "@/api/unitManagement";
import { addressRequest, uploadAction } from "@/api/other";
import { carrierInformationTable, pollutantIntoTable } from "./config";
import {
  CompanyType,
  carryType,
  statusType,
  contaminationType
} from "@/utils/enum";
import { dateGrain } from "@/utils/methods";

export default {
  name: "collection-business-detail",
  components: {
    MyBread,
    triggerBar,
    editableItems,
    MyTable,
    MyPagination,
    MyDialog
  },
  data() {
    return {
      titleList: [
        { name: "单位管理", path: "" },
        { name: "收集企业列表", path: "/ysx/collection-business" },
        { name: "收集企业详情", path: "" }
      ],
      itemId: "",
      // 表格
      tableData: [],
      carrierInformationTable,
      tableData2: [],
      pollutantIntoTable,
      // 分页
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum2: 1,
      pageSize2: 10,
      total2: 0,
      dialogVisible: false,
      licensePictures: "",
      // 基本信息
      checkBaseMsgStatus: false,
      formModel: [
        [
          {
            type: "input",
            label: "企业名称:",
            valueLabel: "companyName",
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "企业编号:",
            valueLabel: "companyId",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "单位类型:",
            valueLabel: "companyTypeStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "添加时间:",
            valueLabel: "createTimeStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "联系人:",
            valueLabel: "linkman",
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "联系电话:",
            valueLabel: "phone",
            checkStatus: 2,
            required: true
          }
        ],
        [
          {
            type: "citySelect",
            label: "企业地址:",
            valueLabel: {
              province: "province",
              provinceCode: "provinceCode",
              provinceOptions: "provinceOptions",
              city: "city",
              cityCode: "cityCode",
              cityOptions: "cityOptions",
              area: "area",
              areaCode: "areaCode",
              areaOptions: "areaOptions",
              street: "street",
              streetCode: "streetCode",
              streetOptions: "streetOptions"
            },
            placeholder: "请选择",
            style: { width: "530px" },
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "详细地址:",
            valueLabel: "address",
            checkStatus: 2,
            style: { width: "265px" },
            required: false
          },
          {
            type: "input",
            label: "经度:",
            valueLabel: "log",
            checkStatus: 2,
            style: { width: "265px" },
            required: true
          },
          {
            type: "input",
            label: "纬度:",
            valueLabel: "lat",
            checkStatus: 2,
            style: { width: "265px" },
            required: true
          },
          {
            type: "text",
            label: "（上次处置含油污水至今）",
            required: false
          }
        ],
        [
          {
            type: "uploadPic",
            label: "经营许可证:",
            valueLabel: "companyBusinessUrl",
            picDesc: "支持.png、.jpg、.jpeg文件, 文件大小不超过2M",
            style: { width: "260px" },
            checkStatus: 2,
            require: false
          }
        ]
      ],
      formValue: {
        companyName: "",
        companyId: "",
        companyTypeStr: "",
        createTimeStr: "",
        linkman: "",
        phone: "",
        province: "",
        provinceCode: "",
        provinceOptions: "",
        city: "",
        cityCode: "",
        cityOptions: "",
        area: "",
        areaCode: "",
        areaOptions: "",
        street: "",
        streetCode: "",
        streetOptions: "",
        address: "",
        log: "",
        lat: "",
        companyStatus: "",
        disposeInfo: "",
        companyBusinessUrl: ""
      }
    };
  },
  created() {
    this.itemId = this.$route.query.itemId;
    this.getDetail(this.itemId);
    this.setOptions(0, arr => {
      this.formValue.provinceOptions = arr;
    });
    this.getCarrierInformationList();
    this.getPollutantIntoList();
  },
  methods: {
    getDetail(itemId) {
      collectCompaniesDetail(itemId)
        .then(res => {
          if (res != -1) {
            this.formValue.companyName = res.companyName;
            this.formValue.companyId = res.id;
            this.formValue.companyTypeStr = CompanyType[res.companyType];
            let stObj = dateGrain(res.createTime);
            this.formValue.createTimeStr = res.createTime
              ? `${stObj["dateYear"]}-${stObj["dateMonth"]}-${stObj["dateDay"]} ${stObj["dateHours"]}:${stObj["dateMinute"]}`
              : "-";
            this.formValue.linkman = res.linkman;
            this.formValue.phone = res.phone;
            this.formValue.province = res.province;
            this.formValue.provinceCode = res.provinceCode;
            this.formValue.city = res.city;
            this.formValue.cityCode = res.cityCode;
            this.formValue.area = res.area;
            this.formValue.areaCode = res.areaCode;
            this.formValue.street = res.street;
            this.formValue.streetCode = res.streetCode;
            this.formValue.address = res.address;
            this.formValue.companyStatus = res.companyStatus;
            this.formValue.disposeInfo = res.disposeInfo;
            this.formValue.log = res.gpsLocation.split(",")[0] + "°";
            this.formValue.lat = res.gpsLocation.split(",")[1] + "°";
            this.formValue.companyBusinessUrl = res.companyBusinessUrl;
            if (res.provinceCode) {
              this.setOptions(res.provinceCode, arr => {
                this.formValue.cityOptions = arr;
              });
            }
            if (res.cityCode) {
              this.setOptions(res.cityCode, arr => {
                this.formValue.areaOptions = arr;
              });
            }
            if (res.areaCode) {
              this.setOptions(res.areaCode, arr => {
                this.formValue.streetOptions = arr;
              });
            }
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // 设置地址选项
    setOptions(code, fn) {
      addressRequest(code)
        .then(res => {
          let arr = res.map(item => {
            return {
              value: item.code,
              label: item.name
            };
          });
          fn(arr);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCarrierInformationList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        page: this.pageNum,
        size: this.pageSize,
        companyId: this.itemId
      };
      carrierInformation(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData = res.content.map(item => {
                return {
                  ...item,
                  vehicleTypeStr: carryType[item.vehicleType]
                };
              });
            } else {
              this.tableData = [];
            }
            this.total = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getPollutantIntoList(data) {
      this.pageSize2 = data ? data.pageSize : this.pageSize2;

      let params = {
        page: this.pageNum2,
        size: this.pageSize2,
        companyId: this.itemId
      };
      pollutantInto(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData2 = res.content.map(item => {
                let stObj = dateGrain(item.workEndTime);
                let workEndTimeStr = item.workEndTime
                  ? `${stObj["dateYear"]}-${stObj["dateMonth"]}-${stObj["dateDay"]} ${stObj["dateHours"]}:${stObj["dateMinute"]}`
                  : "-";
                return {
                  ...item,
                  ability: "展开",
                  statusStr: statusType[item.status],
                  workEndTimeStr: workEndTimeStr
                };
              });
            } else {
              this.tableData2 = [];
            }
            this.total2 = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    toggleExpand(row) {
      this.getTableData(row.recordNo).then(res => {
        row.tableData = res;
        if (row.ability === "展开") {
          row.ability = "收起";
        } else {
          row.ability = "展开";
        }
        this.$refs.intoTable.$children[0].toggleRowExpansion(row);
      });
    },
    // 收油记录
    getTableData(id) {
      let obj = {
        storageRecordNo: id,
        pagination: false
      };
      return collectGasRecord(obj)
        .then(res => {
          if (res != -1) {
            let tableDataArr = [];
            if (res.content && res.content.length > 0) {
              tableDataArr = res.content.map(item => {
                let sTime = dateGrain(item.workStartTime);
                let startTime = item.workStartTime
                  ? `${sTime["dateYear"]}-${sTime["dateMonth"]}-${sTime["dateDay"]} ${sTime["dateHours"]}:${sTime["dateMinute"]}`
                  : "-";
                let eTime = dateGrain(item.workEndTime);
                let endTime = item.workEndTime
                  ? `${eTime["dateYear"]}-${eTime["dateMonth"]}-${eTime["dateDay"]} ${eTime["dateHours"]}:${eTime["dateMinute"]}`
                  : "-";
                return {
                  ...item,
                  wasteTypeStr: contaminationType[item.wasteType],
                  startTime,
                  endTime,
                  statusStr: statusType[item.status]
                };
              });
            }
            return tableDataArr;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    addressSelect({ code, leave, key }) {
      if (leave != 4) {
        this.setOptions(code, arr => {
          switch (leave) {
            case 1:
              if (key == "provinceCode") {
                this.formValue.cityOptions = arr;
                this.formValue.cityCode = "";
                this.formValue.areaOptions = [];
                this.formValue.areaCode = "";
                this.formValue.streetOptions = [];
                this.formValue.streetCode = "";
              }
              break;
            case 2:
              if (key == "cityCode") {
                this.formValue.areaOptions = arr;
                this.formValue.areaCode = "";
                this.formValue.streetOptions = [];
                this.formValue.streetCode = "";
              }
              break;
            case 3:
              if (key == "areaCode") {
                this.formValue.streetOptions = arr;
                this.formValue.streetCode = "";
              }
              break;
            default:
              break;
          }
        });
      }
    },
    checkIconStatus() {
      if (this.checkBaseMsgStatus) {
        if (this.formValue.companyName.trim() == "") {
          this.$message.warning("企业名称不能为空");
        } else if (this.formValue.linkman.trim() == "") {
          this.$message.warning("联系人不能为空");
        } else if (this.formValue.phone.trim() == "") {
          this.$message.warning("联系电话不能为空");
        } else if (this.formValue.provinceCode == "") {
          this.$message.warning("省地址不能为空");
        } else if (this.formValue.cityCode == "") {
          this.$message.warning("市地址不能为空");
        } else if (this.formValue.areaCode == "") {
          this.$message.warning("区地址不能为空");
        } else if (this.formValue.streetCode == "") {
          this.$message.warning("街道地址不能为空");
        } else if (this.formValue.log.trim() == "") {
          this.$message.warning("经度不能为空");
        } else if (this.formValue.lat.trim() == "") {
          this.$message.warning("纬度不能为空");
        } else {
          let obj = {
            address: this.formValue.address,
            areaCode: this.formValue.areaCode,
            cityCode: this.formValue.cityCode,
            provinceCode: this.formValue.provinceCode,
            streetCode: this.formValue.streetCode,
            companyBusinessUrl: this.formValue.companyBusinessUrl,
            companyName: this.formValue.companyName,
            companyStatus: this.formValue.companyStatus,
            disposeInfo: this.formValue.disposeInfo,
            gpsLocation: this.formValue.log + "," + this.formValue.lat,
            linkman: this.formValue.linkman,
            phone: this.formValue.phone
          };
          collectCompaniesEdit(this.itemId, obj)
            .then(res => {
              if (res != -1) {
                this.$message.success("修改成功");
                this.getDetail(this.itemId);
                this.checkStatus();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        }
      } else {
        this.checkStatus();
        this.formValue.log = this.formValue.log.slice(0, -1);
        this.formValue.lat = this.formValue.lat.slice(0, -1);
      }
    },
    checkStatus() {
      this.checkBaseMsgStatus = !this.checkBaseMsgStatus;
      let obj = this.formModel.map(cell => {
        return cell.map(item => {
          let obj = {
            ...item
          };
          if (item.checkStatus == 1) {
            obj.checkStatus = 2;
          }
          if (item.checkStatus == 2) {
            obj.checkStatus = 1;
          }
          return obj;
        });
      });
      this.formModel = obj;
    },
    uploadPicChange(key) {
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      let that = this;
      input.onchange = function() {
        let imgReg = /(.jpg|.png|.jpeg)$/;
        let name = input.files[0].name;
        if (input.files[0].size / 1024 > 2048) {
          that.$message.error("图片大小超过2M，请重新上传");
          return;
        }
        if (!imgReg.test(name)) {
          that.$message.warning("请注意文件格式");
          return;
        }
        let form = new FormData();
        form.append("file", input.files[0]);
        uploadAction(form)
          .then(res => {
            if (res != -1) {
              that.$message.success("上传成功");
              that.formValue[key] = res;
            }
          })
          .catch(error => {
            that.$message.error(error.message);
          });
      };
    },
    openDialog(type, data) {
      switch (type) {
        case "openPic":
          this.dialogVisible = true;
          this.licensePictures = data.licensePictures;
          break;
        case "view":
          if (!data.pdfUrl) {
            this.$message.error("无视图");
          } else {
            window.open(data.pdfUrl);
          }
          break;
        case "close":
          this.dialogVisible = false;
          this.licensePictures = "";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail_content {
  padding-bottom: 100px;
  .group_cell {
    margin-bottom: 10px;
  }
}
.basic_msg_from {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.btn_group {
  .btn {
    cursor: pointer;
    color: #fff;
    padding: 2px 3px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.red {
      background: #dd6161;
    }
    &.blue {
      background: #409eff;
    }
  }
}
</style>
