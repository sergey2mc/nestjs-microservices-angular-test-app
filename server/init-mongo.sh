mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  db.getSiblingDB('admin').auth(
    '$MONGO_INITDB_USERNAME',
    '$MONGO_INITDB_PASSWORD',
  );

  db.createUser({
    user: '$MONGO_INITDB_USERNAME',
    pwd: '$MONGO_INITDB_PASSWORD',
    roles: ['readWrite'],
  });
EOF

mongo -- "$MONGO_INIT_USER_DB_NAME" <<EOF
  db.getSiblingDB('admin').auth(
    '$MONGO_INITDB_USERNAME',
    '$MONGO_INITDB_PASSWORD',
  );

  db.createUser({
    user: '$MONGO_INITDB_USERNAME',
    pwd: '$MONGO_INITDB_PASSWORD',
    roles: ['readWrite'],
  });
EOF

mongo -- "$MONGO_INIT_DOCS_DB_NAME" <<EOF
  db.getSiblingDB('admin').auth(
    '$MONGO_INITDB_USERNAME',
    '$MONGO_INITDB_PASSWORD',
  );

  db.createUser({
    user: '$MONGO_INITDB_USERNAME',
    pwd: '$MONGO_INITDB_PASSWORD',
    roles: ['readWrite'],
  });
EOF
