import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  this.Files = new Meteor.Files({
    debug: true,
    collectionName: 'Files',
    allowClientCode: false,
    onBeforeUpload(file){
      if(file.size <= 1024*2014*10 && /doc|docx|pdf/i.test(file.extension)){
        return true;
      }
      else{
        return 'Por favor, o arquivo deve ter no máximo 10mb e estar nos seguintes formatos: doc,docx ou pdf';
      }
    }
  });

  Files.denyClient();
  Meteor.publish('files.all', () => Files.find().cursor);

});
