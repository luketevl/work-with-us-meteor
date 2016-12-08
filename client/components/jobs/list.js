Template.jobsList.helpers({
  jobs(){
    return Jobs.find({});
  }
});

Template.jobsList.events({
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
        sAlert.success("Vaga deletada");
    });
  },

  "click button.edit": function(e, template){
    const job = this;
    $('#name').val(this.name);
    $('#_id').val(this._id);
    $('#active').prop('checked', (this.active));
    $('#jobModal').modal('show');
  },
})
