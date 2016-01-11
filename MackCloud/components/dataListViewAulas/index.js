'use strict';

app.dataListViewAulas = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_dataListViewAulas
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dataListViewAulas


// START_CUSTOM_CODE_dataListViewAulasModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function(parent) {
    var dataProvider = app.data.mackCloud,
        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
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
                typeName: 'Aula',
                dataProvider: dataProvider
            },
            group: {
                field: 'Disciplina'
            },

            change: function(e) {
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
                        'Data': {
                            field: 'Data',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSourceOptFiles = {
            type: 'everlive',
            transport: {
                typeName: 'Arquivo',
                dataProvider: dataProvider
            },
            group: {
                field: 'Tipo'
            },

            change: function(e) {
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
        dataSrcFile = new kendo.data.DataSource(dataSourceOptFiles),
        dataListViewAulasModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/dataListViewAulas/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = dataListViewAulasModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                console.log(dataSource);
                if (!itemModel.Disciplina) {
                    itemModel.Disciplina = String.fromCharCode(160);
                }
                dataListViewAulasModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('dataListViewAulasModel', dataListViewAulasModel);
})(app.dataListViewAulas);
// END_CUSTOM_CODE_dataListViewAulasModel