const uploader = new ReactiveVar();

Template.candidatesForm.events({
  "submit form": (e, template) =>{
    e.preventDefault();
    const name    = $('#name').val();
    const email   = $('#email').val();
    const phone   = $('#phone').val();
    const job     = $('#job').val();
    let file      = document.getElementById('uploadFile').files[0];
    const regex   = new RegExp("(.*?)\.(docx|doc|pdf)$");

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
    else if(!Meteor.userId()){
      if(file == undefined){
        FlashMessages.clear();
        FlashMessages.sendError("Curriculo é obrigatório");
        return false;
      }
      else if(!regex.test(file.type)){
        FlashMessages.clear();
        FlashMessages.sendError("Curriculo deve estar nos seguintes formatos: <b>pdf, doc e docx</b>");
        return false;
      }
    }
    const _id           = $('#_id').val();
    let active = $('#active');

    if(!Meteor.userId()){
      active = true;
    }
    else{
      active = active.prop('checked');
    }
    const status        = $('#status').val();
    const urlFacebook   = $('#urlFacebook').val();
    const urlLinkedin   = $('#urlLinkedin').val();

    $('#candidateModal').modal('hide');
    if(_id){
      Candidates.update({_id} ,{ $set: {active, name, email, status, phone, urlFacebook, urlLinkedin, jobs:[job], updateAt: new Date()}});

      if(file){
        file._id = _id;
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
      }
      sAlert.closeAll();
      sAlert.success("Canditado editado");
    }
    else{
      Candidates.insert({active, name, email, status, phone, urlFacebook, urlLinkedin, jobs:[job], addedAt: new Date()},
      (err, data) => {
        if(err) return false;
        if(file){
          file._id = _id;
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
        }

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
});

Template.candidatesForm.helpers({
  jobs(){
    return Jobs.find({active: true});
  },
  status(){
    return StatusCandidate.find({active: true});
  },

});
