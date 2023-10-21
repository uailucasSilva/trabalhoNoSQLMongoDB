db.getSiblingDB("gerenciadorDeTarefas").dropDatabase()

use('gerenciadorDeTarefas');

const collection1 = 'Lista';
const collection2 = 'Tarefa';
const collection3 = 'Membro';

// Criando as coleções
db.createCollection(collection1);
db.createCollection(collection2);
db.createCollection(collection3);

db.runCommand({
    collMod: "Lista",
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: ["nome"],
          properties: {
             nome: {
                bsonType: "string"
             },
             tarefas: {
                bsonType: "array",
                items: {
                   bsonType: "object",
                   required: ["titulo", "descricao", "data_inicio", "data_fim", "prioridade", "status", "membros"],
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
                                  bsonType: "string"
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

//mostrar as informações das coleções criadas
// db.getCollectionInfos()

