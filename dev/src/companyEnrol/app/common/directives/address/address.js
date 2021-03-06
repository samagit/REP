/**
 * Created by dkilty on 5/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('address', [
            'countrySelect',
            'dataLists',
            'hpfbConstants'
        ])
})();

(function () {
    'use strict';

    angular
        .module('address')
        .directive('hpfbAddress', address);

    address.$inject = ['$parse','$translate'];

    /* @ngInject */
    function address($parse) {
        var directive = {
            bindToController: true,
            controller: AddressCtrl,
            controllerAs: 'vm',
            link: link,
            replace: true,
            templateUrl: 'app/common/directives/address/addressRecord.html',
            restrict: 'E',
            scope: {
                addressRecord: '='
            },

        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

    AddressCtrl.$inject = [
        '$scope',
        'getCountryAndProvinces',
       '$translate',
        'CANADA',
        'USA'
    ];

    /* @ngInject */
    function AddressCtrl($scope, dataLists,$translate,CANADA,USA) {
        var vm = this;
        vm.hideProvinceText=false;
        vm.hideProvinceDdl;
        vm.provListLabel;
        vm.postalLabel;
        vm.postalPattern;
        vm.postalRequired;
        vm.provinces;
        vm.countryValue;
        vm.provinceTextState = setProvinceTextState;
        vm.setPostalRequired=setPostalRequired;
        vm.isCanada
       // vm.isUSA=isUSA;
        $scope.$watch('vm.addressRecord.country', function (current, original) {
            setCountry(current)
            vm.provinceTextState();
            setProvinceList();
            setPostalLabel();
            setPostalRequired();
            console.trace("is instn after" + vm.postalRequired)
            setProvinceStateList();
            vm.isCanada=isCanada();
        }, true);
        function setCountry(value){
            vm.countryValue=value;

        }
        function getCountry(){
            return(vm.countryValue);
        }
        function isCanada(){
            return(getCountry()===CANADA)
        }
        function isUSA(){
            return(getCountry()===USA)
        }

        function setProvinceTextState() {
            if (!vm.addressRecord) {
                vm.hideProvinceText = "false";
            } else if (vm.addressRecord.country === CANADA || vm.addressRecord.country === USA) {
                vm.hideProvinceText = true;
                vm.addressRecord.stateText = null;

            } else {
                vm.hideProvinceText = false;
                vm.addressRecord.stateList = null;
            }
            vm.hideProvinceDdl = !vm.hideProvinceText;
        }

        function setPostalRequired() {
            var countryVal=getCountry();
            if (!vm.addressRecord) {
                vm.postalRequired = false;
                vm.postalRequiredLabel=""

            } else if (countryVal === CANADA || countryVal === USA) {
                vm.postalRequired = true;
                $translate('REQUIRED').then(function (req) {
                    vm.postalRequiredLabel=req;
                });

            } else {
                vm.postalRequired = false;
                vm.postalRequiredLabel=""
            }
        }

        function setProvinceStateList() {

            if (!vm.addressRecord) return;
            var countryVal=getCountry();
            if (countryVal === CANADA) {
                vm.provinces = dataLists.getProvinces();

            }
            else if (countryVal === USA) {
                vm.provinces = dataLists.getUSStates();
            }

        }
        function setProvinceList() {
            var countryVal=getCountry();
            if (!vm.addressRecord) {
                vm.provListLabel = "PROVINCE";
            } else if (countryVal === USA) {
                vm.provListLabel = "STATE";
            } else {
                vm.provListLabel = "PROVINCE";
            }
        }
        function setPostalLabel() {
            var countryVal=getCountry();
            if (!vm.addressRecord) {
                vm.postalLabel = "POSTAL";
            } else if (countryVal === USA) {
                vm.postalLabel = "ZIP";
            } else {
                vm.postalLabel = "POSTAL";
            }
        }

        function sPostalPattern() {
            if (!vm.addressRecord) {
                vm.postalPattern = null;
                var countryVal=getCountry();
            } else if (countryVal === USA) {
                vm.postalPattern = /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/;
            } else if (countryVal === CANADA) {
                vm.postalPattern = "[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]";
            } else {
                vm.postalPattern = null;
            }
        }

    }//end ctrl

})();

