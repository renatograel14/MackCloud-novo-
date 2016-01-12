'use strict';

app.createArquivo = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_createArquivo
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_createArquivo
(function(parent) {
    var createArquivoModel = kendo.observable({
        fields: {
            titulo: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('createArquivoModel', createArquivoModel);
})(app.createArquivo);

// START_CUSTOM_CODE_createArquivoModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_createArquivoModel