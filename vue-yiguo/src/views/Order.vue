<template>
    <div class="order">
        <div class="order-head">
            <span>全部订单</span>
            <i
                class="icon-ic_refresh iconfont myicon"
                ref="needRotate"
                @click="needRotate"
            ></i>
        </div>
        <div class="order-main">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                    prop="orderNum"
                    label="序号"
                    align="center"
                    width="60"
                >
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="用户名"
                    align="center"
                    width="80"
                >
                </el-table-column>
                <!-- <el-table-column
                    prop="orderId"
                    label="订单号"
                    align="center"
                    width="140"
                >
                </el-table-column> -->
                <el-table-column
                    align="center"
                    width="200"
                    label="订单号和下单时间"
                >
                    <template v-slot="{ row }">
                        <div>{{ row.orderId }}</div>
                        <div>{{ row.createTime }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号"
                    align="center"
                    width="150"
                >
                </el-table-column>
                <el-table-column prop="address" label="下单地址" width="320">
                </el-table-column>
                <el-table-column align="center" label="下单商品和数量">
                    <template v-slot="{ row }">
                        <div
                            class="goods-item"
                            v-for="(item, index) in row.goodsList"
                            :key="index"
                        >
                            <span>{{ item.goodsName }}</span>
                            <span> x{{ item.quantity }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="cost"
                    align="center"
                    label="实付款"
                    width="100"
                ></el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template v-slot="{ row }">
                        <el-button
                            type="primary"
                            size="mini"
                            :disabled="row | isDisabled"
                            @click="deliverGoods(row.id)"
                            >发货</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderStatus"
                    align="center"
                    label="订单状态"
                    width="100"
                ></el-table-column>
            </el-table>
            <el-pagination
                class="order-pagi"
                background
                layout="prev, pager, next"
                :total="orderLen"
                :page-size="6"
                @current-change="change"
                :current-page="page"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
    data() {
        return {
            tableData: [],
            page: 0,
            orderLen: 0,
            timeout: null,
        };
    },

    async created() {
        await this.requestAllData();
        this.requestData(this.orderLen - 6, 6);
    },

    filters: {
        isDisabled(row) {
            if (row.orderStatus !== "待发货") {
                return true;
            }
        },
    },

    methods: {
        // 请求 10 条数据
        // async requestData() {
        //     await axios({
        //         method: "get",
        //         url: `http://localhost:3006/order`,
        //     }).then((res) => {
        //         let requestArr = res.data;
        //         if (requestArr.length > 1) {
        //             requestArr.sort((a, b) => b.createTime - a.createTime);
        //             for (let i = 0; i < requestArr.length; i++) {
        //                 requestArr[i].createTime = moment(
        //                     requestArr[i].createTime
        //                 ).format("YYYY-MM-DD, HH:mm:ss");
        //                 requestArr[i].orderNum = i + 1;
        //                 requestArr[i].orderStatus =
        //                     requestArr[i].orderStatus === 1
        //                         ? "待发货"
        //                         : requestArr[i].orderStatus === 2
        //                         ? "待收货"
        //                         : requestArr[i].orderStatus === 3
        //                         ? "待评价"
        //                         : "已评价";
        //             }
        //         } else {
        //             requestArr[0].createTime = moment(
        //                 requestArr[0].createTime
        //             ).format("YYYY-MM-DD, HH:mm:ss");
        //             requestArr[0].orderNum = 1;
        //             requestArr[0].orderStatus =
        //                 requestArr[0].orderStatus === 1
        //                     ? "待发货"
        //                     : requestArr[0].orderStatus === 2
        //                     ? "待收货"
        //                     : requestArr[0].orderStatus === 3
        //                     ? "待评价"
        //                     : "已评价";
        //         }
        //         this.tableData = requestArr;
        //     });
        // },
        async requestData(page, num) {
            await axios({
                method: "get",
                url: `http://localhost:3006/order?_start=${page}&_limit=${num}`,
            }).then((res) => {
                let requestArr = res.data;
                // if (requestArr.length > 1) {
                requestArr.sort((a, b) => b.createTime - a.createTime);
                for (let i = 0; i < requestArr.length; i++) {
                    requestArr[i].createTime = moment(
                        requestArr[i].createTime
                    ).format("YYYY-MM-DD, HH:mm:ss");
                    requestArr[i].orderNum = i + 1;
                    requestArr[i].orderStatus =
                        requestArr[i].orderStatus === 1
                            ? "待发货"
                            : requestArr[i].orderStatus === 2
                            ? "待收货"
                            : requestArr[i].orderStatus === 3
                            ? "待评价"
                            : "已评价";
                }
                // } else {
                //     requestArr[0].createTime = moment(
                //         requestArr[0].createTime
                //     ).format("YYYY-MM-DD, HH:mm:ss");
                //     requestArr[0].orderNum = 1;
                //     requestArr[0].orderStatus =
                //         requestArr[0].orderStatus === 1
                //             ? "待发货"
                //             : requestArr[0].orderStatus === 2
                //             ? "待收货"
                //             : requestArr[0].orderStatus === 3
                //             ? "待评价"
                //             : "已评价";
                // }
                requestArr.forEach((item) => {
                    item.orderId = Date.parse(item.createTime);
                });
                this.tableData = requestArr;
            });
        },
        // 请求 全部 数据
        async requestAllData() {
            const res = await axios({
                method: "get",
                url: `http://localhost:3006/order`,
            });
            this.orderLen = res.data.length;
        },
        change(e) {
            this.page = e;
            let number =
                this.page === 1
                    ? this.orderLen - 6
                    : Math.ceil(this.orderLen / 6) === this.page
                    ? 0
                    : this.orderLen - this.page * 6;
            let count =
                this.page === 1
                    ? 6
                    : Math.ceil(this.orderLen / 6) === this.page
                    ? this.orderLen % ((this.page - 1) * 6)
                    : 6;
            console.log(number, count);
            this.requestData(number, count);
        },
        requestOrderByPage() {
            axios({
                method: "get",
                url: `http://localhost:3006/order/${id}`,
                data: {
                    orderStatus: 2,
                },
            }).then((res) => {
                console.log(res.data);
                this.requestData();
            });
        },
        async deliverGoods(id) {
            console.log(id);
            await axios({
                method: "patch",
                url: `http://localhost:3006/order/${id}`,
                data: {
                    orderStatus: 2,
                },
            }).then((res) => {
                console.log(res.data);
                this.requestData(this.orderLen - 6, 6);
            });
        },
        needRotate() {
            // DOM.classList.add("类名"); //添加类名
            // DOM.classList.remove("类名"); //删除类名
            if (!this.timeout) {
                this.timeout = 1;
                this.$refs.needRotate.classList.add("rotate");
                // 更新数据
                this.requestAllData();
                this.page = 0;
                this.tableData = [];
                setTimeout(() => {
                    this.requestData(this.orderLen - 6, 6);
                    // this.requestData();
                }, 400);
                setTimeout(() => {
                    this.$refs.needRotate.classList.remove("rotate");
                    this.timeout = null;
                }, 1000);
            }
        },
    },
};
</script>

<style>
.order {
    display: flex;
    flex-direction: column;
    /* height: 950px; */
}
.order-head {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 1.5px;
    font-weight: 400;
    color: #606266;
    position: relative;
}
.order-main {
    margin-top: 30px;
}
.order-pagi {
    text-align: right;
    margin-top: 20px;
}
</style>