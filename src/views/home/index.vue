<template>
  <div id="app">
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width:300px"
    ></el-input>
    <el-button type="primary" @click="onSearch">搜索</el-button>
    <el-button type="success" @click="addClick">添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="80px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import "./style.less";

export default {
  data() {
    return {
      input: "", //  搜索框的值
      dialogFormVisible: false, // 模态框是否关闭
      form: {
        // 模态框里的form表单的值
        name: "",
        address: ""
      },
      title: "", //  模态框标题
      index: "" //  编辑时需要的id
    };
  },
  created() {
    this.$store.dispatch("FETCH_ACTION_DATA");
  },
  computed: {
    ...mapState(["tableData"])
  },
  methods: {
    //  点击修改按钮
    handleEdit(index, row) {
      this.$data.dialogFormVisible = true;
      this.$data.title = "编辑";
      this.$data.index = row.id;
      this.$data.form.name = row.name;
      this.$data.form.address = row.address;
    },
    //  点击删除按钮
    handleDelete(index, row) {
      let obj = { id: row.id };
      this.$store.dispatch("FETCH_ACTION_DELETE", obj);
    },
    //  点击添加按钮
    addClick() {
      this.$data.dialogFormVisible = true;
      this.$data.title = "添加";
      this.$data.form.name = "";
      this.$data.form.address = "";
    },
    //  模态框确定按钮
    submitForm() {
      this.$data.dialogFormVisible = false;
      if (this.$data.title === "添加") {
        this.$store.dispatch("FETCH_ACTION_ADD", this.$data.form);
      } else {
        let obj = { ...this.$data.form, id: this.$data.index };
        this.$store.dispatch("FETCH_ACTION_UPDATE", obj);
      }
    },
    //  点击搜索按钮
    onSearch() {
      this.$store.dispatch("FETCH_ACTION_SEARCH", this.$data.input);
    }
  }
};
</script>