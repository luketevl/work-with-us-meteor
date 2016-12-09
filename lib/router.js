Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

Router.map(function(){
  this.route('siteContainer', {path: '/'});
  this.route('jobsContainer', {path: '/jobs'});
  this.route('candidatesContainer', {path: '/candidates'});
  this.route('statusContainer', {path: '/status'});
});
