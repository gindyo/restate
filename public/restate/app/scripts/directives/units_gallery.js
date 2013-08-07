(function() {
  this.angular.module('RestateDirectives').directive('reUnitsGallery', function($timeout, $dialog) {
    return {
      restrict: 'AC',
      scope: {
        units: '=',
        openUnit: '&',
        progressBar: '='
      },
      template: '\
    <div style="width: 800px; float: left">\
      <div ng-repeat="unit in page_units" class="units_gallery_inner" style="margin: 5px; float: left" >\
        <div re-unit unit="unit" on-unit-clicked = "open_unit" unit-width ="unit.width"></div>\
      </div>\
    </div>\
    ',
      compile: function(element, attrs) {
        var d, link, progress, progress_wrap;
        if (attrs.progressBar) {
          progress_wrap = document.createElement('div');
          progress_wrap.setAttribute('class', 'modal');
          progress = document.createElement('span');
          progress.setAttribute('class', "progress progress-striped active");
          progress.setAttribute("percent", "percent");
          progress.setAttribute("progress", '');
          angular.element(progress_wrap).append(progress);
          angular.element(progress_wrap).css({
            'width': '400px',
            'margin-top': '100px',
            'padding': '20px',
            'left': '50%',
            'text-align': 'center'
          });
          element.append(progress_wrap);
          d = $dialog.messageBox('Loading...', 'Loading...');
          d.open();
        }
        link = function(scope, element, attrs) {
          var delay, setA, stopProgress;
          scope.percent = 0;
          stopProgress = false;
          delay = 5;
          setA = function() {
            if (scope.percent > 100) {
              scope.percent = 0;
            } else {
              scope.percent = scope.percent + .3;
            }
            if (stopProgress === false) {
              return $timeout(setA, delay);
            }
          };
          if (attrs.progressBar) {
            $timeout(setA, delay);
          }
          scope.$watch('units', function() {
            if (scope.units.length > 0) {
              return scope.page_units = scope.units;
            }
          });
          return scope.$watch('percent', function() {
            if (scope.percent > 20 && scope.units.length > 0) {
              d.close();
              stopProgress = true;
              return angular.element(progress_wrap).remove();
            }
          });
        };
        return link;
      }
    };
  });

}).call(this);
