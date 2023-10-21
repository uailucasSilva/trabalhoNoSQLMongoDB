//apagando o bd caso ele exista (tentando evitar erros)
db.getSiblingDB("gerenciadorDeTarefas").dropDatabase()

//criando db
use('gerenciadorDeTarefas');

//definindo nomes das coleções
const collection1 = 'Lista';
const collection2 = 'Tarefa';
const collection3 = 'Membro';

// Criando as coleções
db.createCollection(collection1);
db.createCollection(collection2);
db.createCollection(collection3);

// validação lista completa

db.runCommand({
    collMod: "Lista",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome"],
            // additionalProperties: false,
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "O identificador único do documento. Será gerado automaticamente pelo MongoDB."
                },
                nome: {
                    bsonType: "string",
                    description: "O nome da lista de tarefas. Deve ser uma string."
                },
                tarefas: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["titulo", "descricao", "data_inicio", "prioridade", "status", "membros"],
                        properties: {
                            titulo: {
                                bsonType: "string",
                                description: "O título da tarefa. Deve ser uma string."
                            },
                            descricao: {
                                bsonType: "string",
                                description: "A descrição da tarefa. Deve ser uma string."
                            },
                            data_inicio: {
                                bsonType: "date",
                                description: "A data de início da tarefa. Deve ser uma data válida."
                            },
                            data_fim: {
                                bsonType: "date",
                                description: "A data de término da tarefa, se aplicável. Deve ser uma data válida."
                            },
                            prioridade: {
                                bsonType: "int",
                                description: "A prioridade da tarefa. Deve ser um número inteiro."
                            },
                            status: {
                                bsonType: "string",
                                description: "O status da tarefa. Deve ser uma string."
                            },
                            membros: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["primeiro_nome", "email"],
                                    properties: {
                                        primeiro_nome: {
                                            bsonType: "string",
                                            description: "O primeiro nome do membro associado à tarefa. Deve ser uma string."
                                        },
                                        email: {
                                            bsonType: "string",
                                            description: "O endereço de e-mail do membro associado à tarefa. Deve ser um endereço de e-mail válido.",
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
});

// validação tarefa

db.runCommand({
    collMod: "Tarefa",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["titulo", "data_inicio"],
            // additionalProperties: false,
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
            // additionalProperties: false,
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
db.getCollectionInfos()



