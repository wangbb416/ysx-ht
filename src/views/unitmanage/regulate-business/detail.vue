<!--单位管理-监管企业列表 详情-->
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
    <triggerBar title="管辖范围" type="text"></triggerBar>
    <MyTable :isIndexBoo="true" :data="tableData" :tableConfig="rangeTable">
    </MyTable>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import triggerBar from "@/components/base/triggerBar";
import editableItems from "@/components/base/editableItems";
import MyTable from "@/components/base/myTable";
import {
  supervisionCompanyDetail,
  supervisionCompanyEdit,
  enterpriseJurisdiction
} from "@/api/unitManagement";
import { addressRequest, uploadAction } from "@/api/other";
import { rangeTable } from "./config";
import { CompanyType } from "@/utils/enum";
import { dateGrain } from "@/utils/methods";

export default {
  name: "transportation-company-detail",
  components: {
    MyBread,
    triggerBar,
    editableItems,
    MyTable
  },
  data() {
    return {
      titleList: [
        { name: "单位管理", path: "" },
        { name: "监管企业列表", path: "/ysx/regulate-business" },
        { name: "监管企业详情", path: "" }
      ],
      itemId: "",
      // 表格
      tableData: [],
      rangeTable,
      // 基本信息
      checkBaseMsgStatus: false,
      formModel: [
        [
          {
            type: "input",
            label: "单位名称:",
            valueLabel: "companyName",
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "单位编号:",
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
            label: "单位地址:",
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
    this.getLocation(this.itemId);
  },
  methods: {
    getDetail(itemId) {
      supervisionCompanyDetail(itemId)
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
    getLocation(itemId) {
      enterpriseJurisdiction(itemId)
        .then(res => {
          if (res != -1) {
            this.tableData = res;
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
          this.$message.warning("单位名称不能为空");
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
          supervisionCompanyEdit(this.itemId, obj)
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
</style>
