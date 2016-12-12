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

    const _id = $('#_id').val();
    const active = $('#active').prop('checked');
    const status  = $('#status').val();

    $('#candidateModal').modal('hide');
    if(_id){
      Candidates.update({_id} ,{ $set: {active, name, email, status, phone, jobs:[job], updateAt: new Date()}});
      sAlert.closeAll();
      sAlert.success("Canditado editado");
    }
    else{
      Candidates.insert({active, name, email, status, phone, jobs:[job], addedAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Candidato cadastrado");
      $('#mensagemCandidateSuccessModal').modal('show');
    }

    $('form')[0].reset();
    $('#_id').val('');
  }
});

Template.candidatesForm.helpers({
  specificFormData: function() {
    return {
      id: this._id,
      hard: 'teste'
    }
  },

  jobs(){
    return Jobs.find({active: true});
  },
  status(){
    return StatusCandidate.find({active: true});
  }
});
