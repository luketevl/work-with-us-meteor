Template.uploadForm.onCreated(()=>{
  this.currentUpload = new ReactiveVar(false);
});
Template.uploadForm.events({


    // uploadssssssss
    'change #fileInput' : (e, template) => {
      if (e.currentTarget.files && e.currentTarget.files[0]) {
        // We upload only one file, in case
        // there was multiple files selected
        var file = e.currentTarget.files[0];
        if (file) {
          var uploadInstance = Files.insert({
            file: file,
            streams: 'dynamic',
            chunkSize: 'dynamic'
          }, false);

          uploadInstance.on('start', function() {
            template.currentUpload.set(this);
          });

          uploadInstance.on('end', function(error, fileObj) {
            if (error) {
              swal({
                title: "Não foi possível anexar o arquivo",
                text: error.reason,
                type: "error",
                showCancelButton: true,
               });
            } else {
              swal({
                title: 'Arquivo anexado com sucesso !',
                text: `O arquivo ${fileObj.name} foi enviado ;)`,
                type: "success",
                showCancelButton: true,
               });
            }
            template.currentUpload.set(false);
          });

          uploadInstance.start();
        }
      }
    },
});

Template.uploadForm.helpers({
  currentUpload(){
    return Template.instance().currentUpload();
  }
});

Template.uploadedFiles.helpers({

    // uploadsssss
    uploadFiles(){
      return Files.find();
    },
});
