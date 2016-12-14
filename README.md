# work-with-us-meteor
Work with us meteor


## Deploy and Monitoring

### Using NGINX + PASSANGER
- **REQUIRED** _nodejs_
  - https://nodejs.org/en/

#### Install
- **Nginx** with **Passenger**
  - _OSx_ required **brew** (http://brew.sh/)
```shell
brew install nginx --with-passenger
```
#### Configuration
- **Nginx**
  - _Enable_ and and follow the instructions in the **Caveats** section
```shell
brew info nginx --with-passenger
```
  - _Restart_ **nginx**
```shell
sudo nginx -s stop
```
  - _Start_ **nginx**
```shell
sudo nginx
```

#### Checking
- **Passenger**
```shell
sudo /usr/local/bin/passenger-config validate-install
```
- **Process**
```shell
sudo /usr/local/bin/passenger-memory-stats
```

#### Deploy APP

##### Optional
- **Nginx**
  - _Change PORT_ | _Stop_ **Nginx** before
```shell
sudo vim /usr/local/etc/nginx/nginx.conf
```
```conf
server{
  listen        PORTNUMBER;
  server_name   HOST;
}
```

### Deploy Meteor UP

#### Install
- https://github.com/kadirahq/meteor-up
```shell
npm install -g mup
```

#### Configuration
- **Create** **.deploy** folder
```shell
cd meteorApplicationFolder
mkdir .deploy
cd .deploy
```
- **Init** the meteor up project | In _folder_ **.DEPLOY**
```shell
mup init
```
- **Config** files:
  - **mup.js** | _Meteor Up_ configuration files: server, db, etcs
  - **settings.json** | (http://docs.meteor.com/api/core.html#Meteor-settings)
- **Run setup**
```shell
mup setup
```

#### Deploy
- **Run command**
```shell
mup deploy
```

### References
- https://www.phusionpassenger.com/library/walkthroughs/deploy/meteor/aws/nginx/oss/osx/install_passenger.html
- https://coderwall.com/p/dgwwuq/installing-nginx-in-mac-os-x-maverick-with-homebrew
- http://brew.sh/
- https://nodejs.org/en/
