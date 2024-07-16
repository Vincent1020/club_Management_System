<script setup>
import { ref, computed,defineComponent } from 'vue'
import{accountarr} from '@/components/AdminAccountManage/SearchStudentAccount.vue'
let accountarr = defineProps(["accountarr"])

let currentPage = ref(1)
let row = 10

let pageCount = computed(() =>

    Math.ceil(accountarr.value.length / row)
)

let pagenumber = computed(() => {

    let start = (currentPage.value - 1) * row
    let end = start + row
    return accountarr.value.slice(start, end)
})

function setpage(page) {
    currentPage.value = page
}
</script>

<template>
 <div class="pagenumber">
                <ul>
                    <li v-for="page in pageCount" :class="{ active: currentPage == page }" @click="setpage(page)">
                        {{ page }}
                    </li>


                </ul>
            </div>

</template>

<style scoped lang="scss">
 .pagenumber {
        position: absolute;
        bottom: 5vh;
        left: 50vw;

        ul {
            width: 5vw;
            font-size: 16px;

            display: flex;
            list-style: none;

            &:hover {
                cursor: pointer;
            }

            li {
                padding: 0.5vh 0.5vw;
                border-radius: 1em;
            }
        }

        .active {
            background-color: rgb(171, 201, 243);
            font-size: 18px;
            color: #fff;
        }

        color: black;
    }

</style>