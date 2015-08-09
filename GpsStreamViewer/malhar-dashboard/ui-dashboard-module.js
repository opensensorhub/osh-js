angular.module("ui.dashboard", ["ui.bootstrap", "ui.sortable"]), angular.module("ui.dashboard").directive("dashboard", ["WidgetModel", "WidgetDefCollection", "$modal", "DashboardState", "$log", function(WidgetModel, WidgetDefCollection, $modal, DashboardState, $log) {
        return {
            restrict: "A",
            templateUrl: function(element, attr) {
                return attr.templateUrl ? attr.templateUrl : "template/dashboard.html"
            },
            scope: !0,
            controller: ["$scope", "$attrs", function(scope, attrs) {
                var defaults = {
                    stringifyStorage: !0,
                    hideWidgetSettings: !1,
                    hideWidgetClose: !1,
                    settingsModalOptions: {
                        templateUrl: "template/widget-settings-template.html",
                        controller: "WidgetSettingsCtrl"
                    },
                    onSettingsClose: function(result, widget) {
                        jQuery.extend(!0, widget, result)
                    },
                    onSettingsDismiss: function(reason) {
                        $log.info("widget settings were dismissed. Reason: ", reason)
                    }
                };
                scope.options = scope.$eval(attrs.dashboard), scope.options.settingsModalOptions = scope.options.settingsModalOptions || {}, _.each(["settingsModalOptions"], function(key) {
                    scope.options[key] = scope.options[key] || {}, _.defaults(scope.options[key], defaults[key])
                }), _.defaults(scope.options, defaults);
                var sortableDefaults = {
                    stop: function() {
                        scope.saveDashboard()
                    },
                    handle: ".widget-header"
                };
                scope.sortableOptions = angular.extend({}, sortableDefaults, scope.options.sortableOptions || {})
            }],
            link: function(scope) {
                function handleStateLoad(saved) {
                    scope.options.unsavedChangeCount = 0, saved && saved.length ? scope.loadWidgets(saved) : scope.defaultWidgets ? scope.loadWidgets(scope.defaultWidgets) : scope.clear(!0)
                }
                scope.defaultWidgets = scope.options.defaultWidgets, scope.widgetDefs = new WidgetDefCollection(scope.options.widgetDefinitions);
                var count = 1;
                scope.dashboardState = new DashboardState(scope.options.storage, scope.options.storageId, scope.options.storageHash, scope.widgetDefs, scope.options.stringifyStorage), scope.addWidget = function(widgetToInstantiate, doNotSave) {
                    var defaultWidgetDefinition = scope.widgetDefs.getByName(widgetToInstantiate.name);
                    if (!defaultWidgetDefinition) throw "Widget " + widgetToInstantiate.name + " is not found.";
                    var title;
                    title = widgetToInstantiate.title ? widgetToInstantiate.title : defaultWidgetDefinition.title ? defaultWidgetDefinition.title : "Widget " + count++, widgetToInstantiate = jQuery.extend(!0, {}, defaultWidgetDefinition, widgetToInstantiate);
                    var widget = new WidgetModel(widgetToInstantiate, {
                        title: title
                    });
                    scope.widgets.push(widget), doNotSave || scope.saveDashboard()
                }, scope.removeWidget = function(widget) {
                    scope.widgets.splice(_.indexOf(scope.widgets, widget), 1), scope.saveDashboard()
                }, scope.openWidgetSettings = function(widget) {
                    var options = _.defaults({}, widget.settingsModalOptions, scope.options.settingsModalOptions);
                    options.resolve = {
                        widget: function() {
                            return widget
                        }
                    };
                    var modalInstance = $modal.open(options),
                        onClose = widget.onSettingsClose || scope.options.onSettingsClose,
                        onDismiss = widget.onSettingsDismiss || scope.options.onSettingsDismiss;
                    modalInstance.result.then(function(result) {
                        onClose(result, widget, scope), scope.$emit("widgetChanged", widget)
                    }, function(reason) {
                        onDismiss(reason, scope)
                    })
                }, scope.clear = function(doNotSave) {
                    scope.widgets = [], doNotSave !== !0 && scope.saveDashboard()
                }, scope.addWidgetInternal = function(event, widgetDef) {
                    event.preventDefault(), scope.addWidget(widgetDef)
                }, scope.saveDashboard = function(force) {
                    scope.options.explicitSave ? ("number" != typeof scope.options.unsavedChangeCount && (scope.options.unsavedChangeCount = 0), force ? (scope.options.unsavedChangeCount = 0, scope.dashboardState.save(scope.widgets)) : ++scope.options.unsavedChangeCount) : scope.dashboardState.save(scope.widgets)
                }, scope.externalSaveDashboard = function() {
                    scope.saveDashboard(!0)
                }, scope.loadWidgets = function(widgets) {
                    scope.savedWidgetDefs = widgets, scope.clear(!0), _.each(widgets, function(widgetDef) {
                        scope.addWidget(widgetDef, !0)
                    })
                }, scope.resetWidgetsToDefault = function() {
                    scope.loadWidgets(scope.defaultWidgets), scope.saveDashboard()
                };
                var savedWidgetDefs = scope.dashboardState.load();
                savedWidgetDefs instanceof Array ? handleStateLoad(savedWidgetDefs) : savedWidgetDefs && "object" == typeof savedWidgetDefs && "function" == typeof savedWidgetDefs.then ? savedWidgetDefs.then(handleStateLoad, handleStateLoad) : handleStateLoad(), scope.options.addWidget = scope.addWidget, scope.options.loadWidgets = scope.loadWidgets, scope.options.saveDashboard = scope.externalSaveDashboard, scope.$on("widgetChanged", function(event) {
                    event.stopPropagation(), scope.saveDashboard()
                })
            }
        }
    }]), angular.module("ui.dashboard").directive("dashboardLayouts", ["LayoutStorage", "$timeout", "$modal", function(LayoutStorage, $timeout, $modal) {
        return {
            scope: !0,
            templateUrl: function(element, attr) {
                return attr.templateUrl ? attr.templateUrl : "template/dashboard-layouts.html"
            },
            link: function(scope, element, attrs) {
                scope.options = scope.$eval(attrs.dashboardLayouts);
                var layoutStorage = new LayoutStorage(scope.options);
                scope.layouts = layoutStorage.layouts, scope.createNewLayout = function() {
                    var newLayout = {
                        title: "Custom",
                        defaultWidgets: scope.options.defaultWidgets || []
                    };
                    return layoutStorage.add(newLayout), scope.makeLayoutActive(newLayout), layoutStorage.save(), newLayout
                }, scope.removeLayout = function(layout) {
                    layoutStorage.remove(layout), layoutStorage.save()
                }, scope.makeLayoutActive = function(layout) {
                    var current = layoutStorage.getActiveLayout();
                    if (current && current.dashboard.unsavedChangeCount) {
                        var modalInstance = $modal.open({
                            templateUrl: "template/save-changes-modal.html",
                            resolve: {
                                layout: function() {
                                    return layout
                                }
                            },
                            controller: "SaveChangesModalCtrl"
                        });
                        modalInstance.result.then(function() {
                            current.dashboard.saveDashboard(), scope._makeLayoutActive(layout)
                        }, function() {
                            scope._makeLayoutActive(layout)
                        })
                    } else scope._makeLayoutActive(layout)
                }, scope._makeLayoutActive = function(layout) {
                    angular.forEach(scope.layouts, function(l) {
                        l.active = l !== layout ? !1 : !0
                    }), layoutStorage.save()
                }, scope.isActive = function(layout) {
                    return !!layout.active
                }, scope.editTitle = function(layout) {
                    var input = element.find('input[data-layout="' + layout.id + '"]');
                    layout.editingTitle = !0, $timeout(function() {
                        input.focus()[0].setSelectionRange(0, 9999)
                    })
                }, scope.saveTitleEdit = function(layout) {
                    layout.editingTitle = !1, layoutStorage.save()
                }, scope.options.saveLayouts = function() {
                    layoutStorage.save(!0)
                }, scope.options.addWidget = function() {
                    var layout = layoutStorage.getActiveLayout();
                    layout && layout.dashboard.addWidget.apply(layout.dashboard, arguments)
                }, scope.options.loadWidgets = function() {
                    var layout = layoutStorage.getActiveLayout();
                    layout && layout.dashboard.loadWidgets.apply(layout.dashboard, arguments)
                }, scope.options.saveDashboard = function() {
                    var layout = layoutStorage.getActiveLayout();
                    layout && layout.dashboard.saveDashboard.apply(layout.dashboard, arguments)
                }
            }
        }
    }]), angular.module("ui.dashboard").directive("widget", function() {
        return {
            controller: "DashboardWidgetCtrl",
            link: function(scope) {
                var widget = scope.widget;
                if (widget.dataModelType) {
                    var ds = new widget.dataModelType;
                    widget.dataModel = ds, ds.setup(widget, scope), ds.init(), scope.$on("$destroy", _.bind(ds.destroy, ds))
                }
                scope.compileTemplate(), scope.$emit("widgetAdded", widget)
            }
        }
    }), angular.module("ui.dashboard").factory("LayoutStorage", function() {
        function LayoutStorage(options) {
            var defaults = {
                storage: noopStorage,
                storageHash: "",
                stringifyStorage: !0
            };
            angular.extend(defaults, options), angular.extend(options, defaults), this.id = options.storageId, this.storage = options.storage, this.storageHash = options.storageHash, this.stringifyStorage = options.stringifyStorage, this.widgetDefinitions = options.widgetDefinitions, this.defaultLayouts = options.defaultLayouts, this.widgetButtons = options.widgetButtons, this.explicitSave = options.explicitSave, this.defaultWidgets = options.defaultWidgets, this.settingsModalOptions = options.settingsModalOptions, this.onSettingsClose = options.onSettingsClose, this.onSettingsDismiss = options.onSettingsDismiss, this.options = options, this.options.unsavedChangeCount = 0, this.layouts = [], this.states = {}, this.load(), this._ensureActiveLayout()
        }
        var noopStorage = {
            setItem: function() {},
            getItem: function() {},
            removeItem: function() {}
        };
        return LayoutStorage.prototype = {
            add: function(layouts) {
                layouts instanceof Array || (layouts = [layouts]);
                var self = this;
                angular.forEach(layouts, function(layout) {
                    layout.dashboard = layout.dashboard || {}, layout.dashboard.storage = self, layout.dashboard.storageId = layout.id = self._getLayoutId.call(self, layout), layout.dashboard.widgetDefinitions = self.widgetDefinitions, layout.dashboard.stringifyStorage = !1, layout.dashboard.defaultWidgets = layout.defaultWidgets || self.defaultWidgets, layout.dashboard.widgetButtons = self.widgetButtons, layout.dashboard.explicitSave = self.explicitSave, layout.dashboard.settingsModalOptions = self.settingsModalOptions, layout.dashboard.onSettingsClose = self.onSettingsClose, layout.dashboard.onSettingsDismiss = self.onSettingsDismiss, self.layouts.push(layout)
                })
            },
            remove: function(layout) {
                var index = this.layouts.indexOf(layout);
                if (index >= 0 && (this.layouts.splice(index, 1), delete this.states[layout.id], layout.active && this.layouts.length)) {
                    var nextActive = index > 0 ? index - 1 : 0;
                    this.layouts[nextActive].active = !0
                }
            },
            save: function() {
                var state = {
                    layouts: this._serializeLayouts(),
                    states: this.states,
                    storageHash: this.storageHash
                };
                this.stringifyStorage && (state = JSON.stringify(state)), this.storage.setItem(this.id, state), this.options.unsavedChangeCount = 0
            },
            load: function() {
                var serialized = this.storage.getItem(this.id);
                this.clear(), serialized ? "object" == typeof serialized && "function" == typeof serialized.then ? this._handleAsyncLoad(serialized) : this._handleSyncLoad(serialized) : this._addDefaultLayouts()
            },
            clear: function() {
                this.layouts = [], this.states = {}
            },
            setItem: function(id, value) {
                this.states[id] = value, this.save()
            },
            getItem: function(id) {
                return this.states[id]
            },
            removeItem: function(id) {
                delete this.states[id], this.save()
            },
            getActiveLayout: function() {
                for (var len = this.layouts.length, i = 0; len > i; i++) {
                    var layout = this.layouts[i];
                    if (layout.active) return layout
                }
                return !1
            },
            _addDefaultLayouts: function() {
                var self = this;
                angular.forEach(this.defaultLayouts, function(layout) {
                    self.add(angular.extend({}, layout))
                })
            },
            _serializeLayouts: function() {
                var result = [];
                return angular.forEach(this.layouts, function(l) {
                    result.push({
                        title: l.title,
                        id: l.id,
                        active: l.active,
                        defaultWidgets: l.dashboard.defaultWidgets
                    })
                }), result
            },
            _handleSyncLoad: function(serialized) {
                var deserialized;
                if (this.stringifyStorage) try {
                    deserialized = JSON.parse(serialized)
                } catch (e) {
                    return void this._addDefaultLayouts()
                } else deserialized = serialized;
                return this.storageHash !== deserialized.storageHash ? void this._addDefaultLayouts() : (this.states = deserialized.states, void this.add(deserialized.layouts))
            },
            _handleAsyncLoad: function(promise) {
                var self = this;
                promise.then(angular.bind(self, this._handleSyncLoad), angular.bind(self, this._addDefaultLayouts))
            },
            _ensureActiveLayout: function() {
                for (var i = 0; i < this.layouts.length; i++) {
                    var layout = this.layouts[i];
                    if (layout.active) return
                }
                this.layouts[0] && (this.layouts[0].active = !0)
            },
            _getLayoutId: function(layout) {
                if (layout.id) return layout.id;
                for (var max = 0, i = 0; i < this.layouts.length; i++) {
                    var id = this.layouts[i].id;
                    max = Math.max(max, 1 * id)
                }
                return max + 1
            }
        }, LayoutStorage
    }), angular.module("ui.dashboard").factory("DashboardState", ["$log", "$q", function($log, $q) {
        function DashboardState(storage, id, hash, widgetDefinitions, stringify) {
            this.storage = storage, this.id = id, this.hash = hash, this.widgetDefinitions = widgetDefinitions, this.stringify = stringify
        }
        return DashboardState.prototype = {
            save: function(widgets) {
                if (!this.storage) return !0;
                var serialized = _.map(widgets, function(widget) {
                        var widgetObject = {
                            title: widget.title,
                            name: widget.name,
                            style: widget.style,
                            dataModelOptions: widget.dataModelOptions,
                            storageHash: widget.storageHash,
                            attrs: widget.attrs
                        };
                        return widgetObject
                    }),
                    item = {
                        widgets: serialized,
                        hash: this.hash
                    };
                return this.stringify && (item = JSON.stringify(item)), this.storage.setItem(this.id, item), !0
            },
            load: function() {
                if (!this.storage) return null;
                var serialized;
                return serialized = this.storage.getItem(this.id), serialized ? "object" == typeof serialized && "function" == typeof serialized.then ? this._handleAsyncLoad(serialized) : this._handleSyncLoad(serialized) : null
            },
            _handleSyncLoad: function(serialized) {
                var deserialized, result = [];
                if (!serialized) return null;
                if (this.stringify) try {
                    deserialized = JSON.parse(serialized)
                } catch (e) {
                    return $log.warn("Serialized dashboard state was malformed and could not be parsed: ", serialized), null
                } else deserialized = serialized;
                if (deserialized.hash !== this.hash) return $log.info("Serialized dashboard from storage was stale (old hash: " + deserialized.hash + ", new hash: " + this.hash + ")"), this.storage.removeItem(this.id), null;
                for (var savedWidgetDefs = deserialized.widgets, i = 0; i < savedWidgetDefs.length; i++) {
                    var savedWidgetDef = savedWidgetDefs[i],
                        widgetDefinition = this.widgetDefinitions.getByName(savedWidgetDef.name);
                    widgetDefinition ? widgetDefinition.hasOwnProperty("storageHash") && widgetDefinition.storageHash !== savedWidgetDef.storageHash ? $log.info('Widget Definition Object with name "' + savedWidgetDef.name + '" was found but the storageHash property on the widget definition is different from that on the serialized widget loaded from storage. hash from storage: "' + savedWidgetDef.storageHash + '", hash from WDO: "' + widgetDefinition.storageHash + '"') : result.push(savedWidgetDef) : $log.warn('Widget with name "' + savedWidgetDef.name + '" was not found in given widget definition objects')
                }
                return result
            },
            _handleAsyncLoad: function(promise) {
                var self = this,
                    deferred = $q.defer();
                return promise.then(function(res) {
                    var result = self._handleSyncLoad(res);
                    result ? deferred.resolve(result) : deferred.reject(result)
                }, function(res) {
                    deferred.reject(res)
                }), deferred.promise
            }
        }, DashboardState
    }]), angular.module("ui.dashboard").factory("WidgetDataModel", function() {
        function WidgetDataModel() {}
        return WidgetDataModel.prototype = {
            setup: function(widget, scope) {
                this.dataAttrName = widget.dataAttrName, this.dataModelOptions = widget.dataModelOptions, this.widgetScope = scope
            },
            updateScope: function(data) {
                this.widgetScope.widgetData = data
            },
            init: function() {},
            destroy: function() {}
        }, WidgetDataModel
    }), angular.module("ui.dashboard").factory("WidgetDefCollection", function() {
        function WidgetDefCollection(widgetDefs) {
            this.push.apply(this, widgetDefs);
            var map = {};
            _.each(widgetDefs, function(widgetDef) {
                map[widgetDef.name] = widgetDef
            }), this.map = map
        }
        return WidgetDefCollection.prototype = Object.create(Array.prototype), WidgetDefCollection.prototype.getByName = function(name) {
            return this.map[name]
        }, WidgetDefCollection
    }), angular.module("ui.dashboard").factory("WidgetModel", function() {
        function WidgetModel(Class, overrides) {
            var defaults = {
                title: "Widget",
                name: Class.name,
                attrs: Class.attrs,
                dataAttrName: Class.dataAttrName,
                dataModelType: Class.dataModelType,
                dataModelOptions: Class.dataModelOptions,
                settingsModalOptions: Class.settingsModalOptions,
                onSettingsClose: Class.onSettingsClose,
                onSettingsDismiss: Class.onSettingsDismiss,
                style: Class.style
            };
            if (overrides = overrides || {}, angular.extend(this, angular.copy(defaults), overrides), this.style = this.style || {
                    width: "33%"
                }, this.setWidth(this.style.width), Class.templateUrl) this.templateUrl = Class.templateUrl;
            else if (Class.template) this.template = Class.template;
            else {
                var directive = Class.directive || Class.name;
                this.directive = directive
            }
        }
        return WidgetModel.prototype = {
            setWidth: function(width, units) {
                return width = width.toString(), units = units || width.replace(/^[-\.\d]+/, "") || "%", this.widthUnits = units, width = parseFloat(width), 0 > width ? !1 : ("%" === units && (width = Math.min(100, width), width = Math.max(0, width)), this.style.width = width + "" + units, !0)
            }
        }, WidgetModel
    }), angular.module("ui.dashboard").controller("SaveChangesModalCtrl", ["$scope", "$modalInstance", "layout", function($scope, $modalInstance, layout) {
        $scope.layout = layout, $scope.ok = function() {
            $modalInstance.close()
        }, $scope.cancel = function() {
            $modalInstance.dismiss()
        }
    }]), angular.module("ui.dashboard").controller("DashboardWidgetCtrl", ["$scope", "$element", "$compile", "$window", "$timeout", function($scope, $element, $compile, $window, $timeout) {
        $scope.makeTemplateString = function() {
            var widget = $scope.widget,
                templateString = "";
            return widget.templateUrl ? templateString = "<div ng-include=\"'" + widget.templateUrl + "'\"></div>" : widget.template ? templateString = widget.template : (templateString = "<div " + widget.directive, widget.dataAttrName && (widget.attrs = widget.attrs || {}, widget.attrs[widget.dataAttrName] = "widgetData"), widget.attrs && (widget.attrs[widget.directive] && (templateString += '="' + widget.attrs[widget.directive] + '"'), _.each(widget.attrs, function(value, attr) {
                attr !== widget.directive && (templateString += " " + attr + '="' + value + '"')
            })), templateString += "></div>"), templateString
        }, $scope.grabResizer = function(e) {
            var widget = $scope.widget,
                widgetElm = $element.find(".widget");
            if (1 === e.which) {
                e.stopPropagation(), e.originalEvent.preventDefault();
                var initX = e.clientX,
                    pixelWidth = widgetElm.width(),
                    pixelHeight = widgetElm.height(),
                    widgetStyleWidth = widget.style.width,
                    widthUnits = widget.widthUnits,
                    unitWidth = parseFloat(widgetStyleWidth),
                    $marquee = angular.element('<div class="widget-resizer-marquee" style="height: ' + pixelHeight + "px; width: " + pixelWidth + 'px;"></div>');
                widgetElm.append($marquee);
                var transformMultiplier = unitWidth / pixelWidth,
                    mousemove = function(e) {
                        var curX = e.clientX,
                            pixelChange = curX - initX,
                            newWidth = pixelWidth + pixelChange;
                        $marquee.css("width", newWidth + "px")
                    },
                    mouseup = function(e) {
                        jQuery($window).off("mousemove", mousemove), $marquee.remove();
                        var curX = e.clientX,
                            pixelChange = curX - initX,
                            unitChange = Math.round(pixelChange * transformMultiplier * 100) / 100,
                            newWidth = 1 * unitWidth + unitChange;
                        widget.setWidth(newWidth + widthUnits), $scope.$emit("widgetChanged", widget), $scope.$apply()
                    };
                jQuery($window).on("mousemove", mousemove).one("mouseup", mouseup)
            }
        }, $scope.editTitle = function(widget) {
            var widgetElm = $element.find(".widget");
            widget.editingTitle = !0, $timeout(function() {
                widgetElm.find("form.widget-title input:eq(0)").focus()[0].setSelectionRange(0, 9999)
            })
        }, $scope.saveTitleEdit = function(widget) {
            widget.editingTitle = !1, $scope.$emit("widgetChanged", widget)
        }, $scope.compileTemplate = function() {
            var container = $scope.findWidgetContainer($element),
                templateString = $scope.makeTemplateString(),
                widgetElement = angular.element(templateString);
            container.empty(), container.append(widgetElement), $compile(widgetElement)($scope)
        }, $scope.findWidgetContainer = function(element) {
            return element.find(".widget-content")
        }
    }]), angular.module("ui.dashboard").controller("WidgetSettingsCtrl", ["$scope", "$modalInstance", "widget", function($scope, $modalInstance, widget) {
        $scope.widget = widget, $scope.result = jQuery.extend(!0, {}, widget), $scope.ok = function() {
            $modalInstance.close($scope.result)
        }, $scope.cancel = function() {
            $modalInstance.dismiss("cancel")
        }
    }]), angular.module("ui.dashboard").run(["$templateCache", function($templateCache) {
        $templateCache.put("template/alt-dashboard.html", '<div>\n    <div class="btn-toolbar" ng-if="!options.hideToolbar">\n        <div class="btn-group" ng-if="!options.widgetButtons">\n            <button type="button" class="dropdown-toggle btn btn-primary" data-toggle="dropdown">Add Widget <span\n                    class="caret"></span></button>\n            <ul class="dropdown-menu" role="menu">\n                <li ng-repeat="widget in widgetDefs">\n                    <a href="#" ng-click="addWidgetInternal($event, widget);"><span class="label label-primary">{{widget.name}}</span></a>\n                </li>\n            </ul>\n        </div>\n\n        <div class="btn-group" ng-if="options.widgetButtons">\n            <button ng-repeat="widget in widgetDefs"\n                    ng-click="addWidgetInternal($event, widget);" type="button" class="btn btn-primary">\n                {{widget.name}}\n            </button>\n        </div>\n\n        <button class="btn btn-warning" ng-click="resetWidgetsToDefault()">Default Widgets</button>\n\n        <button ng-if="options.storage && options.explicitSave" ng-click="options.saveDashboard()" class="btn btn-success" ng-hide="!options.unsavedChangeCount">{{ !options.unsavedChangeCount ? "Alternative - No Changes" : "Save" }}</button>\n\n        <button ng-click="clear();" ng-hide="!widgets.length" type="button" class="btn btn-info">Clear</button>\n    </div>\n\n    <div ui-sortable="sortableOptions" ng-model="widgets" class="dashboard-widget-area">\n        <div ng-repeat="widget in widgets" ng-style="widget.style" class="widget-container" widget>\n            <div class="widget panel panel-default">\n                <div class="widget-header panel-heading">\n                    <h3 class="panel-title">\n                        <span class="widget-title" ng-dblclick="editTitle(widget)" ng-hide="widget.editingTitle">{{widget.title}}</span>\n                        <form action="" class="widget-title" ng-show="widget.editingTitle" ng-submit="saveTitleEdit(widget)">\n                            <input type="text" ng-model="widget.title" class="form-control">\n                        </form>\n                        <span class="label label-primary" ng-if="!options.hideWidgetName">{{widget.name}}</span>\n                        <span ng-click="removeWidget(widget);" class="glyphicon glyphicon-remove" ng-if="!options.hideWidgetClose"></span>\n                        <span ng-click="openWidgetSettings(widget);" class="glyphicon glyphicon-cog" ng-if="!options.hideWidgetSettings"></span>\n                    </h3>\n                </div>\n                <div class="panel-body widget-content"></div>\n                <div class="widget-ew-resizer" ng-mousedown="grabResizer($event)"></div>\n            </div>\n        </div>\n    </div>\n</div>\n'), $templateCache.put("template/dashboard-layouts.html", '<ul class="nav nav-tabs layout-tabs">\n    <li ng-repeat="layout in layouts" ng-class="{ active: layout.active }">\n        <a ng-click="makeLayoutActive(layout)">\n            <span ng-dblclick="editTitle(layout)" ng-show="!layout.editingTitle">{{layout.title}}</span>\n            <form action="" class="layout-title" ng-show="layout.editingTitle" ng-submit="saveTitleEdit(layout)">\n                <input type="text" ng-model="layout.title" class="form-control" data-layout="{{layout.id}}">\n            </form>\n            <span ng-click="removeLayout(layout)" class="glyphicon glyphicon-remove remove-layout-icon"></span>\n            <!-- <span class="glyphicon glyphicon-pencil"></span> -->\n            <!-- <span class="glyphicon glyphicon-remove"></span> -->\n        </a>\n    </li>\n    <li>\n        <a ng-click="createNewLayout()">\n            <span class="glyphicon glyphicon-plus"></span>\n        </a>\n    </li>\n</ul>\n<div ng-repeat="layout in layouts | filter:isActive" dashboard="layout.dashboard" templateUrl="template/dashboard.html"></div>'), $templateCache.put("template/dashboard.html", '<div>\n    <div class="btn-toolbar" ng-if="!options.hideToolbar">\n        <div class="btn-group" ng-if="!options.widgetButtons">\n            <button type="button" class="dropdown-toggle btn btn-primary" data-toggle="dropdown">Add Widget <span\n                    class="caret"></span></button>\n            <ul class="dropdown-menu" role="menu">\n                <li ng-repeat="widget in widgetDefs">\n                    <a href="#" ng-click="addWidgetInternal($event, widget);"><span class="label label-primary">{{widget.name}}</span></a>\n                </li>\n            </ul>\n        </div>\n\n        <div class="btn-group" ng-if="options.widgetButtons">\n            <button ng-repeat="widget in widgetDefs"\n                    ng-click="addWidgetInternal($event, widget);" type="button" class="btn btn-primary">\n                {{widget.name}}\n            </button>\n        </div>\n\n        <button class="btn btn-warning" ng-click="resetWidgetsToDefault()">Default Widgets</button>\n\n        <button ng-if="options.storage && options.explicitSave" ng-click="options.saveDashboard()" class="btn btn-success" ng-disabled="!options.unsavedChangeCount">{{ !options.unsavedChangeCount ? "all saved" : "save changes (" + options.unsavedChangeCount + ")" }}</button>\n\n        <button ng-click="clear();" type="button" class="btn btn-info">Clear</button>\n    </div>\n\n    <div ui-sortable="sortableOptions" ng-model="widgets" class="dashboard-widget-area">\n        <div ng-repeat="widget in widgets" ng-style="widget.style" class="widget-container" widget>\n            <div class="widget panel panel-default">\n                <div class="widget-header panel-heading">\n                    <h3 class="panel-title">\n                        <span class="widget-title" ng-dblclick="editTitle(widget)" ng-hide="widget.editingTitle">{{widget.title}}</span>\n                        <form action="" class="widget-title" ng-show="widget.editingTitle" ng-submit="saveTitleEdit(widget)">\n                            <input type="text" ng-model="widget.title" class="form-control">\n                        </form>\n                        <span class="label label-primary" ng-if="!options.hideWidgetName">{{widget.name}}</span>\n                        <span ng-click="removeWidget(widget);" class="glyphicon glyphicon-remove" ng-if="!options.hideWidgetClose"></span>\n                        <span ng-click="openWidgetSettings(widget);" class="glyphicon glyphicon-cog" ng-if="!options.hideWidgetSettings"></span>\n                    </h3>\n                </div>\n                <div class="panel-body widget-content"></div>\n                <div class="widget-ew-resizer" ng-mousedown="grabResizer($event)"></div>\n            </div>\n        </div>\n    </div>\n</div>'), $templateCache.put("template/save-changes-modal.html", '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button>\n  <h3>Unsaved Changes to "{{layout.title}}"</h3>\n</div>\n\n<div class="modal-body">\n    <p>You have {{layout.dashboard.unsavedChangeCount}} unsaved changes on this dashboard. Would you like to save them?</p>\n</div>\n\n<div class="modal-footer">\n    <button type="button" class="btn btn-default" ng-click="cancel()">Don\'t Save</button>\n    <button type="button" class="btn btn-primary" ng-click="ok()">Save</button>\n</div>'), $templateCache.put("template/widget-default-content.html", ""), $templateCache.put("template/widget-settings-template.html", '<div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button>\n  <h3>Widget Options <small>{{widget.title}}</small></h3>\n</div>\n\n<div class="modal-body">\n    <form name="form" novalidate class="form-horizontal">\n        <div class="form-group">\n            <label for="widgetTitle" class="col-sm-2 control-label">Title</label>\n            <div class="col-sm-10">\n                <input type="text" class="form-control" name="widgetTitle" ng-model="result.title">\n            </div>\n        </div>\n        <div ng-include="optionsTemplateUrl"></div>\n    </form>\n</div>\n\n<div class="modal-footer">\n    <button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>\n    <button type="button" class="btn btn-primary" ng-click="ok()">OK</button>\n</div>')
    }]);