Template.candidatesForm.events({
  "submit form": (e, template) =>{
    e.preventDefault();
    const name = $('#name').val();
    if(name == '') {
      FlashMessages.clear();
      FlashMessages.sendError("Nome é obrigatório");
      return false;
    }
    $('#candidateModal').modal('hide');
    const active = $('#active').prop('checked') ? 1 : 0;
    const _id = $('#_id').val();
    if(_id){
      Jobs.update({_id} ,{name, active, updateAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Canditado editado");
    }
    else{
      Jobs.insert({name, active, dataAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Candidato cadastrado");
    }
    $('form')[0].reset();
    $('#_id').val('');
  }
})
