Template.candidatesList.helpers({
  candidates(){
    return Candidates.find({});
  }
});

Template.candidatesList.events({
  "click button.delete": function(e, template){
    const job = this;
    swal({
      title: "Deseja realmente apagar?",
      text: "Não é possível recuperar uma informação apagada!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, apagar agora!",
      closeOnConfirm: true
     }, function(){
        Jobs.remove({_id: job._id});
        sAlert.success("Candidato apagado");
    });
  },

  "click button.edit": function(e, template){
    const job = this;
    $('#name').val(this.name);
    $('#_id').val(this._id);
    $('#active').prop('checked', (this.active));
    $('#candidatesModal').modal('show');
  },
})
