Template.statusForm.events({
  "submit form": (e, template) =>{
    e.preventDefault();
    const name = $('#name').val();
    if(name == '') {
      FlashMessages.clear();
      FlashMessages.sendError("Nome do status é obrigatório");
      return false;
    }
    $('#statusModal').modal('hide');
    const active = $('#active').prop('checked') ? 1 : 0;
    const _id = $('#_id').val();
    if(_id){
      StatusCandidate.update({_id} ,{name, active, updateAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Status editado");
    }
    else{
      StatusCandidate.insert({name, active, dataAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Status editado");
    }
    $('form')[0].reset();
  }
})
