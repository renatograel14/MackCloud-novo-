'use strict';

app.dataListViewFiles = kendo.observable({
    onShow: function () {},
    afterShow: function () {}
});

// START_CUSTOM_CODE_dataListViewFiles
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dataListViewFiles
(function (parent) {
    var dataProvider = app.data.mackCloud,
        flattenLocationProperties = function (dataItem) {
            var propName, propValue,
                isLocation = function (value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Arquivo',
                dataProvider: dataProvider
            },
            group: {
                field: 'Tipo'
            },
            change: function (e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    flattenLocationProperties(dataItem);
                }
            },
            schema: {
                model: {
                    fields: {
                        'Titulo': {
                            field: 'Titulo',
                            defaultValue: ''
                        },
                        'file': {
                            field: 'file',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSourceOptFile = {
            type: 'everlive',
            transport: {
                typeName: 'Arquivo',
                dataProvider: dataProvider
            },
            group: {
                field: 'Tipo'
            },

            change: function (e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];

                    flattenLocationProperties(dataItem);
                }
            },
            schema: {
                model: {
                    fields: {
                        'Titulo': {
                            field: 'Titulo',
                            defaultValue: ''
                        },
                        'file': {
                            field: 'file',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        dataSourceFile = new kendo.data.DataSource(dataSourceOptFile),
        dataListViewFilesModel = kendo.observable({
            dataSource: dataSource
        });

    parent.set('dataListViewFilesModel', dataListViewFilesModel);
})(app.dataListViewFiles);

// START_CUSTOM_CODE_dataListViewFilesModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dataListViewFilesModel