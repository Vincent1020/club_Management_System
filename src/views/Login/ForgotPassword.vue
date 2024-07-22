<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
let router = useRouter()

let oldpwd = ref("")
let pw1 = ref("")
let pw2 = ref("")
let errmsg = ref("")
let account = ref()

onMounted(() => {
    account.value = sessionStorage.getItem('account')
    console.log(account.value);
})


function reset() {

    let resetfetch = ""
    let resetpwd = {}
    if (!oldpwd.value) {
        errmsg.value = "請輸入舊密碼"
    }
    else if (!pw1.value || !pw2.value) {
        errmsg.value = "請輸入新密碼"
        return
    }
    else if (pw1.value != pw2.value) {
        errmsg.value = "新密碼不一致"
        return
    }

    if (account.value.length < 5) {

        resetpwd = {
            teacherId: account.value,
            old_password: oldpwd.value,
            new_password: pw1.value

        }
        resetfetch = "http://localhost:8080/teacherDatabase/updatePassword"

    }
    else if (account.value.length >= 5) {
        resetpwd = {
            student_id: account.value,
            old_password: oldpwd.value,
            new_password: pw1.value
        }
        resetfetch = "http://localhost:8080/student/updatePassword"
    }
    console.log(resetfetch);
    console.log(resetpwd);

    fetch(resetfetch, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetpwd)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.statusCode == 200) {
                errmsg.value = ("修改成功")
                router.push({ path: '/login' })

            }
            else {
                errmsg.value = ("修改密碼失敗，請稍後在試")
            }

        })

        .catch(err => {
            console.log(err)
            errmsg.value = ("伺服器錯誤，請稍後再試")

        })

}

</script>

<template>

    <body>

        <div class="center">
            <!-- 輸入舊密碼 -->
            <div class="oldpwd pw">
                <h2>請輸入舊密碼</h2>
                <form>
                    <input type="password" v-model="oldpwd" required>
                </form>
            </div>

            <!-- 輸入密碼 -->
            <div class="pwd1 pw">

                <h2>請輸入新密碼</h2>
                <form>
                    <input type="password" v-model="pw1" required>
                </form>
            </div>

            <!-- 再次輸入密碼 -->
            <div class="pwd2 pw">
                <h2>再次輸入新密碼</h2>
                <form>
                    <input type="password" v-model="pw2" required>
                </form>
                <p>{{ errmsg }}</p>

            </div>

            <!-- 功能選項 -->
            <div class="function">

                <input type="button" @click="reset" value="更新密碼">

            </div>


        </div>
    </body>
</template>

<style scoped lang="scss">
body {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #cce3f5
}

.center {
    width: 40vw;
    height: 50vh;
    background-color: white;
    border-radius: 1em;
    position: fixed;
    top: 25%;
    left: 30%;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;



    .pw {
        width: 60%;
        height: 25%;

        input {
            font-size: 1.5em;
            margin-top: 1vh;
            height: 5vh;
            width: 20vw;
        }


        p {
            font-size: 20px;

            color: red;
        }

    }

    .oldpwd {
        margin-top: 2vh;
    }

    .function {

        margin-top: 2.5vh;
        margin-left: 22vw;

        input {
            width: 11vw;
            height: 5.5vh;
            font-size: 1.7em;
            border-radius: 10px;
            cursor: pointer;
        }
    }

}
</style>