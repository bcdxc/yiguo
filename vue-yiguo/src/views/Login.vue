<template>
    <div class="login">
        <div class="yiguo-head2">
            <div class="head-left">
                <img src="../assets/images/logo1.png" alt="" />
                <span class="title"
                    ><span class="title-name">易锅美食</span>管理系统</span
                >
            </div>
            <div class="head-right"></div>
        </div>
        <div class="login-main">
            <div class="login-con">
                <div class="left">
                    <div class="mask">
                        <h2>易锅美食</h2>
                        <p>
                            “易锅美食”锅底经过不断探索、改良、刻苦钻研，结合现代营养学，应用最新烹饪技术精心熬制而成。本团队力图将“易锅美食”品牌塑造成民族餐饮行业的“百年老店”，立志为中国餐饮行业的发展做出贡献。
                        </p>
                        <p class="slogan">
                            致我们的团队：精诚团结，服务创新！置信自己，置信团队！
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div class="right-top">
                        <p class="slogan">一道美味，口口传香</p>
                        <span>欢迎来到易锅美食管理系统，请登录！</span>
                    </div>
                    <el-form
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="账号" prop="username">
                            <el-input
                                type="text"
                                v-model="ruleForm.username"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="密码"
                            prop="password"
                            class="button-item"
                        >
                            <el-input
                                type="password"
                                show-password
                                v-model="ruleForm.password"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item class="button-item">
                            <el-button type="primary" @click="login"
                                >登 录</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <YiguoFoot class="foot" /> -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
// import YiguoFoot from '../components/YiguoFoot.vue';
export default {
    // components: { YiguoFoot },
    data() {
        return {
            ruleForm: {
                username: "",
                password: "",
            },
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
            },
        };
    },
    methods: {
        async login() {
            await axios({
                method: "get",
                url: "http://localhost:3006/manager",
            }).then((res) => {
                const loginStatus = res.data.find(
                    (item) =>
                        item.username === this.ruleForm.username &&
                        item.password === this.ruleForm.password
                );
                console.log(loginStatus);
                if (loginStatus) {
                    console.log("登录成功！");
                    sessionStorage.setItem("isLogin", true);
                    sessionStorage.setItem("user", this.ruleForm.username);
                    this.$router.push("/");
                } else {
                    this.$message({
                        message: "账号或密码不正确，请检查！",
                        center: true,
                        type: "error",
                    });
                }
            });
        },
    },
};
</script>
<style scoped>
.login {
    height: 100vh;
    background-color: #f9f7f1;
    overflow: hidden;
}
.yiguo-head2 {
    height: 60px;
    padding: 0 100px;
    display: flex;
    justify-content: space-between;
    background-color: #f9f7f1;
    margin-bottom: 20px;
}
.yiguo-head2 .head-left {
    font-size: 24px;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}
.yiguo-head2 .head-left .title {
    margin-left: 15px;
    color: #000;
    font-weight: 400;
}
.login-main {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}
.login-con {
    width: 900px;
    height: 500px;
    background-color: #fff;
    display: flex;
    box-shadow: 0px 20px 40px 0px rgb(0 0 0 / 15%);
}
.login-con .left {
    width: 374px;
    background: url("../assets/images/轮播背景/loginbg55.png") no-repeat center
        center/100%;
}
.login-con .left .mask {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    user-select: none;
    color: #4b1502;
}
.login-con .left h2 {
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 4px;
    padding-top: 24px;
    text-align: center;
    line-height: 50px;
}
.login-con .left p {
    text-indent: 20px;
    padding: 10px 22px 0;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1px;
    opacity: 0.9;
}
.login-con .left .slogan {
    padding-top: 5px;
}
.right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
}
.right .right-top {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.right .right-top .slogan {
    font-size: 32px;
    color: #4b1502;
}
.right .right-top span {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    line-height: 22px;
}
.demo-ruleForm {
    width: 360px;
    height: 200px;
    margin-left: -45px;
}
.demo-ruleForm .button-item {
    margin-top: 30px;
}
.demo-ruleForm .button-item button {
    width: 100%;
    /* text-align: center; */
}
.login-main .foot {
    margin-top: 60px;
}
</style>