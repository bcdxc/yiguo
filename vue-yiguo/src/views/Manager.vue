<template>
    <!-- 分页器 -->
    <div class="manager">
        <div class="manager-head">
            <el-button type="primary" @click="dialogFormVisible = true"
                >添加管理员</el-button
            >

            <el-dialog
                title="管理员信息"
                :visible.sync="dialogFormVisible"
                width="500px"
                @close="cancel"
            >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item
                        label="用户名:"
                        :label-width="formLabelWidth"
                        prop="username"
                    >
                        <el-input
                            v-model="ruleForm.username"
                            autocomplete="off"
                            class="common-input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="密 码:"
                        :label-width="formLabelWidth"
                        prop="password"
                    >
                        <el-input
                            v-model="ruleForm.password"
                            autocomplete="off"
                            class="common-input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="真实姓名:"
                        :label-width="formLabelWidth"
                        prop="realName"
                    >
                        <el-input
                            v-model="ruleForm.realName"
                            autocomplete="off"
                            class="common-input"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="manager-con">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="180"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="密码"
                    width="180"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="realName"
                    label="姓名"
                    align="center"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="{ row }">
                        <el-popconfirm
                            title="确定删除吗？"
                            @confirm="remove(row.id)"
                        >
                            <el-button
                                type="danger"
                                size="small"
                                slot="reference"
                                :disabled="row.username === 'admin'"
                                >删除</el-button
                            >
                        </el-popconfirm>
                        <el-button
                            type="primary"
                            size="small"
                            class="modify"
                            :disabled="row.username === 'admin'"
                            @click="modify(row.id)"
                            >修改</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            ruleForm: {
                username: "",
                password: "",
                realName: "",
            },
            formLabelWidth: "120px",
            rules: {
                username: [
                    {
                        required: true,
                        min: 5,
                        max: 10,
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        min: 6,
                        max: 16,
                        trigger: "blur",
                    },
                ],
                realName: [
                    {
                        required: true,
                        min: 2,
                        max: 16,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created() {
        this.getManager();
    },
    methods: {
        async getManager() {
            await axios({
                method: "get",
                url: "http://localhost:3006/manager",
            }).then((res) => {
                this.tableData = res.data;
            });
        },
        async add() {
            if (!this.ruleForm.id) {
                // 添加
                if (
                    !this.tableData.find(
                        (item) => item.username === this.ruleForm.username
                    )
                ) {
                    await axios({
                        method: "post",
                        url: `http://localhost:3006/manager`,
                        data: this.ruleForm,
                    }).then((res) => {
                        console.log(res.data);
                    });
                } else {
                    this.$message({
                        message: "抱歉，您输入的账号已存在，请重新输入",
                        type: "error",
                    });
                }
            } else {
                // 修改
                await axios({
                    method: "patch",
                    url: `http://localhost:3006/manager/${this.ruleForm.id}`,
                    data: this.ruleForm,
                });
            }
            this.getManager();
            this.cancel();
        },
        async remove(id) {
            await axios({
                method: "delete",
                url: `http://localhost:3006/manager/${id}`,
            });
            this.tableData = this.tableData.filter((item) => item.id !== id);
        },
        async modify(id) {
            this.dialogFormVisible = true;
            await axios({
                method: "get",
                url: `http://localhost:3006/manager/${id}`,
            }).then((res) => {
                this.ruleForm = res.data;
            });
        },
        cancel() {
            for (let item in this.ruleForm) {
                this.ruleForm[item] = "";
            }
            this.dialogFormVisible = false;
        },
    },
};
</script>

<style>
.manager {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.manager-head {
    width: 100%;
    text-align: left;
    padding-bottom: 30px;
}
.manager-con {
    width: 100%;
}
.modify {
    margin-left: 10px;
}
.common-input {
    width: 280px;
}
</style>