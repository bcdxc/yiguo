<template>
    <div class="goods">
        <div class="goods-head">
            <router-link :to="{ name: 'AddGoods' }">
                <el-button type="primary" size="large">添加商品</el-button>
            </router-link>
        </div>
        <div class="goods-con">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                    prop="goodsName"
                    label="商品名称"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="stock"
                    label="库存数量"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="purchase"
                    label="已售"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="className"
                    label="类别"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="isCarousel"
                    label="是否是轮播图"
                    width="150"
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
                                class="delete"
                                >删除</el-button
                            >
                        </el-popconfirm>
                        <el-button
                            type="primary"
                            size="small"
                            @click="modify(row.id)"
                            >修改</el-button
                        >

                        <el-button
                            :type="
                                row.isCarousel === '否' ? 'primary' : 'warning'
                            "
                            size="small"
                            @click="setCarousel(row.id, row.isCarousel)"
                            >{{
                                row.isCarousel === "否"
                                    ? "设置为轮播图"
                                    : "取消该轮播图"
                            }}</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                title="修改商品信息"
                :visible.sync="dialogFormVisible"
                width="500px"
            >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item
                        label="商品名称"
                        class="form-item"
                        prop="goodsName"
                    >
                        <el-input
                            v-model="ruleForm.goodsName"
                            class="common-input2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="商品价格"
                        class="form-item"
                        prop="price"
                    >
                        <el-input
                            v-model.number="ruleForm.price"
                            class="common-input2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="商品库存"
                        class="form-item"
                        prop="stock"
                    >
                        <el-input
                            v-model.number="ruleForm.stock"
                            class="common-input2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品类别" prop="className">
                        <el-select
                            v-model="ruleForm.className"
                            placeholder="请选择商品类别"
                        >
                            <span v-for="item in goodsCategory" :key="item">
                                <el-option
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </span>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
            <div class="page-pos">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="8"
                    @current-change="change"
                    :total="goodsLen"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            tableData: [],
            isDisable: false,
            dialogFormVisible: false,
            rules: {
                goodsName: [
                    {
                        required: true,
                        min: 2,
                        max: 18,
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        min: 1,
                        max: 10000,
                        trigger: "blur",
                        type: "number",
                    },
                ],
                stock: [
                    {
                        required: true,
                        min: 1,
                        max: 10000,
                        trigger: "blur",
                        type: "number",
                    },
                ],
                className: [
                    {
                        required: true,
                        min: 2,
                        max: 18,
                        trigger: "blur",
                    },
                ],
            },
            ruleForm: {
                id: "",
                goodsName: "",
                className: "",
                price: "",
                stock: "",
                purchase: 0,
            },
            goodsCategory: [],
            goodsLen: 8,
            page: 0,
        };
    },
    created() {
        this.getGoods();
        this.getEightGoods(this.page);
        this.setGoodsCategory();
    },
    methods: {
        async getGoods() {
            await axios({
                method: "get",
                url: "http://localhost:3006/goods",
            }).then((res) => {
                this.goodsLen = res.data.length;
            });
        },
        async getEightGoods(page) {
            await axios({
                method: "get",
                url: `http://localhost:3006/goods?_start=${page}&_limit=8`,
            }).then((res) => {
                console.log(res.data);
                this.tableData = res.data;
            });
        },
        async add() {
            await axios({
                method: "patch",
                url: `http://localhost:3006/goods/${this.ruleForm.id}`,
                data: this.ruleForm,
            });
            this.getGoods();
            this.cancel();
        },
        cancel() {
            for (let item in this.ruleForm) {
                this.ruleForm[item] = "";
            }
            this.dialogFormVisible = false;
        },
        async remove(id) {
            await axios({
                method: "delete",
                url: `http://localhost:3006/goods/${id}`,
            });
            this.tableData = this.tableData.filter((item) => item.id !== id);
        },
        async modify(id) {
            this.dialogFormVisible = true;
            await axios({
                method: "get",
                url: `http://localhost:3006/goods/${id}`,
            }).then((res) => {
                this.ruleForm = res.data;
            });
        },
        // 设置轮播图
        async setCarousel(id, isCarousel) {
            await axios({
                method: "patch",
                url: `http://localhost:3006/goods/${id}`,
                data: {
                    isCarousel: isCarousel === "否" ? "是" : "否",
                },
            });
            this.getGoods();
            this.getEightGoods(this.page * 8);
        },
        async setGoodsCategory() {
            await axios({
                method: "get",
                url: "http://localhost:3006/classify",
            }).then((res) => {
                res.data.forEach((item) => {
                    this.goodsCategory.push(item.className);
                });
            });
        },

        change(e) {
            this.page = e - 1;
            this.getEightGoods(this.page * 8);
        },
    },
};
</script>

<style>
.goods {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* position: relative; */
}
.goods-head {
    width: 100%;
    text-align: left;
    padding-bottom: 15px;
    /* padding-left: 157px; */
}
.goods-con {
    width: 100%;
}
.delete {
    margin: 0 10px;
}
.common-input {
    width: 280px;
}
.common-input2 {
    width: 330px;
}
.page-pos {
    text-align: right;
    margin-top: 6px;
    padding-right: 100px;
}
.red {
    color: red !important;
}
</style>