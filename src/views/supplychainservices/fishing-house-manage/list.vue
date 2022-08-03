<!--供应链服务-渔家乐管理-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getFishermanReset"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div class="common-button" title="新增" @click="openDialog('add')">
            <i class="el-icon-plus"></i>
          </div>

          <div class="common-button" title="下载" @click="openDialog('download')">
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :isIndexBoo="true"
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="fishermanSManagementTable"
    >
      <template #data_Manage="{ data }">
        <el-button
          :disabled="data.status == 0"
          :plain="data.status == 0 ? 'plain' : ''"
          :type="data.status == 0 ? 'info' : ''"
          size="mini"
          @click="openDialog('up', data)"
        >上架
        </el-button>
        <el-button
          :disabled="data.status == 1"
          :plain="data.status == 1 ? 'plain' : ''"
          :type="data.status == 1 ? 'info' : ''"
          size="mini"
          @click="openDialog('down', data)"
        >下架
        </el-button>
      </template>

      <template #data_Operate="{ data }">
        <div class="inline-button">
          <div class="detail my-button" title="详情" @click="openDialog('view', data)">
            <i class="el-icon-document"></i>
          </div>

          <div class="delete my-button" title="删除" @click="openDialog('delete', data)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getFisherman"
    ></MyPagination>

    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="
        dialogVisible = false;
        apiNumber = 0;
      "
    >
      <template v-slot:content>
        <el-form :model="formValue" label-width="100px" size="small">
          <div class="basic_msg_from">
            <div v-show="showStep1">
              <editableItems
                :formModel="formModel"
                :formValue="formValue"
                @addressSelect="addressSelect"
                @uploadPicChange="uploadPicChange"
                @switchChange="switchChange"
              ></editableItems>
            </div>
            <div class="step_box" v-show="showStep1">
              <el-button
                v-if="viewDetail && !editDetail"
                @click="handActionStep1"
                type="primary"
              >查看项目
              </el-button>
              <template v-else>
                <el-button @click="handActionStep1" type="primary"
                >下一步
                </el-button>
                <div class="tit">下一步，添加项目</div>
              </template>
            </div>
            <div class="show_step2" v-show="showStep2">
              <div
                v-for="(item, index) of formValue2"
                :key="index + '1'"
                class="add_items"
              >
                <editableItems
                  :formModel="formModel2"
                  :formValue="item"
                  :itemIndex="index"
                  :style="{ width: '460px' }"
                  @switchChange="switchChangeChild"
                  @uploadPicChange="uploadPicChange2"
                ></editableItems>
                <div
                  @click="deleteItemType(index)"
                  v-if="
                    (!viewDetail || editDetail || addItemCell) &&
                      formValue2.length + formValue3.length > 1 &&
                      addEditEdit
                  "
                  class="delete_icon"
                >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <template v-if="viewDetail">
                <div
                  v-for="(item, index) of formValue3"
                  :key="index"
                  class="add_items"
                >
                  <editableItems
                    :formModel="formModel3"
                    :formValue="item"
                    :itemIndex="index"
                    :style="{ width: '460px' }"
                    @uploadPicChange="uploadPicChangeOther2"
                  ></editableItems>
                  <div
                    @click="deleteItemType3(index)"
                    v-if="
                      (!viewDetail || editDetail || addItemCell) &&
                        formValue2.length + formValue3.length > 1 &&
                        addEditEdit
                    "
                    class="delete_icon"
                  >
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
              </template>
            </div>
            <div
              v-if="showStep2 && addEditAdd"
              @click="addItemType"
              class="add_icon"
            >
              <i class="el-icon-plus"></i>
            </div>

            <div
              v-if="viewDetail && !editDetail && addEditEdit"
              class="add_icon other"
              @click="clickTheEditorButton"
            >
              <i class="el-icon-edit"></i>
            </div>

            <div
              v-if="!viewDetail || editDetail || addItemCell"
              class="step_box2"
              v-show="showStep2"
            >
              <el-button @click="handActionStep2">上一步</el-button>
              <el-button @click="handActionStepEnd" type="primary"
              >完成
              </el-button>
            </div>
          </div>
        </el-form>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import editableItems from "@/components/base/editableItems";
import {addressRequest, uploadAction} from "@/api/other";
import {fishermanSManagementTable} from "./config";
import {
  fishermanList,
  fishermanListAdd,
  fishermanListEdit,
  fishermanListExport,
  fishermanHouseManageDelete,
  goToAndFromTheShelves,
  addSubProject
} from "@/api/supplychainservice";
import {exportXlsx} from "@/utils/methods";

export default {
  name: "fishing-vessel-pollution",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch,
    MyDialog,
    editableItems
  },
  data() {
    return {
      titleList: [
        {name: "供应链服务", path: ""},
        {name: "渔家乐管理", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "baseName",
          placeholder: "请输入渔家乐名称"
        },
        {
          type: "addressSelect",
          field: "regionCode",
          placeholder: "请选择地址",
          options: {
            leave: 3
          }
        }
      ],
      form: {
        baseName: "",
        regionCode: ""
      },
      // 表格
      tableData: [],
      fishermanSManagementTable,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      showStep1: true,
      showStep2: false,
      viewDetail: false, // 查看详情状态
      addItemCell: false, // 添加项目状态
      editDetail: false, // 编辑详情状态
      dialogVisible: false,
      addEditAdd: true,
      addEditEdit: true,
      formModel: [
        {
          type: "input",
          label: "渔家乐名称:",
          style: {
            width: "320px"
          },
          placeholder: "请输入渔家乐名称",
          valueLabel: "baseName",
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "select",
          label: "类型:",
          style: {
            width: "320px"
          },
          placeholder: "请选择渔家乐类型",
          valueLabel: "type",
          required: true,
          options: [
            {
              label: "住宿",
              value: "住宿"
            },
            {
              label: "餐饮",
              value: "餐饮"
            }
          ],
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "citySelect",
          label: "地址:",
          placeholder: "请选择地址",
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
          style: {width: "530px"},
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "input",
          label: "详细地址:",
          placeholder: "请输入详细地址",
          valueLabel: "address",
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "input",
          label: "联系人:",
          placeholder: "请输入联系人姓名",
          valueLabel: "linkman",
          style: {
            width: "400px"
          },
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "input",
          label: "联系电话:",
          placeholder: "请输入联系电话",
          valueLabel: "phone",
          style: {
            width: "400px"
          },
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "uploadPicLine",
          label: "宣传图:",
          option: {
            style: 2
          },
          valueLabel: "fishFunImage",
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "switch",
          label: "是否发布:",
          valueLabel: "status",
          required: false,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        }
      ],
      title: "添加渔家乐（1/2）",
      formValue: {
        baseName: "",
        type: "",
        typeStr: "",
        address: "",
        linkman: "",
        phone: "",
        fishFunImage: "",
        status: 1,
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
        fishFunId: ""
      },
      formModel2: [
        {
          type: "input",
          label: "项目名称:",
          placeholder: "请输入项目名称",
          valueLabel: "projectName",
          style: {
            width: "320px"
          },
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "select",
          label: "类型:",
          placeholder: "请现在项目类型",
          valueLabel: "type",
          required: true,
          style: {
            width: "260px"
          },
          options: [
            {
              label: "住宿",
              value: "住宿"
            },
            {
              label: "餐饮",
              value: "餐饮"
            }
          ],
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "input",
          label: "项目备注:",
          placeholder: "100字以内",
          valueLabel: "content",
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "uploadPicLine",
          label: "宣传图:",
          option: {
            style: 2
          },
          placeholder: "请输入",
          valueLabel: "photo",
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        },
        {
          type: "switch",
          label: "是否发布:",
          valueLabel: "status",
          required: true,
          checkStatus: 1 // 1,可编辑状态，2，不可编辑状态，3,固定不可编辑状态
        }
      ],
      formModel3: [],
      formValue3: [
        // { projectName: "", type: "", content: "", photo: "", status: 1 }
      ],
      formValue2: [
        {projectName: "", type: "", content: "", photo: "", status: 1}
      ]
    };
  },
  created() {
    this.getFisherman();
    this.setOptions(0, arr => {
      this.formValue.provinceOptions = arr;
    });
    this.formModel3 = JSON.parse(JSON.stringify(this.formModel2));
  },
  methods: {
    getFishermanReset() {
      this.pageNum = 1;
      this.getFisherman();
    },
    getFisherman(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.form.baseName) {
        params.baseName = this.form.baseName;
      }
      if (this.form.regionCode && this.form.regionCode.length > 0) {
        let arr = [];
        let reg = /-/i;
        this.form.regionCode.forEach(item => {
          if (!reg.test(item)) {
            arr.push(item);
          }
        });
        params.searchType = arr.length;
        params.searchCode = arr.pop();
      }
      fishermanList(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {
              this.tableData = res.records.map(item => {
                return {
                  ...item,
                  addressStr: `${item.province || ""}${item.city ||
                  ""}${item.area || ""}${item.street || ""}${item.address}`
                };
              });
            } else {
              this.tableData = [];
            }
            this.total = res.total || 0;
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
    addressSelect({code, leave, key, str}) {
      switch (leave) {
        case 1:
          this.formValue.province = str;
          break;
        case 2:
          this.formValue.city = str;
          break;
        case 3:
          this.formValue.area = str;
          break;
        case 4:
          this.formValue.street = str;
          break;
        default:
          break;
      }
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
    uploadPicChange({key}) {
      if (this.viewDetail && !this.editDetail) {
        this.$confirm("替换该渔家乐宣传图，是否继续？", "提示")
          .then(_ => {
            this.uploadPic(res => {
              // 接口请求
              if (this.checkStep1()) {
                this.formValue[key] = res;
                this.handActionStepEnd();
              } else {
                this.formValue[key] = "";
              }
            });
          })
          .catch(_ => {
            that.$message.info("已取消");
          });
      } else {
        this.uploadPic(res => {
          this.formValue[key] = res;
        });
      }
    },
    uploadPicChange2({key, index}) {
      if (
        this.viewDetail &&
        !this.editDetail &&
        this.formValue2[index].fishFunId
      ) {
        this.$confirm("替换该渔家乐宣传图，是否继续？", "提示")
          .then(_ => {
            this.uploadPic(res => {
              // 接口请求
              this.formValue2[index][key] = res;
              this.handActionStepEnd();
            });
          })
          .catch(_ => {
            that.$message.info("已取消");
          });
      } else {
        this.uploadPic(res => {
          this.formValue2[index][key] = res;
        });
      }
    },
    uploadPicChangeOther2({key, index}) {
      this.uploadPic(res => {
        this.formValue3[index][key] = res;
      });
    },
    uploadPic(fn) {
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      let that = this;
      input.onchange = function () {
        let imgReg = /(.jpg|.png)$/;
        let name = input.files[0].name;
        if (input.files[0].size / 1024 > 500) {
          that.$message.error("图片大小超过500KB，请重新上传");
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
              fn(res);
            }
          })
          .catch(error => {
            that.$message.error(error.message);
          });
      };
    },
    // 点击编辑按钮
    clickTheEditorButton() {
      this.editDetail = true;
      // 点击编辑时候，新增隐藏
      this.addEditAdd = false;
      this.changeEditStatus();
    },
    // 将详情切换为可编辑
    changeEditStatus() {
      this.formModel.forEach((item, index) => {
        if (!(item.type == "switch" || item.type == "uploadPicLine")) {
          if (!this.viewDetail || this.editDetail) {
            if (item.checkStatus == 2) {
              this.formModel[index].checkStatus = 1;
            }
          } else {
            if (item.checkStatus == 1) {
              this.formModel[index].checkStatus = 2;
            }
          }
        }
      });
      this.formModel2.forEach((item, index) => {
        if (!(item.type == "switch" || item.type == "uploadPicLine")) {
          if (!this.viewDetail || this.editDetail) {
            if (item.checkStatus == 2) {
              this.formModel2[index].checkStatus = 1;
            }
          } else {
            if (item.checkStatus == 1) {
              this.formModel2[index].checkStatus = 2;
            }
          }
        }
      });
    },
    switchChange() {
      if (this.viewDetail && !this.editDetail) {
        if (this.formValue.status == 1) {
          // 本身上架，需要下架
          this.getOffTheShelves(this.formValue.fishFunId, () => {
            this.formValue.status = 0;
          });
        } else {
          // 本身下架，需要上架
          this.putOnTheShelves(this.formValue.fishFunId, () => {
            this.formValue.status = 1;
          });
        }
      }
    },
    switchChangeChild(index) {
      if (
        this.viewDetail &&
        !this.editDetail &&
        this.formValue2[index].fishFunId
      ) {
        if (this.formValue2[index].status == 1) {
          // 本身上架，需要下架
          this.getOffTheShelves(
            this.formValue2[index].projectId,
            () => {
              this.formValue2[index].status = 0;
            },
            1
          );
        } else {
          // 本身下架，需要上架
          this.putOnTheShelves(
            this.formValue2[index].projectId,
            () => {
              this.formValue2[index].status = 1;
            },
            1
          );
        }
      }
    },
    // 上架
    putOnTheShelves(id, fn, flag = 0) {
      this.$confirm("上架该渔家乐，是否继续？", "提示")
        .then(_ => {
          let params = {
            flag: flag,
            id,
            status: 0
          };
          goToAndFromTheShelves(params)
            .then(res => {
              if (res != -1) {
                this.$message.success("已上架");
                this.getFisherman();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        })
        .catch(_ => {
          if (fn) {
            fn();
          }
        });
    },
    // 下架
    getOffTheShelves(id, fn, flag = 0) {
      this.$confirm("下架该渔家乐，是否继续？", "提示")
        .then(_ => {
          let params = {
            flag: flag,
            id,
            status: 1
          };
          goToAndFromTheShelves(params)
            .then(res => {
              if (res != -1) {
                this.$message.success("已下架");
                this.getFisherman();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        })
        .catch(_ => {
          if (fn) {
            fn();
          }
        });
    },
    // 重置dialog数据
    clearDialog() {
      this.addEditEdit = true;
      this.addEditAdd = true;
      this.showStep1 = true;
      this.showStep2 = false;
      this.addItemCell = false;
      this.editDetail = false;
      for (let key of Object.keys(this.formValue)) {
        if (key != "provinceOptions") {
          this.formValue[key] = "";
        }
      }
      this.formValue.status = 1;
      this.formValue2 = [
        {projectName: "", type: "", content: "", photo: "", status: 1}
      ];
      this.formValue3 = [];
    },
    openDialog(type, data = null) {
      switch (type) {
        case "add":
          this.clearDialog();
          this.viewDetail = false;
          this.changeEditStatus();
          this.title = "添加渔家乐（1/2）";
          this.dialogVisible = true;
          break;
        case "up":
          this.putOnTheShelves(data.fishFunId);
          break;
        case "down":
          this.getOffTheShelves(data.fishFunId);
          break;
        case "view":
          this.clearDialog();
          this.viewDetail = true;
          this.changeEditStatus();
          this.title = "渔家乐（1/2）";
          // this.formValue = Object.assign(this.formValue, data);
          // this.formValue.typeStr = this.formValue.type;
          this.formValue.baseName = data.baseName;
          this.formValue.type = data.type;
          this.formValue.typeStr = data.type;
          this.formValue.address = data.address;
          this.formValue.linkman = data.linkman;
          this.formValue.phone = data.phone;
          this.formValue.fishFunImage = data.fishFunImage;
          this.formValue.status = data.status;
          this.formValue.province = data.province;
          this.formValue.provinceCode = data.provinceCode;
          this.formValue.city = data.city;
          this.formValue.cityCode = data.cityCode;
          this.formValue.area = data.area;
          this.formValue.areaCode = data.areaCode;
          this.formValue.street = data.street;
          this.formValue.streetCode = data.streetCode;
          this.formValue.fishFunId = data.fishFunId;
          this.formValue2 = data.fishFunProjectList.map(item => {
            return {
              projectName: item.projectName,
              projectId: item.projectId,
              type: item.type,
              typeStr: item.type,
              content: item.content,
              photo: item.photo,
              status: item.status,
              fishFunId: item.fishFunId
            };
          });
          if (this.formValue.provinceCod) {
            this.setOptions(this.formValue.provinceCode, arr => {
              this.formValue.cityOptions = arr;
            });
          }
          if (this.formValue.cityCode) {
            this.setOptions(this.formValue.cityCode, arr => {
              this.formValue.areaOptions = arr;
            });
          }
          if (this.formValue.areaCode) {
            this.setOptions(this.formValue.areaCode, arr => {
              this.formValue.streetOptions = arr;
            });
          }
          this.dialogVisible = true;
          break;
        case "delete":
          this.$confirm("本渔家乐相关的一切内容将被删除，是否继续？", "提示")
            .then(_ => {
              fishermanHouseManageDelete({id: data.fishFunId})
                .then(res => {
                  if (res != -1) {
                    this.$message.success("删除成功");
                    if (this.tableData.length == 1 && this.pageNum > 1) {
                      this.pageNum--;
                    }
                    this.getFisherman();
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                });
            })
            .catch(_ => {
            });
          break;
        case "download":
          let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          };
          if (this.form.baseName) {
            params.baseName = this.form.baseName;
          }
          if (this.form.regionCode && this.form.regionCode.length > 0) {
            let arr = [];
            let reg = /-/i;
            this.form.regionCode.forEach(item => {
              if (!reg.test(item)) {
                arr.push(item);
              }
            });
            params.searchType = arr.length;
            params.searchCode = arr.pop();
          }
          // 导出
          exportXlsx("渔家乐管理", params, fishermanListExport);
          break;
        default:
          break;
      }
    },
    checkStep1() {
      if (!this.formValue.baseName) {
        this.$message.warning("渔家乐名称不能为空");
      } else if (!this.formValue.type) {
        this.$message.warning("渔家乐类型不能为空");
      } else if (!this.formValue.provinceCode) {
        this.$message.warning("省地址不能为空");
      } else if (!this.formValue.cityCode) {
        this.$message.warning("市地址不能为空");
      } else if (!this.formValue.areaCode) {
        this.$message.warning("区地址不能为空");
      } else if (!this.formValue.streetCode) {
        this.$message.warning("街道地址不能为空");
      } else if (!this.formValue.linkman) {
        this.$message.warning("联系人不能为空");
      } else if (!this.formValue.phone) {
        this.$message.warning("联系电话不能为空");
      } else if (!this.formValue.fishFunImage) {
        this.$message.warning("宣传图不能为空");
      } else {
        return true;
      }
      return false;
    },
    checkStep2() {
      let check = true;
      let formValue2 = JSON.parse(
        JSON.stringify(this.formValue2.concat(this.formValue3))
      );
      for (let index = 0; index < formValue2.length; index++) {
        if (!formValue2[index].projectName) {
          this.$message.warning("项目名称不能为空");
          check = false;
          break;
        } else if (!formValue2[index].type) {
          this.$message.warning("项目类型不能为空");
          check = false;
          break;
        } else if (!formValue2[index].photo) {
          this.$message.warning("宣传图不能为空");
          check = false;
          break;
        }
      }
      return check;
    },
    handActionStep1() {
      if (this.viewDetail) {
        if (!this.editDetail) {
          this.showStep1 = false;
          this.title = "添加渔家乐（2/2）";
          this.showStep2 = true;
        } else {
          if (this.checkStep1()) {
            this.showStep1 = false;
            this.title = "添加渔家乐（2/2）";
            this.showStep2 = true;
          }
        }
      } else {
        if (this.checkStep1()) {
          this.showStep1 = false;
          this.title = "渔家乐项目（2/2）";
          this.showStep2 = true;
        }
      }
    },
    handActionStep2() {
      this.showStep1 = true;
      this.title = "添加渔家乐（1/2）";
      this.showStep2 = false;
    },
    deleteItemType(index) {
      this.formValue2.splice(index, 1);
    },
    deleteItemType3(index) {
      this.formValue3.splice(index, 1);
    },
    addItemType() {
      if (this.checkStep2()) {
        if (this.viewDetail) {
          this.addItemCell = true;
          // 新增时候，编辑隐藏
          this.addEditEdit = false;
          this.formValue3.push({
            projectName: "",
            type: "",
            content: "",
            photo: "",
            status: 1
          });
        } else {
          this.formValue2.push({
            projectName: "",
            type: "",
            content: "",
            photo: "",
            status: 1
          });
        }
      }
    },
    handActionStepEnd() {
      if (this.checkStep1() && this.checkStep2()) {
        let params = {
          baseName: this.formValue.baseName,
          type: this.formValue.type,
          address: this.formValue.address,
          linkman: this.formValue.linkman,
          phone: this.formValue.phone,
          fishFunImage: this.formValue.fishFunImage,
          status: this.formValue.status,
          province: this.formValue.province,
          provinceCode: this.formValue.provinceCode,
          city: this.formValue.city,
          cityCode: this.formValue.cityCode,
          area: this.formValue.area,
          areaCode: this.formValue.areaCode,
          street: this.formValue.street,
          streetCode: this.formValue.streetCode,
          fishFunProjectList: this.formValue2.concat(this.formValue3)
        };
        if (this.viewDetail || this.editDetail || this.addItemCell) {
          params.fishFunId = this.formValue.fishFunId;
          if (this.viewDetail && !this.editDetail && !this.addItemCell) {
            this.handActionEditEnd(params);
          } else {
            let idItems = [];
            let notIdItems = [];
            let formValue2Arr = this.formValue2.concat(this.formValue3);
            formValue2Arr.forEach(item => {
              if (item.fishFunId) {
                idItems.push(item);
              } else {
                notIdItems.push(item);
              }
            });
            if (notIdItems.length > 0) {
              params.fishFunProjectList = idItems;
              this.handActionEditEndCopy(params, () => {
                this.pushItems(notIdItems, () => {
                  this.dialogVisible = false;
                  this.$message.success("提交成功");
                  this.getFisherman();
                });
              });
            } else {
              this.handActionEditEnd(params);
            }
          }
        } else {
          // 新增
          fishermanListAdd(params)
            .then(res => {
              if (res != -1) {
                this.dialogVisible = false;
                this.getFishermanReset();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        }
      }
    },
    handActionEditEndCopy(params, fn) {
      fishermanListEdit(params)
        .then(res => {
          if (res != -1) {
            fn();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    handActionEditEnd(params) {
      fishermanListEdit(params)
        .then(res => {
          if (res != -1) {
            if (this.editDetail || this.addItemCell) {
              this.dialogVisible = false;
            }
            this.$message.success("提交成功");
            this.getFisherman();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    pushItems(items, fn) {
      let item = items.shift();
      addSubProject({
        photo: item.photo,
        projectName: item.projectName,
        content: item.content,
        type: item.type,
        status: item.status,
        fishFunId: this.formValue.fishFunId
      })
        .then(res => {
          if (res != -1) {
            if (items.length) {
              this.pushItems(items, fn);
            } else {
              fn();
            }
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.basic_msg_from {
  position: relative;
  z-index: 1;
  padding-top: 10px;

  /deep/ .el-form-item {
    margin-bottom: 12px !important;
  }

  .add_icon {
    position: absolute;
    z-index: 2;
    right: 0;
    top: -20px;
    font-size: 20px;
    cursor: pointer;

    &.other {
      right: 60px;
    }
  }
}

.step_box {
  width: 80%;
  margin: 0 auto;

  .el-button {
    width: 100%;
    margin-bottom: 5px;
  }

  .tit {
    text-align: right;
  }
}

.step_box2 {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 0 auto;

  .el-button {
    width: 240px;
  }
}

.show_step2 {
  position: relative;
  z-index: 1;

  .add_items {
    position: relative;
    z-index: 1;
    border-bottom: solid 1px #7d7d7d;
    margin-bottom: 15px;

    &:last-child {
      border-bottom: none;
    }

    .delete_icon {
      position: absolute;
      z-index: 2;
      right: 30px;
      top: 0;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
