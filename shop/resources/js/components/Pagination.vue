<template>
    <div class="pagination-wrap">
        <nav aria-label="Page navigation" v-if="pagination.total > pagination.per_page" class="pagination-row">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': pagination.current_page == 1 }">
                    <a href="#" class="page-link" @click.prevent="loadPage(pagination.url)" rel="first">
                        <<
                    </a>
                </li>
                <li class="page-item" :class="{ 'disabled': pagination.current_page == 1 }">
                    <a href="#" class="page-link" @click.prevent="loadPage(pagination.previous_page_url)" rel="prev">
                        <
                    </a>
                </li>

                <li v-for="num in links" class="page-item" :class="{'active': num == pagination.current_page}">
                    <a href="#" class="page-link" @click.prevent="changePage(num)">{{ num }}</a>
                </li>

                <li class="page-item" :class="{ 'disabled': pagination.current_page == pagination.last_page }">
                    <a href="#" class="page-link" @click.prevent="loadPage(pagination.next_page_url)" rel="next">
                        >
                    </a>
                </li>
                <li class="page-item" :class="{ 'disabled': pagination.current_page == pagination.last_page }">
                    <a href="#" class="page-link" @click.prevent="loadPage(pagination.last_page_url)" rel="last">
                        >>
                    </a>
                </li>
            </ul>
            <div>{{ pagination.first_item }} - {{ pagination.last_item }} of {{ pagination.total }} records</div>
        </nav>
        <div v-if="pagination.total <= 15" >{{ pagination.total }} records</div>
    </div>

</template>

<script>
    export default {

        props: {
            pagination: {
                type: Object,
                required: true
            },

            offset: {
                type: Number,
                default: 4
            }
        },

        data() {
            return {
                links: []
            }
        },

        watch: {
            'pagination': function () {
                this.updateLinks()
                this.getLastPageUrl()
            }
        },

        methods: {

            changePage: function (number) {
                let page = this.pagination.url.replace(/page=\d/, `page=${number}`)
                this.loadPage(page)
            },

            loadPage(page) {
                //this.showLoader()
                this.$http.post(page).then(response => {
                    //this.hideLoader()
                    this.$parent.items = response.data.items
                    this.$parent.pagination = response.data.pagination
                }, error => {
                    //this.hideLoader()
                    sweetAlert({
                        title: 'Error',
                        text: 'Unable to retrieve page',
                        type: 'error',
                        timer: 1500,
                        showConfirmButton: false
                    })
                    $this.$emit('errors', 'Unable to retrieve page')
                });
            },

            updateLinks() {

                if (!this.pagination.total) {
                    return [];
                }

                var from = this.pagination.current_page - this.offset

                if (from < 1) {
                    from = 1
                }

                var to = from + (this.offset * 2)

                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page
                }

                let arr = []

                while (from <= to) {
                    arr.push(from)
                    from++
                }

                this.links = arr

            },

            getLastPageUrl() {
                this.pagination.last_page_url = this.pagination.url.replace(/page=\d/, `page=${this.pagination.last_page}`)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .fa.fa-chevron-right,
    .fa.fa-chevron-left{
        font-size: 0.875rem;
    }
    .fa.fa-angle-double-right,
    .fa.fa-angle-double-left{
        font-size: 1rem;
    }
    .pagination-wrap, nav , nav div{
        width: 100%;
        text-align: center;
    }
    .pagination {
        align-items: center;
        justify-content: center;
    }
</style>
