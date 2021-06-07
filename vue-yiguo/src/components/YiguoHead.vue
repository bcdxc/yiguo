<template>
    <div class="yiguo-head">
        <div class="head-left">
            <img src="../assets/images/logo1.png" alt="" />
            <span class="title">易锅美食管理系统</span>
        </div>
        <div class="head-right">
            <span class="user">{{ user }}</span>
            <el-button class="logout" @click="logout" type="text">退出登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: "",
        };
    },
    created() {
        this.user = sessionStorage.getItem("user");
    },
    methods: {
        logout() {
            // 我们在等出的时候：1. 要清除在浏览器中存储的登录状态 2. 跳到登录页
            sessionStorage.clear();
            // 清除所有 sessionStorage
            this.$router.push("/login");
        },
    },
};
</script>

<style>
.yiguo-head {
    height: 60px;
    padding: 0 100px;
    display: flex;
    justify-content: space-between;
    /* background-color: #f9f9f9; */
    background-color: #fcfcfc;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 8%);
}
.yiguo-head .head-left {
    font-size: 24px;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}
.yiguo-head .head-left .title {
    margin-left: 15px;
}
.yiguo-head .head-left img{
    height: 65%;
}
.head-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head-right .user {
    font-size: 18px;
    letter-spacing: 1.5px;
    font-weight: 400;
    color: #606266;
}
.head-right .logout {
    padding-bottom: 9px;
}
</style>