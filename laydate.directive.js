(function() {
  'use strict';

  angular.module('jxLaydate', [])
    .directive('jxLaydate', function() {
      //http://www.layui.com/laydate/
      //http://www.layui.com/doc/modules/laydate.html
      //http://www.layui.com/demo/laydate.html
      return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
          ngModel: '=',
          dateOptions: '='
        },
        link: function(scope, element, attr, ngModel) {
          scope.dateOptions = scope.dateOptions ? scope.dateOptions : {};
          if (scope.dateOptions.minDate === 'now') {
            scope.dateOptions.minDate = moment(new Date()).format('yyyy-MM-dd HH:mm:ss');
          }
          if (scope.dateOptions.maxDate === 'now') {
            scope.dateOptions.maxDate = moment(new Date()).format('yyyy-MM-dd HH:mm:ss');
          }
          var config = {};

          // 初始化参数
          config = {
            elem: '#' + attr.id,
            type: scope.dateOptions.type ? scope.dateOptions.type : 'date', //日期格式
            range: scope.dateOptions.range ? scope.dateOptions.range : false, //如果不为空，则会进行区域选择，例如" true （默认 - ）"， " 至 "，" ~ "，" To "
            format: scope.dateOptions.format ? scope.dateOptions.format : 'yyyy-MM-dd', //日期格式
            value: scope.ngModel ? scope.ngModel : null,
            min: scope.dateOptions.minDate ? scope.dateOptions.minDate : '1900-01-01 00:00:00', //最小日期 或者 "1900-01-01" 或者 "10:30:25"
            max: scope.dateOptions.maxDate ? scope.dateOptions.maxDate : '2099-12-31 23:59:59', //最大日期 或者 "2099-12-31" 或者 "16:35:25"
            trigger: 'click',
            zIndex: 1000, //弹出层的层级高度
            showBottom: scope.dateOptions.showBottom ? scope.dateOptions.showBottom : true, //是否显示底部栏
            lang:'cn',//cn（中文版）、en（国际版，即英文版）
            theme: '#205081',//可自己设置
            calendar: scope.dateOptions.calendar ? scope.dateOptions.calendar : false, //是否显示公历节日
            mark: {}, //标注重要日子
            ready: function(date) { //控件在打开时触发，回调返回一个参数：初始的日期时间对象
              console.log('ready', date); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            },
            change: function(value, date, endDate) { //年月日时间被切换时都会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
              console.log('change-value', value); //得到日期生成的值，如：2017-08-18
              console.log('change-date', date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
              console.log('change-endDate', endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
              scope.$apply(function() {
                scope.ngModel = value;
              });
            },
            done: function(value, date, endDate) { //点击日期、清空、现在、确定均会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
              console.log('done-value', value); //得到日期生成的值，如：2017-08-18
              console.log('done-date', date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
              console.log('done-endDate', endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
              scope.$apply(function() {
                scope.ngModel = value;
              });
            }
          };
          // 初始化
          laydate.render(config);
        }
      }
    })
}());
