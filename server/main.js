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
  allowedFileTypes: ["application/dpc", "application/docx", "application/pdf"],
  maxSize: 4 * 1024 * 1024,
});

Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  AWSAccessKeyId: "AKIAIIFNQFV2XGV5NC5A",
  AWSSecretAccessKey: "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",
  bucket: "gattecnologia",
  acl: "public-read",
  region: "sa-east-1",

  key(file) {
    return `vagas/${file.name}`;
  },

  authorize(){
    return true;
  }

});
