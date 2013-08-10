@angular.module('RestateDirectives')
  .directive 'rePager', ($compile)->
    restrict: 'AC'
    replace: true
    scope: 
      numberOfPages: '='
      currentPage: '='

    link: (scope, element, attrs)->
      pages = []
      scope.goTo = (page)->
        scope.currentPage = page
        angular.element(pages[page]).css 'background', '#000000'
      scope.$watch 'numberOfPages', ->
        if scope.numberOfPages > 1
          allPages = document.createElement('div')
          for i in [1..scope.numberOfPages]
            pages[i] = document.createElement('div')
            angular.element(pages[i]).attr 'ng-click', "goTo("+i+")"
            angular.element(pages[i]).css
              width: '10px'
              height: '10px'
              border: '1px solid'
              float: 'left'
              'margin-left': '2px'
              'border-radius': '10px'
            angular.element(allPages).append(pages[i])
          element.append $compile(allPages)(scope)
      scope.$watch 'currentPage', ->
        if scope.numberOfPages > 1
          for i in [1..scope.numberOfPages]
            angular.element(pages[i]).css 'background', '#ffffff'
          angular.element(pages[scope.currentPage]).css 'background', '#000000'

# @angular.module('RestateDirectives')
#   .directive 'rePager', ->
#     restrict: 'AC'
#     replace: true
#     scope: 
#       numberOfPages: '='

#     template: '
#       <div ng-repeat="p in pages">
#         <div style="width: 10px;height:10px;border:1px solid;float:left;margin-left:2px;border-radius:10px"
#         ng-click="goTo(p, event)"></div>
#       </div>



#     '
#     link: (scope, element, attrs)->
#       scope.pages = []
#       scope.$watch 'numberOfPages', -> 
#         console.log scope.numberOfPages 
#         if scope.numberOfPages > 1
#           for i in [1..scope.numberOfPages]
#             pages.push i
#       scope.$watch 'currentPage', ->
#         if scope.numberOfPages > 1
#           for i in [1..scope.numberOfPages]
#             angular.element(pages[i]).css 'background', '#ffffff'
#           angular.element(pages[scope.currentPage]).css 'background', '#000000'
#       scope.goTo = (page, element)->
#         console.log page
#         scope.currentPage = page
#         angular.element(event.target).css 'background', '#000000'


# @angular.module('RestateDirectives')
#   .directive 'rePager', ->
#     restrict: 'AC'
    
#     scope: {
#       numberOfPages: '='
#       currentPage: '='
#     }
#     link: (scope, element, attrs)=>
#       scope.pager = {}
#       pages = []
#       scope.$watch 'numberOfPages', -> 
#         console.log scope.numberOfPages 
#         if scope.numberOfPages > 1
#           for i in [1..scope.numberOfPages]
#             pages[i] = document.createElement('span')
#             angular.element(pages[i]).attr 'ng-click', "goTo("+i+")"
#             angular.element(pages[i]).css
#               width: '10px'
#               height: '10px'
#               border: '1px solid'
#               float: 'left'
#               'margin-left': '2px'
#               'border-radius': '10px'
#             element.append(pages[i])
#       scope.$watch 'currentPage', ->
#         if scope.numberOfPages > 1
#           for i in [1..scope.numberOfPages]
#             angular.element(pages[i]).css 'background', '#ffffff'
#           angular.element(pages[scope.currentPage]).css 'background', '#000000'
#       scope.goTo = (page)->
#         console.log page
#         scope.currentPage = page
#         angular.element(pages[page]).css 'background', '#e9e9e9'
#       return