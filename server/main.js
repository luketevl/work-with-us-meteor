import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
});


// logiin
Accounts.validateNewUser(user => {
  user.emails.forEach(email => {
    if(email.address != 'gestaodepessoas@gattecnologia.com.br' && email.address != 'lhenrique@gattecnolgia.com.br'){
      throw new Meteor.Error(403, "Não possível criar conta com esse e-mail. Apenas o gestão de pessoas pode ter acesso");
    }
  });
  return true;
});
