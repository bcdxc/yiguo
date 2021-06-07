<template>
    <div class="over-view">
        <div class="overview-head">
            <el-button
                type="primary"
                :class="isActive === 0 ? 'active' : ''"
                :disabled="isActive === 0"
                @click="getGoods"
                >商品销量统计</el-button
            >
            <el-button
                type="primary"
                :class="isActive === 1 ? 'active' : ''"
                :disabled="isActive === 1"
                @click="getAllCostByDay"
                >七日流水统计</el-button
            >
        </div>
        <div class="overview-main">
            <div ref="chart" id="main"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";
import { LineChart, BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import axios from "axios";
import moment from "moment";

echarts.use([
    GridComponent,
    LineChart,
    CanvasRenderer,
    TooltipComponent,
    BarChart,
]);
export default {
    data() {
        return {
            order: [],
            showData: [],
            isActive: 0,
        };
    },
    created() {
        // 我们在这里发请求 来拿到数据
        this.getGoods();
    },

    methods: {
        async getGoods() {
            this.isActive = 0;
            await axios({
                method: "get",
                url: `http://localhost:3006/goods`,
            }).then((res) => {
                this.goods = res.data;
                let temArr = [];
                res.data.forEach((item) => {
                    if (item.purchase) {
                        temArr.push({
                            xaxis: item.goodsName,
                            yaxis: item.purchase,
                        });
                    }
                });
                this.showData = temArr;
                console.log(this.showData);
            });
        },

        async getAllCostByDay() {
            this.isActive = 1;
            await axios({
                method: "get",
                url: `http://localhost:3006/order`,
            }).then((res) => {
                this.order = res.data;
            });
            let showArr = [];

            // let date = new Date().getTime();
            let currentDate2 = new Date();
            let afterDate = moment(currentDate2).add(1, "day");
            let dateStr = `${afterDate.format("YYYY-MM-DD")} 00:00:00`;
            let date = new Date(dateStr).getTime();
            for (let i = 1; i < 8; i++) {
                const currentDate = date;
                date -= 86400000;
                let temDate = moment(new Date(currentDate))
                    .subtract(1, "day")
                    .format("MM-DD");
                let temObj = [
                    ...this.order.filter(
                        (item) =>
                            item.createTime < currentDate &&
                            item.createTime > date
                    ),
                ];
                if (temObj.length > 1) {
                    showArr.push({
                        xaxis: temDate,
                        yaxis: temObj.reduce(
                            (res, cur) => (res += cur.cost),
                            0
                        ),
                    });
                } else if (temObj.length === 1) {
                    showArr.push({
                        xaxis: temDate,
                        yaxis: temObj[0].cost,
                    });
                } else {
                    showArr.push({
                        xaxis: temDate,
                        yaxis: 0,
                    });
                }
            }
            this.showData = showArr;
            console.log(this.showData);
        },
    },

    watch: {
        showData: {
            handler() {
                // 基于准备好的dom，初始化echarts实例
                var chartDom = this.$refs.chart;
                // var chartDom = document.getElementById('main');
                // console.log(chartDom);
                var myChart = echarts.init(chartDom);
                myChart.setOption({
                    xAxis: {
                        type: "category",
                        data: this.showData.map((item) => item.xaxis),
                    },
                    yAxis: {
                        type: "value",
                    },
                    tooltip: {},
                    series: [
                        {
                            data: this.showData.map((item) => item.yaxis),
                            type: "line",
                            smooth: true,
                            name: "统计",
                        },
                    ],
                });
            },
            deep: true,
        },
    },
};
</script>

<style>
.overview-main {
    display: flex;
    justify-content: center;
}
.overview-main #main {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
}
.overview-head button span {
    color: rgba(255, 255, 255, 0.6);
}
.overview-head button.active span {
    /* color: #023dff; */
    /* color: rgb(43, 42, 42); */
    color: #0c7df1;
    font-weight: 600;
}
</style>