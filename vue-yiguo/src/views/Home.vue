<template>
    <div class="home">
        <YiguoHead />
        <div class="home-main">
            <div class="aside-nav">
                <el-radio-group
                    v-model="isCollapse"
                    style="margin-bottom: 20px"
                >
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                    router
                >
                    <!-- 管理员导航 -->
                    <el-menu-item index="1" :route="{ name: 'Manager' }">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">管理员列表</span>
                    </el-menu-item>
                    <!-- 分类导航 -->
                    <el-menu-item index="2" :route="{ name: 'Classify' }">
                        <i class="el-icon-menu"></i>
                        <span slot="title">分类管理</span>
                    </el-menu-item>
                    <!-- 商品导航 -->
                    <el-menu-item index="3" :route="{ name: 'Goods' }">
                        <i class="el-icon-s-goods"></i>
                        <span slot="title">商品管理</span>
                    </el-menu-item>
                    <!-- 订单管理 -->
                    <el-menu-item index="4" :route="{ name: 'Order' }">
                        <i class="el-icon-document"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>
                    <!-- 销售管理 -->
                    <el-menu-item index="5" :route="{ name: 'Overview' }">
                        <i class="el-icon-set-up"></i>
                        <span slot="title">销售总览</span>
                    </el-menu-item>
                    <!-- 投诉管理 -->
                    <el-menu-item index="6" :route="{ name: 'Proposal' }">
                        <i class="el-icon-connection"></i>
                        <span slot="title">建议反馈</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <router-view class="aside-con" />
        </div>
    </div>
</template>

<script>
import YiguoHead from "../components/YiguoHead.vue";
export default {
    components: { YiguoHead },
    name: "Home",
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>
<style scoped>
.home {
    width: 100%;
    height: calc(100% - 80px);
}

.home-main {
    display: flex;
}
.aside-nav {
    height: 100%;
    box-sizing: border-box;
    padding-left: 20px;
}
.home-right {
    display: flex;
    flex-direction: column;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
}
.aside-con {
    width: 100%;
    margin-left: 30px;
    padding-right: 30px;
}
</style>