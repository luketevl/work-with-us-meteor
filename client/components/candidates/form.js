const uploader = new ReactiveVar();

Template.candidatesForm.events({
  "submit form": (e, template) =>{
    e.preventDefault();
    const name    = $('#name').val();
    const email   = $('#email').val();
    const phone   = $('#phone').val();
    const job     = $('#job').val();

    if(name == '') {
      FlashMessages.clear();
      FlashMessages.sendError("Nome é obrigatório");
      return false;
    }
    else if(email == '') {
      FlashMessages.clear();
      FlashMessages.sendError("E-mail é obrigatório");
      return false;
    }
    else if(phone == '') {
      FlashMessages.clear();
      FlashMessages.sendError("Telefone é obrigatório");
      return false;
    }
    else if(job == '') {
      FlashMessages.clear();
      FlashMessages.sendError("Vaga é obrigatória");
      return false;
    }

    const _id           = $('#_id').val();
    let active = $('#active');
    if(active == undefined){
      active = true;
    }
    else{
      active = active.prop('checked');
    }
    const status        = $('#status').val();
    const urlFacebook   = $('#urlFacebook').val();
    const urlLinkedin   = $('#urlLinkedin').val();

    // Faz upload
    let file = document.getElementById('uploadFile').files[0];
    file.name = _id;
    $('#candidateModal').modal('hide');
    if(_id){
      Candidates.update({_id} ,{ $set: {active, name, email, status, phone, urlFacebook, urlLinkedin, jobs:[job], updateAt: new Date()}});

      const upload = new Slingshot.Upload("myFileUploads");
      const timeStamp = Math.floor(Date.now());

      upload.send(file, function (error, urlCurriculo) {
      uploader.set();
      if (error) {
        console.error('Error uploading');
        console.log(error);
      }
      else{
        console.log("Success!");
        console.log('uploaded file available here: '+urlCurriculo);
        Candidates.update({_id} ,{ $set: {urlCurriculo, updateAt: new Date()}});
      }
      });
      uploader.set(upload);

      sAlert.closeAll();
      sAlert.success("Canditado editado");
    }
    else{
      Candidates.insert({active, name, email, status, phone, urlFacebook, urlLinkedin, jobs:[job], addedAt: new Date()},
      (err, data) => {
        if(err) return false;
        console.log(data);
        console.log(file);
        file.name = data._id;
        console.log(file);
        const upload = new Slingshot.Upload("myFileUploads");
        const timeStamp = Math.floor(Date.now());

        upload.send(file, function (error, urlCurriculo) {
        uploader.set();
        if (error) {
          console.error('Error uploading');
          console.log(error);
        }
        else{
          console.log("Success!");
          console.log('uploaded file available here: '+urlCurriculo);
          Candidates.update({_id: data._id} ,{ $set: {urlCurriculo, updateAt: new Date()}});
        }
        });
        uploader.set(upload);


      });
      sAlert.closeAll();
      sAlert.success("Candidato cadastrado");
      $('#mensagemCandidateSuccessModal').modal('show');
    }

    $('form')[0].reset();
    $('#_id').val('');
    $('#urlFacebook').val('');
    $('#urlLinkedin').val('');
    $('#urlCurriculo').val('');

  },
 'change .uploadFile': function(event, template) {


     },
});

Template.candidatesForm.helpers({
  jobs(){
    return Jobs.find({active: true});
  },
  status(){
    return StatusCandidate.find({active: true});
  },

  isUploading(){
       return Boolean(uploader.get());
   },

});
