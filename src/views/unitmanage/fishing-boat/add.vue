<!--单位管理-渔船列表 添加-->
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
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import triggerBar from "@/components/base/triggerBar";
import editableItems from "@/components/base/editableItems";
import { fishingBoatAdd } from "@/api/unitManagement";
import { addressRequest, uploadAction } from "@/api/other";
import { CompanyType } from "@/utils/enum";

export default {
  name: "fishing-boat-list-add",
  components: {
    MyBread,
    triggerBar,
    editableItems
  },
  data() {
    return {
      titleList: [
        { name: "单位管理", path: "" },
        { name: "渔船列表", path: "/ysx/fishing-boat-list" },
        { name: "添加渔船", path: "" }
      ],
      // 基本信息
      checkBaseMsgStatus: true,
      formModel: [
        [
          {
            type: "input",
            label: "船名:",
            valueLabel: "companyName",
            checkStatus: 1,
            required: true
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
            label: "联系人:",
            valueLabel: "linkman",
            checkStatus: 1,
            required: true
          },
          {
            type: "input",
            label: "联系电话:",
            valueLabel: "phone",
            checkStatus: 1,
            required: true
          },
          {
            type: "input",
            label: "已登记电话:",
            valueLabel: "nowPhone",
            checkStatus: 1,
            required: false
          },
          {
            type: "input",
            label: "备注:",
            valueLabel: "remark",
            checkStatus: 1,
            required: false
          }
        ],
        [
          {
            type: "citySelect",
            label: "船籍港:",
            valueLabel: {
              province: "province",
              provinceCode: "provinceCode",
              provinceOptions: "provinceOptions",
              city: "city",
              cityCode: "cityCode",
              cityOptions: "cityOptions",
              area: "area",
              areaCode: "areaCode",
              areaOptions: "areaOptions"
            },
            placeholder: "请选择",
            style: { width: "530px" },
            checkStatus: 1,
            leave: "3",
            required: true
          },
          {
            type: "input",
            label: "渔业公司:",
            valueLabel: "parentName",
            checkStatus: 1,
            style: { width: "265px" },
            required: false
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
            checkStatus: 1,
            require: false
          }
        ]
      ],
      formValue: {
        disposeInfo: "",
        companyName: "",
        linkman: "",
        phone: "",
        provinceCode: "",
        provinceOptions: "",
        cityCode: "",
        cityOptions: "",
        areaCode: "",
        areaOptions: "",
        companyTypeStr: CompanyType["1"],
        companyBusinessUrl: "",
        nowPhone: "",
        parentName: "",
        remark: ""
      }
    };
  },
  created() {
    this.setOptions(0, arr => {
      this.formValue.provinceOptions = arr;
    });
  },
  methods: {
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
              }
              break;
            case 2:
              if (key == "cityCode") {
                this.formValue.areaOptions = arr;
                this.formValue.areaCode = "";
              }
              break;
            default:
              break;
          }
        });
      }
    },
    checkIconStatus() {
      if (this.formValue.companyName.trim() == "") {
        this.$message.warning("船名不能为空");
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
      } else {
        let obj = {
          areaCode: this.formValue.areaCode,
          cityCode: this.formValue.cityCode,
          provinceCode: this.formValue.provinceCode,
          companyBusinessUrl: this.formValue.companyBusinessUrl,
          companyName: this.formValue.companyName,
          disposeInfo: this.formValue.disposeInfo,
          linkman: this.formValue.linkman,
          phone: this.formValue.phone,
          nowPhone: this.formValue.nowPhone,
          parentName: this.formValue.parentName,
          remark: this.formValue.remark
        };
        fishingBoatAdd(obj)
          .then(res => {
            if (res != -1) {
              this.$router.push({
                path: `/ysx/fishing-boat-list`
              });
              this.$message.success("添加成功");
            }
          })
          .catch(error => {
            this.$message.error(error.message);
          });
      }
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
