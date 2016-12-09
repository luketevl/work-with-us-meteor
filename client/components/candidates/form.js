Template.candidatesForm.events({
  "submit form": (e, template) =>{
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();

    // TESTES
    $('#candidateModal').modal('hide');
    $('#mensagemCandidateSuccessModal').modal('show');
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
    const active = $('#active').prop('checked') ? 1 : 0;
    const _id = $('#_id').val();
    $('#candidateModal').modal('hide');
    if(_id){
      Candidates.update({_id} ,{name, active, updateAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Canditado editado");
    }
    else{
      Candidates.insert({name, active, dataAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Candidato cadastrado");
      $('#mensagemCandidateSuccessModal').modal('show');
    }

    $('form')[0].reset();
    $('#_id').val('');
  }
})
