<template>
    <div class="classify">
        <div class="classify-head">
            <el-button type="primary" @click="dialogFormVisible = true"
                >添加商品类别</el-button
            >

            <el-dialog
                title="类别信息"
                :visible.sync="dialogFormVisible"
                width="500px"
                @close="cancel"
            >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item
                        label="类别名:"
                        :label-width="formLabelWidth"
                        prop="className"
                    >
                        <el-input
                            v-model="ruleForm.className"
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
        <div class="classify-con">
            <el-table :data="tableData" border style="width: 1000px">
                <el-table-column
                    prop="className"
                    label="类别名称"
                    width="300"
                    align="center"
                >
                </el-table-column>
                <!-- <el-table-column label="二级菜单" width="300" align="center">
                    <template v-slot="{ row }">
                        <el-tag
                            size="small"
                            v-for="(item, index) in getSecondMenu(row.id)"
                            :key="index"
                        >
                            {{ item }}
                        </el-tag>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" align="center">
                    <template v-slot="{ row }">
                        <!-- <router-link :to="{ name: 'SecondMenu' }">
                            <el-button
                                type="primary"
                                size="small"
                                @click="dialogFormVisible = false"
                                >添加二级菜单</el-button
                            >
                        </router-link> -->

                        <el-popconfirm
                            title="确定删除吗？"
                            @confirm="remove(row)"
                        >
                            <el-button
                                type="danger"
                                size="small"
                                slot="reference"
                                class="delete"
                                :disabled="
                                    row.className === '火锅' ||
                                    row.className === '菜品' ||
                                    row.className === '套餐'
                                "
                                >删除</el-button
                            >
                        </el-popconfirm>
                        <el-button
                            type="primary"
                            size="small"
                            :disabled="
                                row.className === '火锅' ||
                                row.className === '菜品' ||
                                row.className === '套餐'
                            "
                            @click="modify(row.id)"
                            >修改</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <!-- <router-view class="second-menu" /> -->
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
                id: "",
                className: "",
                // secendMenu: [],
            },
            formLabelWidth: "120px",
            rules: {
                className: [
                    {
                        required: true,
                        min: 2,
                        max: 18,
                        trigger: "blur",
                    },
                ],
            },
            modifiedId: 1,
            originalClassName: "",
            newClassName: "",
            needModifyGoods: [],
        };
    },
    created() {
        this.getClassify();
    },
    methods: {
        async getClassify() {
            await axios({
                method: "get",
                url: "http://localhost:3006/classify",
            }).then((res) => {
                this.tableData = res.data;
            });
        },
        async add() {
            // 如果 ruleForm.id 有值的话就是修改，没有值的话就是添加
            // 在添加的时候还应该判断 类别是否有 重复
            if (!this.ruleForm.id) {
                // 添加数据
                await axios({
                    method: "post",
                    url: `http://localhost:3006/classify`,
                    data: this.ruleForm,
                }).then((res) => {
                    console.log(res, "上传成功！");
                });
            } else {
                // 修改数据（类别发生修改后，我们相应的商品的类别也应该修改 --> 首先需要通过被修改的类别 id 获取到相对应的商品数组，再遍历请求把每个商品的类别修改掉）
                this.modifiedId = this.ruleForm.id;
                this.newClassName = this.ruleForm.className;
                console.log(this.modifiedId);
                if (this.originalClassName !== this.ruleForm.className) {
                    // 如果类名修改了 就发请求
                    // 更改类名
                    await axios({
                        method: "patch",
                        url: `http://localhost:3006/classify/${this.ruleForm.id}`,
                        // data: this.ruleForm,
                        data: {
                            className: this.ruleForm.className,
                        },
                    });
                    // 修改商品的类别
                    await axios({
                        method: "get",
                        url: `http://localhost:3006/goods?className=${this.originalClassName}`,
                    }).then((res) => {
                        this.needModifyGoods = res.data;
                    });

                    await this.needModifyGoods.forEach((item) => {
                        axios({
                            method: "patch",
                            url: `http://localhost:3006/goods/${item.id}`,
                            data: {
                                className: this.newClassName,
                            },
                        }).then((res) => {
                            console.log(res.data);
                        });
                    });
                }
            }
            this.getClassify();
            this.cancel();
        },
        cancel() {
            for (let item in this.ruleForm) {
                this.ruleForm[item] = "";
            }
            this.dialogFormVisible = false;
        },
        async remove(row) {
            console.log(row);
            await axios({
                method: "delete",
                url: `http://localhost:3006/classify/${row.id}`,
            });
            this.tableData = this.tableData.filter(
                (item) => item.id !== row.id
            );
            await axios({
                method: "get",
                url: `http://localhost:3006/goods?className=${row.className}`,
            }).then((res) => {
                let delGoodsIdArr = [];
                res.data.forEach((item) => {
                    delGoodsIdArr.push(item.id);
                });
                delGoodsIdArr.forEach((item) => {
                    axios({
                        method: "delete",
                        url: `http://localhost:3006/goods/${item}`,
                    });
                });
            });
        },
        async modify(id) {
            this.dialogFormVisible = true;
            await axios({
                method: "get",
                url: `http://localhost:3006/classify/${id}`,
            }).then((res) => {
                this.ruleForm = res.data;
                this.originalClassName = this.ruleForm.className;
            });
            console.log("修改前的类名-->" + this.originalClassName);
        },
        // getSecondMenu(id) {
        //     return this.tableData.find(item => item.id === id)["secondMenu"] ;
        // },
    },
};
</script>

<style>
.classify {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* position: relative; */
}
.classify-head {
    width: 100%;
    text-align: left;
    padding-bottom: 30px;
    padding-left: 157px;
}
.classify-con {
    width: 1000px;
}
.delete {
    margin: 0 10px;
}
.common-input {
    width: 280px;
}
/* .second-menu {
    padding-top: 80px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #fff;
} */
</style>