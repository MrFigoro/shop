import Pagination from "../components/Pagination.vue";
import Search from "../mixins/search";

Vue.component('users', {

    components: {Pagination},

    mixins: [Search],

    props: {
        search_path: {
            type: [String, Number],
        },
        activation_path: {
            type: [String, Number],
        },
        edit_path: {
            type: [String, Number],
        },
        delete_path: {
            type: [String, Number],
        },
    },
    data: function () {
        return {
            items: [],
            pagination: {},
        }
    },
    created: function() {
        this.pagination = this.setPagination()
    },
    mounted() {
        this.formSubmitAction()
    },
    methods: {
        deleteItem(item) {
            swal({
                title: "Are you sure?",
                text: 'Delete',
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((choise) => {
                if (choise) {
                    this.$http.get(this.delete_path+'/'+item.id).then((response) => {
                        swal({
                            title: 'Deleted!',
                            text: 'Deleted',
                            icon: 'success',
                            timer: 1500,
                            buttons: false,
                            showConfirmButton: false
                        })
                        this.loadData()
                    })
                }
            });
        },
        active(item) {
            let title = 'Activation'
            let message = 'Activated'
            if (item.active){
                title = 'Deactivation'
                message = 'Deactivated'
            }
            swal({
                title: "Are you sure?",
                text: title,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((choise) => {
                if (choise) {
                    this.$http.get(this.activation_path+'/'+item.id).then(function (response) {
                        item.active = response.body.active
                        swal({
                            title: message+'!',
                            text: response.body.email,
                            icon: 'success',
                            timer: 1500,
                            buttons: false,
                            showConfirmButton: false
                        })
                    })
                }
            });
        },
        edit(item) {
            window.location = this.edit_path+'/'+item.id
        }
    }
});