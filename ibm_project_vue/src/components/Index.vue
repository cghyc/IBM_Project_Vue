<template>
  <div class="page-index">
    <div class="page-find">
      <!-- 查询 -->
      <div class="find">
        <el-form
          ref="formFind"
          :model="form_find"
          :rules="rules"
          class="demo-form"
          label-position="left"
        >
          <el-form-item label="" class="in" prop="text">
            <el-input
              v-model="form_find.text"
              style="width: 270px"
              placeholder="搜一搜"
            ></el-input>
            <el-button @click="find">搜一搜</el-button>
            <el-button @click="find_exit">返回首页</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--展示主表格-->
      <el-table
        :data="tableData"
        height="500"
        :header-cell-style="{ color: '#000' }"
        style="width: 100%"
        class="query-table"
      >
        <!--ID-->
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <!--名字-->
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <!--工资-->
        <el-table-column prop="salary" label="工资" width="180">
        </el-table-column>
        <!--年龄-->
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="
                handleDelete(scope.$index, scope.row), (dialogVisible = true)
              "
              >删除信息</el-button
            >
            <!--删除信息-->
            <el-dialog
              :show-close="false"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleDelete"
            >
              <span class="di-text">删除信息不可恢复，请确认是否删除</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">否</el-button>
                <el-button
                  type="primary"
                  @click="del(), (dialogVisible = false)"
                  >是</el-button
                >
              </span>
            </el-dialog>
            <!--修改信息-->
            <el-button
              size="mini"
              style="margin-left: 10px"
              @click="handleEdit(scope.$index, scope.row), (dialogEdit = true)"
              >修改信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航栏 -->
      <el-pagination
        class="pag"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentPage"
        :total="total"
      >
      </el-pagination>

      <!--添加信息-->
      <el-button
        type="info"
        round
        size="mini"
        @click="dialog = true"
        class="button_add"
        >添加员工信息</el-button
      >
      <!-- 导出数据 -->
      <el-button
        type="info"
        round
        size="mini"
        @click="dialog_excel = true"
        class="button_add"
        >导出全部员工信息</el-button
      >
      <!-- 导出数据 -->
      <el-button
        type="info"
        round
        size="mini"
        @click="dialog_excel_part = true"
        class="button_add"
        >导出本页员工信息</el-button
      >

      <!--员工添加抽屉-->
      <el-dialog
        title="添加员工信息"
        :before-close="handleClose"
        :visible.sync="dialog"
        ref="drawer"
        :show-close="false"
      >
        <div class="add-form">
          <el-form
            ref="formRef"
            :model="form"
            label-width="70px"
            :rules="rules"
            class="demo-form"
            label-position="left"
          >
            <!--名字-->
            <el-form-item label="名字" class="in" prop="name">
              <el-input
                v-model="form.name"
                style="width: 270px"
                placeholder="请输入员工名字"
              ></el-input>
            </el-form-item>
            <!--工资-->
            <el-form-item label="工资" class="in" prop="salary">
              <el-input
                v-model="form.salary"
                style="width: 270px"
                placeholder="请输入员工工资"
              ></el-input>
            </el-form-item>
            <!--年龄-->
            <el-form-item label="年龄" class="in" prop="age">
              <el-input
                v-model="form.age"
                style="width: 270px"
                placeholder="请输入员工年龄"
              ></el-input>
            </el-form-item>
          </el-form>

          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="onAdd">添加</el-button>
          </div>
        </div>
      </el-dialog>

      <!--员工修改抽屉-->
      <el-dialog
        title="修改员工信息"
        :before-close="handleClose2"
        :visible.sync="dialogEdit"
        ref="drawer2"
        :show-close="false"
      >
        <div class="add-form">
          <el-form
            ref="formRef2"
            :model="form2"
            label-width="70px"
            :rules="rules"
            class="demo-form"
            label-position="left"
          >
            <!--ID-->
            <el-form-item label="ID" class="in" prop="id">
              <el-input
                v-model="form2.id"
                style="width: 270px"
                placeholder="请输入员工ID"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <!--名字-->
            <el-form-item label="名字" class="in" prop="name">
              <el-input
                v-model="form2.name"
                style="width: 270px"
                placeholder="请输入员工名字"
              ></el-input>
            </el-form-item>
            <!--工资-->
            <el-form-item label="工资" class="in" prop="salary">
              <el-input
                v-model="form2.salary"
                style="width: 270px"
                placeholder="请输入员工工资"
              ></el-input>
            </el-form-item>
            <!--年龄-->
            <el-form-item label="年龄" class="in" prop="age">
              <el-input
                v-model="form2.age"
                style="width: 270px"
                placeholder="请输入员工年龄"
              ></el-input>
            </el-form-item>
          </el-form>

          <div class="demo-drawer__footer">
            <el-button @click="cancelForm2">取 消</el-button>
            <el-button type="primary" @click="onEdit">修改</el-button>
          </div>
        </div>
      </el-dialog>

      <!--统计表格按钮-->
      <div class="button_tj">
        <el-button @click="dialogFun1" type="info" round size="mini"
          >工资份额统计</el-button
        >
        <el-button @click="dialogFun2" type="info" round size="mini"
          >年龄分布统计</el-button
        >
      </div>

      <!--统计展示表格对话框-->
      <el-dialog :visible.sync="dialogFun" width="650px">
        <div
          id="myChart"
          :style="{ width: '500px', height: '400px', margin: '0 auto' }"
        ></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFun = false">取 消</el-button>
        </span>
      </el-dialog>

      <!--导出全部数据弹窗-->
      <el-dialog
        title="导出全部员工信息到Excel"
        :before-close="handleClose_excel"
        :visible.sync="dialog_excel"
        ref="drawer"
        :show-close="false"
      >
        <div class="add-form">
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm_excel">取 消</el-button>
            <el-button type="primary" @click="onAdd_excel">导出</el-button>
          </div>
        </div>
      </el-dialog>

      <!--导出本页数据弹窗-->
      <el-dialog
        title="导出本页员工信息到Excel"
        :before-close="handleClose_excel_part"
        :visible.sync="dialog_excel_part"
        ref="drawer"
        :show-close="false"
      >
        <div class="add-form">
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm_excel_part">取 消</el-button>
            <el-button type="primary" @click="onAdd_excel_part">导出</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      //删除员工信息方法参数
      dialogVisible: false,
      dialogFromVisible: false,

      //主展示表格数据
      tableData: [],
      //统计图数据
      tableData1: [],
      id: "",
      table: false,

      //添加员工信息弹窗参数
      dialog: false,
      loading: false,
      //删除员工信息弹窗参数
      dialogEdit: false,
      loading2: false,
      //导出全部弹窗参数
      dialog_excel: false,
      loading_excel: false,
      //导出本页弹窗参数
      dialog_excel_part: false,
      loading_excel_part: false,

      //统计弹窗参数
      dialogFun: false,

      //导航栏参数
      total: 8,
      currentPage: 1,
      pageSize: 8,

      //导航栏数据
      form3: {
        page: 1,
        size: 8,
      },

      //修改员工信息数据
      form2: {
        id: "",
        name: "",
        salary: "",
        age: "",
      },

      //添加员工信息数据
      form: {
        id: "",
        name: "",
        salary: "",
        age: "",
      },

      //搜索框数据
      form_find: {
        text: "",
      },

      formLabelWidth: "80px",
      timer: null,

      rules: {
        id: [
          { required: true, message: "请输入员工ID", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "请输入数字" },
        ],
        name: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        salary: [
          { required: true, message: "请输入员工工资", trigger: "blur" },
          {
            pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
            message: "请输入一个大于0的数字",
          },
        ],
        age: [
          { required: true, message: "请输入员工年龄", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "请输入一个大于0的数字" },
        ],
        text: [{ required: true, message: "搜索为空！", trigger: "blur" }],
      },
    };
  },

  created() {
    this.getUsersList();
    this.onePage();
  },

  methods: {
    //修改员工信息
    handleEdit(index, row) {
      // console.log(index, row);
      this.form2 = row;
      // console.log(this.form2.id);
    },
    //删除员工信息
    handleDelete(index, row) {
      // console.log(index, row);
      console.log(row.id);
      this.id = row.id;
    },
    //分页方法
    handleCurrentPage(current) {
      this.form3.page = current;
      this.$http.post("/getEmpByPage", this.form3).then((res) => {
        console.log(res.data);
        this.tableData = res.data.rows;

        // console.log(res.page)
      });
      // console.log(current)
    },
    //获取全部员工信息
    async getUsersList() {
      this.$http.get("/getAllEmployee").then((res) => {
        this.tableData1 = res.data;
        // console.log(this.tableData1)
      });
    },
    //员工信息删除方法
    del() {
      console.log(this.id);
      this.$http.delete("/delEmpById/" + this.id).then((ret) => {
        console.log(ret.data);
        if (ret.data) this.onePage() + this.$message.success("删除成功！");
        else return this.$message.error("删除失败！");
      });
    },

    //添加弹窗打开关闭方法
    handleClose() {
      if (this.loading) {
        return;
      }
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      this.$refs.formRef.resetFields();
      clearTimeout(this.timer);
    },
    //添加员工信息方法
    onAdd() {
      // let url="/addEmploy";
      // this.$http.post(url,this.form).then(res=>{
      //   console.log("response...",res)
      //   this.$message.success("添加成功>-<")

      // }).catch(err=>{console.log("error...",err); this.$message.error('添加失败！')});
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请正确填写！");
        const { data: res } = await this.$http.post("/addEmploy", this.form);
        if (!res) return this.$message.error("添加失败！");
        this.$message.success("添加成功>-<");
        this.onePage();
        // this.handleCurrentPage(1);
        this.cancelForm();
        this.$refs.formRef.resetFields();
      });
    },
    //员工信息修改方法
    onEdit() {
      console.log(this.form2);
      this.$refs.formRef2.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("请正确填写信息!");
        //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.post("/updateEmp", this.form2);
        if (!res) return this.$message.error("修改失败！");
        this.$message.success("修改成功>-<");
        this.onePage();
        this.cancelForm2();
      });
      // this.$http.get('/updateEmp',{
      //   params:  {
      //     id:this.id
      //   }
      // }).then(ret=>{
      //     console.log(ret.data)
      //     if(ret.data) return this.$router.push("/home");
      //         else return this.$message.error('删除失败！');
      // })
    },
    //搜索员工信息方法
    find() {
      console.log(this.form_find.text);
      this.$refs.formFind.validate(async (valid) => {
        //验证表单输入是否合法
        if (!valid) return this.$message.error("搜索不能为空！");
        //     //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        const { data: res } = await this.$http.get(
          "/findEmp/" + this.form_find.text
        );
        console.log(res);
        this.tableData = res;
        //      if (!res) return this.$message.error('修改失败！');
        // this.$message.success('修改成功>-<');
        // this.getUsersList();
        // this.cancelForm2();
      });
    },
    //退出搜索，返回首页
    find_exit() {
      this.onePage();
      this.$refs.formFind.resetFields();
    },

    //修改弹窗打开关闭方法
    handleClose2() {
      if (this.loading2) {
        return;
      }
    },
    cancelForm2() {
      this.loading2 = false;
      this.dialogEdit = false;
      clearTimeout(this.timer);
      this.onePage();
    },

    //导出全部弹窗开启关闭
    handleClose_excel() {
      if (this.loading_excel) {
        return;
      }
    },
    cancelForm_excel() {
      this.loading_excel = false;
      this.dialog_excel = false;
      clearTimeout(this.timer);
      this.onePage();
    },

    //导出全部员工信息方法
    onAdd_excel() {
      this.$http.get("/export").then((res) => {
        console.log(res.data);
      });
      window.location.href = "http://localhost:8080/export";
      this.cancelForm_excel();
    },

    //导出本页弹窗开启关闭
    handleClose_excel_part() {
      if (this.loading_excel_part) {
        return;
      }
    },
    cancelForm_excel_part() {
      this.loading_excel_part = false;
      this.dialog_excel_part = false;
      clearTimeout(this.timer);
      this.onePage();
    },
    //导出本页员工信息方法
    onAdd_excel_part() {
      let name = "员工表";
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      let tableDom = document.querySelector(".query-table").cloneNode(true);
      let trs = tableDom.getElementsByTagName("tr");
      for (let tr of trs) {
        tr.lastChild.remove();
      }
      trs[0].lastChild.remove();
      console.log("tabledom...", tableDom);
      var wb = XLSX.utils.table_to_book(tableDom);
      console.log("wb...", wb);
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      this.cancelForm_excel_part();
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
      
    },

    //首页方法
    onePage() {
      this.form.page = 1;
      this.$http
        .post("/getEmpByPage", {
          page: 1,
          size: 8,
        })
        .then((res) => {
          console.log(res.data);
          this.currentPage = 1;
          this.tableData = res.data.rows;
          this.total = res.data.total;
          // console.log(res.page)
        });
      // console.log(current)
    },
    // thisPage(page) {
    //   page = this.form3.page;
    //   this.handleCurrentPage(page);

    //   //  console.log(res.data);
    // },

    //饼图按钮
    dialogFun1() {
      this.dialogFun = true;
      setTimeout(() => {
        this.drawLine1();
      }, 500);
    },
    dialogFun2() {
      this.dialogFun = true;
      setTimeout(() => {
        this.drawLine2();
      }, 500);
    },
    // 图表数据--------------------------------------------------------------------------
    drawLine1() {
      // this.getUsersList();
      // console.log(this.tableData1)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var low = 0;
      var low1 = 0;
      var mid = 0;
      var high = 0;
      var high1 = 0;
      var count = 0;
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      var count4 = 0;
      for (var i = 0; i < this.tableData1.length; i++) {
        if (this.tableData1[i].salary < 2000) {
          count++;
        } else if (
          (this.tableData1[i].salary >= 2000) &
          (this.tableData1[i].salary < 5000)
        ) {
          count1++;
        } else if (
          (this.tableData1[i].salary >= 5000) &
          (this.tableData1[i].salary < 8000)
        ) {
          count2++;
        } else if (
          (this.tableData1[i].salary >= 8000) &
          (this.tableData1[i].salary < 10000)
        ) {
          count3++;
        } else {
          count4++;
        }
      }
      low = low + count;
      low1 = low1 + count1;
      mid = mid + count2;
      high = high + count3;
      high1 = high1 + count4;
      myChart.setOption({
        title: {
          text: "员工工资比重",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            top: "10%",
            radius: "75%",
            center: ["50%", "50%"],
            data: [
              { value: low, name: "0-2000" },
              { value: low1, name: "2000-5000" },
              { value: mid, name: "5000-8000" },
              { value: high, name: "8000-10000" },
              { value: high1, name: ">10000" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      var low = 0;
      var low1 = 0;
      var mid = 0;
      var high = 0;
      var high1 = 0;
      var count = 0;
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      var count4 = 0;
      for (var i = 0; i < this.tableData1.length; i++) {
        if (this.tableData1[i].age < 20) {
          count++;
        } else if (
          (this.tableData1[i].age >= 20) &
          (this.tableData1[i].age < 35)
        ) {
          count1++;
        } else if (
          (this.tableData1[i].age >= 35) &
          (this.tableData1[i].age < 45)
        ) {
          count2++;
        } else if (
          (this.tableData1[i].age >= 45) &
          (this.tableData1[i].age < 55)
        ) {
          count3++;
        } else {
          count4++;
        }
      }
      low = low + count;
      low1 = low1 + count1;
      mid = mid + count2;
      high = high + count3;
      high1 = high1 + count4;
      myChart.setOption({
        title: {
          text: "年龄分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            top: "10%",
            radius: "75%",
            center: ["50%", "50%"],
            data: [
              { value: low, name: "0-20" },
              { value: low1, name: "20-35" },
              { value: mid, name: "35-45" },
              { value: high, name: "45-55" },
              { value: high1, name: ">55" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 搜索框
.find {
  width: 500px;
  margin-top: 22px;
  margin-left: 688px;
}
//主表格
.page-find {
  position: absolute;
  top: 50px;
  left: 300px;
  width: 1000px;
}
/deep/ .el-table thead,
.el-table {
  color: black;
}
/*最外层透明*/
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
  color: #000;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/* 删除表格下最底层的横线 */
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.di-text {
  display: block;
  text-align: center;
}
.add-info {
  position: absolute;
  top: 500px;
  left: 400px;
}

.el-pagination {
  text-align: center;
}

.button_add {
  margin-top: 25px;
}

.button_tj {
  position: absolute;
  width: 500px;
  left: 75%;
  bottom: 1%;
}

.add-form {
  margin-left: 25px;
}

/deep/ .el-dialog {
  width: 450px;
}

.demo-drawer__footer {
  margin-left: 190px;
  padding-right: 0px;
  margin-right: 0px;

  .button {
    padding-right: 0px;
  }
}
</style>