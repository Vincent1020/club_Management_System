    <script setup>
    import adminHeader from '@/components/adminHeader.vue'
    import {ref} from 'vue'


    let name = ref("")
    let pwd = ref("")
    let pwd2 = ref("")
    let email  = ref("")
    let status = ref("")

    let errmsg = ref("")

    let accountarr = ref([])
    let teacherAccount = ref({
        name: name,
        pwd: pwd,
        email: email,
        status: status
    })

    let clearForm = ()=>{
        name.value = ""
        pwd.value = ""
        pwd2.value = ""
        email.value = ""
        status.value = ""
      
    }

    function submit(){
        if(pwd.value != pwd2.value){
            errmsg.value = ("密碼不一致")
            return
        }
        else if(name.value == "" ){
            errmsg.value = ("請輸入姓名")
            return
        }
        else if(!isNaN(name.value )){
            errmsg.value = ("姓名請輸入文字")
            return
        }
        else if(pwd.value == ""){
            errmsg.value =("請輸入密碼")
            return
        }
        else if(pwd2.value == ""){
            errmsg.value =("請再次輸入密碼")
            return
        }
        else if(email.value == "" || !email.value.includes("@")){
            errmsg.value = ("請輸入有效的電子信箱")
            return
        }
        else if (status.value == ""){
            errmsg.value = ("請選擇狀態")
            return
        }
        console.log(teacherAccount.value)
        fetch("http://localhost:8080/teacherDatabase/createOrUpdate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teacherAccount)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    accountarr.value = data.quizList
                    console.log(accountarr.value);
                    errmsg.value = ("新增成功")
               
                    clearForm()

                 
                })
                .catch(err => { 
                    console.log(err) 
                    errmsg.value = ("新增失敗")
                })


    }
    </script>

    <template>

        <body>
            <adminHeader />

            <div class="breadcrumb">
                <ul>
                    <li><a href="/adminhomepage">管理者首頁</a> ></li>
                    <li><a href="/adminhomepage/searchteacheraccount">搜尋老師帳號</a> ></li>
                    <li>&nbsp;新增老師帳號</li>
                </ul>
            </div>

            <div class="area">
                <div class="information">
                    <div class="area2">
                    
                        <div class="name">
                            <h2>姓名</h2>
                            <input type="text" v-model="name" placeholder="請輸入老師姓名">
                        </div>

                        <div class="pwd">
                            <h2>密碼</h2>
                            <input type="password" v-model="pwd" placeholder="請輸入密碼">
                        </div>

                        <div class="pwd2">
                            <h2>再次輸入密碼</h2>
                            <input type="password" v-model="pwd2" placeholder="請再次輸入密碼">
                        </div>

                        <div class="email">
                            <h2>E-mail</h2>
                            <input type="text" v-model="email" placeholder="請輸入信箱">
                        </div>
                        <div class="state">
                            <h2>狀態</h2>
                            <select v-model="status" name="" id="">
                                <option value="" >請選擇</option>
                                <option value="未到職">未到職</option>
                                <option value="在職">在職</option>
                            </select>
                            <span>{{ errmsg }}</span>
                        </div>
                      
                        <button @click="submit">提交</button>
                    </div>
                </div>

            </div>


        </body>
    </template>

    <style scoped lang="scss">
    body {
        background-color: #fff;
    }
    .breadcrumb {
        width: 30vw;
        position: absolute;
        color: rgb(82, 87, 99);
        left: 15vw;
        top: 5vh;

        ul{
            display: flex;
            list-style: none;
            font-size: 1.1em;
            a{
                text-decoration: none;
                color: rgb(51, 68, 161);
            }
        }
    

    }
    .area {
        width: 84vw;
        height: 100vh;
        padding-top: 13vh;
        margin-left: 16vw;
        color: black;

        
            .information {
                width: 50vw;
                height: 70vh;
                margin-top: 7vh;
                margin-left: 15vw;
                border-radius: 1em;
                background-color: rgba(240, 247, 250, 0.863);
                h2{
                    margin-top: 1.5vh;
                    margin-bottom: 1vh;
                }
                .area2{
                padding-top: 1vh;
                padding-left: 5vw;
                h1{
                    margin-left: 13vw;
                }
                
                }
            }

            input {
                font-size: 20px;
                height: 5vh;
                width: 30vw;
                border: 1px solid #585858;
                border-radius: 0.2em;

            }

            select {
                font-size: 18px;
            }

            option {
                font-size: 17px;
            }
            button{
                width: 7vw;
                height: 4vh; 
                margin-left: 33vw;
                font-size: 18px;

                &:hover{
                    cursor: pointer;
                }
            }
            .state{
                span{
                    font-size: 18px;
                    color: red;
                    margin-left: 18vw;
                    
                }
            }
    }
    </style>