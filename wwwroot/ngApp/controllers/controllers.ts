namespace SmallWorld.Controllers {

    export class HomeController {
        public warehouses;
        public employees;
        public items;

        constructor(public $http: ng.IHttpService) {
            $http.get('api/warehouse').then((res) => {
                this.warehouses = res.data;
                console.log(res);
            });
            $http.get('api/employee').then((res) => {
                this.employees = res.data;
                console.log(res);
            });
            $http.get('api/item').then((res) => {
                this.items = res.data;
                console.log(res);
            });
        }
    }

    export class WarehouseController {
        public checkoutMenu;
        public checkInMenu;
        public checking;
        public checkoutStatus;
        public checkInStatus;
        public warehouses;
        public employees;
        public items;
        public warehouse;
        constructor(public $http: ng.IHttpService, public $state: ng.ui.IStateService, public $stateParams: ng.ui.IStateParamsService) {
            this.checkoutMenu = false;
            this.checkInMenu = false;
            this.checking = false;
            this.checkoutStatus = "";
            this.checkInStatus = "";
            if (!$stateParams['id']) {
                $http.get('api/warehouse').then((res) => {
                    this.warehouses = res.data;
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                $http.get(`api/warehouse/${$stateParams['id']}`).then((res) => {
                    this.warehouse = res.data;
                    console.log(this.warehouse);
                })

                $http.get('api/employee').then((res) => {
                    this.employees = res.data;
                })

                $http.get(`api/item/${this.$stateParams['id']}`).then((res) => {
                    this.items = res.data;
                })
            }
        }

        public postNewWarehouse(warehouse) {
            this.$http.post('api/warehouse', warehouse).then((res) => {
                console.log(res);
                this.$state.reload();
            });
        }

        public postNewItem(item) {
            this.$http.post(`api/item/${this.$stateParams['id']}`, item).then((res) => {
                console.log(res);
                this.$state.reload();
            });
        }

        public checkoutItem(item) {
            this.$http.post('api/warehouse/checkout', item).then((res) => {
                this.checkoutStatus = "Item checkout complete.";
                this.$http.get(`api/warehouse/${this.$stateParams['id']}`).then((res) => {
                    this.items = res.data;
                });
            }).catch((err) => {
                this.checkoutStatus = "Item checkout failed... Try again.";
            });
        }

        public checkInItem(item) {
            this.$http.post('api/warehouse/checkin', item).then((res) => {
                this.checkInStatus = "Item check in complete.";
                this.$http.get(`api/warehouse/${this.$stateParams['id']}`).then((res) => {
                    this.items = res.data;
                });
            }).catch((err) => {
                this.checkInStatus = "Item check in failed... Try again.";
            });
        }
    }


    export class SecretController {
        public secrets;

        constructor($http: ng.IHttpService) {
            $http.get('/api/secrets').then((results) => {
                this.secrets = results.data;
            });
        }
    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
