'use strict';

// START_CUSTOM_CODE_createArquivo
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

app.createArquivo = kendo.observable({
    image: null,
    onShow: function (e) {
        var dataProvider = app.data.mackCloud;

        app.createArquivo.currentItem = e.view.params.aula;
        dataProvider.Files.getById(e.view.params.imageId)
            .then(function (data) {
                    var file = data.result;

                    app.createArquivo.image = file;
                    $('#image').attr('src', file.Uri);

                },
                function (error) {
                    alert(JSON.stringify(error));
                });
    },
    afterShow: function () {
        app.mobileApp.pane.loader.hide();
    }
});

// END_CUSTOM_CODE_createArquivo

(function (parent) {
    var dataProvider = app.data.mackCloud;
    var createArquivoModel = kendo.observable({
        fields: {
            titulo: '',
        },
        submit: function () {
            var image = parent.image,
                aulaId = parent.aula;

            app.mobileApp.pane.loader.show();
            dataProvider.data('Arquivo').create({
                    'Titulo': createArquivoModel.fields.titulo,
                    file: image,
                    Tipo: "Imagem"
                })
                .then(function (data) {
                        app.mobileApp.navigate('#components/dataListViewAulas/view.html');
                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });
        },
        cancel: function () {}

    });

    parent.set('createArquivoModel', createArquivoModel);
})(app.createArquivo);

// START_CUSTOM_CODE_createArquivoModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_createArquivoModel