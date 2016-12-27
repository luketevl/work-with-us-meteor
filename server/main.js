import { Meteor } from 'meteor/meteor';

// logiin
Accounts.validateNewUser(user => {
  user.emails.forEach(email => {
    if(email.address != 'gestaodepessoas@gattecnologia.com.br' && email.address != 'lhenrique@gattecnolgia.com.br'){
      throw new Meteor.Error(403, "Não possível criar conta com esse e-mail. Apenas o gestão de pessoas pode ter acesso");
    }
  });
  return true;
});

Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["application/doc", "application/docx", "application/pdf"],
  maxSize: 4 * 1024 * 1024,
});

Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  AWSAccessKeyId: "",
  AWSSecretAccessKey: "",
  bucket: "",
  acl: "public-read",
  region: "sa-east-1",

  key(file) {
    return `vagas/${Random.id()}`;
  },

  authorize(){
    return true;
  }

});
