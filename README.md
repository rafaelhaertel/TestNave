## Documentação da api:

Todas as requests que não sejam de registro ou login, exigem que o usuário esteja logado para que funcione.

```
Registro:
  URL: /user/register
  Método: post
  Body: {
          "username": String
          "password": String
        }
  SuccessResponse:
          code : 200
          "status": "Registration successful!"
  ErrorResponse:
          code: 400
          "err": {
            "name": "UserExistsError",
            "message": "A user with the given username is already registered"
          }
  Descrição: Realiza o registro de um usuário cujo username não esteja na base de dados


Login:
  URL: /user/login
  Método: post
  Body: {
          "username": String
          "password": String
        }
  SuccessResponse:
          code : 200
          "status": "Login successful!"
  ErrorResponse:
          code: 400
          "err": {
            "name": "IncorrectPasswordError",
            "message": "Password or username is incorrect"
          }
  Descrição: Realiza o login de um usuário se o username e o password estiverem corretos


Status:
  URL: /user/status
  Método: get
  SuccessResponse:
          code : 200
            "posts": [
                      "5ca6be536ede6b278816c08f"
                     ],
            "_id": "5ca6bdcd6ede6b278816c08d",
            "username": "Rafael",
            "__v": 3
  ErrorResponse:
          code: 400
          "status": "User not logged in"
  Descrição: Mostra a conta do usuário

Remove usuário:
  URL: /user/remove
  Método: get
  SuccessResponse:
          code : 200
            "message": "User Removed"
  ErrorResponse:
          code: 400
          "status": "User not logged in"
  Descrição: Apaga a conta do usuário logado

Logout:
  URL: /user/logout
  Método: get
  SuccessResponse:
          code : 200
            "status": "Bye!"
  ErrorResponse:
          code: 401
          "status": "User not logged in"
  Descrição: Faz logout do usuário se estiver logado

Atualizar senha:
  URL: /user/updatepassword
  Método: put
  Body: {
          "olpassword": String
          "newpassword": String
        }
  SuccessResponse:
          code : 200
          "message": "password reset successful"
  ErrorResponse:
          code: 400
           "message": "Error = IncorrectPasswordError: Password or username is incorrect"
           code: 401
          "status": "User not logged in"
  Descrição: Realiza a troca de senha de um usuário se o oldpassword estiver correto

Atualizar nome de usuário:
  URL: /user/updateusername
  Método: put
  Body: {
            "newusername": String
        }
  SuccessResponse:
          code : 200
          "message": "username reset successful"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
  Descrição: Realiza a troca de nome do usuário

Novo Post:
  URL: /user/newpost
  Método: post
  Body: {
            "text": String
        }
  SuccessResponse:
          code : 200
           "status": "Post Created"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
  Descrição: Cria um novo post para o usuário logado


Atualizar Post:
  URL: /user/updatepost/:id
  Método: post
  Body: {
            "text": String
        }
  SuccessResponse:
          code : 200
           "status": "Post Updated"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
          code: 400
            "error": {
              "message": "Cast to ObjectId failed for value \"5ca6be1d6ede6b278816c08e234\" at path \"_id\" for model \"posts\"",
              "name": "CastError",
              "stringValue": "\"5ca6be1d6ede6b278816c08e234\"",
              "kind": "ObjectId",
              "value": "5ca6be1d6ede6b278816c08e234",
              "path": "_id"
            }
          code: 400
            "error": "No record was found"

  Descrição: Edita um post do usuário logado desde que ele seja dono deste post


Todos os posts:
  URL: /user/allposts
  Método: get
  SuccessResponse:
          code : 200
            "posts": [
              {
              "_id": "5ca6be536ede6b278816c08f",
              "userid": "5ca6bdcd6ede6b278816c08d",
              "content": "blablablabalblabalblablalbalbalblaa",
              "date": "2019-04-05T02:32:51.873Z",
              "comments": [],
              "__v": 2
              }
              ...
            ]
  ErrorResponse:
          code: 401
          "status": "User not logged in"
  Descrição: Exibe todos os posts de todos os usuários ordenados por data

Apagar Post:
  URL: /user/deletepost/:id
  Método: delete
  SuccessResponse:
          code : 200
           "status": "Post Deleted"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
          code: 400
            "error": {
              "message": "Cast to ObjectId failed for value \"5ca6be1d6ede6b278816c08e234\" at path \"_id\" for model \"posts\"",
              "name": "CastError",
              "stringValue": "\"5ca6be1d6ede6b278816c08e234\"",
              "kind": "ObjectId",
              "value": "5ca6be1d6ede6b278816c08e234",
              "path": "_id"
            }
          code: 400
            "error": "No record was found"

  Descrição: Deleta um post do usuário logado desde que ele seja dono deste post

Exibir Post:
  URL: /user/post/:id
  Método: get
  SuccessResponse:
          code : 200
            "post": {
              "_id": "5ca6be536ede6b278816c08f",
              "userid": "5ca6bdcd6ede6b278816c08d",
              "content": "blablablabalblabalblablalbalbalblaa",
              "date": "2019-04-05T02:32:51.873Z",
              "comments": [],
              "__v": 0
            }
  ErrorResponse:
          code: 401
           "status": "User not logged in"
          code: 400
            "error": {
              "message": "Cast to ObjectId failed for value \"5ca6be1d6ede6b278816c08e234\" at path \"_id\" for model \"posts\"",
              "name": "CastError",
              "stringValue": "\"5ca6be1d6ede6b278816c08e234\"",
              "kind": "ObjectId",
              "value": "5ca6be1d6ede6b278816c08e234",
              "path": "_id"
            }
          code: 400
            "error": "No record was found"

  Descrição: Exibe um post de qualquer usuário desde que usuário esteja logado


Novo Comentário:
  URL: /user/post/:id/newcomment
  Método: post
  Body: {
            "text": String
        }
  SuccessResponse:
          code : 200
           "status": "Comment Created"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
          code: 400
            "error": {
              "message": "Cast to ObjectId failed for value \"5ca6be1d6ede6b278816c08e234\" at path \"_id\" for model \"posts\"",
              "name": "CastError",
              "stringValue": "\"5ca6be1d6ede6b278816c08e234\"",
              "kind": "ObjectId",
              "value": "5ca6be1d6ede6b278816c08e234",
              "path": "_id"
            }
          code: 400
            "error": "No record was found"
  Descrição: Cria um novo comentário no post selecionado


Editar Comentário:
  URL: /user/post/:id/newcomment
  Método: put
  Body: {
            "text": String
        }
  SuccessResponse:
          code : 200
           "status": "Comment Updated"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
          code: 400
            "error": {
              "message": "Cast to ObjectId failed for value \"5ca6be1d6ede6b278816c08e234\" at path \"_id\" for model \"posts\"",
              "name": "CastError",
              "stringValue": "\"5ca6be1d6ede6b278816c08e234\"",
              "kind": "ObjectId",
              "value": "5ca6be1d6ede6b278816c08e234",
              "path": "_id"
            }
          code: 400
            "error": "No record was found"
  Descrição: Edita o comentário desde que este seja do usuário logado

Apaga Comentário:
  URL: /user/post/:postId/comment/:commentId
  Método: delete
  SuccessResponse:
          code : 200
           "status": "Comment Deleted"
  ErrorResponse:
          code: 401
           "status": "User not logged in"
          code: 400
            "error": {
              "message": "Cast to ObjectId failed for value \"5ca6be1d6ede6b278816c08e234\" at path \"_id\" for model \"posts\"",
              "name": "CastError",
              "stringValue": "\"5ca6be1d6ede6b278816c08e234\"",
              "kind": "ObjectId",
              "value": "5ca6be1d6ede6b278816c08e234",
              "path": "_id"
            }
          code: 400
            "error": "No record was found"
  Descrição: Apaga um comentário em qualquer publicação desde que o comentário seja do usuário logado, ou apaga qualquer comentário em um post do usuário logado
```