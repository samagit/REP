/**
 * Created by dkilty on 07/06/2016.
 */

(function () {
    'use strict';
    angular
        .module('filterLists', ['hpfbConstants']);
})();

(function () {
    'use strict';

    angular
        .module('filterLists')
        .filter('orderByTranslatedCountry', ['$translate', '$filter','CANADA','USA', function ($translate, $filter,CANADA,USA) {
            return function (array, objKey) {
                var result = [];
                var translated = [];
                angular.forEach(array, function (value) {
                    translated.push({
                        key: value,
                        label: $translate.instant(value)
                    });
                });
                result.push(CANADA);
                result.push(USA);
                angular.forEach($filter('orderBy')(translated, 'label'), function (sortedObject) {
                    if (sortedObject.key !== CANADA && sortedObject.key !== USA) {
                        result.push(sortedObject.key);
                    }
                });
                return result;
            };
        }])
        .filter('orderByTranslated', ['$translate', '$filter', function ($translate, $filter) {
            return function (array, objKey) {
                var result = [];
                var translated = [];
                angular.forEach(array, function (value) {
                    translated.push({
                        key: value,
                        label: $translate.instant(value)
                    });
                });
                angular.forEach($filter('orderBy')(translated, 'label'), function (sortedObject) {
                    result.push(sortedObject.key);
                });
                return result;
            };
        }]);
})();
