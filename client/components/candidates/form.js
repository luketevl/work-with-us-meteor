Template.candidatesForm.events({
  "submit form": (e, template) =>{
    e.preventDefault();
    const name = $('#name').val();
    if(name == '') {
      FlashMessages.clear();
      FlashMessages.sendError("Nome da vaga é obrigatório");
      return false;
    }
    $('#jobModal').modal('hide');
    const active = $('#active').prop('checked') ? 1 : 0;
    const _id = $('#_id').val();
    if(_id){
      Jobs.update({_id} ,{name, active, updateAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Vaga editada");
    }
    else{
      Jobs.insert({name, active, dataAt: new Date()});
      sAlert.closeAll();
      sAlert.success("Vaga cadastrada");
    }
    $('form')[0].reset();
  }
})
