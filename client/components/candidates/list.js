Template.candidatesList.helpers({
  candidates(){
    let cand = Candidates.find();
    let result = cand.map(el => {
      el.jobs.forEach(idJob => {
        el.jobs = Jobs.find({_id: idJob});
      })
      el.status = StatusCandidate.find({_id: el.status});
       return el;
    });
    return result;
  },
});

Template.candidatesList.events({
  "click button.delete": function(e, template){
    const candidate = this;
    swal({
      title: "Deseja realmente apagar?",
      text: "Não é possível recuperar uma informação apagada!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, apagar agora!",
      closeOnConfirm: true
     }, function(){
        Candidates.remove({_id: candidate._id});
        sAlert.success("Candidato apagado");
    });
  },

  "click button.edit": function(e, template){
    const candidate = this;
    this.jobs.forEach(el => {
      $('#job').val(el._id);
    });
    this.status.forEach(el => {
      $('#status').val(el._id);
    });

    $('#_id').val(this._id);
    $('#name').val(this.name);
    $('#email').val(this.email);
    $('#phone').val(this.phone);
    $('#active').prop('checked', (this.active));
    $('#candidateModal').modal('show');

  },
})
