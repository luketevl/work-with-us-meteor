Template.statusList.helpers({
  statusCandidate(){
    return StatusCandidate.find({});
  }
});

Template.statusList.events({
  "click button.delete": function(e, template){
    const status = this;
    swal({
      title: "Deseja realmente apagar?",
      text: "Não é possível recuperar uma informação apagada!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, apagar agora!",
      closeOnConfirm: true
     }, function(){
        StatusCandidate.remove({_id: status._id});
        sAlert.success("Status deletado");
    });
  },

  "click button.edit": function(e, template){
    const status = this;
    $('#name').val(this.name);
    $('#_id').val(this._id);
    $('#active').prop('checked', (this.active));
    $('#jobModal').modal('show');
  },
})
