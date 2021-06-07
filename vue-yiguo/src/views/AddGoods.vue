<template>
    <div class="add-goods">
        <el-form
            ref="form"
            class="layout"
            :model="ruleForm"
            label-width="80px"
            :rules="rules"
        >
            <div class="layout-left">
                <el-form-item
                    label="商品名称"
                    class="form-item"
                    prop="goodsName"
                >
                    <el-input v-model="ruleForm.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" class="form-item" prop="price">
                    <el-input v-model.number="ruleForm.price"></el-input>
                </el-form-item>
                <el-form-item label="商品库存" class="form-item" prop="stock">
                    <el-input v-model.number="ruleForm.stock"></el-input>
                </el-form-item>
                <el-form-item label="商品类别" prop="className">
                    <el-select
                        v-model="ruleForm.className"
                        placeholder="请选择商品类别"
                    >
                        <span v-for="item in goodsCategory" :key="item">
                            <el-option :label="item" :value="item"></el-option>
                        </span>
                    </el-select>
                </el-form-item>
            </div>
            <div class="layout-mid">
                <el-form-item
                    label="添加商品描述"
                    class="form-item"
                    label-width="100px"
                >
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入商品描述信息"
                        v-model="ruleForm.describe"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item label="上传图片到商品轮播图" label-width="166px">
                    <el-upload
                        class="upload-demo"
                        action="http://localhost:3006/goods"
                        :on-remove="handleRemove"
                        :on-change="changeStatus1"
                        :file-list="fileList"
                        list-type="picture"
                        :auto-upload="false"
                        ref="upload"
                        :multiple="true"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                    </el-upload>
                </el-form-item>
            </div>
            <div class="layout-right">
                <el-form-item label="上传图片到商品详情页" label-width="166px">
                    <el-upload
                        class="upload-demo"
                        action="http://localhost:3006/goods"
                        :on-remove="handleRemove"
                        :on-change="changeStatus2"
                        :file-list="fileList"
                        list-type="picture"
                        :auto-upload="false"
                        ref="upload2"
                        :multiple="true"
                    >
                        <el-button size="small" type="primary"
                            >点击上传</el-button
                        >
                    </el-upload>
                </el-form-item>
                <el-form-item class="btn-group">
                    <el-button type="primary" @click="onSubmit('form')"
                        >立即添加</el-button
                    >
                    <el-button plain @click="back">取消</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            ruleForm: {
                id: "",
                goodsName: "",
                className: "",
                price: "",
                stock: "",
                purchase: 0,
                isCarousel: "否",
                describe: "",
                comment: [],
            },
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
            imgUrl: [],
            showImg: [],
            goodsCategory: [],
            fileList: [],
        };
    },
    async created() {
        await axios({
            method: "get",
            url: "http://localhost:3006/classify",
        }).then((res) => {
            res.data.forEach((item) => {
                this.goodsCategory.push(item.className);
            });
        });
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        changeStatus1(file) {
            this.imgUrl.push({
                imgName: file.name,
                imgId: file.uid,
            });
        },
        changeStatus2(file) {
            this.showImg.push({
                imgName: file.name,
                imgId: file.uid,
            });
        },
        async deleteDb() {
            const res = await axios({
                method: "get",
                url: `http://localhost:3006/goods`,
            });
            let len = res.data.length;
            await axios({
                method: "delete",
                url: `http://localhost:3006/goods/${len}`,
            }).then((res) => {
                console.log(res, "删除成功");
            });
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.imgUrl.length <= 1 && this.showImg.length <= 1) {
                        this.$message.error("请至少上传两张图片！");
                        return;
                    } else {
                        axios({
                            method: "post",
                            url: "http://localhost:3006/goods",
                            data: {
                                ...this.ruleForm,
                                imgUrl: this.imgUrl,
                                showImg: this.showImg,
                            },
                        }).then((res) => {
                            if (res.status === 201) {
                                this.$message({
                                    message: "添加商品成功！",
                                    center: true,
                                    type: "success",
                                });
                                this.$router.push({ name: "Goods" });
                            } else {
                                this.$message({
                                    message: "商品添加失败！",
                                    center: true,
                                    type: "error",
                                });
                            }
                        });
                    }
                }
            });
        },
        back() {
            this.$router.back();
        },
    },
};
</script>

<style>
.add-goods {
    width: 100%;
}
.form-item {
    width: 302px;
}
.layout {
    /* height: 100%; */
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
}
.layout-mid,.layout-right{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.btn-group {
    display: flex;
    /* flex-direction: column; */
    align-items: flex-end;
}
</style>