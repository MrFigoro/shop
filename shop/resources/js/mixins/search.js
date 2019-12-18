export default {
    methods: {
        cut(value, limit) {
            if (value.length > limit) {
                return value.substring(0, (limit - 3)) + '...';
            }
            return value
        },

        setDates(dates, startDate, endDate) {
            this.search_params.dates = dates;
            this.search_params.start_date = startDate;
            this.search_params.end_date = endDate;
        },

        clearDates() {
            this.search_params.dates = '';
            this.search_params.start_date = null;
            this.search_params.end_date = null;

            $('.daterangepicker').data('daterangepicker').setStartDate(moment());
            $('.daterangepicker').data('daterangepicker').setEndDate(moment());
        },

        loadData(...options) {
            this.showLoader()

            this.$http.post(this.getSearchURL(), {params: this.searchParams()}).then(response => {
                this.hideLoader()

                if (response.data.pagination) {
                    this.items = response.data.items
                    this.pagination = response.data.pagination

                } else {
                    this.items = response.data.items
                }

                if (typeof response.data.totals != 'undefined') {
                    this.totals = response.data.totals
                }

                if (this.callbacks) {
                    if (typeof this.callbacks.searchItem == 'function') {
                        this.callbacks.searchItem(this, response.data);
                    }

                    if (typeof this.callbacks.dataWereLoaded == 'function') {
                        if (options.length) {
                            this.callbacks.dataWereLoaded(options[0].calledComponent);
                        }
                    }
                }

            }, error => {
                this.hideLoader()
                sweetAlert({
                    title: 'Error',
                    text: 'Unable to fetch data',
                    type: 'error',
                    timer: 1500,
                    showConfirmButton: false
                })
                this.$emit('errors', 'Unable to fetch data')
            });
        },

        showLoader() {

        },

        hideLoader() {

        },

        downloadData() {
            var queryString = function (obj) {
                return _.map(obj, function (v, k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(v);
                }).join('&');
            };
            window.location = this.download_path + '?' + queryString(this.searchParams());
        },

        initObject(key) {
            return (typeof apr[key] != 'undefined') ? apr[key] : {}
        },

        formSubmitAction() {
            this.setFirstPage()
            this.loadData()
        },

        setFirstPage() {
            this.pagination.current_page = 1
        },

        setPagination() {
            return {
                total: 0,
                per_page: 15,
                current_page: 1,
                last_page: 0,
                from: 1,
                to: 15
            }
        },

        setSorting(field) {
            return {
                orderField: field,
                orderDirection: 'DESC',
            }
        },

        removeEmpty(obj){
            Object.keys(obj).forEach(key =>
                (obj[key] && typeof obj[key] === 'object') && this.removeEmpty(obj[key]) ||
                (obj[key] === '' || obj[key] === null) && delete obj[key]
            );
            return obj;
        },

        getSearchURL(){
            return this.search_path+'?page='+this.pagination.current_page
        },

        searchParams() {
            return {
                page: this.pagination.current_page
            };
            let data = {}


            if (typeof(this.sorting) == 'object') {
                data.orderField = this.sorting.orderField;
                data.orderDirection = this.sorting.orderDirection;
            }

            // clone - as we need default empty values for forms
            let clonedSearchParams = JSON.parse(JSON.stringify(this.search_params))

            return _.merge(data, this.removeEmpty(clonedSearchParams))

        }
    }
}
