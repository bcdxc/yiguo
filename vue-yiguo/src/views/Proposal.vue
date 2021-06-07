<template>
    <div class="proposal">
        <div class="proposal-head">
            <span>用户建议（反馈）</span>
            <i
                class="icon-ic_refresh iconfont myicon"
                ref="needRotate"
                @click="needRotate"
            ></i>
        </div>
        <div class="proposal-main">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                    prop="orderNum"
                    label="序号"
                    width="100"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="user"
                    label="用户名"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="创建时间"
                    width="250"
                    align="center"
                >
                </el-table-column>
                <el-table-column prop="content" label="内容"> </el-table-column>
            </el-table>
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
            timeout: null,
        };
    },
    created() {
        this.getProposal();
    },

    methods: {
        // 获取服务器 proposal 的数据
        async getProposal() {
            await axios({
                method: "get",
                url: "http://localhost:3006/suggest",
            }).then((res) => {
                let temArr = res.data;
                if (temArr.length > 1) {
                    temArr.sort((a, b) => b.date - a.date);
                    for (let i = 0; i < temArr.length; i++) {
                        temArr[i].date = moment(temArr[i].date).format(
                            "YYYY-MM-DD, HH:mm:ss"
                        );
                        temArr[i].orderNum = i + 1;
                    }
                } else {
                    temArr[0].date = moment(temArr[0].date).format(
                        "YYYY-MM-DD, HH:mm:ss"
                    );
                    temArr[0].orderNum = 1;
                }
                this.tableData = temArr;
            });
        },
        needRotate() {
            // DOM.classList.add("类名"); //添加类名
            // DOM.classList.remove("类名"); //删除类名
            if (!this.timeout) {
                this.timeout = 1;
                this.$refs.needRotate.classList.add("rotate");
                // 更新数据
                this.tableData = [];
                setTimeout(() => {
                    this.getProposal();
                }, 400);
                setTimeout(() => {
                    // 防抖
                    this.$refs.needRotate.classList.remove("rotate");
                    this.timeout = null;
                }, 1000);
            }
        },
    },
};
</script>

<style>
.proposal {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
.proposal-head,
.proposal-main {
    width: 1100px;
}
.proposal-head {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 1.5px;
    font-weight: 400;
    color: #606266;
    margin: 0 0 30px 0;
    position: relative;
}
</style>