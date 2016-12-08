Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

Router.map(function(){
  this.route('jobsContainer', {path: '/jobs'});
  this.route('candidatesContainer', {path: '/candidates'});
  this.route('siteContainer', {path: '/'});  
});
