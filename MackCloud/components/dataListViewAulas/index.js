'use strict';

app.dataListViewAulas = kendo.observable({
    onShow: function () {},
    afterShow: function () {
        app.mobileApp.pane.loader.hide();
    }
});

// START_CUSTOM_CODE_dataListViewAulas
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_dataListViewAulas


// START_CUSTOM_CODE_dataListViewAulasModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
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
                typeName: 'Aula',
                dataProvider: dataProvider
            },
            group: {
                field: 'Disciplina'
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
                        'Data': {
                            field: 'Data',
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
                        'Tipo': {
                            field: 'Tipo',
                            defaultValue: ''
                        }
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        dataSourceFile = new kendo.data.DataSource(dataSourceOptFile),
        dataListViewAulasModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function (e) {
                dataSourceFile.fetch(function () {
                    app.mobileApp.navigate('#components/dataListViewAulas/details.html?uid=' + e.dataItem.uid);
                });
            },

            detailsShow: function (e) {
                var item = e.view.params.uid,
                    dataSource = dataListViewAulasModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);

                itemModel.arquivos = dataSourceFile;
                itemModel.addFile = function () {
                    var success = function (data) {

                        var file = {
                            "Filename": (Math.random() * 100000000000000000000000).toString(16) + ".png",
                            "ContentType": "image/png",
                            "CustomField": "",
                            "base64": data
                        };


                        app.mobileApp.pane.loader.show();
                        dataProvider.files.create(file,
                            function (data) {
                                app.mobileApp.navigate('#components/createArquivo/view.html?imageId=' + data.result.Id + "&aula=" + item);
                            },
                            function (error) {
                                alert(JSON.stringify(error));
                            });


                    };
                    var error = function () {
                        navigator.notification.alert("Erro ao tirar a foto!");
                        app.mobileApp.navigate('#components/dataListViewAulas/view.html');
                    };
                    var config = {
                        destinationType: Camera.DestinationType.DATA_URL,
                        targetHeight: 400,
                        targetWidth: 400
                    };
                    navigator.camera.getPicture(success, error, config);
                };


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