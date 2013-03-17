Yet another Bower server
=====

### Introduction

Bower Server is a Standalone Node.js/Restify App that allows you to run your own custom endpoints for Bower Components.


### Installation

Requires a running MongoDB instance.

```npm install```


### Usage

Run:
```node app.js```

Add a new package:
```curl http://localhost:8080/packages -d "{\"name\":\"toto\", \"url\":\"git://tito\"}" -H "Content-Type: application/json"```

Retrieve all packages:
```curl http://localhost:8080/packages -v```

Retrieve a specific package:
```curl http://localhost:8080/packages/toto -v```

Search for a package:
```curl http://localhost:8080/packages/search/toto -v```
Not implemente yet