use('gerenciadorDeTarefas');

// validação lista completa

db.runCommand({
    collMod: "Lista",
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ["nome"],
          additionalProperties: false,
          properties: {
             nome: {
                bsonType: "string"
             },
             tarefas: {
                bsonType: "array",
                items: {
                   bsonType: "object",
                   required: ["titulo", "descricao", "data_inicio", "prioridade", "status", "membros"],
                   properties: {
                      titulo: {
                         bsonType: "string"
                      },
                      descricao: {
                         bsonType: "string"
                      },
                      data_inicio: {
                         bsonType: "date"
                      },
                      data_fim: {
                         bsonType: "date"
                      },
                      prioridade: {
                         bsonType: "int"
                      },
                      status: {
                         bsonType: "string"
                      },
                      membros: {
                         bsonType: "array",
                         items: {
                            bsonType: "object",
                            required: ["primeiro_nome", "email"],
                            properties: {
                               primeiro_nome: {
                                  bsonType: "string"
                               },
                               email: {
                                  bsonType: "string",
                                  pattern: "^\\S+@\\S+\\.\\S+$"
                               }
                            }
                         }
                      }
                   }
                }
             }
          }
       }
    }
 })

 // validação tarefa

 db.runCommand({
    collMod: "Tarefa",
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ["titulo", "data_inicio"],
          additionalProperties: false,
          properties: {
             titulo: {
                bsonType: "string"
             },
             descricao: {
                bsonType: "string"
             },
             data_inicio: {
                bsonType: "date"
             },
             data_fim: {
                bsonType: "date"
             },
             prioridade: {
                bsonType: "int"
             },
             status: {
                bsonType: "string"
             },
             membros: {
                bsonType: "array",
                items: {
                   bsonType: "object",
                   required: ["primeiro_nome", "email"],
                   properties: {
                      primeiro_nome: {
                         bsonType: "string"
                      },
                      email: {
                         bsonType: "string",
                         pattern: "^\\S+@\\S+\\.\\S+$"
                      }
                   }
                }
             }
          }
       }
    }
 })

 // validação membro

 db.runCommand({
    collMod: "Membro",
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ["primeiro_nome", "email"],
          additionalProperties: false,
          properties: {
             primeiro_nome: {
                bsonType: "string"
             },
             email: {
                bsonType: "string",
                pattern: "^\\S+@\\S+\\.\\S+$"
             }
          }
       }
    }
 })
 //mostrar as informações das coleções criadas
//  db.getCollectionInfos()

