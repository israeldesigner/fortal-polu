# nodejs-aulas
db.createUser({user: "root",pwd:"pass123",roles:[{role: "userAdminAnyDatabase", db: "admin" },"readWriteAnyDatabase"]});
db.grantRolesToUser('admin',[{ role: "root", db: "admin" }])
db.createUser({user: "citimbd",pwd:"0p9o8i7u",roles:[{role: "readWrite", db: "db_po" }]});
