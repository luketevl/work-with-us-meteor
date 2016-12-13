const validateLogin = (req, res, next) => {
  if(!Meteor.userId() && req.url != '/adm'){
    Router.go('/');
  }
  next();
};

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

Router.onBeforeAction(validateLogin, {
  except: ['/adm']
})

Router.map(function(){
  this.route('siteContainer', {
    path: '/',
  });
  this.route('admContainer', {
    path: '/adm',
  });
  this.route('jobsContainer', {
    path: '/jobs',
  });
  this.route('candidatesContainer', {
    path: '/candidates',
  });
  this.route('statusContainer', {
    path: '/status',
});
});
